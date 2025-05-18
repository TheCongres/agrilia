
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { Json } from '@/integrations/supabase/types';

// Updated Product interface to match the database structure
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  sale_price: number | null;
  category_id: string | null;
  producer_id: string | null;
  is_organic: boolean;
  is_in_stock: boolean;
  stock_quantity: number | null;
  unit: string;
  images: string[];
  rating: number | null;
  review_count: number | null;
  created_at: string;
  updated_at: string;
  // Define nested relations as optional to handle different query responses
  categories?: {
    name: string;
    slug: string;
  };
  producers?: {
    name: string;
    location: string | null;
  };
}

export interface ProductFilters {
  categories?: string[];
  priceRange?: number[];
  organic?: boolean;
  inStock?: boolean;
  producerId?: string;
  search?: string;
}

// Function to fetch products with filters
export async function fetchProducts(filters: ProductFilters = {}) {
  let query = supabase
    .from('products')
    .select(`
      *,
      categories:categories(name, slug),
      producers:producers(name, location)
    `);

  // Apply filters
  if (filters.categories && filters.categories.length > 0) {
    query = query.in(
      'category_id', 
      filters.categories
    );
  }

  if (filters.priceRange && filters.priceRange.length === 2) {
    const minPrice = filters.priceRange[0] * 10; // Convert slider value to actual price
    const maxPrice = filters.priceRange[1] * 10;
    query = query.gte('price', minPrice).lte('price', maxPrice);
  }

  if (filters.organic) {
    query = query.eq('is_organic', true);
  }

  if (filters.inStock) {
    query = query.eq('is_in_stock', true);
  }

  if (filters.producerId) {
    query = query.eq('producer_id', filters.producerId);
  }

  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }

  // Process images to ensure they are strings
  return (data || []).map(product => ({
    ...product,
    images: Array.isArray(product.images) 
      ? product.images.map(img => typeof img === 'string' ? img : String(img))
      : []
  }));
}

// Hook to use products with react-query
export function useProducts(filters: ProductFilters = {}) {
  return useQuery({
    queryKey: ['products', filters],
    queryFn: () => fetchProducts(filters),
    meta: {
      onError: (error: Error) => {
        toast({
          title: 'Error fetching products',
          description: error.message,
          variant: 'destructive',
        });
      }
    }
  });
}

// Hook to fetch a single product by ID or slug
export function useProduct(idOrSlug: string) {
  return useQuery({
    queryKey: ['product', idOrSlug],
    queryFn: async () => {
      // Try to fetch by slug first
      let { data, error } = await supabase
        .from('products')
        .select(`
          *,
          categories:categories(name, slug),
          producers:producers(name, location)
        `)
        .eq('slug', idOrSlug)
        .single();

      // If not found by slug, try by ID
      if (error || !data) {
        const { data: dataById, error: errorById } = await supabase
          .from('products')
          .select(`
            *,
            categories:categories(name, slug),
            producers:producers(name, location)
          `)
          .eq('id', idOrSlug)
          .single();

        if (errorById) {
          throw new Error('Product not found');
        }
        
        // Process images
        if (dataById) {
          return {
            ...dataById,
            images: Array.isArray(dataById.images)
              ? dataById.images.map(img => typeof img === 'string' ? img : String(img))
              : []
          };
        }
        return dataById;
      }

      // Process images
      return {
        ...data,
        images: Array.isArray(data.images)
          ? data.images.map(img => typeof img === 'string' ? img : String(img))
          : []
      };
    },
    enabled: Boolean(idOrSlug),
  });
}

// Hook for listing categories
export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');

      if (error) {
        throw new Error('Failed to fetch categories');
      }

      return data || [];
    },
  });
}

// Hook for listing producers
export function useProducers() {
  return useQuery({
    queryKey: ['producers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('producers')
        .select('*');

      if (error) {
        throw new Error('Failed to fetch producers');
      }

      return data || [];
    },
  });
}
