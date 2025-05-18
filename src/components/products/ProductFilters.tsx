
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { formatCurrency } from "@/lib/utils";

interface ProductFiltersProps {
  filters: {
    categories: string[];
    priceRange: number[];
    organic: boolean;
    inStock: boolean;
    producerId?: string;
    search?: string;
  };
  onChange: (filters: any) => void;
  categories?: { id: string; name: string; slug: string }[];
}

const ProductFilters = ({ filters, onChange, categories = [] }: ProductFiltersProps) => {
  // Default categories if none are provided from the database
  const categoryOptions = categories.length > 0 ? categories : [
    { id: "fruits", name: "Fruits", slug: "fruits" },
    { id: "vegetables", name: "Vegetables", slug: "vegetables" },
    { id: "dairy", name: "Dairy & Eggs", slug: "dairy" },
    { id: "bakery", name: "Bakery", slug: "bakery" },
    { id: "honey", name: "Honey & Preserves", slug: "honey" },
    { id: "meat", name: "Meat & Poultry", slug: "meat" },
  ];

  const handleCategoryChange = (categoryId: string) => {
    const newCategories = filters.categories.includes(categoryId)
      ? filters.categories.filter(c => c !== categoryId)
      : [...filters.categories, categoryId];
    
    onChange({ ...filters, categories: newCategories });
  };

  const handlePriceChange = (value: number[]) => {
    onChange({ ...filters, priceRange: value });
  };

  const handleCheckboxChange = (key: 'organic' | 'inStock', value: boolean) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-natural-200 sticky top-20">
      <h3 className="text-lg font-semibold text-earth-700 mb-4">Filters</h3>
      
      {/* Categories */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-earth-600 mb-3">Categories</h4>
        <div className="space-y-2">
          {categoryOptions.map(category => (
            <div key={category.id} className="flex items-center">
              <Checkbox
                id={`category-${category.id}`}
                checked={filters.categories.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
                className="border-natural-300"
              />
              <Label
                htmlFor={`category-${category.id}`}
                className="ml-2 text-sm text-earth-600 cursor-pointer"
              >
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="text-sm font-medium text-earth-600">Price Range</h4>
          <span className="text-xs text-earth-500">
            {formatCurrency(filters.priceRange[0] * 10)} - {formatCurrency(filters.priceRange[1] * 10)}
          </span>
        </div>
        <Slider
          defaultValue={[0, 100]}
          min={0}
          max={100}
          step={1}
          value={filters.priceRange}
          onValueChange={handlePriceChange}
          className="my-4"
        />
      </div>
      
      {/* Additional Filters */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-earth-600 mb-2">Additional Filters</h4>
        
        <div className="flex items-center">
          <Checkbox
            id="organic-only"
            checked={filters.organic}
            onCheckedChange={(checked) => handleCheckboxChange('organic', !!checked)}
            className="border-natural-300"
          />
          <Label
            htmlFor="organic-only"
            className="ml-2 text-sm text-earth-600 cursor-pointer"
          >
            Organic Only
          </Label>
        </div>
        
        <div className="flex items-center">
          <Checkbox
            id="in-stock"
            checked={filters.inStock}
            onCheckedChange={(checked) => handleCheckboxChange('inStock', !!checked)}
            className="border-natural-300"
          />
          <Label
            htmlFor="in-stock"
            className="ml-2 text-sm text-earth-600 cursor-pointer"
          >
            In Stock Only
          </Label>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;
