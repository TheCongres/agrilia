
import { createClient } from '@supabase/supabase-js';

// For development purposes only - replace with your actual Supabase URL and anon key
// In production, use environment variables (import.meta.env.VITE_SUPABASE_URL)
const supabaseUrl = 'https://your-supabase-project-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key:', supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key must be defined!');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
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
