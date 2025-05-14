
import React, { createContext } from 'react';
import { AuthContextType } from '@/types/auth';
import { useAuthProvider } from '@/hooks/useAuthProvider';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export { useAuth } from '@/hooks/useAuth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};
