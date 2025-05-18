
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface ProducerCardProps {
  producer: {
    id: string;
    name: string;
    location: string | null;
    image_url: string | null;
    description: string | null;
    is_verified: boolean;
    specialties?: string[]; // This would be from a join query in a real app
    products_count?: number; // This would be from a count query in a real app
  };
}

const ProducerCard = ({ producer }: ProducerCardProps) => {
  // Default image if none provided
  const imageUrl = producer.image_url || "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500";
  
  // Default specialties and count for demo purposes
  // In a real app, these would come from the database
  const specialties = producer.specialties || ["Organic Produce", "Local Farming"];
  const productsCount = producer.products_count || 10;

  return (
    <Card className="overflow-hidden border border-natural-200 hover:shadow-md transition-all h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={producer.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        {producer.is_verified && (
          <span className="absolute top-2 left-2 bg-earth-500 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            Verified Producer
          </span>
        )}
      </div>
      <CardContent className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-earth-700">{producer.name}</h3>
          <span className="text-xs text-earth-500">{producer.location || "Location unknown"}</span>
        </div>
        
        <p className="text-earth-500 text-sm mb-3">
          {producer.description || "This producer hasn't added a description yet."}
        </p>
        
        <div className="mb-4">
          <h4 className="text-xs uppercase tracking-wider text-earth-500 mb-2">Specialties:</h4>
          <div className="flex flex-wrap gap-1">
            {specialties.map((specialty, index) => (
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
            {productsCount} products
          </span>
          <div className="flex gap-2">
            <Link to={`/producer/${producer.id}`}>
              <Button 
                variant="outline"
                size="sm"
                className="text-natural-500 border-natural-500 hover:bg-natural-50"
              >
                View Profile
              </Button>
            </Link>
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
        </div>
      </CardContent>
    </Card>
  );
};

export default ProducerCard;
