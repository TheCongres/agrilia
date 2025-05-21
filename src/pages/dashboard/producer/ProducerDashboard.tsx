
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProducerSidebar from "@/components/dashboard/producer/ProducerSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Package, ShoppingCart, TrendingUp, Users } from "lucide-react";

const ProducerDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    revenue: 0,
  });

  useEffect(() => {
    // This would be replaced with real data fetching in a production app
    // For now, we're using mock data
    const fetchStats = async () => {
      // In a real app, you would fetch this data from your Supabase tables
      setStats({
        totalProducts: 24,
        totalOrders: 168,
        totalCustomers: 53,
        revenue: 4850.75,
      });
    };

    fetchStats();
  }, [user?.id]);

  return (
    <DashboardLayout 
      sidebarContent={<ProducerSidebar />}
      pageTitle="Producer Dashboard"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              +2 added this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              +12 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              +5 new customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.revenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              +18.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Your most recent orders requiring fulfillment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-5 text-xs text-earth-500 font-medium">
                <div>Order ID</div>
                <div>Customer</div>
                <div>Date</div>
                <div>Products</div>
                <div>Total</div>
              </div>
              <div className="grid grid-cols-5 text-sm border-t pt-4">
                <div className="font-medium">ORD-7652</div>
                <div>Sarah Johnson</div>
                <div>May 20, 2025</div>
                <div>3 items</div>
                <div>$48.75</div>
              </div>
              <div className="grid grid-cols-5 text-sm border-t pt-4">
                <div className="font-medium">ORD-7651</div>
                <div>Michael Chen</div>
                <div>May 19, 2025</div>
                <div>2 items</div>
                <div>$32.50</div>
              </div>
              <div className="grid grid-cols-5 text-sm border-t pt-4">
                <div className="font-medium">ORD-7650</div>
                <div>Amy Smith</div>
                <div>May 19, 2025</div>
                <div>5 items</div>
                <div>$73.25</div>
              </div>
              <div className="grid grid-cols-5 text-sm border-t pt-4">
                <div className="font-medium">ORD-7649</div>
                <div>David Rodriguez</div>
                <div>May 18, 2025</div>
                <div>1 item</div>
                <div>$12.99</div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
            <CardDescription>
              Your best-selling products this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <div className="font-medium">Organic Apples</div>
                  <div className="text-xs text-earth-500">1kg bag</div>
                </div>
                <div className="text-sm font-medium">256 sold</div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <div className="font-medium">Fresh Carrots</div>
                  <div className="text-xs text-earth-500">500g bunch</div>
                </div>
                <div className="text-sm font-medium">189 sold</div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <div className="font-medium">Organic Lettuce</div>
                  <div className="text-xs text-earth-500">Each</div>
                </div>
                <div className="text-sm font-medium">142 sold</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Tomatoes</div>
                  <div className="text-xs text-earth-500">500g</div>
                </div>
                <div className="text-sm font-medium">98 sold</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default ProducerDashboard;
