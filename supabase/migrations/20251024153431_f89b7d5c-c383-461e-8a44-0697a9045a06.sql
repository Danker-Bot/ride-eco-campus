-- Add audio_note column to trip_requests for voice messages
ALTER TABLE public.trip_requests ADD COLUMN audio_note text;

-- Add trip cancellation and completion status
ALTER TABLE public.trips ADD COLUMN cancelled_at timestamp with time zone;
ALTER TABLE public.trips ADD COLUMN completed_at timestamp with time zone;