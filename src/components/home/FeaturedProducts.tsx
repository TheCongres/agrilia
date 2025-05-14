
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Sample product data
const products = [
  {
    id: 1,
    name: 'Organic Avocado',
    price: 3.99,
    unit: 'piece',
    image: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    producer: 'Green Valley Farm',
    category: 'Fruits',
    rating: 4.8,
    reviewCount: 24,
  },
  {
    id: 2,
    name: 'Fresh Spinach Bunch',
    price: 2.49,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    producer: 'Hillside Gardens',
    category: 'Vegetables',
    rating: 4.5,
    reviewCount: 18,
  },
  {
    id: 3,
    name: 'Raw Honey',
    price: 8.99,
    unit: 'jar',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    producer: 'Bee Happy Apiaries',
    category: 'Honey',
    rating: 5.0,
    reviewCount: 32,
  },
  {
    id: 4,
    name: 'Organic Strawberries',
    price: 4.99,
    unit: 'basket',
    image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    producer: 'Sunrise Berries',
    category: 'Fruits',
    rating: 4.7,
    reviewCount: 15,
  },
  {
    id: 5,
    name: 'Fresh Farm Milk',
    price: 3.49,
    unit: 'bottle',
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    producer: 'Happy Cow Dairy',
    category: 'Dairy',
    rating: 4.9,
    reviewCount: 28,
  },
  {
    id: 6,
    name: 'Organic Bell Peppers',
    price: 1.99,
    unit: 'each',
    image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    producer: 'Sunny Fields',
    category: 'Vegetables',
    rating: 4.6,
    reviewCount: 12,
  },
  {
    id: 7,
    name: 'Fresh Basil',
    price: 1.99,
    unit: 'bunch',
    image: 'https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    producer: 'Herbal Haven',
    category: 'Herbs',
    rating: 4.3,
    reviewCount: 9,
  },
  {
    id: 8,
    name: 'Quinoa',
    price: 5.99,
    unit: 'pack',
    image: 'https://images.unsplash.com/photo-1612258272175-91b8e70a8529?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    producer: 'Wholesome Grains',
    category: 'Grains',
    rating: 4.4,
    reviewCount: 16,
  },
];

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(product => product.category.toLowerCase() === activeTab);

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block category-badge mb-3">Featured Products</span>
          <h2 className="text-3xl md:text-4xl font-bold text-earth-700 mb-4">
            Our Best <span className="text-natural-500">Organic Products</span>
          </h2>
          <p className="text-earth-500 max-w-2xl mx-auto">
            Explore our most popular organic products, freshly harvested and carefully selected 
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
          {filteredProducts.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`}
              className="card-organic group"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="organic-badge">Organic</span>
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
                  <div className="text-earth-700 font-semibold">${product.price.toFixed(2)} <span className="text-xs text-earth-500 font-normal">/ {product.unit}</span></div>
                  <button className="w-8 h-8 rounded-full bg-natural-100 hover:bg-natural-500 hover:text-white flex items-center justify-center transition-colors">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </Link>
          ))}
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
