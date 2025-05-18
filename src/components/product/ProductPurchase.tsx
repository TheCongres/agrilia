
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";

interface ProductPurchaseProps {
  product: {
    id: number;
    name: string;
    price: number;
    stock: number;
    category: string;
    images: string[];
  };
}

const ProductPurchase = ({ product }: ProductPurchaseProps) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      category: product.category,
    });
  };

  return (
    <div className="mb-6 py-4 border-y border-natural-200">
      <div className="flex items-center justify-between mb-4">
        <div className="text-2xl font-bold text-earth-700">
          {formatCurrency(product.price)} <span className="text-sm font-normal text-earth-500">/ each</span>
        </div>
        <div className="text-sm text-earth-500">
          {product.stock > 10 ? (
            <span className="text-natural-600">In Stock</span>
          ) : product.stock > 0 ? (
            <span className="text-honey">Low Stock ({product.stock} left)</span>
          ) : (
            <span className="text-red-500">Out of Stock</span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex border border-natural-300 rounded-md">
          <button
            onClick={decrementQuantity}
            className="px-3 py-2 text-earth-700 hover:bg-natural-50"
            disabled={quantity <= 1}
          >
            -
          </button>
          <div className="w-12 flex items-center justify-center">
            {quantity}
          </div>
          <button
            onClick={incrementQuantity}
            className="px-3 py-2 text-earth-700 hover:bg-natural-50"
            disabled={quantity >= product.stock}
          >
            +
          </button>
        </div>
        <Button 
          className="bg-natural-500 hover:bg-natural-600 flex-grow"
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default ProductPurchase;
