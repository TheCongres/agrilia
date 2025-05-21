
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ConsumerDashboard = () => {
  const { user } = useAuth();
  
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
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-natural-600 mb-4">
              View and track your recent product orders
            </p>
            <Separator className="my-2" />
            <p className="text-sm text-natural-500">
              You have no recent orders
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">My Favorites</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-natural-600 mb-4">
              Quick access to your favorite products
            </p>
            <Separator className="my-2" />
            <p className="text-sm text-natural-500">
              You haven't saved any favorites yet
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Account Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-natural-600 mb-4">
              Update your profile and preferences
            </p>
            <Separator className="my-2" />
            <div className="space-y-1">
              <p className="text-sm">
                <span className="font-medium">Email:</span> {user?.email}
              </p>
              <p className="text-sm">
                <span className="font-medium">Name:</span> {user?.first_name || 'Not set'} {user?.last_name || ''}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsumerDashboard;
