import { useCart } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, Minus, Trash } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const Cart = () => {
  const { cartState, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { items } = cartState;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-custom py-16">
          <div className="text-center max-w-lg mx-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-earth-700 mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-earth-500 mb-8">
              Looks like you haven't added any products to your cart yet. Start shopping to
              fill it with the products you love.
            </p>
            <Button asChild className="bg-natural-500 hover:bg-natural-600">
              <Link to="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container-custom py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-earth-700 mb-6">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white border border-natural-200 rounded-lg overflow-hidden mb-6">
              <table className="min-w-full divide-y divide-natural-200">
                <thead className="bg-natural-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-earth-500 uppercase tracking-wider">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-natural-200">
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-20 w-20 rounded overflow-hidden border border-natural-200">
                            <img className="h-full w-full object-cover" src={item.image} alt={item.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-earth-700">{item.name}</div>
                            <div className="text-sm text-earth-500">{item.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-earth-600">
                        {formatCurrency(item.price)}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex border border-natural-200 rounded inline-flex">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2 py-1 text-earth-600 hover:bg-natural-50"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-1 flex items-center justify-center border-x border-natural-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 text-earth-600 hover:bg-natural-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-earth-600">
                        {formatCurrency(item.price * item.quantity)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-earth-400 hover:text-natural-500"
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center">
              <Link to="/products" className="text-natural-600 hover:text-natural-700 font-medium">
                ← Continue Shopping
              </Link>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-natural-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-earth-700 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-earth-600">Subtotal</span>
                  <span className="text-earth-700">{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-earth-600">Shipping</span>
                  <span className="text-earth-700">Calculated at checkout</span>
                </div>
                <div className="border-t border-natural-200 pt-3 mt-3">
                  <div className="flex justify-between font-semibold">
                    <span className="text-earth-600">Estimated Total</span>
                    <span className="text-natural-500">{formatCurrency(cartTotal)}</span>
                  </div>
                </div>
              </div>
              
              <Button
                asChild
                className="w-full bg-natural-500 hover:bg-natural-600"
              >
                <Link to="/checkout">Proceed to Checkout</Link>
              </Button>

              <div className="mt-6 text-sm text-earth-500">
                <p className="flex items-center justify-center gap-1 mb-2">
                  <span>Secure Checkout</span>
                </p>
                <p className="text-center">
                  We accept all major credit cards and PayPal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
