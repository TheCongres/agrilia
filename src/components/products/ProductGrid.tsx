
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useProducts, type ProductFilters } from "@/hooks/useProducts";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductGridProps {
  filters?: ProductFilters;
  limit?: number;
  featured?: boolean;
}

const ProductGrid = ({ filters = {}, limit, featured }: ProductGridProps) => {
  const { data: products, isLoading, error } = useProducts(filters);
  const [displayProducts, setDisplayProducts] = useState<any[]>([]);

  useEffect(() => {
    if (products) {
      let filtered = [...products];
      
      if (featured) {
        // For featured products, we could show those with highest ratings
        filtered = filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      }
      
      if (limit) {
        filtered = filtered.slice(0, limit);
      }
      
      setDisplayProducts(filtered);
    }
  }, [products, limit, featured]);

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-earth-500">
          Error loading products. Please try again later.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array(8).fill(0).map((_, index) => (
          <div key={index} className="card-organic">
            <Skeleton className="aspect-[3/4] w-full" />
            <div className="p-4 space-y-2">
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {displayProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-earth-500 text-lg">
            No products found matching your criteria. Please try different filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
