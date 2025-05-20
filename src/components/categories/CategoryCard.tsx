
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface CategoryProps {
  category: {
    id: string;
    name: string;
    description: string;
    image: string;
    productCount: number;
  };
  onClick: () => void;
}

const CategoryCard = ({ category, onClick }: CategoryProps) => {
  return (
    <Card 
      className="overflow-hidden border border-natural-200 hover:shadow-md transition-all cursor-pointer h-full flex flex-col" 
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <CardContent className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-earth-700 mb-2">{category.name}</h3>
        <p className="text-earth-500 text-sm mb-3 flex-grow">{category.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-natural-600 font-medium">
            {category.productCount} {category.productCount === 1 ? 'product' : 'products'}
          </span>
          <span className="text-natural-500 font-medium text-sm">
            Browse →
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
