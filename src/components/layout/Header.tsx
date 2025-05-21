
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();
  const { user, signOut } = useAuth();
  
  const handleSignOut = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await signOut();
    } catch (error) {
      console.error("Error in Header during sign out:", error);
    }
  };

  return (
    <header className="bg-white border-b border-natural-200 sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-natural-600 mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path d="M15 1.784a9.958 9.958 0 0 1-4.999 1.328A9.955 9.955 0 0 1 5 1.784V5h10V1.784Z" />
                <path d="M14.5 7h-5A4.5 4.5 0 0 0 5 11.5V18a5 5 0 0 0 10 0v-6.5A4.5 4.5 0 0 0 14.5 7Zm-4.25 6.75a.75.75 0 0 1-1.5 0V11.5a.75.75 0 0 1 1.5 0v2.25Z" />
              </svg>
            </div>
            <span className="font-heading font-bold text-xl text-earth-600">AgriLia</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            <Link to="/products" className="text-earth-600 hover:text-natural-500 font-medium transition-colors">
              All Products
            </Link>
            <Link to="/categories" className="text-earth-600 hover:text-natural-500 font-medium transition-colors">
              Categories
            </Link>
            <Link to="/producers" className="text-earth-600 hover:text-natural-500 font-medium transition-colors">
              Our Producers
            </Link>
            <Link to="/blog" className="text-earth-600 hover:text-natural-500 font-medium transition-colors">
              Blog
            </Link>
            <Link to="/about" className="text-earth-600 hover:text-natural-500 font-medium transition-colors">
              About Us
            </Link>
          </nav>

          {/* Search, Cart, Account */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-9 pr-4 py-2 border border-natural-200 rounded-full bg-natural-50 focus:outline-none focus:ring-1 focus:ring-natural-500 focus:border-natural-500 w-[200px]"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-natural-400" />
            </div>
            <button 
              onClick={() => toggleCart(true)} 
              className="relative text-earth-600 hover:text-natural-500 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-natural-500 text-white text-xs rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 text-earth-600 hover:text-natural-500 transition-colors">
                    <span className="text-sm font-medium">
                      {user.first_name || user.email.split('@')[0]}
                    </span>
                    <User className="h-6 w-6" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="w-full cursor-pointer">
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="w-full cursor-pointer">
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="w-full cursor-pointer">
                      My Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" className="text-earth-600 hover:text-natural-500 transition-colors">
                <User className="h-6 w-6" />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-earth-600 hover:text-natural-500 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-natural-200">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/products" 
                className="text-earth-600 hover:text-natural-500 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                All Products
              </Link>
              <Link 
                to="/categories" 
                className="text-earth-600 hover:text-natural-500 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Categories
              </Link>
              <Link 
                to="/producers" 
                className="text-earth-600 hover:text-natural-500 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Our Producers
              </Link>
              <Link 
                to="/blog" 
                className="text-earth-600 hover:text-natural-500 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/about" 
                className="text-earth-600 hover:text-natural-500 font-medium transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>

              <div className="pt-2 flex flex-col space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-9 pr-4 py-2 border border-natural-200 rounded-full bg-natural-50 focus:outline-none focus:ring-1 focus:ring-natural-500 focus:border-natural-500"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-natural-400" />
                </div>
                <div className="flex flex-col space-y-2">
                  <button 
                    onClick={() => {
                      toggleCart(true);
                      setIsMenuOpen(false);
                    }} 
                    className="flex items-center space-x-2 text-earth-600 hover:text-natural-500 transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    <span>Cart {cartCount > 0 && `(${cartCount})`}</span>
                  </button>
                  
                  {user ? (
                    <>
                      <Link 
                        to="/dashboard" 
                        className="flex items-center space-x-2 text-earth-600 hover:text-natural-500 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-5 w-5" />
                        <span>Dashboard</span>
                      </Link>
                      <Link 
                        to="/account" 
                        className="flex items-center space-x-2 text-earth-600 hover:text-natural-500 transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <User className="h-5 w-5" />
                        <span>My Account</span>
                      </Link>
                      <button 
                        onClick={(e) => {
                          handleSignOut(e);
                          setIsMenuOpen(false);
                        }}
                        className="flex items-center space-x-2 text-earth-600 hover:text-natural-500 transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Sign Out</span>
                      </button>
                    </>
                  ) : (
                    <Link 
                      to="/login" 
                      className="flex items-center space-x-2 text-earth-600 hover:text-natural-500 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-5 w-5" />
                      <span>Sign In</span>
                    </Link>
                  )}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
