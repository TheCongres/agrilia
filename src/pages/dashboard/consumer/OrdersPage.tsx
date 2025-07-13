import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const OrdersPage = () => {
  const { user } = useAuth();
  
  // Mock orders data - in a real app this would come from an API
  const [orders] = useState([
    {
      id: "ORD-12345",
      date: "2025-01-15",
      total: 4800.50,
      status: "Delivered",
      items: 6
    },
    {
      id: "ORD-12346",
      date: "2025-02-20",
      total: 2300.25,
      status: "Processing",
      items: 3
    },
    {
      id: "ORD-12347",
      date: "2025-03-05",
      total: 7500.00,
      status: "Shipped",
      items: 9
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-earth-700">My Orders</h1>
        <p className="text-earth-500">Track and manage your order history</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length > 0 ? (
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
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-muted/50">
                      <td className="px-4 py-3 font-medium">{order.id}</td>
                      <td className="px-4 py-3">{new Date(order.date).toLocaleDateString()}</td>
                      <td className="px-4 py-3">{order.items}</td>
                      <td className="px-4 py-3">{order.total.toLocaleString('fr-DZ')} DZD</td>
                      <td className="px-4 py-3">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          order.status === "Delivered" 
                            ? "bg-green-100 text-green-800" 
                            : order.status === "Shipped" 
                            ? "bg-blue-100 text-blue-800" 
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
          ) : (
            <div className="text-center py-8">
              <p className="text-earth-500 mb-4">You don't have any orders yet.</p>
              <Button asChild>
                <a href="/products">Start Shopping</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrdersPage;