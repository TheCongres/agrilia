import { useState } from "react";
import { useCart } from "@/context/CartContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

const Checkout = () => {
  const { cartState, cartTotal } = useCart();
  const [currentStep, setCurrentStep] = useState(1);

  // Mock checkout steps for now
  const steps = [
    { id: 1, name: "Shopping Cart" },
    { id: 2, name: "Shipping Information" },
    { id: 3, name: "Payment" },
    { id: 4, name: "Confirmation" },
  ];
  
  // Check if cart is empty
  if (cartState.items.length === 0) {
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
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-earth-700 mb-4">
            Checkout
          </h1>
          
          {/* Checkout Steps */}
          <div className="mb-8">
            <div className="flex items-center">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      step.id === currentStep
                        ? "bg-natural-500 text-white"
                        : step.id < currentStep
                        ? "bg-natural-600 text-white"
                        : "bg-natural-100 text-earth-500"
                    }`}
                  >
                    {step.id}
                  </div>
                  <span
                    className={`ml-2 ${
                      step.id === currentStep
                        ? "font-medium text-earth-700"
                        : "text-earth-500"
                    }`}
                  >
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <ChevronRight className="mx-2 text-earth-400 h-4 w-4" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Cart Review */}
          {currentStep === 1 && (
            <div>
              <h2 className="text-xl font-semibold text-earth-700 mb-4">Review Your Cart</h2>
              <div className="bg-white border border-natural-200 rounded-lg overflow-hidden">
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
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-natural-200">
                    {cartState.items.map((item) => (
                      <tr key={item.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-16 rounded overflow-hidden border border-natural-200">
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-earth-600">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-earth-600">
                          {formatCurrency(item.price * item.quantity)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="px-6 py-4 bg-natural-50 border-t border-natural-200">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-earth-500">
                      Subtotal: <span className="font-semibold text-earth-700">{formatCurrency(cartTotal)}</span>
                    </div>
                    <Button 
                      className="bg-natural-500 hover:bg-natural-600"
                      onClick={() => setCurrentStep(2)}
                    >
                      Continue to Shipping
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Shipping Information - Placeholder for now */}
          {currentStep === 2 && (
            <div>
              <h2 className="text-xl font-semibold text-earth-700 mb-4">Shipping Information</h2>
              <p className="text-earth-500 mb-4">
                Please enter your shipping information. This is just a placeholder for now.
              </p>
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(1)}
                >
                  Back to Cart
                </Button>
                <Button 
                  className="bg-natural-500 hover:bg-natural-600"
                  onClick={() => setCurrentStep(3)}
                >
                  Continue to Payment
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Payment - Placeholder for now */}
          {currentStep === 3 && (
            <div>
              <h2 className="text-xl font-semibold text-earth-700 mb-4">Payment</h2>
              <p className="text-earth-500 mb-4">
                Please enter your payment details. This is just a placeholder for now.
              </p>
              <div className="flex justify-between mt-8">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(2)}
                >
                  Back to Shipping
                </Button>
                <Button 
                  className="bg-natural-500 hover:bg-natural-600"
                  onClick={() => setCurrentStep(4)}
                >
                  Complete Order
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Confirmation - Placeholder for now */}
          {currentStep === 4 && (
            <div>
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-natural-100 text-natural-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-earth-700 mb-2">Order Confirmed!</h2>
                <p className="text-earth-500 mb-6 max-w-md mx-auto">
                  Thank you for your order. We've received your order and will begin processing it soon.
                  You will receive an email confirmation shortly.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild className="bg-natural-500 hover:bg-natural-600">
                    <Link to="/">Return to Home</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/products">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;
