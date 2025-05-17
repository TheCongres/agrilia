
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/product/Breadcrumbs";
import ProductImages from "@/components/product/ProductImages";
import ProductHeader from "@/components/product/ProductHeader";
import ProductPurchase from "@/components/product/ProductPurchase";
import ProductDetails from "@/components/product/ProductDetails";

// This is mock data for the MVP. In a real app, this would come from an API
const productData = {
  id: 1,
  name: "Organic Deglet Nour Dates",
  price: 350,
  unit: "box",
  images: [
    "https://images.unsplash.com/photo-1601039641847-7857b994d704?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
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
  harvestDate: "2 weeks ago",
  relatedProducts: [2, 4, 7],
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();

  // In a real app, you would fetch the product based on the ID
  // For the MVP, we'll just use the mock data
  const product = productData;

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
            <ProductHeader 
              name={product.name} 
              category={product.category} 
              description={product.description} 
              producer={product.producer} 
            />

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
