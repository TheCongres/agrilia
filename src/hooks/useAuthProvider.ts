
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export type User = {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
};

export function useAuthProvider() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Defer Supabase profile fetch with setTimeout to prevent deadlocks
          setTimeout(async () => {
            const { data: userData, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();

            if (!error && userData) {
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                first_name: userData.first_name,
                last_name: userData.last_name,
              });
            } else {
              console.error("Error fetching user profile:", error);
            }
          }, 0);
        } else {
          setUser(null);
        }
        
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      
      if (session?.user) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: userData, error }) => {
            if (!error && userData) {
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                first_name: userData.first_name,
                last_name: userData.last_name,
              });
            } else {
              console.error("Error fetching user profile:", error);
            }
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back to OrganiMarket!",
      });
      
      navigate('/');
      return data;
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Account created successfully",
        description: "Please check your email to confirm your account before logging in.",
      });
      
      navigate('/login');
      return data;
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message || "There was a problem creating your account.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      setSession(null);
      navigate('/login');
      toast({
        title: "Logged out successfully",
      });
    } catch (error: any) {
      toast({
        title: "Sign out failed",
        description: error.message || "There was a problem signing out.",
        variant: "destructive",
      });
    }
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      setUser({
        ...user,
        ...data,
      });

      toast({
        title: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Update failed",
        description: error.message || "There was a problem updating your profile.",
        variant: "destructive",
      });
      throw error;
    }
  };

  return {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  };
}
