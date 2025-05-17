
// THIS FILE IS DEPRECATED - Please use the client from @/integrations/supabase/client instead
// It is being kept temporarily for backward compatibility but should not be used for new code
import { supabase } from '@/integrations/supabase/client';

export { supabase };

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
