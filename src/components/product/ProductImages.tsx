
import { useState } from "react";

interface ProductImagesProps {
  images: string[];
  productName: string;
}

const ProductImages = ({ images, productName }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  
  return (
    <div className="space-y-4">
      <div className="border border-natural-200 rounded-lg overflow-hidden aspect-square">
        <img
          src={images[selectedImage]}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex gap-4">
        {images.map((image, index) => (
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
              alt={`${productName} - Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
