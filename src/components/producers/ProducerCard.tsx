
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProducerCardProps {
  producer: {
    id: number;
    name: string;
    location: string;
    image: string;
    description: string;
    productsCount: number;
    featured: boolean;
    specialties: string[];
  };
}

const ProducerCard = ({ producer }: ProducerCardProps) => {
  return (
    <Card className="overflow-hidden border border-natural-200 hover:shadow-md transition-all h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={producer.image} 
          alt={producer.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {producer.featured && (
          <span className="absolute top-2 left-2 bg-earth-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            Featured Producer
          </span>
        )}
      </div>
      <CardContent className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-earth-700">{producer.name}</h3>
          <span className="text-xs text-earth-500">{producer.location}</span>
        </div>
        
        <p className="text-earth-500 text-sm mb-3">{producer.description}</p>
        
        <div className="mb-4">
          <h4 className="text-xs uppercase tracking-wider text-earth-500 mb-2">Specialties:</h4>
          <div className="flex flex-wrap gap-1">
            {producer.specialties.map((specialty, index) => (
              <span 
                key={index} 
                className="bg-natural-100 text-earth-600 text-xs px-2 py-1 rounded-full"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-sm text-earth-500">
            {producer.productsCount} products
          </span>
          <Link to={`/products?producer=${producer.id}`}>
            <Button 
              variant="outline"
              size="sm"
              className="text-natural-500 border-natural-500 hover:bg-natural-50"
            >
              View Products
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProducerCard;
