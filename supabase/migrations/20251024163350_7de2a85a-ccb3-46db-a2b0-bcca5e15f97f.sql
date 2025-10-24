-- Add RLS policy to allow users to manage their own roles
CREATE POLICY "Users can manage their own roles"
  ON public.user_roles
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);