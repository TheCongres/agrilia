
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { v4 as uuidv4 } from "uuid";

export interface FavoriteItem {
  id: string;
  user_id: string;
  product_id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  added_at: string;
}

interface FavoritesState {
  items: FavoriteItem[];
  loading: boolean;
}

type FavoritesAction =
  | { type: "SET_ITEMS"; payload: FavoriteItem[] }
  | { type: "ADD_ITEM"; payload: FavoriteItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "CLEAR_FAVORITES" };

const initialState: FavoritesState = {
  items: [],
  loading: false,
};

// Load favorites from localStorage for guests (non-logged in users)
const loadFavoritesFromStorage = (): FavoritesState => {
  if (typeof window === "undefined") return initialState;

  const storedFavorites = localStorage.getItem("guest_favorites");
  return storedFavorites ? JSON.parse(storedFavorites) : initialState;
};

const favoritesReducer = (state: FavoritesState, action: FavoritesAction): FavoritesState => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "ADD_ITEM": {
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "CLEAR_FAVORITES":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

interface FavoritesContextType {
  favoritesState: FavoritesState;
  addToFavorites: (item: Omit<FavoriteItem, "id" | "user_id" | "added_at">) => Promise<void>;
  removeFromFavorites: (id: string) => Promise<void>;
  clearFavorites: () => Promise<void>;
  isProductFavorite: (productId: number) => boolean;
  toggleFavorite: (item: Omit<FavoriteItem, "id" | "user_id" | "added_at">) => Promise<void>;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favoritesState, dispatch] = useReducer(favoritesReducer, initialState, loadFavoritesFromStorage);

  // Load favorites from Supabase when user logs in
  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
          // Get favorites items from Supabase using a raw SQL query
          // This avoids TypeScript issues until the database types are updated
          const { data, error } = await supabase
            .from('favorites')
            .select('*')
            .eq('user_id', user.id);

          if (error) throw error;

          // Type cast the data as FavoriteItem[] since we know the structure
          const favoriteItems = data as unknown as FavoriteItem[];
          dispatch({ type: "SET_ITEMS", payload: favoriteItems });

          // If there are guest favorites items, migrate them to the user's favorites
          const storedFavorites = localStorage.getItem("guest_favorites");
          if (storedFavorites) {
            const guestFavorites = JSON.parse(storedFavorites);
            if (guestFavorites.items && guestFavorites.items.length > 0) {
              // Add each guest favorite item to the user's favorites in Supabase
              for (const item of guestFavorites.items) {
                // Check if the item already exists in the user's favorites
                const existingItem = favoriteItems.find(i => i.product_id === item.product_id);
                
                if (!existingItem) {
                  // Add new item
                  await supabase
                    .from('favorites')
                    .insert({
                      id: uuidv4(),
                      user_id: user.id,
                      product_id: item.product_id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      category: item.category,
                      added_at: new Date().toISOString()
                    });
                }
              }
              
              // Clear the guest favorites
              localStorage.removeItem("guest_favorites");
              
              // Fetch the updated favorites
              const { data: updatedData } = await supabase
                .from('favorites')
                .select('*');
                
              if (updatedData) {
                // Type cast again
                const updatedItems = updatedData as unknown as FavoriteItem[];
                dispatch({ type: "SET_ITEMS", payload: updatedItems });
              }
            }
          }
        } catch (error) {
          console.error("Error fetching favorites:", error);
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } else {
        // For guest users, load from localStorage
        const storedFavorites = localStorage.getItem("guest_favorites");
        if (storedFavorites) {
          const parsedFavorites = JSON.parse(storedFavorites);
          dispatch({ type: "SET_ITEMS", payload: parsedFavorites.items || [] });
        }
      }
    };

    fetchFavorites();
  }, [user]);

  // Save guest favorites to localStorage when it changes
  useEffect(() => {
    if (!user) {
      localStorage.setItem("guest_favorites", JSON.stringify(favoritesState));
    }
  }, [favoritesState, user]);

  const addToFavorites = async (itemData: Omit<FavoriteItem, "id" | "user_id" | "added_at">) => {
    try {
      const now = new Date().toISOString();
      const newId = uuidv4();

      if (user) {
        // Add to Supabase for logged-in users
        const { error } = await supabase
          .from('favorites')
          .insert({
            id: newId,
            user_id: user.id,
            product_id: itemData.product_id,
            name: itemData.name,
            price: itemData.price,
            image: itemData.image,
            category: itemData.category,
            added_at: now
          });
          
        if (error) throw error;
      }
      
      const item: FavoriteItem = {
        id: newId,
        user_id: user?.id || "guest",
        product_id: itemData.product_id,
        name: itemData.name,
        price: itemData.price,
        image: itemData.image,
        category: itemData.category,
        added_at: now
      };
      
      dispatch({ type: "ADD_ITEM", payload: item });
      
      toast({
        title: "Added to favorites",
        description: `${itemData.name} has been added to your favorites`,
      });
    } catch (error: any) {
      console.error("Error adding item to favorites:", error);
      toast({
        title: "Error adding to favorites",
        description: error.message || "Could not add item to favorites",
        variant: "destructive",
      });
    }
  };

  const removeFromFavorites = async (id: string) => {
    try {
      if (user) {
        // Remove from Supabase for logged-in users
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
      }
      
      dispatch({ type: "REMOVE_ITEM", payload: id });
      toast({
        title: "Removed from favorites",
        description: "Item has been removed from your favorites",
      });
    } catch (error: any) {
      console.error("Error removing item from favorites:", error);
      toast({
        title: "Error removing from favorites",
        description: error.message || "Could not remove item from favorites",
        variant: "destructive",
      });
    }
  };

  const clearFavorites = async () => {
    try {
      if (user) {
        // Clear all items from Supabase
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id);
          
        if (error) throw error;
      }
      
      dispatch({ type: "CLEAR_FAVORITES" });
      
      if (!user) {
        localStorage.removeItem("guest_favorites");
      }
      
      toast({
        title: "Favorites cleared",
        description: "All items have been removed from your favorites",
      });
    } catch (error: any) {
      console.error("Error clearing favorites:", error);
      toast({
        title: "Error clearing favorites",
        description: error.message || "Could not clear favorites",
        variant: "destructive",
      });
    }
  };

  const isProductFavorite = (productId: number) => {
    return favoritesState.items.some(item => item.product_id === productId);
  };

  const toggleFavorite = async (itemData: Omit<FavoriteItem, "id" | "user_id" | "added_at">) => {
    const existingItem = favoritesState.items.find(item => item.product_id === itemData.product_id);
    
    if (existingItem) {
      await removeFromFavorites(existingItem.id);
    } else {
      await addToFavorites(itemData);
    }
  };

  const favoritesCount = favoritesState.items.length;

  return (
    <FavoritesContext.Provider
      value={{
        favoritesState,
        addToFavorites,
        removeFromFavorites,
        clearFavorites,
        isProductFavorite,
        toggleFavorite,
        favoritesCount,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
