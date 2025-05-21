
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
  user_type?: 'consumer' | 'producer';
};

export function useAuthProvider() {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;
    
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;
        
        setSession(session);
        
        if (session?.user) {
          // Defer Supabase profile fetch with setTimeout to prevent deadlocks
          setTimeout(async () => {
            if (!mounted) return;
            
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
                user_type: userData.user_type,
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

    // THEN check for existing session - but clear it on first load unless we're in a protected route
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      
      // If we're on the login or signup page and there is a session, don't auto-sign in
      const currentPath = window.location.pathname;
      if ((currentPath === '/login' || currentPath === '/signup') && session) {
        // Don't set user or session data
        setLoading(false);
        return;
      }
      
      setSession(session);
      
      if (session?.user) {
        supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data: userData, error }) => {
            if (!mounted) return;
            
            if (!error && userData) {
              setUser({
                id: session.user.id,
                email: session.user.email || '',
                first_name: userData.first_name,
                last_name: userData.last_name,
                user_type: userData.user_type,
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
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string, requiredUserType?: 'consumer' | 'producer') => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        throw error;
      }
      
      // Fetch the user's profile to check their user type
      const { data: userData, error: profileError } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', data.user.id)
        .single();
        
      if (profileError) {
        console.error("Error fetching user profile:", profileError);
        throw new Error("Could not verify user type");
      }
      
      // Check if the user has the required user type
      if (requiredUserType && userData.user_type !== requiredUserType) {
        // Sign out the user if they don't have the required user type
        await supabase.auth.signOut();
        throw new Error(`Access denied. This account is registered as a ${userData.user_type}. Please select the correct account type.`);
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

  const signUp = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string,
    userType: 'consumer' | 'producer' = 'consumer'
  ) => {
    try {
      console.log("Signing up with user type:", userType);
      
      const { error, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            user_type: userType // Make sure this exactly matches the enum in the database
          }
        }
      });

      if (error) {
        console.error("Signup error:", error);
        throw error;
      }

      toast({
        title: "Account created successfully",
        description: "Please check your email to confirm your account before logging in.",
      });
      
      navigate('/login');
      return data;
    } catch (error: any) {
      console.error("Full signup error:", error);
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
      console.log("Sign out initiated");
      
      // Clear state immediately to improve UX before attempting Supabase signOut
      setUser(null);
      setSession(null);
      
      // Check if we actually have a session before calling signOut
      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        console.log("Active session found, calling Supabase signOut");
        const { error } = await supabase.auth.signOut();
        
        if (error) {
          console.error("Error during Supabase sign out:", error);
          throw error;
        }
        
        console.log("Supabase sign out successful");
      } else {
        console.log("No active session found, skipping Supabase signOut call");
        // We still want to navigate and show success message even if there's no session
      }
      
      navigate('/login');
      toast({
        title: "Logged out successfully",
      });
    } catch (error: any) {
      console.error("Sign out error:", error);
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
