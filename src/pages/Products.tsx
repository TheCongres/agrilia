
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCategories } from "@/hooks/useProducts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import ProductFilters from "@/components/products/ProductFilters";
import { seedDatabase, checkDatabaseContent } from "@/utils/seedDatabase";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/useAuth";

const Products = () => {
  const [searchParams] = useSearchParams();
  const { data: categories } = useCategories();
  const { user } = useAuth();
  const [showSeedButton, setShowSeedButton] = useState(false);
  
  const [activeFilters, setActiveFilters] = useState({
    categories: [],
    priceRange: [0, 100],
    organic: false,
    inStock: false,
    producerId: searchParams.get('producer') || undefined,
    search: searchParams.get('search') || undefined
  });

  // Check if database needs seeding
  useEffect(() => {
    const checkContent = async () => {
      const { isEmpty } = await checkDatabaseContent();
      setShowSeedButton(isEmpty);
    };
    
    checkContent();
  }, []);

  const handleSeedDatabase = async () => {
    try {
      await seedDatabase();
      toast({
        title: "Database seeded successfully",
        description: "Sample products, categories, and producers have been added.",
      });
      setShowSeedButton(false);
      // Reload the page to show the new data
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error seeding database",
        description: "There was a problem adding sample data.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container-custom py-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-earth-700 mb-4">
              All <span className="text-natural-500">Products</span>
            </h1>
            <p className="text-earth-500 max-w-2xl mx-auto">
              Browse our selection of fresh organic produce, dairy, and more. 
              All sourced from local farms and delivered fresh to your doorstep.
            </p>
            
            {/* Database seed button - only shown to authenticated users if database is empty */}
            {showSeedButton && user && (
              <Button 
                onClick={handleSeedDatabase} 
                className="mt-4 bg-natural-500 hover:bg-natural-600"
              >
                Add Sample Products
              </Button>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="w-full lg:w-64 flex-shrink-0">
              <ProductFilters 
                filters={activeFilters} 
                onChange={setActiveFilters} 
                categories={categories || []}
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
