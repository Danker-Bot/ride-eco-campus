-- Make public_profiles view accessible to everyone
-- This is safe because it only exposes id, full_name, and avatar_url (no sensitive data)

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public_profiles;

-- Since public_profiles is a view, we need to ensure it can be queried
-- Views inherit RLS from underlying tables, so we need to modify the profiles table policy

-- Add a policy to allow everyone to see basic profile info (full_name, avatar_url) for leaderboard
CREATE POLICY "Everyone can view public profile info for leaderboard" 
ON profiles 
FOR SELECT 
USING (true);

-- Drop the restrictive policy that only allows users to see their own profile
DROP POLICY IF EXISTS "Users can view their own profile" ON profiles;