-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create enum for user roles
create type public.user_role as enum ('driver', 'passenger', 'both');

-- Create profiles table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text,
  role user_role not null default 'passenger',
  avatar_url text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Enable RLS on profiles
alter table public.profiles enable row level security;

-- Profiles policies
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can view all profiles"
  on public.profiles for select
  using (true);

-- Create vehicles table
create table public.vehicles (
  id uuid primary key default uuid_generate_v4(),
  driver_id uuid not null references public.profiles(id) on delete cascade,
  model text not null,
  color text not null,
  license_plate text not null,
  seats_available integer not null check (seats_available > 0 and seats_available <= 8),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Enable RLS on vehicles
alter table public.vehicles enable row level security;

-- Vehicles policies
create policy "Drivers can manage their own vehicles"
  on public.vehicles for all
  using (auth.uid() = driver_id);

create policy "Everyone can view vehicles"
  on public.vehicles for select
  using (true);

-- Create trips table
create table public.trips (
  id uuid primary key default uuid_generate_v4(),
  driver_id uuid not null references public.profiles(id) on delete cascade,
  vehicle_id uuid not null references public.vehicles(id) on delete cascade,
  origin text not null,
  destination text not null,
  departure_time time not null,
  departure_date date not null,
  seats_available integer not null check (seats_available >= 0),
  co2_saved_kg numeric(10, 2) default 0,
  money_saved_ars numeric(10, 2) default 0,
  status text not null default 'active' check (status in ('active', 'completed', 'cancelled')),
  origin_lat numeric(10, 6),
  origin_lng numeric(10, 6),
  destination_lat numeric(10, 6),
  destination_lng numeric(10, 6),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- Enable RLS on trips
alter table public.trips enable row level security;

-- Trips policies
create policy "Drivers can manage their own trips"
  on public.trips for all
  using (auth.uid() = driver_id);

create policy "Everyone can view active trips"
  on public.trips for select
  using (status = 'active');

-- Create trip requests table
create table public.trip_requests (
  id uuid primary key default uuid_generate_v4(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  passenger_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'accepted', 'rejected', 'completed')),
  pickup_location text,
  pickup_lat numeric(10, 6),
  pickup_lng numeric(10, 6),
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique(trip_id, passenger_id)
);

-- Enable RLS on trip requests
alter table public.trip_requests enable row level security;

-- Trip requests policies
create policy "Passengers can manage their own requests"
  on public.trip_requests for all
  using (auth.uid() = passenger_id);

create policy "Drivers can view requests for their trips"
  on public.trip_requests for select
  using (
    auth.uid() in (
      select driver_id from public.trips where id = trip_id
    )
  );

create policy "Drivers can update requests for their trips"
  on public.trip_requests for update
  using (
    auth.uid() in (
      select driver_id from public.trips where id = trip_id
    )
  );

-- Create ecological metrics table
create table public.ecological_metrics (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  total_trips integer not null default 0,
  total_co2_saved_kg numeric(10, 2) not null default 0,
  total_money_saved_ars numeric(10, 2) not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique(user_id)
);

-- Enable RLS on ecological metrics
alter table public.ecological_metrics enable row level security;

-- Ecological metrics policies
create policy "Users can view their own metrics"
  on public.ecological_metrics for select
  using (auth.uid() = user_id);

create policy "Everyone can view all metrics for leaderboard"
  on public.ecological_metrics for select
  using (true);

-- Function to create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.email),
    new.email
  );
  
  -- Create initial ecological metrics
  insert into public.ecological_metrics (user_id)
  values (new.id);
  
  return new;
end;
$$;

-- Trigger for new user
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Function to update updated_at timestamp
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Triggers for updated_at
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger update_vehicles_updated_at
  before update on public.vehicles
  for each row execute function public.handle_updated_at();

create trigger update_trips_updated_at
  before update on public.trips
  for each row execute function public.handle_updated_at();

create trigger update_trip_requests_updated_at
  before update on public.trip_requests
  for each row execute function public.handle_updated_at();

create trigger update_ecological_metrics_updated_at
  before update on public.ecological_metrics
  for each row execute function public.handle_updated_at();

-- Function to calculate CO2 and money saved for a trip
-- Based on: 20km round trip, 1.4L consumed, $1600 ARS/L
-- CO2: 1L gasoline = ~2.3 kg CO2
create or replace function public.calculate_trip_savings(seats_filled integer)
returns table(co2_saved_kg numeric, money_saved_ars numeric)
language plpgsql
as $$
declare
  distance_km constant numeric := 20; -- round trip
  liters_per_100km constant numeric := 7;
  liters_consumed numeric;
  price_per_liter constant numeric := 1600;
  co2_per_liter constant numeric := 2.3;
  total_cost numeric;
  cost_per_person numeric;
  savings_per_trip numeric;
  co2_total numeric;
  co2_per_person numeric;
begin
  liters_consumed := (distance_km * liters_per_100km) / 100;
  total_cost := liters_consumed * price_per_liter;
  co2_total := liters_consumed * co2_per_liter;
  
  if seats_filled > 0 then
    cost_per_person := total_cost / (seats_filled + 1); -- +1 for driver
    savings_per_trip := total_cost - cost_per_person;
    co2_per_person := co2_total / (seats_filled + 1);
    co2_saved_kg := co2_total - co2_per_person;
  else
    savings_per_trip := 0;
    co2_saved_kg := 0;
  end if;
  
  money_saved_ars := savings_per_trip;
  
  return next;
end;
$$;

-- Function to update trip metrics when request is accepted
create or replace function public.update_trip_metrics()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  seats_filled integer;
  trip_savings record;
begin
  -- Only update if request was accepted
  if new.status = 'accepted' and old.status != 'accepted' then
    -- Count accepted passengers for this trip
    select count(*) into seats_filled
    from public.trip_requests
    where trip_id = new.trip_id and status = 'accepted';
    
    -- Calculate savings
    select * into trip_savings
    from public.calculate_trip_savings(seats_filled);
    
    -- Update trip with new metrics
    update public.trips
    set 
      co2_saved_kg = trip_savings.co2_saved_kg,
      money_saved_ars = trip_savings.money_saved_ars
    where id = new.trip_id;
    
    -- Update driver's ecological metrics
    update public.ecological_metrics
    set
      total_trips = total_trips + 1,
      total_co2_saved_kg = total_co2_saved_kg + trip_savings.co2_saved_kg,
      total_money_saved_ars = total_money_saved_ars + trip_savings.money_saved_ars
    where user_id = (select driver_id from public.trips where id = new.trip_id);
    
    -- Update passenger's ecological metrics
    update public.ecological_metrics
    set
      total_trips = total_trips + 1,
      total_co2_saved_kg = total_co2_saved_kg + trip_savings.co2_saved_kg
    where user_id = new.passenger_id;
  end if;
  
  return new;
end;
$$;

-- Trigger to update metrics when request status changes
create trigger on_trip_request_status_change
  after update on public.trip_requests
  for each row execute function public.update_trip_metrics();