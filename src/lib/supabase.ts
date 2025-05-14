
import { createClient } from '@supabase/supabase-js';

// Use environment variables for Supabase configuration or fallback to default values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyzcompany.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5emNvbXBhbnkiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYyMDY2Mjk0Niwic3ViIjoiYW5vbiIsImV4cCI6MTkzNjIzODk0Nn0.fake_key_for_development';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey);

// Only show error if both values are undefined (not the fallback values)
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Using fallback Supabase values. For production, please set up proper environment variables.');
}

export const supabase = createClient(
  supabaseUrl as string,
  supabaseAnonKey as string
);

export type User = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
};

// Define the schemas for our database tables
export type CartItemDB = {
  id: string;
  user_id: string;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
  created_at?: string;
};
