
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent 
} from '@/components/ui/chart';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  Tooltip,
  TooltipProps
} from 'recharts';

// Sample data for the charts
const salesData = [
  { name: 'Jan', sales: 400 },
  { name: 'Feb', sales: 300 },
  { name: 'Mar', sales: 600 },
  { name: 'Apr', sales: 800 },
  { name: 'May', sales: 700 },
  { name: 'Jun', sales: 900 },
  { name: 'Jul', sales: 750 },
];

const ProducerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    todaySales: 287.00,
    weekSales: 1252.00,
    monthSales: 2293.00, 
    yearSales: 24215.00
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [popularProducts, setPopularProducts] = useState([]);
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // In a real implementation, these would be actual queries to the database
        // For now, we'll simulate the data
        
        // Fetch products count
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('id')
          .eq('producer_id', user?.id);
          
        if (productsError) throw productsError;
        
        // Simulate order count and revenue
        // In a real app, you would fetch this from an orders table
        const orderCount = Math.floor(Math.random() * 20);
        const revenue = Math.floor(Math.random() * 5000);
        const customerVisits = Math.floor(Math.random() * 100) + 30;
        
        // Simulate recent orders
        const simulatedOrders = [];
        for (let i = 0; i < 5; i++) {
          if (Math.random() > 0.5 && productsData && productsData.length > 0) {
            const randomProductIndex = Math.floor(Math.random() * productsData.length);
            simulatedOrders.push({
              id: `order-${Date.now()}-${i}`,
              date: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString(),
              customer: `Customer ${i + 1}`,
              product: `Product ${randomProductIndex + 1}`,
              amount: Math.floor(Math.random() * 100) + 10,
              status: ['Delivered', 'Shipped', 'Processing'][Math.floor(Math.random() * 3)]
            });
          }
        }
        setRecentOrders(simulatedOrders);
        
        // Get popular products (if any)
        if (productsData && productsData.length > 0) {
          const { data: products, error } = await supabase
            .from('products')
            .select('*')
            .eq('producer_id', user?.id)
            .order('review_count', { ascending: false })
            .limit(5);
            
          if (error) throw error;
          setPopularProducts(products || []);
        }
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast({
          title: "Failed to load dashboard data",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (user?.id) {
      fetchDashboardData();
    }
  }, [user, toast]);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'text-green-600';
      case 'Shipped': return 'text-blue-600';
      case 'Processing': return 'text-amber-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-semibold text-earth-800">
          Producer Dashboard
        </h1>
        <p className="text-natural-600">
          Welcome back, {user?.first_name || 'Producer'}! Manage your products, orders and view analytics.
        </p>
      </div>

      {/* Sales Chart Area */}
      <Card className="bg-natural-50 border-natural-200">
        <CardContent className="p-6">
          <div className="h-[200px] w-full">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-earth-600"></div>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={salesData}>
                  <defs>
                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38804c" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#38804c" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#718096" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#718096" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-2 border border-gray-200 rounded shadow-md">
                            <p className="text-sm font-medium">
                              {`${payload[0].payload.name}: ${formatCurrency(payload[0].value as number)}`}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#38804c" 
                    fillOpacity={1} 
                    fill="url(#colorSales)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Sales Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-natural-100 hover:shadow-sm transition-shadow">
          <CardContent className="p-4">
            <div className="text-earth-600 font-medium mb-1">Today</div>
            <div className="text-xl md:text-2xl font-bold text-natural-800 truncate">
              {loading ? '...' : formatCurrency(stats.todaySales)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-natural-100 hover:shadow-sm transition-shadow">
          <CardContent className="p-4">
            <div className="text-earth-600 font-medium mb-1">This Week</div>
            <div className="text-xl md:text-2xl font-bold text-natural-800 truncate">
              {loading ? '...' : formatCurrency(stats.weekSales)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-natural-100 hover:shadow-sm transition-shadow">
          <CardContent className="p-4">
            <div className="text-earth-600 font-medium mb-1">This Month</div>
            <div className="text-xl md:text-2xl font-bold text-natural-800 truncate">
              {loading ? '...' : formatCurrency(stats.monthSales)}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-natural-100 hover:shadow-sm transition-shadow">
          <CardContent className="p-4">
            <div className="text-earth-600 font-medium mb-1">This Year</div>
            <div className="text-xl md:text-2xl font-bold text-natural-800 truncate">
              {loading ? '...' : formatCurrency(stats.yearSales)}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* View Detailed Analytics Button */}
      <Card className="border-natural-100">
        <CardContent className="p-4">
          <Button variant="outline" asChild className="w-full flex items-center justify-between">
            <Link to="/dashboard/analytics">
              View Detailed Analytics <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center p-6">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-earth-600"></div>
              </div>
            ) : recentOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{formatCurrency(order.amount)}</TableCell>
                        <TableCell className={getStatusColor(order.status)}>{order.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-natural-500">
                <p>No recent orders found</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" asChild className="w-full flex items-center justify-between">
              <Link to="/dashboard/orders">
                View All Orders <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Popular Products</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex items-center justify-center p-6">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-earth-600"></div>
              </div>
            ) : popularProducts.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Stock</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {popularProducts.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{formatCurrency(product.price)}</TableCell>
                        <TableCell>★ {product.rating || '0'}</TableCell>
                        <TableCell>{product.stock_quantity || 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-natural-500">
                <p>No product data available</p>
                <p className="text-sm mt-2">Add your first product to get started</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" asChild className="w-full flex items-center justify-between">
              <Link to="/dashboard/products">
                Manage Products <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProducerDashboard;
