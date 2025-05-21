
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/product/Breadcrumbs";
import ProductImages from "@/components/product/ProductImages";
import ProductHeader from "@/components/product/ProductHeader";
import ProductPurchase from "@/components/product/ProductPurchase";
import ProductDetails from "@/components/product/ProductDetails";
import { useFavorites } from "@/context/FavoritesContext";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// This is mock data for the MVP. In a real app, this would come from an API
const productData = {
  id: 1,
  name: "Organic Deglet Nour Dates",
  price: 450,
  unit: "box",
  images: [
    "https://images.unsplash.com/photo-1582284540020-8acbe03f4924?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=1474&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1664273586888-859762c34ce4?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1677247567623-78a3f4b26bb3?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1635843136867-85eae317a43a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1664640733898-d5c3f71f44e1?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1571728608239-fda4ff5c636d?q=80&w=1378&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
     ],
  description: "Premium Deglet Nour dates grown in the Algerian desert oasis. Known for their sweet taste and caramel-like texture, these organic dates are rich in nutrients and natural sweetness.",
  longDescription: "Our organic Deglet Nour dates are sourced from Oasis de Biskra, where they're grown in nutrient-rich soil without synthetic pesticides or fertilizers. They're hand-picked at peak ripeness to ensure the best flavor and texture. \n\nDeglet Nour dates are known for their health benefits, including natural sugars that provide quick energy, fiber for digestive health, and various essential minerals. These 'Fingers of Light' dates are a staple of Algerian cuisine.",
  producer: {
    name: "Oasis de Biskra",
    location: "Biskra, Algeria",
    id: 101,
  },
  category: "Fruits",
  stock: 24,
  nutritionalInfo: {
    calories: "280 kcal",
    fat: "0.4g",
    carbs: "75g",
    protein: "2g",
    fiber: "8g",
  },
  certifications: ["Organic Certified", "Non-GMO Verified"],
  harvestDate: "March 2025",
  relatedProducts: [2, 4, 7],
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { isProductFavorite, toggleFavorite } = useFavorites();

  // In a real app, you would fetch the product based on the ID
  // For the MVP, we'll just use the mock data
  const product = productData;
  
  const isFavorite = isProductFavorite(product.id);

  const handleToggleFavorite = () => {
    toggleFavorite({
      product_id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      category: product.category,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-custom py-8">
        <Breadcrumbs category={product.category} productName={product.name} />

        {/* Product Detail */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <ProductImages images={product.images} productName={product.name} />

          {/* Product Info */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <ProductHeader 
                name={product.name} 
                category={product.category} 
                description={product.description} 
                producer={product.producer} 
              />
              
              <button
                onClick={handleToggleFavorite}
                className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                  isFavorite 
                    ? "bg-red-50 text-red-500 hover:bg-red-100" 
                    : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                )}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart 
                  className={cn(
                    "h-5 w-5 transition-all", 
                    isFavorite && "fill-red-500"
                  )} 
                />
              </button>
            </div>

            <ProductPurchase product={product} />

            <ProductDetails 
              nutritionalInfo={product.nutritionalInfo}
              certifications={product.certifications}
              harvestDate={product.harvestDate}
              longDescription={product.longDescription}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
