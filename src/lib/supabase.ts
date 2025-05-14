
import { createClient } from '@supabase/supabase-js';

// Use environment variables for Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key must be defined! Please set the environment variables.');
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
