
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

export interface AuthContextType {
  user: {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
  } | null;
  session: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<any>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<{ first_name: string; last_name: string; email: string }>) => Promise<void>;
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
