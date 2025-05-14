
# Supabase Setup for OrganiMarket

This document provides instructions for setting up the required Supabase configuration for the OrganiMarket application.

## Environment Variables

Set the following environment variables in your Lovable project:

1. `VITE_SUPABASE_URL`: Your Supabase project URL
2. `VITE_SUPABASE_ANON_KEY`: Your Supabase project anon/public key

## Database Setup

The application requires the following database tables:

### Profiles Table

The `profiles` table stores user profile information. It's automatically created and managed through the SQL migration file.

Fields:
- `id` (UUID, Primary Key): References auth.users(id)
- `email` (Text): User's email address
- `first_name` (Text): User's first name
- `last_name` (Text): User's last name
- `created_at` (Timestamp): When the profile was created
- `updated_at` (Timestamp): When the profile was last updated

### Row Level Security (RLS) Policies

The following RLS policies are set up:

1. "Users can view own profile": Users can only view their own profile
2. "Users can update own profile": Users can only update their own profile

## User Authentication

The application uses Supabase Auth for:
- Email/password authentication
- Account signup
- Profile management

## Triggers

A trigger is set up to automatically create a profile record when a new user signs up.

## SQL Migration

The `supabase/migrations/20250514_create_profiles_table.sql` file contains the SQL commands to set up the required database schema and RLS policies.

## Troubleshooting

If you encounter issues with authentication:

1. Check that your environment variables are correctly set
2. Verify that the SQL migration was successfully executed
3. Check that RLS policies are properly configured
4. Look for any errors in the browser console
