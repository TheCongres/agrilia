
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Package, ChartBar, Users, ArrowRight, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';

const ProducerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    orderCount: 0,
    productCount: 0,
    revenue: 0,
    customerVisits: 0
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
        
        setStats({
          orderCount,
          productCount: productsData?.length || 0,
          revenue,
          customerVisits
        });
        
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
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-earth-800">
          Producer Dashboard
        </h1>
        <p className="text-natural-600">
          Welcome back, {user?.first_name || 'Producer'}! Manage your products, orders and view analytics.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-natural-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.orderCount}</div>
            <p className="text-xs text-natural-500">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Active Products</CardTitle>
            <Package className="h-4 w-4 text-natural-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.productCount}</div>
            <p className="text-xs text-natural-500">
              +{Math.floor(Math.random() * 5)} new this month
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <ChartBar className="h-4 w-4 text-natural-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : formatCurrency(stats.revenue)}</div>
            <p className="text-xs text-natural-500">
              +8% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Customer Visits</CardTitle>
            <Users className="h-4 w-4 text-natural-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '...' : stats.customerVisits}</div>
            <p className="text-xs text-natural-500">
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      
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
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <Button asChild className="w-full">
                <Link to="/dashboard/products/new">Add New Product</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/dashboard/analytics">View Analytics</Link>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <Link to="/dashboard/settings">Update Settings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="sales">
              <TabsList className="mb-4">
                <TabsTrigger value="sales">Sales</TabsTrigger>
                <TabsTrigger value="traffic">Traffic</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
              </TabsList>
              
              <TabsContent value="sales" className="space-y-4">
                <div className="h-[200px] bg-natural-100 rounded-md flex items-center justify-center">
                  <p className="text-natural-500">Sales chart will appear here</p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-natural-500">Today</div>
                      <div className="text-2xl font-bold">{formatCurrency(Math.floor(Math.random() * 500))}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-natural-500">This Week</div>
                      <div className="text-2xl font-bold">{formatCurrency(Math.floor(Math.random() * 2000) + 500)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-natural-500">This Month</div>
                      <div className="text-2xl font-bold">{formatCurrency(Math.floor(Math.random() * 4000) + 2000)}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-natural-500">This Year</div>
                      <div className="text-2xl font-bold">{formatCurrency(Math.floor(Math.random() * 20000) + 10000)}</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="traffic" className="space-y-4">
                <div className="h-[200px] bg-natural-100 rounded-md flex items-center justify-center">
                  <p className="text-natural-500">Traffic chart will appear here</p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-natural-500">Views</div>
                      <div className="text-2xl font-bold">{Math.floor(Math.random() * 1000) + 500}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-natural-500">Unique</div>
                      <div className="text-2xl font-bold">{Math.floor(Math.random() * 500) + 200}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-natural-500">Bounce Rate</div>
                      <div className="text-2xl font-bold">{Math.floor(Math.random() * 40) + 20}%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-natural-500">Avg. Time</div>
                      <div className="text-2xl font-bold">{Math.floor(Math.random() * 2) + 1}m {Math.floor(Math.random() * 50) + 10}s</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="customers" className="space-y-4">
                <div className="h-[200px] bg-natural-100 rounded-md flex items-center justify-center">
                  <p className="text-natural-500">Customer demographics chart will appear here</p>
                </div>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-natural-500">New</div>
                      <div className="text-2xl font-bold">{Math.floor(Math.random() * 50) + 10}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-natural-500">Returning</div>
                      <div className="text-2xl font-bold">{Math.floor(Math.random() * 100) + 50}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-natural-500">Conversion</div>
                      <div className="text-2xl font-bold">{Math.floor(Math.random() * 10) + 5}%</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="text-sm font-medium text-natural-500">Loyalty</div>
                      <div className="text-2xl font-bold">{Math.floor(Math.random() * 30) + 70}%</div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button variant="outline" asChild className="w-full flex items-center justify-between">
              <Link to="/dashboard/analytics">
                View Detailed Analytics <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProducerDashboard;
