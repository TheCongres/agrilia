
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { 
  SidebarMenu, 
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent
} from "@/components/ui/sidebar";
import { 
  Home, 
  Package, 
  ShoppingCart, 
  Settings, 
  Heart,
  MapPin,
  CreditCard
} from "lucide-react";

const ConsumerSidebar = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Main</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/consumer")}>
                <Link to="/dashboard/consumer">
                  <Home className="mr-2 h-4 w-4" />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/consumer/orders")}>
                <Link to="/dashboard/consumer/orders">
                  <Package className="mr-2 h-4 w-4" />
                  My Orders
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/consumer/favorites")}>
                <Link to="/dashboard/consumer/favorites">
                  <Heart className="mr-2 h-4 w-4" />
                  Favorites
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Account</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/consumer/addresses")}>
                <Link to="/dashboard/consumer/addresses">
                  <MapPin className="mr-2 h-4 w-4" />
                  Addresses
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/consumer/payment")}>
                <Link to="/dashboard/consumer/payment">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Payment Methods
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/consumer/profile")}>
                <Link to="/dashboard/consumer/profile">
                  <Settings className="mr-2 h-4 w-4" />
                  Profile Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
};

export default ConsumerSidebar;
