
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { User } from './useAuthProvider';
import { Session } from '@supabase/supabase-js';

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (email: string, password: string, userType?: 'consumer' | 'producer') => Promise<any>;
  signUp: (email: string, password: string, firstName: string, lastName: string, userType?: 'consumer' | 'producer') => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
