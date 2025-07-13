
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Producers from "./pages/Producers";
import ProducerDetail from "./pages/ProducerDetail";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProductDetail from "./pages/ProductDetail";

import Orders from "./pages/Orders";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/NotFound";
import CartDrawer from "./components/cart/CartDrawer";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import ConsumerDashboard from "./pages/dashboard/consumer/ConsumerDashboard";
import ProducerDashboard from "./pages/dashboard/producer/ProducerDashboard";
import OrdersPage from "./pages/dashboard/consumer/OrdersPage";
import AccountPage from "./pages/dashboard/consumer/AccountPage";
import FavoritesPage from "./pages/dashboard/consumer/FavoritesPage";
import ScrollToTop from "./components/common/ScrollToTop";
import BackToTopButton from "./components/common/BackToTopButton";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AuthProvider>
            <CartProvider>
              <FavoritesProvider>
              <Toaster />
              <Sonner />
              <CartDrawer />
              <BackToTopButton />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/products" element={<Products />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/producers" element={<Producers />} />
                <Route path="/producer/:id" element={<ProducerDetail />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />
                
                {/* Dashboard Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Dashboard />} />
                  <Route path="consumer" element={<ConsumerDashboard />} />
                  <Route path="producer" element={<ProducerDashboard />} />
                  <Route path="orders" element={<OrdersPage />} />
                  <Route path="account" element={<AccountPage />} />
                  <Route path="favorites" element={<FavoritesPage />} />
                  <Route path="products" element={<NotFound />} />
                  <Route path="products/new" element={<NotFound />} />
                  <Route path="analytics" element={<NotFound />} />
                  <Route path="inventory" element={<NotFound />} />
                  <Route path="shipping" element={<NotFound />} />
                  <Route path="reports" element={<NotFound />} />
                  <Route path="notifications" element={<NotFound />} /> 
                  <Route path="settings" element={<NotFound />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
