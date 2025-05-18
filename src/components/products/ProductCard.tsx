
import { Link } from "react-router-dom";
import { formatCurrency } from "@/lib/utils";
import { Product } from "@/hooks/useProducts";
import { ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Get the first image or use a placeholder
  const imageUrl = 
    product.images && product.images.length > 0 
      ? product.images[0]
      : "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800";

  // Get producer name if available
  const producerName = product.producers ? (product.producers as any).name : "";

  return (
    <Link 
      to={`/product/${product.slug}`}
      className="card-organic group"
    >
      <div className="aspect-[3/4] relative overflow-hidden">
        <img
          src={imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {product.is_organic && (
          <span className="organic-badge">Organic</span>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs text-natural-600 mb-1">{producerName}</div>
        <h3 className="font-medium text-earth-700 mb-1 group-hover:text-natural-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center mb-2">
          <div className="flex text-honey">
            {[...Array(5)].map((_, i) => (
              <svg 
                key={i} 
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 0) ? "text-honey" : "text-gray-300"}`}
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
              </svg>
            ))}
          </div>
          <span className="text-xs text-earth-500 ml-1">({product.review_count || 0})</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-earth-700 font-semibold">
            {formatCurrency(product.price)} 
            <span className="text-xs text-earth-500 font-normal">/ {product.unit}</span>
          </div>
          <button className="w-8 h-8 rounded-full bg-natural-100 hover:bg-natural-500 hover:text-white flex items-center justify-center transition-colors">
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
