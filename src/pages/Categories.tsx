
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategoryCard from "@/components/categories/CategoryCard";
import { useNavigate } from "react-router-dom";

const categoriesData = [
  {
    id: 'fruits',
    name: 'Fruits',
    description: 'Fresh organic fruits from local Algerian orchards',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500',
    productCount: 24
  },
  {
    id: 'vegetables',
    name: 'Vegetables',
    description: 'Seasonal vegetables grown without pesticides in the fertile lands of Algeria',
    image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500',
    productCount: 36
  },
  {
    id: 'dairy',
    name: 'Dairy & Eggs',
    description: 'Free-range eggs and organic dairy products from Algerian farms',
    image: 'https://images.unsplash.com/photo-1588083402307-ad42a3870779?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    productCount: 18
  },
  {
    id: 'bakery',
    name: 'Bakery',
    description: 'Traditional Algerian baked goods using organic local flour',
    image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500',
    productCount: 12
  },
  {
    id: 'honey',
    name: 'Honey & Preserves',
    description: 'Local Algerian honey and homemade preserves',
    image: 'https://plus.unsplash.com/premium_photo-1722013256877-9ab0a780d25c?q=80&w=1432&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    productCount: 9
  },
  {
    id: 'meat',
    name: 'Meat & Poultry',
    description: 'Ethically raised, organic meat products from Algerian farms',
    image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500',
    productCount: 15
  },
  {
    id: 'herbs',
    name: 'Herbs & Spices',
    description: 'Traditional Algerian herbs and spices grown with care in our rich soil',
    image: 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500',
    productCount: 24
  },
  {
    id: 'couscous',
    name: 'Couscous & Grains',
    description: 'Authentic Algerian grains, including traditional hand-rolled couscous',
    image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=1466&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    productCount: 15
  },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container-custom py-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-earth-700 mb-4">
              Product <span className="text-natural-500">Categories</span>
            </h1>
            <p className="text-earth-500 max-w-2xl mx-auto">
              Browse our products by category to find exactly what you're looking for. 
              All our products are organic and sourced from trusted local farms across Algeria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoriesData.map((category) => (
              <CategoryCard 
                key={category.id}
                category={category}
                onClick={() => handleCategoryClick(category.id)}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Categories;
