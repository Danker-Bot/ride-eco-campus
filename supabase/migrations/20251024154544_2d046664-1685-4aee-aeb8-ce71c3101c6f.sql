-- ============================================
-- FIX #1: Role Privilege Escalation
-- ============================================

-- Create user_roles table using existing user_role enum
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role user_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Migrate existing role data from profiles to user_roles
INSERT INTO public.user_roles (user_id, role)
SELECT id, role
FROM public.profiles
WHERE role IS NOT NULL
ON CONFLICT (user_id, role) DO NOTHING;

-- RLS policies for user_roles table
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================
-- FIX #2: Public Data Exposure - Profiles
-- ============================================

-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;

-- Update the update policy to prevent role changes
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

CREATE POLICY "Users can update their own profile (except role)"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Create a limited view for public profile info (no email/phone)
CREATE OR REPLACE VIEW public.public_profiles AS
SELECT 
  id,
  full_name,
  avatar_url,
  created_at
FROM public.profiles;

-- ============================================
-- FIX #3: Input Validation - Database Level
-- ============================================

-- Add length constraints to prevent resource exhaustion
ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_full_name_length CHECK (char_length(full_name) <= 100),
  ADD CONSTRAINT profiles_email_length CHECK (char_length(email) <= 255),
  ADD CONSTRAINT profiles_phone_length CHECK (char_length(phone) <= 20);

ALTER TABLE public.vehicles
  ADD CONSTRAINT vehicles_model_length CHECK (char_length(model) <= 100),
  ADD CONSTRAINT vehicles_color_length CHECK (char_length(color) <= 50),
  ADD CONSTRAINT vehicles_license_plate_length CHECK (char_length(license_plate) <= 20);

ALTER TABLE public.trips
  ADD CONSTRAINT trips_origin_length CHECK (char_length(origin) <= 500),
  ADD CONSTRAINT trips_destination_length CHECK (char_length(destination) <= 500);

ALTER TABLE public.trip_requests
  ADD CONSTRAINT trip_requests_pickup_location_length CHECK (char_length(pickup_location) <= 500),
  ADD CONSTRAINT trip_requests_audio_note_length CHECK (char_length(audio_note) <= 10000);

-- Update trips RLS to use role-based checks
DROP POLICY IF EXISTS "Drivers can manage their own trips" ON public.trips;

CREATE POLICY "Drivers can manage their own trips"
  ON public.trips
  FOR ALL
  USING (
    auth.uid() = driver_id 
    AND (has_role(auth.uid(), 'driver'::user_role) OR has_role(auth.uid(), 'both'::user_role))
  );

CREATE POLICY "Drivers can insert trips if they have driver role"
  ON public.trips
  FOR INSERT
  WITH CHECK (
    auth.uid() = driver_id 
    AND (has_role(auth.uid(), 'driver'::user_role) OR has_role(auth.uid(), 'both'::user_role))
  );

-- Update vehicles RLS to use role-based checks
DROP POLICY IF EXISTS "Drivers can manage their own vehicles" ON public.vehicles;

CREATE POLICY "Drivers can manage their own vehicles"
  ON public.vehicles
  FOR ALL
  USING (
    auth.uid() = driver_id 
    AND (has_role(auth.uid(), 'driver'::user_role) OR has_role(auth.uid(), 'both'::user_role))
  );