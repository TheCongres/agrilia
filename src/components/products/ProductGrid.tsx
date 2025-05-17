
import { ProductCard } from "./ProductCard";
import { useState, useEffect } from "react";

interface ProductGridProps {
  filters?: {
    categories: string[];
    priceRange: number[];
    organic: boolean;
    inStock: boolean;
  };
}

const productsData = [
  {
    id: 1,
    name: "Organic Heirloom Tomatoes",
    category: "vegetables",
    price: 230,
    image: "https://images.unsplash.com/photo-1592924357228-becb1ab0fc8a?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    producer: "Green Valley Farm",
    organic: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 24
  },
  {
    id: 2,
    name: "Fresh Organic Spinach",
    category: "vegetables",
    price: 175,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    producer: "Riverside Organics",
    organic: true,
    inStock: true,
    rating: 4.5,
    reviewCount: 18
  },
  {
    id: 3,
    name: "Organic Strawberries",
    category: "fruits",
    price: 380,
    image: "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    producer: "Berry Good Farm",
    organic: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 32
  },
  {
    id: 4,
    name: "Grass-Fed Whole Milk",
    category: "dairy",
    price: 290,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    producer: "Sunshine Dairy Co-op",
    organic: true,
    inStock: true,
    rating: 4.7,
    reviewCount: 21
  },
  {
    id: 5,
    name: "Raw Local Honey",
    category: "honey",
    price: 850,
    image: "https://images.unsplash.com/photo-1558642891-54be180ea339?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    producer: "Wild Honey Apiaries",
    organic: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 45
  },
  {
    id: 6,
    name: "Organic Free-Range Eggs",
    category: "dairy",
    price: 420,
    image: "https://images.unsplash.com/photo-1598965402089-897d69e6dcc6?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    producer: "Coastal Meadows",
    organic: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 29
  },
  {
    id: 7,
    name: "Organic Avocados",
    category: "fruits",
    price: 320,
    image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    producer: "Green Valley Farm",
    organic: true,
    inStock: false,
    rating: 4.6,
    reviewCount: 17
  },
  {
    id: 8,
    name: "Artisan Sourdough Bread",
    category: "bakery",
    price: 520,
    image: "https://images.unsplash.com/photo-1585478259715-4d3f6b307842?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    producer: "Earth First Grains",
    organic: true,
    inStock: true,
    rating: 4.7,
    reviewCount: 14
  },
  {
    id: 9,
    name: "Heritage Apples",
    category: "fruits",
    price: 190,
    image: "https://images.unsplash.com/photo-1567306226408-c302e9a70609?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    producer: "Heritage Orchard",
    organic: true,
    inStock: true,
    rating: 4.4,
    reviewCount: 12
  },
];

const ProductGrid = ({ filters }: ProductGridProps) => {
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  useEffect(() => {
    if (!filters) {
      setFilteredProducts(productsData);
      return;
    }

    const filtered = productsData.filter(product => {
      // Filter by categories
      if (filters.categories && filters.categories.length > 0) {
        if (!filters.categories.includes(product.category)) {
          return false;
        }
      }
      
      // Filter by price range
      if (filters.priceRange && (product.price < filters.priceRange[0] || product.price > filters.priceRange[1])) {
        return false;
      }
      
      // Filter by organic
      if (filters.organic && !product.organic) {
        return false;
      }
      
      // Filter by in stock
      if (filters.inStock && !product.inStock) {
        return false;
      }
      
      return true;
    });
    
    setFilteredProducts(filtered);
  }, [filters]);

  return (
    <div>
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-earth-600 mb-2">No products found</h3>
          <p className="text-earth-500">Try adjusting your filters to find what you're looking for.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <ProductCard 
              key={product.id} 
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              category={product.category}
              producer={product.producer ? {
                id: 1, // Using a default ID since the sample data doesn't have producer IDs
                name: product.producer
              } : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
