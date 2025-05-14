
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase, User } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

export function useAuthProvider() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the initial session
    const getSession = async () => {
      setLoading(true);
      const { data } = await supabase.auth.getSession();
      
      setSession(data.session);
      
      if (data.session?.user) {
        const { data: userData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.session.user.id)
          .single();

        setUser({
          id: data.session.user.id,
          email: data.session.user.email || '',
          first_name: userData?.first_name,
          last_name: userData?.last_name,
        });
      }
      
      setLoading(false);
    };

    getSession();

    // Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);

      if (session?.user) {
        const { data: userData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setUser({
          id: session.user.id,
          email: session.user.email || '',
          first_name: userData?.first_name,
          last_name: userData?.last_name,
        });
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }
      
      // Check if we have a profile, if not create one
      if (data.user) {
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();
        
        if (profileError && profileError.code === 'PGRST116') {
          // Profile doesn't exist, create one
          const { email } = data.user;
          await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email,
              first_name: email.split('@')[0], // Default first name
              last_name: '',
            });
        }
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back to OrganiMarket!",
      });
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

      if (data.user) {
        // Create a profile for the new user
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            email,
            first_name: firstName,
            last_name: lastName,
          });
          
        if (profileError) {
          console.error("Error creating user profile:", profileError);
          throw new Error("Failed to create user profile");
        }
      }

      navigate('/login');
      toast({
        title: "Account created successfully",
        description: "Please check your email to confirm your account before logging in.",
      });
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
