
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="border-b border-natural-200">
      <div className="container-custom mx-auto py-4 px-4">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-earth-800">
            AgriLia
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "font-medium text-earth-800" : "text-earth-600 hover:text-earth-800"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? "font-medium text-earth-800" : "text-earth-600 hover:text-earth-800"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive ? "font-medium text-earth-800" : "text-earth-600 hover:text-earth-800"
              }
            >
              Categories
            </NavLink>
            <NavLink
              to="/producers"
              className={({ isActive }) =>
                isActive ? "font-medium text-earth-800" : "text-earth-600 hover:text-earth-800"
              }
            >
              Producers
            </NavLink>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                isActive ? "font-medium text-earth-800" : "text-earth-600 hover:text-earth-800"
              }
            >
              Blog
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "font-medium text-earth-800" : "text-earth-600 hover:text-earth-800"
              }
            >
              About
            </NavLink>
          </div>

          {/* Authentication and Cart */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/cart" className="p-2">
              <ShoppingCart className="h-5 w-5 text-earth-700" />
            </Link>
            
            {user ? (
              <>
                <Button asChild variant="ghost">
                  <Link to="/dashboard">Dashboard</Link>
                </Button>
                <Button asChild variant="default" className="bg-natural-500 hover:bg-natural-600">
                  <Link to="/account">My Account</Link>
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="ghost">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild variant="default" className="bg-natural-500 hover:bg-natural-600">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-earth-700" />
              ) : (
                <Menu className="h-6 w-6 text-earth-700" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-white pt-16 px-4 md:hidden">
          <div className="flex flex-col space-y-4">
            <Link
              to="/"
              className="text-xl font-bold text-earth-800 py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-xl text-earth-600 py-2"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/categories"
              className="text-xl text-earth-600 py-2"
              onClick={() => setIsOpen(false)}
            >
              Categories
            </Link>
            <Link
              to="/producers"
              className="text-xl text-earth-600 py-2"
              onClick={() => setIsOpen(false)}
            >
              Producers
            </Link>
            <Link
              to="/blog"
              className="text-xl text-earth-600 py-2"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="text-xl text-earth-600 py-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            
            <div className="pt-4 border-t border-natural-200">
              <Link
                to="/cart"
                className="flex items-center text-xl text-earth-600 py-2"
                onClick={() => setIsOpen(false)}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Cart
              </Link>
              
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="text-xl text-earth-600 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/account"
                    className="text-xl text-earth-600 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    My Account
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-xl text-earth-600 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="text-xl text-earth-600 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
