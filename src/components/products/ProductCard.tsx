
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  producer?: {
    id: number;
    name: string;
  };
}

// Image optimization utility
const optimizeImageUrl = (url: string) => {
  if (url.includes('unsplash.com')) {
    const hasParams = url.includes('?');
    return `${url}${hasParams ? '&' : '?'}w=500&q=80&auto=format&fit=crop`;
  }
  return url;
};

export function ProductCard({ id, name, price, image, category, producer }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isProductFavorite, toggleFavorite } = useFavorites();

  const isFavorite = isProductFavorite(id);

  const handleAddToCart = () => {
    addToCart({
      product_id: id,
      name,
      price,
      quantity: 1,
      image,
      category,
    });
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigating to product details
    e.stopPropagation(); // Prevent event bubbling
    
    toggleFavorite({
      product_id: id,
      name,
      price,
      image,
      category,
    });
  };

  // Use the image provided in props, fallback to placeholder if needed
  const imageUrl = image ? optimizeImageUrl(image) : "/placeholder.svg";

  return (
    <Card className="overflow-hidden h-full flex flex-col group">
      <div className="relative">
        <AspectRatio ratio={4/3}>
          <img 
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full"
            loading="lazy"
            onError={(e) => {
              // Fallback if the image fails to load
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </AspectRatio>
        <div className="absolute top-2 right-2 flex gap-2">
          <Badge className="z-10">{category}</Badge>
          <button
            onClick={handleToggleFavorite}
            className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center transition-colors",
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
      </div>
      <CardContent className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1">{name}</h3>
        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="text-green-700 font-bold">{formatCurrency(price)}</span>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" asChild>
              <Link to={`/product/${id}`}>Details</Link>
            </Button>
            <Button size="sm" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </div>
        {producer && (
          <div className="mt-3 text-sm text-gray-500">
            By <Link to={`/producer/${producer.id}`} className="hover:underline text-green-700">{producer.name}</Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
