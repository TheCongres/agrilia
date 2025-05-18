
import { useParams } from "react-router-dom";
import { useProduct } from "@/hooks/useProducts";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/product/Breadcrumbs";
import ProductImages from "@/components/product/ProductImages";
import ProductHeader from "@/components/product/ProductHeader";
import ProductPurchase from "@/components/product/ProductPurchase";
import ProductDetails from "@/components/product/ProductDetails";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, error } = useProduct(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-custom py-8">
          <div className="h-6 mb-8">
            <Skeleton className="h-full w-64" />
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="aspect-square" />
            <div className="space-y-6">
              <div className="space-y-2">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-24 w-full" />
              </div>
              <Skeleton className="h-36 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-custom py-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
          <p className="text-earth-500">
            The product you're looking for doesn't exist or has been removed.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  // Get category name if available
  const categoryName = product.categories ? (product.categories as any).name : "";
  
  // Get producer info if available
  const producer = product.producers ? {
    name: (product.producers as any).name || "",
    location: (product.producers as any).location || "",
    id: product.producer_id || "",
  } : undefined;

  // Extract nutritional info if present in description (would be more structured in a real app)
  const nutritionalInfo = {
    calories: "280 kcal",
    fat: "0.4g",
    carbs: "75g",
    protein: "2g",
    fiber: "8g",
  };

  // Parse images array
  const productImages = Array.isArray(product.images) ? product.images : [];
  
  // If no images, provide placeholder
  if (productImages.length === 0) {
    productImages.push("https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800");
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-custom py-8">
        <Breadcrumbs category={categoryName} productName={product.name} />

        {/* Product Detail */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <ProductImages images={productImages} productName={product.name} />

          {/* Product Info */}
          <div>
            <ProductHeader 
              name={product.name} 
              category={categoryName} 
              description={product.description || ""} 
              producer={producer} 
            />

            <ProductPurchase product={{
              ...product,
              stock: product.stock_quantity || 0,
              certifications: product.is_organic ? ["Organic Certified"] : [],
              harvestDate: "Recent harvest"
            }} />

            <ProductDetails 
              nutritionalInfo={nutritionalInfo}
              certifications={product.is_organic ? ["Organic Certified"] : []}
              harvestDate="Recent harvest"
              longDescription={product.description || "No detailed description available."}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
