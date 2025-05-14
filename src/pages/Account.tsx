
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { User, Settings, Package, MapPin, CreditCard, LogOut } from "lucide-react";

const Account = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  
  // Mock user data - in a real app this would come from a context or API
  const userData = {
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    phone: "(555) 123-4567",
    addresses: [
      {
        id: 1,
        type: "Home",
        street: "123 Organic Way",
        city: "Greenville",
        state: "CA",
        zipCode: "90210",
        isDefault: true
      },
      {
        id: 2,
        type: "Work",
        street: "456 Natural Blvd",
        city: "Ecotown",
        state: "CA",
        zipCode: "92382",
        isDefault: false
      }
    ],
    paymentMethods: [
      {
        id: 1,
        cardType: "Visa",
        lastFour: "4242",
        expiryDate: "04/25",
        isDefault: true
      },
      {
        id: 2,
        cardType: "Mastercard",
        lastFour: "8765",
        expiryDate: "12/24",
        isDefault: false
      }
    ],
    orders: [
      {
        id: "ORD-12345",
        date: "2025-01-15",
        total: 78.50,
        status: "Delivered",
        items: 6
      },
      {
        id: "ORD-12346",
        date: "2025-02-20",
        total: 43.25,
        status: "Processing",
        items: 3
      },
      {
        id: "ORD-12347",
        date: "2025-03-05",
        total: 125.00,
        status: "Shipped",
        items: 9
      }
    ]
  };

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved.",
    });
  };

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  const handleAddAddress = () => {
    toast({
      title: "Feature coming soon",
      description: "Address management will be available soon.",
    });
  };

  const handleAddPayment = () => {
    toast({
      title: "Feature coming soon",
      description: "Payment method management will be available soon.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-custom py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-earth-700">My Account</h1>
          <p className="text-earth-500">Manage your profile, orders, and preferences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <aside className="space-y-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant={activeTab === "profile" ? "default" : "ghost"} 
                    className="justify-start" 
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button 
                    variant={activeTab === "orders" ? "default" : "ghost"} 
                    className="justify-start"
                    onClick={() => setActiveTab("orders")}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </Button>
                  <Button 
                    variant={activeTab === "addresses" ? "default" : "ghost"} 
                    className="justify-start"
                    onClick={() => setActiveTab("addresses")}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Addresses
                  </Button>
                  <Button 
                    variant={activeTab === "payment" ? "default" : "ghost"} 
                    className="justify-start"
                    onClick={() => setActiveTab("payment")}
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Payment Methods
                  </Button>
                  <Button 
                    variant={activeTab === "settings" ? "default" : "ghost"} 
                    className="justify-start"
                    onClick={() => setActiveTab("settings")}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Separator className="my-2" />
                  <Button 
                    variant="ghost" 
                    className="justify-start text-destructive hover:text-destructive/90 hover:bg-destructive/10"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content Area */}
          <div className="space-y-6">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Update your personal details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue={userData.firstName} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue={userData.lastName} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={userData.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue={userData.phone} />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </CardFooter>
              </Card>
            )}

            {/* Orders Tab */}
            {activeTab === "orders" && (
              <Card>
                <CardHeader>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>
                    View and track your recent orders
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
                        {userData.orders.map((order) => (
                          <tr key={order.id} className="hover:bg-muted/50">
                            <td className="px-4 py-3 font-medium">{order.id}</td>
                            <td className="px-4 py-3">{new Date(order.date).toLocaleDateString()}</td>
                            <td className="px-4 py-3">{order.items}</td>
                            <td className="px-4 py-3">${order.total.toFixed(2)}</td>
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
                </CardContent>
              </Card>
            )}

            {/* Addresses Tab */}
            {activeTab === "addresses" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-earth-700">Your Addresses</h2>
                  <Button onClick={handleAddAddress}>Add New Address</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userData.addresses.map((address) => (
                    <Card key={address.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">{address.type}</CardTitle>
                            {address.isDefault && (
                              <span className="text-xs bg-natural-100 text-natural-800 px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            {!address.isDefault && (
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">
                                Delete
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-earth-600">
                          <p>{address.street}</p>
                          <p>{address.city}, {address.state} {address.zipCode}</p>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        {!address.isDefault && (
                          <Button variant="outline" size="sm">Set as Default</Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === "payment" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-earth-700">Payment Methods</h2>
                  <Button onClick={handleAddPayment}>Add Payment Method</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userData.paymentMethods.map((payment) => (
                    <Card key={payment.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-base">
                              {payment.cardType} ending in {payment.lastFour}
                            </CardTitle>
                            {payment.isDefault && (
                              <span className="text-xs bg-natural-100 text-natural-800 px-2 py-1 rounded-full">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            {!payment.isDefault && (
                              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10">
                                Remove
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-earth-600">Expires: {payment.expiryDate}</p>
                      </CardContent>
                      <CardFooter className="pt-0">
                        {!payment.isDefault && (
                          <Button variant="outline" size="sm">Set as Default</Button>
                        )}
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your account preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="font-medium text-earth-700">Email Notifications</h3>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="marketing-emails" className="flex-1">Marketing emails</Label>
                        <input
                          type="checkbox"
                          id="marketing-emails"
                          className="toggle toggle-primary"
                          defaultChecked
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="order-updates" className="flex-1">Order updates</Label>
                        <input
                          type="checkbox"
                          id="order-updates"
                          className="toggle toggle-primary"
                          defaultChecked
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="new-products" className="flex-1">New product announcements</Label>
                        <input
                          type="checkbox"
                          id="new-products"
                          className="toggle toggle-primary"
                          defaultChecked
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium text-earth-700">Privacy Settings</h3>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="data-collection" className="flex-1">Analytics data collection</Label>
                        <input
                          type="checkbox"
                          id="data-collection"
                          className="toggle toggle-primary"
                          defaultChecked
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="personalized-ads" className="flex-1">Show personalized recommendations</Label>
                        <input
                          type="checkbox"
                          id="personalized-ads"
                          className="toggle toggle-primary"
                          defaultChecked
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-medium text-earth-700">Security</h3>
                      <Button variant="outline">Change Password</Button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Preferences</Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
