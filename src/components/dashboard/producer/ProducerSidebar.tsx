
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  User, 
  Package, 
  Settings,
  ChartBar,
  FileText,
  Tag,
  Truck,
  Bell
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

const ProducerSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path);
  const isGroupExpanded = [
    '/dashboard', 
    '/dashboard/products', 
    '/dashboard/orders', 
    '/dashboard/analytics',
    '/dashboard/account',
    '/dashboard/settings',
    '/dashboard/inventory',
    '/dashboard/notifications',
    '/dashboard/reports',
    '/dashboard/shipping'
  ].some(path => isActive(path));

  const getNavClass = (path: string) => {
    return isActive(path)
      ? "bg-earth-50 text-earth-800 font-medium"
      : "hover:bg-natural-100 text-natural-700";
  };

  return (
    <Sidebar
      className={collapsed ? "w-14" : "w-64"}
      collapsible="icon" 
      variant="sidebar"
    >
      <SidebarTrigger className="m-2 self-end text-earth-600" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Overview">
                  <NavLink to="/dashboard" end className={getNavClass('/dashboard')}>
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    {!collapsed && <span>Overview</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Products">
                  <NavLink to="/dashboard/products" className={getNavClass('/dashboard/products')}>
                    <Package className="mr-2 h-5 w-5" />
                    {!collapsed && <span>Products</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Orders">
                  <NavLink to="/dashboard/orders" className={getNavClass('/dashboard/orders')}>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {!collapsed && <span>Orders</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Inventory">
                  <NavLink to="/dashboard/inventory" className={getNavClass('/dashboard/inventory')}>
                    <Tag className="mr-2 h-5 w-5" />
                    {!collapsed && <span>Inventory</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Shipping">
                  <NavLink to="/dashboard/shipping" className={getNavClass('/dashboard/shipping')}>
                    <Truck className="mr-2 h-5 w-5" />
                    {!collapsed && <span>Shipping</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Analytics">
                  <NavLink to="/dashboard/analytics" className={getNavClass('/dashboard/analytics')}>
                    <ChartBar className="mr-2 h-5 w-5" />
                    {!collapsed && <span>Analytics</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Reports">
                  <NavLink to="/dashboard/reports" className={getNavClass('/dashboard/reports')}>
                    <FileText className="mr-2 h-5 w-5" />
                    {!collapsed && <span>Reports</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Notifications">
                  <NavLink to="/dashboard/notifications" className={getNavClass('/dashboard/notifications')}>
                    <Bell className="mr-2 h-5 w-5" />
                    {!collapsed && <span>Notifications</span>}
                  </NavLink>
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
                <SidebarMenuButton asChild tooltip="Account">
                  <NavLink to="/dashboard/account" className={getNavClass('/dashboard/account')}>
                    <User className="mr-2 h-5 w-5" />
                    {!collapsed && <span>Account</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <NavLink to="/dashboard/settings" className={getNavClass('/dashboard/settings')}>
                    <Settings className="mr-2 h-5 w-5" />
                    {!collapsed && <span>Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default ProducerSidebar;
