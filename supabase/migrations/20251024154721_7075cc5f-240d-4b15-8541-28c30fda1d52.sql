-- Fix the security definer view by recreating it without that property
DROP VIEW IF EXISTS public.public_profiles;

CREATE VIEW public.public_profiles 
WITH (security_invoker=true)
AS
SELECT 
  id,
  full_name,
  avatar_url,
  created_at
FROM public.profiles;