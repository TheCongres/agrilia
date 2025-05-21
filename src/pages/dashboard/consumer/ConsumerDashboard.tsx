
import { useEffect, useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ConsumerSidebar from "@/components/dashboard/consumer/ConsumerSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Package, Heart, Truck, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const ConsumerDashboard = () => {
  const { user } = useAuth();
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    // This would fetch real data in a production app
    // For now, using mock data
    const mockOrders = [
      {
        id: "ORD-12349",
        date: "2025-05-19",
        status: "Delivered",
        items: 3,
        total: 42.75
      },
      {
        id: "ORD-12350",
        date: "2025-05-15",
        status: "Processing",
        items: 2,
        total: 28.50
      }
    ];
    
    setRecentOrders(mockOrders);
  }, [user?.id]);

  return (
    <DashboardLayout 
      sidebarContent={<ConsumerSidebar />}
      pageTitle="My Dashboard"
    >
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Welcome back{user?.first_name ? `, ${user.first_name}` : ''}!</CardTitle>
            <CardDescription>
              View your recent orders and manage your account
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-sm">
              <p className="mb-2">Here's a quick summary of your account activity:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>You have <span className="font-medium">2 active orders</span> in progress</li>
                <li>There are <span className="font-medium">5 items</span> in your favorites</li>
                <li>Your next delivery is scheduled for <span className="font-medium">May 23, 2025</span></li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link to="/products">Browse More Products</Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Current Order Status</CardTitle>
            <CardDescription>
              Track your most recent order
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="relative">
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Order Placed</p>
                  <p className="text-xs text-muted-foreground">May 19, 2025 at 2:45 PM</p>
                </div>
              </div>
              
              <div className="absolute left-5 top-12 h-12 border-l-2 border-dashed border-muted"></div>
              
              <div className="flex items-center space-x-3 mb-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Processing</p>
                  <p className="text-xs text-muted-foreground">May 20, 2025 at 9:12 AM</p>
                </div>
              </div>
              
              <div className="absolute left-5 top-32 h-12 border-l-2 border-dashed border-muted"></div>
              
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <Calendar className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium">Estimated Delivery</p>
                  <p className="text-xs text-muted-foreground">May 23, 2025</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="w-full">
              Track Order
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            Your order history from the past 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-earth-600">
                  <th className="px-4 py-3 text-left">Order #</th>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Items</th>
                  <th className="px-4 py-3 text-left">Total</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 font-medium">{order.id}</td>
                    <td className="px-4 py-3">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="px-4 py-3">{order.items}</td>
                    <td className="px-4 py-3">${order.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                        order.status === "Delivered" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-amber-100 text-amber-800"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Button variant="link" className="h-auto p-0">View Details</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link to="/dashboard/consumer/orders">View All Orders</Link>
          </Button>
        </CardFooter>
      </Card>
    </DashboardLayout>
  );
};

export default ConsumerDashboard;
