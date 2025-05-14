
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";

const CartDrawer = () => {
  const { cartState, removeFromCart, updateQuantity, toggleCart, cartTotal } = useCart();
  const { items, isOpen } = cartState;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => toggleCart(false)}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-natural-200">
            <h2 className="text-xl font-semibold text-earth-700 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Your Cart
            </h2>
            <button
              onClick={() => toggleCart(false)}
              className="text-earth-500 hover:text-natural-500 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-grow overflow-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <ShoppingBag className="h-16 w-16 text-natural-300 mb-4" />
                <h3 className="text-lg font-medium text-earth-600 mb-2">Your cart is empty</h3>
                <p className="text-earth-500 mb-6">
                  Looks like you haven't added any items to your cart yet.
                </p>
                <Button 
                  className="bg-natural-500 hover:bg-natural-600"
                  onClick={() => toggleCart(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <ul className="space-y-4">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 border-b border-natural-100 pb-4">
                    <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border border-natural-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium text-earth-700">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-earth-400 hover:text-natural-500"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-sm text-earth-500 mb-2 block">
                        {item.category}
                      </span>
                      <div className="flex items-center justify-between">
                        <div className="flex border border-natural-200 rounded">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-earth-600 hover:bg-natural-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-3 py-1 flex items-center justify-center border-x border-natural-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-earth-600 hover:bg-natural-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="font-semibold text-earth-700">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-natural-200 p-4 bg-natural-50">
              <div className="flex justify-between mb-4">
                <span className="text-earth-600">Subtotal</span>
                <span className="font-semibold text-earth-700">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <div className="space-y-2">
                <Button 
                  className="w-full bg-natural-500 hover:bg-natural-600"
                  onClick={() => toggleCart(false)}
                  asChild
                >
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => toggleCart(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
