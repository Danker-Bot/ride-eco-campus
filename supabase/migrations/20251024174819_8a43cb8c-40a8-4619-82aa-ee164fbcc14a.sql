-- Add payment fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS alias TEXT,
ADD COLUMN IF NOT EXISTS cbu TEXT,
ADD COLUMN IF NOT EXISTS cvu TEXT;

-- Add money tracking to ecological_metrics
ALTER TABLE public.ecological_metrics
ADD COLUMN IF NOT EXISTS total_money_earned_ars NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS money_earned_today_ars NUMERIC DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_earning_date DATE DEFAULT CURRENT_DATE;

-- Drop and recreate the calculate_trip_savings function with new calculation
DROP FUNCTION IF EXISTS public.calculate_trip_savings(integer);

CREATE FUNCTION public.calculate_trip_savings(seats_filled integer)
RETURNS TABLE(co2_saved_kg numeric, money_saved_ars numeric, money_earned_per_passenger_ars numeric)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  distance_km CONSTANT numeric := 20;
  liters_per_km CONSTANT numeric := 0.07;
  price_per_liter CONSTANT numeric := 1800;
  co2_per_liter CONSTANT numeric := 2.3;
  total_people integer;
  liters_consumed numeric;
  total_cost numeric;
  cost_per_person numeric;
  co2_total numeric;
  co2_per_person numeric;
BEGIN
  total_people := seats_filled + 1; -- driver + passengers
  liters_consumed := distance_km * liters_per_km;
  total_cost := liters_consumed * price_per_liter;
  co2_total := liters_consumed * co2_per_liter;
  
  IF seats_filled > 0 THEN
    cost_per_person := total_cost / total_people;
    money_saved_ars := total_cost - cost_per_person; -- driver saves
    money_earned_per_passenger_ars := cost_per_person; -- what each passenger pays
    co2_per_person := co2_total / total_people;
    co2_saved_kg := co2_total - co2_per_person;
  ELSE
    money_saved_ars := 0;
    money_earned_per_passenger_ars := 0;
    co2_saved_kg := 0;
  END IF;
  
  RETURN NEXT;
END;
$$;

-- Update trip_metrics trigger to track daily earnings
CREATE OR REPLACE FUNCTION public.update_trip_metrics()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  seats_filled integer;
  trip_savings record;
  driver_user_id uuid;
  is_new_day boolean;
BEGIN
  -- Only update if request was accepted
  IF new.status = 'accepted' AND old.status != 'accepted' THEN
    -- Get driver_id for this trip
    SELECT driver_id INTO driver_user_id
    FROM public.trips
    WHERE id = new.trip_id;
    
    -- Count accepted passengers for this trip
    SELECT count(*) INTO seats_filled
    FROM public.trip_requests
    WHERE trip_id = new.trip_id AND status = 'accepted';
    
    -- Calculate savings
    SELECT * INTO trip_savings
    FROM public.calculate_trip_savings(seats_filled);
    
    -- Update trip with new metrics
    UPDATE public.trips
    SET 
      co2_saved_kg = trip_savings.co2_saved_kg,
      money_saved_ars = trip_savings.money_saved_ars
    WHERE id = new.trip_id;
    
    -- Check if it's a new day for the driver
    SELECT (last_earning_date < CURRENT_DATE) INTO is_new_day
    FROM public.ecological_metrics
    WHERE user_id = driver_user_id;
    
    -- Update driver's ecological metrics
    UPDATE public.ecological_metrics
    SET
      total_trips = total_trips + 1,
      total_co2_saved_kg = total_co2_saved_kg + trip_savings.co2_saved_kg,
      total_money_saved_ars = total_money_saved_ars + trip_savings.money_saved_ars,
      total_money_earned_ars = total_money_earned_ars + trip_savings.money_earned_per_passenger_ars,
      money_earned_today_ars = CASE 
        WHEN is_new_day THEN trip_savings.money_earned_per_passenger_ars
        ELSE money_earned_today_ars + trip_savings.money_earned_per_passenger_ars
      END,
      last_earning_date = CURRENT_DATE
    WHERE user_id = driver_user_id;
    
    -- Update passenger's ecological metrics
    UPDATE public.ecological_metrics
    SET
      total_trips = total_trips + 1,
      total_co2_saved_kg = total_co2_saved_kg + trip_savings.co2_saved_kg
    WHERE user_id = new.passenger_id;
  END IF;
  
  RETURN new;
END;
$$;