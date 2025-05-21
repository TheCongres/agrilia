
import React, { useEffect } from 'react';
import { useFavorites } from '@/context/FavoritesContext';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { Link } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const FavoritesPage = () => {
  const { favoritesState, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();
  
  const { items: favorites, loading } = favoritesState;
  
  const handleAddToCart = (item: any) => {
    addToCart({
      product_id: item.product_id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      category: item.category,
    });
    
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-earth-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-earth-800">My Favorites</h1>
        
        {favorites.length > 0 && (
          <Button 
            variant="outline" 
            size="sm"
            className="text-natural-600 hover:text-red-600 hover:border-red-200"
            onClick={() => clearFavorites()}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        )}
      </div>
      
      <p className="text-natural-600">
        Products you've saved to your favorites list. Add items to your favorites while browsing to keep track of products you're interested in.
      </p>
      
      <Separator />
      
      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 mx-auto text-natural-300 mb-4" />
          <h3 className="text-xl font-medium text-earth-700 mb-2">Your favorites list is empty</h3>
          <p className="text-natural-600 mb-6">
            Save your favorite products to easily find them later.
          </p>
          <Button asChild>
            <Link to="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favorites.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="h-48 w-full overflow-hidden relative group">
                <Link to={`/product/${item.product_id}`}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute top-2 right-2 h-8 w-8 bg-white/80 text-natural-600 hover:bg-red-50 hover:text-red-500 border-none"
                  onClick={() => removeFromFavorites(item.id)}
                >
                  <Heart className="h-4 w-4 fill-red-500" />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <Link 
                  to={`/product/${item.product_id}`} 
                  className="block hover:text-earth-600 transition-colors"
                >
                  <h3 className="font-medium text-lg mb-1 line-clamp-2">{item.name}</h3>
                </Link>
                <p className="text-xs text-natural-500 mb-2 capitalize">{item.category}</p>
                <div className="flex items-center justify-between mt-3">
                  <p className="font-semibold text-earth-700">{formatCurrency(item.price)}</p>
                  <Button 
                    size="sm" 
                    className="h-8"
                    onClick={() => handleAddToCart(item)}
                  >
                    <ShoppingCart className="h-3 w-3 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="px-4 py-3 pt-0">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-earth-600 hover:text-earth-800" 
                  asChild
                >
                  <Link to={`/product/${item.product_id}`}>
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
