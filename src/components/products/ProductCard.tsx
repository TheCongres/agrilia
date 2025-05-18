
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";

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

export function ProductCard({ id, name, price, image, category, producer }: ProductCardProps) {
  const { addToCart } = useCart();

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

  // Always use the tomato image
  const imageUrl = "https://images.unsplash.com/photo-1592924357228-becb1ab0fc8a?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500";

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative">
        <AspectRatio ratio={4/3}>
          <img 
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => {
              // Fallback if the image fails to load
              (e.target as HTMLImageElement).src = "/placeholder.svg";
            }}
          />
        </AspectRatio>
        <Badge className="absolute top-2 right-2">{category}</Badge>
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
