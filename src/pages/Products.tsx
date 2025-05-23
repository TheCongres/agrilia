
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get('category');

  const [activeFilters, setActiveFilters] = useState({
    categories: categoryFromUrl ? [categoryFromUrl] : [],
    priceRange: [0, 100],
    organic: false,
    inStock: false
  });

  // Update filters when URL parameters change
  useEffect(() => {
    if (categoryFromUrl) {
      setActiveFilters(prev => ({
        ...prev,
        categories: [categoryFromUrl]
      }));
    }
  }, [categoryFromUrl]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container-custom py-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-earth-700 mb-4">
              {categoryFromUrl ? (
                <>
                  <span className="text-natural-500">{categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1)}</span> Products
                </>
              ) : (
                <>
                  All <span className="text-natural-500">Products</span>
                </>
              )}
            </h1>
            <p className="text-earth-500 max-w-2xl mx-auto">
              Browse our selection of fresh organic produce, dairy, and more. 
              All sourced from local farms and delivered fresh to your doorstep.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <ProductFilters 
                filters={activeFilters} 
                onChange={setActiveFilters} 
              />
            </aside>
            <div className="flex-grow">
              <ProductGrid filters={activeFilters} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Products;
