
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"consumer" | "producer">("consumer");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signIn } = useAuth();

  // Get the return path from location state or default to home
  const from = (location.state as { from?: string })?.from || "/";
  
  // If user is already logged in and not on the login page, redirect to home
  useEffect(() => {
    if (user) {
      // Only redirect if we're coming from a protected route
      if (from !== "/login") {
        navigate("/");
      }
    }
  }, [user, navigate, from]);

  // Clear any existing session when viewing the login page
  useEffect(() => {
    // We'll check if we're actually coming from a protected route
    // If not, let's ensure we're starting fresh on the login page
    if (from === "/login" || from === "/") {
      // Don't actually sign out here as that would trigger a redirect loop
      // Just ensure the auth provider knows we're on the login page
      console.log("On login page, ready for fresh login");
    }
  }, [from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Pass the selected user type to signIn for validation
      await signIn(email, password, userType);
      // Navigation is handled in the signIn function
    } catch (error) {
      // Error toast is handled in the signIn function
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="section-padding">
        <div className="container-custom max-w-md mx-auto">
          <div className="bg-white rounded-lg border border-natural-200 shadow-sm p-6 md:p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-earth-700 mb-2">Welcome Back</h1>
              <p className="text-earth-500">Sign in to your OrganiMarket account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm text-natural-500 hover:text-natural-600">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType" className="block mb-2">Sign in as:</Label>
                <RadioGroup 
                  value={userType} 
                  onValueChange={(value) => setUserType(value as "consumer" | "producer")}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="consumer" id="login-consumer" />
                    <Label htmlFor="login-consumer">Consumer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="producer" id="login-producer" />
                    <Label htmlFor="login-producer">Producer</Label>
                  </div>
                </RadioGroup>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-natural-500 hover:bg-natural-600"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-earth-500 text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-natural-500 hover:text-natural-600 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-natural-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-earth-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button 
                  variant="outline" 
                  type="button" 
                  className="text-earth-700"
                  onClick={() => toast({
                    title: "Coming Soon",
                    description: "Google authentication will be available soon.",
                  })}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.255h5.92c-.26 1.358-1.036 2.512-2.21 3.295v2.73h3.56c2.08-1.92 3.29-4.73 3.29-8.03z" fill="#4285f4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34a853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#fbbc05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#ea4335"/>
                  </svg>
                  Google
                </Button>
                <Button 
                  variant="outline" 
                  type="button" 
                  className="text-earth-700"
                  onClick={() => toast({
                    title: "Coming Soon",
                    description: "Facebook authentication will be available soon.",
                  })}
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
