
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

// This is mock data for the MVP. In a real app, this would come from an API
const productData = {
  id: 1,
  name: "Organic Avocado",
  price: 3.99,
  unit: "each",
  images: [
    "https://images.unsplash.com/photo-1601039641847-7857b994d704?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
  ],
  description: "Fresh, creamy organic avocados grown with sustainable farming practices. Rich in healthy fats, fiber, and various important nutrients. Perfect for guacamole, sandwiches, or simply enjoying with a sprinkle of salt.",
  longDescription: "Our organic avocados are sourced from Green Valley Farm, where they're grown in nutrient-rich soil without synthetic pesticides or fertilizers. They're hand-picked at peak ripeness to ensure the best flavor and texture. \n\nAvocados are known for their health benefits, including heart-healthy monounsaturated fats, potassium (more than bananas!), and fiber. They're also packed with antioxidants that are beneficial for eye health.",
  producer: {
    name: "Green Valley Farm",
    location: "Oakridge, CA",
    id: 101,
  },
  category: "Fruits",
  stock: 24,
  nutritionalInfo: {
    calories: "160 kcal",
    fat: "15g",
    carbs: "9g",
    protein: "2g",
    fiber: "7g",
  },
  certifications: ["USDA Organic", "Non-GMO Project Verified"],
  harvestDate: "3 days ago",
  relatedProducts: [2, 4, 7],
};

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // In a real app, you would fetch the product based on the ID
  // For the MVP, we'll just use the mock data
  const product = productData;

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container-custom py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6">
          <ol className="flex text-sm text-earth-500">
            <li><a href="/" className="hover:text-natural-600">Home</a></li>
            <li><span className="mx-2">/</span></li>
            <li><a href="/products" className="hover:text-natural-600">Products</a></li>
            <li><span className="mx-2">/</span></li>
            <li><a href={`/category/${product.category.toLowerCase()}`} className="hover:text-natural-600">{product.category}</a></li>
            <li><span className="mx-2">/</span></li>
            <li className="text-earth-700 font-medium">{product.name}</li>
          </ol>
        </nav>

        {/* Product Detail */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="border border-natural-200 rounded-lg overflow-hidden aspect-square">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border ${
                    selectedImage === index
                      ? "border-natural-500"
                      : "border-natural-200"
                  } rounded-md overflow-hidden w-20 h-20`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="category-badge">{product.category}</span>
                <span className="category-badge bg-natural-100 text-natural-600">Organic</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-earth-700 mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-honey">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-earth-500">(24 reviews)</span>
              </div>
              <p className="text-earth-500 mb-4">{product.description}</p>
              <div className="flex items-center">
                <a href={`/producer/${product.producer.id}`} className="text-earth-600 hover:text-natural-600">
                  <span className="font-medium">From:</span> {product.producer.name}, {product.producer.location}
                </a>
              </div>
            </div>

            <div className="mb-6 py-4 border-y border-natural-200">
              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-earth-700">
                  ${product.price.toFixed(2)} <span className="text-sm font-normal text-earth-500">/ {product.unit}</span>
                </div>
                <div className="text-sm text-earth-500">
                  {product.stock > 10 ? (
                    <span className="text-natural-600">In Stock</span>
                  ) : product.stock > 0 ? (
                    <span className="text-honey">Low Stock ({product.stock} left)</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex border border-natural-300 rounded-md">
                  <button
                    onClick={decrementQuantity}
                    className="px-3 py-2 text-earth-700 hover:bg-natural-50"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <div className="w-12 flex items-center justify-center">
                    {quantity}
                  </div>
                  <button
                    onClick={incrementQuantity}
                    className="px-3 py-2 text-earth-700 hover:bg-natural-50"
                    disabled={quantity >= product.stock}
                  >
                    +
                  </button>
                </div>
                <Button className="bg-natural-500 hover:bg-natural-600 flex-grow">
                  Add to Cart
                </Button>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-earth-700 mb-1">Harvest Date</h3>
                <p className="text-earth-500">{product.harvestDate}</p>
              </div>
              <div>
                <h3 className="font-semibold text-earth-700 mb-1">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert, index) => (
                    <span key={index} className="text-xs bg-natural-100 text-natural-600 px-2 py-1 rounded">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-earth-700 mb-1">Nutritional Information</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {Object.entries(product.nutritionalInfo).map(([key, value]) => (
                    <div key={key} className="bg-natural-50 p-2 rounded">
                      <span className="text-xs text-earth-500 uppercase">{key}</span>
                      <p className="font-medium text-earth-700">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-earth-700 mb-4">Product Details</h2>
          <div className="prose prose-earth max-w-none">
            {product.longDescription.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-earth-600">{paragraph}</p>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
