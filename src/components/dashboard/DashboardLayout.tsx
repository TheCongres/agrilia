
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

type DashboardLayoutProps = {
  children: ReactNode;
  sidebarContent: ReactNode;
  pageTitle: string;
};

const DashboardLayout = ({ children, sidebarContent, pageTitle }: DashboardLayoutProps) => {
  const { user, loading, signOut } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-natural-600"></div>
      </div>
    );
  }

  // If no user is logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <Sidebar>
          <SidebarHeader className="border-b p-4">
            <h2 className="text-xl font-bold text-earth-700">OrganiMarket</h2>
            <p className="text-sm text-earth-500">
              {user.user_type === 'producer' ? 'Producer Portal' : 'Consumer Dashboard'}
            </p>
          </SidebarHeader>

          <SidebarContent>
            {sidebarContent}
          </SidebarContent>

          <SidebarFooter className="border-t">
            <div className="p-4">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                onClick={signOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>

        <SidebarInset>
          <div className="flex flex-col min-h-screen">
            <div className="border-b p-4 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-earth-700">{pageTitle}</h1>
              </div>
              <SidebarTrigger className="md:hidden" />
              <div className="text-sm text-earth-500 hidden md:block">
                Welcome, {user.first_name || user.email}
              </div>
            </div>
            <div className="flex-1 p-6">
              {children}
            </div>
            <Footer />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
