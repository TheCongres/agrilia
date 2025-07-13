
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductImagesProps {
  images: string[];
  productName: string;
}

const ProductImages = ({ images, productName }: ProductImagesProps) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Enhanced URL optimization for different screen sizes
  const optimizeImageUrl = (url: string, size: 'thumbnail' | 'medium' | 'large' = 'medium') => {
    if (url.includes('unsplash.com')) {
      const hasParams = url.includes('?');
      const sizeParams = {
        thumbnail: 'w=200&h=200&q=80&auto=format&fit=crop',
        medium: 'w=800&h=600&q=85&auto=format&fit=crop',
        large: 'w=1200&h=900&q=90&auto=format&fit=crop'
      };
      return `${url}${hasParams ? '&' : '?'}${sizeParams[size]}`;
    }
    return url;
  };

  const nextImage = () => {
    setModalImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setModalImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };
  
  return (
    <div className="space-y-6">
      {/* Main Image with Lightbox */}
      <Dialog>
        <DialogTrigger asChild>
          <div 
            className="relative border border-border rounded-lg overflow-hidden aspect-square sm:aspect-[4/3] lg:aspect-[3/2] cursor-pointer group hover:shadow-lg transition-all duration-300"
            onClick={() => setModalImageIndex(selectedImage)}
          >
            <img
              src={optimizeImageUrl(images[selectedImage], 'medium')}
              alt={productName}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                <Expand className="h-5 w-5 text-foreground" />
              </div>
            </div>
          </div>
        </DialogTrigger>
        
        <DialogContent className="max-w-4xl w-[95vw] h-[80vh] p-0 sm:w-full">
          <div className="relative w-full h-full flex items-center justify-center bg-background">
            <img
              src={optimizeImageUrl(images[modalImageIndex], 'large')}
              alt={`${productName} - Image ${modalImageIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
            
            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm hover:bg-background/90"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
              {modalImageIndex + 1} / {images.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative border-2 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
              selectedImage === index
                ? "border-primary shadow-md scale-105"
                : "border-border hover:border-primary/50 hover:scale-102"
            } w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28`}
          >
            <img
              src={optimizeImageUrl(image, 'thumbnail')}
              alt={`${productName} - Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              loading="lazy"
            />
            {selectedImage === index && (
              <div className="absolute inset-0 bg-primary/10 border-2 border-primary rounded-lg"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
