
import { useState } from "react";

interface ProductImagesProps {
  images: string[];
  productName: string;
}

const ProductImages = ({ images, productName }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  // Add URL parameters for Unsplash images to control size
  const optimizeImageUrl = (url: string) => {
    // If it's an Unsplash image, add size parameters
    if (url.includes('unsplash.com')) {
      // Check if the URL already has query parameters
      const hasParams = url.includes('?');
      return `${url}${hasParams ? '&' : '?'}w=800&q=80&auto=format&fit=crop`;
    }
    return url;
  };
  
  return (
    <div className="space-y-4">
      <div className="border border-natural-200 rounded-lg overflow-hidden aspect-square">
        <img
          src={optimizeImageUrl(images[selectedImage])}
          alt={productName}
          className="w-full h-full object-cover"
          loading="eager" // Load main product image eagerly
        />
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`border ${
              selectedImage === index
                ? "border-natural-500"
                : "border-natural-200"
            } rounded-md overflow-hidden w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0`}
          >
            <img
              src={optimizeImageUrl(image)}
              alt={`${productName} - Image ${index + 1}`}
              className="w-full h-full object-cover"
              loading="lazy" // Lazy load thumbnails
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
