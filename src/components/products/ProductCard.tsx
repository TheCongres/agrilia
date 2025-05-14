
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    producer: string;
    organic: boolean;
    inStock: boolean;
    rating: number;
    reviewCount: number;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!product.inStock) return;
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category,
    });
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="overflow-hidden border border-natural-200 hover:shadow-md transition-all cursor-pointer h-full flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.organic && (
            <span className="organic-badge">Organic</span>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-gray-900/50 flex items-center justify-center">
              <p className="text-white font-semibold py-1 px-3 bg-earth-600 rounded-md">Out of Stock</p>
            </div>
          )}
        </div>
        <CardContent className="p-5 flex flex-col flex-grow">
          <span className="category-badge inline-block mb-2">{product.category}</span>
          <h3 className="text-lg font-semibold text-earth-700 mb-1">{product.name}</h3>
          <p className="text-earth-500 text-sm mb-2">by {product.producer}</p>
          
          <div className="flex items-center mb-3">
            <span className="flex items-center text-honey">
              <Star className="h-4 w-4 fill-current mr-1" />
              <span className="font-medium">{product.rating}</span>
            </span>
            <span className="text-earth-500 text-xs ml-2">({product.reviewCount} reviews)</span>
          </div>
          
          <div className="mt-auto pt-3 flex items-center justify-between">
            <span className="text-lg font-semibold text-earth-700">${product.price.toFixed(2)}</span>
            <Button 
              size="sm"
              className="bg-natural-500 hover:bg-natural-600"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
