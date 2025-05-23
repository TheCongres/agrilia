
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Heart, Package, Home, Settings } from 'lucide-react';
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

const ConsumerSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path);

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
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Home">
                  <NavLink to="/dashboard/consumer" end className={getNavClass('/dashboard/consumer')}>
                    <Home className="mr-2 h-5 w-5" />
                    {!collapsed && <span>Dashboard</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Orders">
                  <NavLink to="/dashboard/orders" className={getNavClass('/dashboard/orders')}>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {!collapsed && <span>My Orders</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Account">
                  <NavLink to="/dashboard/account" className={getNavClass('/dashboard/account')}>
                    <User className="mr-2 h-5 w-5" />
                    {!collapsed && <span>My Account</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Favorites">
                  <NavLink to="/dashboard/favorites" className={getNavClass('/dashboard/favorites')}>
                    <Heart className="mr-2 h-5 w-5" />
                    {!collapsed && <span>Favorites</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Addresses">
                  <NavLink to="/dashboard/addresses" className={getNavClass('/dashboard/addresses')}>
                    <Package className="mr-2 h-5 w-5" />
                    {!collapsed && <span>My Addresses</span>}
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

export default ConsumerSidebar;
