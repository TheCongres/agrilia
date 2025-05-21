
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useCart } from '@/context/CartContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Heart, Settings, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const ConsumerDashboard = () => {
  const { user } = useAuth();
  const { cartState } = useCart();
  const navigate = useNavigate();
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  // For demo purposes, we'll show the cart items as "recent orders"
  const hasOrders = cartState.items.length > 0;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-earth-800">
          Welcome back, {user?.first_name || 'Customer'}
        </h1>
        <p className="text-natural-600">
          Manage your orders, favorites, and account settings
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Recent Orders Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Recent Orders</CardTitle>
            <ShoppingBag className="h-5 w-5 text-natural-500" />
          </CardHeader>
          <CardContent>
            <p className="text-natural-600 mb-4">
              View and track your recent product orders
            </p>
            <Separator className="my-2" />
            
            {hasOrders ? (
              <div className="space-y-3 max-h-48 overflow-auto">
                {cartState.items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded overflow-hidden border border-natural-200">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-medium">{item.name}</h5>
                      <p className="text-xs text-natural-500">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-sm font-medium text-earth-700">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-natural-500">
                You have no recent orders
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate('/checkout')} 
              variant="outline" 
              className="w-full text-earth-700"
              disabled={!hasOrders}
            >
              Go to Checkout <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Favorites Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">My Favorites</CardTitle>
            <Heart className="h-5 w-5 text-natural-500" />
          </CardHeader>
          <CardContent>
            <p className="text-natural-600 mb-4">
              Quick access to your favorite products
            </p>
            <Separator className="my-2" />
            
            {/* For demo purposes, showing products from the cart as "favorites" */}
            {hasOrders ? (
              <div className="space-y-3 max-h-48 overflow-auto">
                {cartState.items.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded overflow-hidden border border-natural-200">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-medium">{item.name}</h5>
                      <p className="text-xs text-natural-500">{item.category}</p>
                    </div>
                    <div className="text-sm font-medium text-earth-700">
                      {formatCurrency(item.price)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-natural-500">
                You haven't saved any favorites yet
              </p>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate('/products')} 
              variant="outline" 
              className="w-full text-earth-700"
            >
              Browse Products <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Account Settings Card */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-medium">Account Settings</CardTitle>
            <Settings className="h-5 w-5 text-natural-500" />
          </CardHeader>
          <CardContent>
            <p className="text-natural-600 mb-4">
              Update your profile and preferences
            </p>
            <Separator className="my-2" />
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p className="text-sm">
                <span className="font-medium">Name:</span> {user?.first_name || 'Not set'} {user?.last_name || ''}
              </p>
              <p className="text-sm">
                <span className="font-medium">Account Type:</span> {user?.user_type === 'consumer' ? 'Consumer' : 'Producer'}
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={() => navigate('/dashboard/account')} 
              variant="outline" 
              className="w-full text-earth-700"
            >
              Edit Profile <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Product Recommendations Section */}
      <div className="mt-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-earth-700">Recommended for You</h2>
          <Button 
            variant="link" 
            onClick={() => navigate('/products')}
            className="text-natural-600"
          >
            View All <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, index) => {
            // Get a product from the sample data in cart or use a placeholder
            const product = cartState.items[index % Math.max(1, cartState.items.length)] || {
              name: 'Organic Product',
              image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb',
              price: 320,
              category: 'vegetables'
            };
            
            return (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-36 w-full overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm">{product.name}</h3>
                  <p className="text-xs text-natural-500">{product.category}</p>
                  <p className="text-earth-700 font-semibold mt-1">{formatCurrency(product.price)}</p>
                </CardContent>
                <CardFooter className="p-3 pt-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full text-xs"
                    onClick={() => navigate('/products')}
                  >
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
