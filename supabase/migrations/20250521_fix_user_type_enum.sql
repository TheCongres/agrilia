
-- First, check if user_type already exists, and create it if it doesn't
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_type') THEN
        CREATE TYPE public.user_type AS ENUM ('consumer', 'producer');
    END IF;
END
$$;

-- Make sure the profiles table has the user_type column
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM information_schema.columns
        WHERE table_schema = 'public'
        AND table_name = 'profiles'
        AND column_name = 'user_type'
    ) THEN
        ALTER TABLE public.profiles ADD COLUMN user_type user_type NOT NULL DEFAULT 'consumer';
    END IF;
END
$$;

-- Update the handle_new_user function to include user_type
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name, user_type)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    COALESCE((new.raw_user_meta_data->>'user_type')::user_type, 'consumer')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
