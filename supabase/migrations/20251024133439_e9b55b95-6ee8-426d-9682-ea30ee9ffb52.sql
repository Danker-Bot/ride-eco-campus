-- Fix security warnings by setting search_path on functions

-- Update handle_updated_at function with proper search_path
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Update calculate_trip_savings function with proper search_path
create or replace function public.calculate_trip_savings(seats_filled integer)
returns table(co2_saved_kg numeric, money_saved_ars numeric)
language plpgsql
security definer
set search_path = public
as $$
declare
  distance_km constant numeric := 20;
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
    cost_per_person := total_cost / (seats_filled + 1);
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