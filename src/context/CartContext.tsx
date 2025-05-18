
import React, { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { v4 as uuidv4 } from "uuid";

export interface CartItem {
  id: string;
  product_id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  loading: boolean;
}

type CartAction =
  | { type: "SET_ITEMS"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "TOGGLE_CART"; payload?: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  items: [],
  isOpen: false,
  loading: false,
};

// Load cart from localStorage for guests (non-logged in users)
const loadCartFromStorage = (): CartState => {
  if (typeof window === "undefined") return initialState;

  const storedCart = localStorage.getItem("guest_cart");
  return storedCart ? JSON.parse(storedCart) : initialState;
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem) {
        // Update quantity if item already exists
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      } else {
        // Add new item
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "TOGGLE_CART":
      return {
        ...state,
        isOpen: action.payload !== undefined ? action.payload : !state.isOpen,
      };
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "CLEAR_CART":
      return {
        ...state,
        items: [],
      };
    default:
      return state;
  }
};

interface CartContextType {
  cartState: CartState;
  addToCart: (item: Omit<CartItem, "id"> & { product_id: number }) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  toggleCart: (open?: boolean) => void;
  clearCart: () => Promise<void>;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [cartState, dispatch] = useReducer(cartReducer, initialState, loadCartFromStorage);

  // Load cart from Supabase when user logs in
  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        dispatch({ type: "SET_LOADING", payload: true });
        try {
          // Get cart items from Supabase
          const { data, error } = await supabase
            .from('cart_items')
            .select('*')
            .eq('user_id', user.id);

          if (error) throw error;

          const cartItems = data.map(item => ({
            id: item.id,
            product_id: item.product_id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            category: item.category,
          }));

          dispatch({ type: "SET_ITEMS", payload: cartItems });

          // If there are guest cart items, migrate them to the user's cart
          const storedCart = localStorage.getItem("guest_cart");
          if (storedCart) {
            const guestCart = JSON.parse(storedCart);
            if (guestCart.items && guestCart.items.length > 0) {
              // Add each guest cart item to the user's cart in Supabase
              for (const item of guestCart.items) {
                // Check if the item already exists in the user's cart
                const existingItem = cartItems.find(i => i.product_id === item.product_id);
                
                if (existingItem) {
                  // Update quantity if item exists
                  await supabase
                    .from('cart_items')
                    .update({ 
                      quantity: existingItem.quantity + item.quantity 
                    })
                    .eq('id', existingItem.id);
                } else {
                  // Add new item
                  await supabase
                    .from('cart_items')
                    .insert({
                      id: uuidv4(),
                      user_id: user.id,
                      product_id: item.product_id,
                      name: item.name,
                      price: item.price,
                      quantity: item.quantity,
                      image: item.image,
                      category: item.category,
                    });
                }
              }
              
              // Clear the guest cart
              localStorage.removeItem("guest_cart");
              
              // Fetch the updated cart
              const { data: updatedData } = await supabase
                .from('cart_items')
                .select('*')
                .eq('user_id', user.id);
                
              if (updatedData) {
                const updatedCartItems = updatedData.map(item => ({
                  id: item.id,
                  product_id: item.product_id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image,
                  category: item.category,
                }));
                
                dispatch({ type: "SET_ITEMS", payload: updatedCartItems });
              }
            }
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
        } finally {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      } else {
        // For guest users, load from localStorage
        const storedCart = localStorage.getItem("guest_cart");
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          dispatch({ type: "SET_ITEMS", payload: parsedCart.items || [] });
        }
      }
    };

    fetchCart();
  }, [user]);

  // Save guest cart to localStorage when it changes
  useEffect(() => {
    if (!user) {
      localStorage.setItem("guest_cart", JSON.stringify(cartState));
    }
  }, [cartState, user]);

  const addToCart = async (itemData: Omit<CartItem, "id"> & { product_id: number }) => {
    const item: CartItem = {
      ...itemData,
      id: uuidv4(),
    };
    
    try {
      if (user) {
        // Add to Supabase for logged-in users
        const existingItemIndex = cartState.items.findIndex(i => i.product_id === item.product_id);
        
        if (existingItemIndex > -1) {
          // Update quantity if item exists
          const existingItem = cartState.items[existingItemIndex];
          const newQuantity = existingItem.quantity + item.quantity;
          
          const { error } = await supabase
            .from('cart_items')
            .update({ quantity: newQuantity })
            .eq('id', existingItem.id);
            
          if (error) throw error;
          
          dispatch({ 
            type: "UPDATE_QUANTITY", 
            payload: { 
              id: existingItem.id, 
              quantity: newQuantity 
            } 
          });
        } else {
          // Add new item
          const { error } = await supabase
            .from('cart_items')
            .insert({
              id: item.id,
              user_id: user.id,
              product_id: item.product_id,
              name: item.name,
              price: item.price,
              quantity: item.quantity,
              image: item.image,
              category: item.category,
            });
            
          if (error) throw error;
          
          dispatch({ type: "ADD_ITEM", payload: item });
        }
      } else {
        // Add to local state for guests
        dispatch({ type: "ADD_ITEM", payload: item });
      }
      
      toast({
        title: "Added to cart",
        description: `${item.name} has been added to your cart`,
      });
    } catch (error: any) {
      console.error("Error adding item to cart:", error);
      toast({
        title: "Error adding to cart",
        description: error.message || "Could not add item to cart",
        variant: "destructive",
      });
    }
  };

  const removeFromCart = async (id: string) => {
    try {
      if (user) {
        // Remove from Supabase for logged-in users
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
      }
      
      dispatch({ type: "REMOVE_ITEM", payload: id });
    } catch (error: any) {
      console.error("Error removing item from cart:", error);
      toast({
        title: "Error removing from cart",
        description: error.message || "Could not remove item from cart",
        variant: "destructive",
      });
    }
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    try {
      if (user) {
        // Update in Supabase for logged-in users
        const { error } = await supabase
          .from('cart_items')
          .update({ quantity })
          .eq('id', id);
          
        if (error) throw error;
      }
      
      dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
    } catch (error: any) {
      console.error("Error updating cart quantity:", error);
      toast({
        title: "Error updating quantity",
        description: error.message || "Could not update quantity",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    try {
      if (user) {
        // Clear all items from Supabase
        const { error } = await supabase
          .from('cart_items')
          .delete()
          .eq('user_id', user.id);
          
        if (error) throw error;
      }
      
      dispatch({ type: "CLEAR_CART" });
      
      if (!user) {
        localStorage.removeItem("guest_cart");
      }
    } catch (error: any) {
      console.error("Error clearing cart:", error);
      toast({
        title: "Error clearing cart",
        description: error.message || "Could not clear cart",
        variant: "destructive",
      });
    }
  };

  const toggleCart = (open?: boolean) => {
    dispatch({ type: "TOGGLE_CART", payload: open });
  };

  const cartCount = cartState.items.reduce((total, item) => total + item.quantity, 0);
  
  const cartTotal = cartState.items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartState,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleCart,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
