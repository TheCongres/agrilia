import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';
import { Heart, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import { toast } from '@/components/ui/use-toast';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Organic Deglet Nour Dates',
    price: 450,
    unit: 'box',
    image: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    producer: 'Oasis de Biskra',
    category: 'Fruits',
    rating: 4.8,
    reviewCount: 24,
  },
  {
    id: 2,
    name: 'Fresh Spinach Bunch',
    price: 220,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    producer: 'Ferme Verte d\'Alger',
    category: 'Vegetables',
    rating: 4.5,
    reviewCount: 18,
  },
  {
    id: 3,
    name: 'Atlas Mountain Honey',
    price: 850,
    unit: 'jar',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    producer: 'Ruches de l\'Atlas',
    category: 'Honey',
    rating: 5.0,
    reviewCount: 32,
  },
  {
    id: 4,
    name: 'Algerian Strawberries',
    price: 380,
    unit: 'basket',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    producer: 'Jardins de Mitidja',
    category: 'Fruits',
    rating: 4.7,
    reviewCount: 15,
  },
  {
    id: 5,
    name: 'Fresh Farm Milk',
    price: 280,
    unit: 'bottle',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    producer: 'Coopérative Laitière de Médéa',
    category: 'Dairy',
    rating: 4.9,
    reviewCount: 28,
  },
  {
    id: 6,
    name: 'Organic Bell Peppers',
    price: 190,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    producer: 'Fermes du Sahara',
    category: 'Vegetables',
    rating: 4.6,
    reviewCount: 12,
  },
  {
    id: 7,
    name: 'Fresh Mint',
    price: 160,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800',
    producer: 'Herbes de l\'Atlas',
    category: 'Herbs',
    rating: 4.3,
    reviewCount: 9,
  },
  {
    id: 8,
    name: 'Couscous',
    price: 320,
    unit: 'pack',
    image: 'https://plus.unsplash.com/premium_photo-1713089941197-0a4c8b3dfeca?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    producer: 'Céréales de Sétif',
    category: 'Grains',
    rating: 4.4,
    reviewCount: 16,
  },
];

// Image optimization utility
const optimizeImageUrl = (url: string) => {
  if (url.includes('unsplash.com')) {
    const hasParams = url.includes('?');
    return `${url}${hasParams ? '&' : '?'}w=600&q=80&auto=format&fit=crop`;
  }
  return url;
};

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState('all');
  const { isProductFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  
  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => product.category.toLowerCase() === activeTab);

  const handleToggleFavorite = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
    });
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      product_id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      category: product.category,
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    });
  };

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block category-badge mb-3">Featured Products</span>
          <h2 className="text-3xl md:text-4xl font-bold text-earth-700 mb-4">
            Our Best <span className="text-natural-500">Organic Products</span>
          </h2>
          <p className="text-earth-500 max-w-2xl mx-auto">
            Explore our most popular organic products from across Algeria, freshly harvested and carefully selected 
            for their exceptional quality and taste.
          </p>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center mt-8 mb-6 gap-2">
            <button 
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'all' 
                  ? 'bg-natural-500 text-white' 
                  : 'bg-natural-100 text-earth-600 hover:bg-natural-200'
              }`}
            >
              All Products
            </button>
            <button 
              onClick={() => setActiveTab('fruits')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'fruits' 
                  ? 'bg-natural-500 text-white' 
                  : 'bg-natural-100 text-earth-600 hover:bg-natural-200'
              }`}
            >
              Fruits
            </button>
            <button 
              onClick={() => setActiveTab('vegetables')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'vegetables' 
                  ? 'bg-natural-500 text-white' 
                  : 'bg-natural-100 text-earth-600 hover:bg-natural-200'
              }`}
            >
              Vegetables
            </button>
            <button 
              onClick={() => setActiveTab('dairy')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'dairy' 
                  ? 'bg-natural-500 text-white' 
                  : 'bg-natural-100 text-earth-600 hover:bg-natural-200'
              }`}
            >
              Dairy
            </button>
            <button 
              onClick={() => setActiveTab('herbs')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'herbs' 
                  ? 'bg-natural-500 text-white' 
                  : 'bg-natural-100 text-earth-600 hover:bg-natural-200'
              }`}
            >
              Herbs
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const isFavorite = isProductFavorite(product.id);
            
            return (
              <Link 
                key={product.id} 
                to={`/product/${product.id}`}
                className="card-organic group"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={optimizeImageUrl(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <span className="organic-badge">Organic</span>
                  
                  {/* Favorite button */}
                  <button
                    onClick={(e) => handleToggleFavorite(e, product)}
                    className={cn(
                      "absolute top-3 right-3 h-8 w-8 rounded-full flex items-center justify-center transition-colors z-10",
                      isFavorite 
                        ? "bg-red-50 text-red-500 hover:bg-red-100" 
                        : "bg-white/80 text-gray-400 hover:bg-gray-100"
                    )}
                  >
                    <Heart 
                      className={cn(
                        "h-4 w-4 transition-all", 
                        isFavorite && "fill-red-500"
                      )} 
                    />
                  </button>
                </div>
                <div className="p-4">
                  <div className="text-xs text-natural-600 mb-1">{product.producer}</div>
                  <h3 className="font-medium text-earth-700 mb-1 group-hover:text-natural-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center mb-2">
                    <div className="flex text-honey">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "text-honey" : "text-gray-300"}`}
                          fill="currentColor" 
                          viewBox="0 0 20 20" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-earth-500 ml-1">({product.reviewCount})</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-earth-700 font-semibold">{formatCurrency(product.price)} <span className="text-xs text-earth-500 font-normal">/ {product.unit}</span></div>
                    <button 
                      className="w-8 h-8 rounded-full bg-natural-100 hover:bg-natural-500 hover:text-white flex items-center justify-center transition-colors"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      <ShoppingBag className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-10">
          <Link to="/products" className="btn-primary inline-block">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
