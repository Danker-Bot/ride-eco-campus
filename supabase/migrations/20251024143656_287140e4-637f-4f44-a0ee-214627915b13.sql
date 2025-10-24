-- Add distance and duration fields to trips table
ALTER TABLE public.trips 
ADD COLUMN distance_km numeric,
ADD COLUMN estimated_duration_minutes integer;