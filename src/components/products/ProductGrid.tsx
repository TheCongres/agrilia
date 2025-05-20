
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
    image: "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://plus.unsplash.com/premium_photo-1664273586888-859762c34ce4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://plus.unsplash.com/premium_photo-1677247567623-78a3f4b26bb3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://images.unsplash.com/photo-1635843136867-85eae317a43a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://plus.unsplash.com/premium_photo-1664640733898-d5c3f71f44e1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
    image: "https://images.unsplash.com/photo-1571728608239-fda4ff5c636d?q=80&w=1378&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    producer: "Heritage Orchard",
    organic: true,
    inStock: true,
    rating: 4.4,
    reviewCount: 12
  },
  // New herbs products
  {
    id: 10,
    name: "Fresh Mint Bundle",
    category: "herbs",
    price: 120,
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800",
    producer: "Atlas Herb Garden",
    organic: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 18
  },
  {
    id: 11,
    name: "Organic Basil Pot",
    category: "herbs",
    price: 180,
    image: "https://images.unsplash.com/photo-1627163439134-7a8c47e08208?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    producer: "Green Oasis Farm",
    organic: true,
    inStock: true,
    rating: 4.7,
    reviewCount: 14
  },
  {
    id: 12,
    name: "Wild Thyme",
    category: "herbs",
    price: 150,
    image: "https://images.unsplash.com/photo-1532509774891-141d37f25ae9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    producer: "Mountain Herbs",
    organic: true,
    inStock: true,
    rating: 4.6,
    reviewCount: 11
  },
  // New couscous products
  {
    id: 13,
    name: "Traditional Hand-Rolled Couscous",
    category: "couscous",
    price: 320,
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    producer: "Artisanal Grains",
    organic: true,
    inStock: true,
    rating: 5.0,
    reviewCount: 28
  },
  {
    id: 14,
    name: "Whole Grain Couscous",
    category: "couscous",
    price: 280,
    image: "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    producer: "Sétif Cereals",
    organic: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 15
  },
  {
    id: 15,
    name: "Organic Pearl Couscous",
    category: "couscous",
    price: 350,
    image: "https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    producer: "Sahara Grain Cooperative",
    organic: true,
    inStock: false,
    rating: 4.7,
    reviewCount: 19
  },
  // New meat products
  {
    id: 16,
    name: "Organic Grass-Fed Beef",
    category: "meat",
    price: 850,
    image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    producer: "Sustainable Farms",
    organic: true,
    inStock: true,
    rating: 4.9,
    reviewCount: 31
  },
  {
    id: 17,
    name: "Free-Range Lamb",
    category: "meat",
    price: 980,
    image: "https://images.unsplash.com/photo-1603048592822-5408fa8f754f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    producer: "Highlands Pasture",
    organic: true,
    inStock: true,
    rating: 4.8,
    reviewCount: 22
  },
  {
    id: 18,
    name: "Organic Chicken",
    category: "meat",
    price: 550,
    image: "https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    producer: "Valley Poultry",
    organic: true,
    inStock: true,
    rating: 4.7,
    reviewCount: 19
  }
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
      // Convert filter price range to match the actual price scale
      const minPrice = filters.priceRange[0] * 10; // Scale to match our product prices
      const maxPrice = filters.priceRange[1] * 10;
      
      if (product.price < minPrice || product.price > maxPrice) {
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
