
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'fruits',
    name: 'Fruits',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    count: 32,
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    count: 45,
  },
  {
    id: 'dairy',
    name: 'Dairy',
    image: 'https://images.unsplash.com/photo-1588083402307-ad42a3870779?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    count: 18,
  },
  {
    id: 'herbs',
    name: 'Herbs',
    image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    count: 24,
  },
  {
    id: 'couscous',
    name: 'Couscous & Grains',
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    count: 15,
  },
  {
    id: 'meat',
    name: 'Meat',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    count: 12,
  },
];

const Categories = () => {
  return (
    <section className="py-16 bg-cream">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block category-badge mb-3">Browse Categories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-earth-700 mb-4">
            Explore Our Algerian <span className="text-natural-500">Categories</span>
          </h2>
          <p className="text-earth-500 max-w-2xl mx-auto">
            Discover our wide range of certified organic products across multiple categories. 
            All sourced from local farms and producers across Algeria committed to sustainable practices.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/products?category=${category.id}`}
              className="card-organic group"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-earth-700/30 group-hover:bg-earth-700/10 transition-colors duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-4">
                  <h3 className="text-white font-medium text-lg">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.count} Products</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/categories" className="btn-secondary inline-block">
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;
