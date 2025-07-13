import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/hooks/useAuth";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userType, setUserType] = useState<"consumer" | "producer">("consumer");
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { user, signUp } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to home but not if they just signed up
  useEffect(() => {
    // Only redirect if they were already logged in before visiting signup page
    const alreadyLoggedIn = sessionStorage.getItem('visiting_signup');
    if (user && !alreadyLoggedIn) {
      navigate("/");
    }
  }, [user, navigate]);
  
  // Mark that we're on the signup page
  useEffect(() => {
    sessionStorage.setItem('visiting_signup', 'true');
    return () => {
      sessionStorage.removeItem('visiting_signup');
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }
    
    if (!agreeTerms) {
      toast({
        title: "Terms agreement required",
        description: "Please agree to the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      console.log("Form submitted with user type:", userType);
      
      await signUp(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
        userType
      );
      // Navigation and success toast are handled in the signUp function
    } catch (error) {
      // Error toast is handled in the signUp function
      console.error("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="section-padding">
        <div className="container-custom max-w-lg mx-auto">
          <div className="bg-white rounded-lg border border-natural-200 shadow-sm p-6 md:p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold text-earth-700 mb-2">Create Your Account</h1>
              <p className="text-earth-500">Join Agrilia to order fresh products</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Your first name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Your last name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  minLength={8}
                  required
                />
                <p className="text-xs text-earth-500">
                  Password must be at least 8 characters long
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="userType" className="block mb-2">I am registering as a:</Label>
                <RadioGroup 
                  value={userType} 
                  onValueChange={(value) => setUserType(value as "consumer" | "producer")}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-gray-50">
                    <RadioGroupItem value="consumer" id="consumer" />
                    <Label htmlFor="consumer" className="cursor-pointer flex-1">
                      <span className="font-medium">Consumer</span>
                      <p className="text-sm text-earth-500">I want to buy organic products</p>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 rounded-md border border-gray-200 hover:bg-gray-50">
                    <RadioGroupItem value="producer" id="producer" />
                    <Label htmlFor="producer" className="cursor-pointer flex-1">
                      <span className="font-medium">Producer</span>
                      <p className="text-sm text-earth-500">I want to sell my organic products</p>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2 mt-4">
                <Checkbox 
                  id="terms" 
                  checked={agreeTerms} 
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} 
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-earth-500 leading-none cursor-pointer"
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-natural-500 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-natural-500 hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-natural-500 hover:bg-natural-600"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-earth-500 text-sm">
                  Already have an account?{" "}
                  <Link to="/login" className="text-natural-500 hover:text-natural-600 font-medium">
                    Sign in
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
                  <span className="px-2 bg-white text-earth-500">Or sign up with</span>
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

export default SignUp;
