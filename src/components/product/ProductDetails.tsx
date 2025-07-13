
interface ProductDetailsProps {
  nutritionalInfo: Record<string, string>;
  certifications: string[];
  harvestDate: string;
  longDescription: string;
}

const ProductDetails = ({ nutritionalInfo, certifications, harvestDate, longDescription }: ProductDetailsProps) => {
  return (
    <>
      <div className="space-y-4 sm:space-y-6">
        <div>
          <h3 className="font-semibold text-earth-700 mb-2 text-sm sm:text-base">Harvest Date</h3>
          <p className="text-earth-500 text-sm sm:text-base">{harvestDate}</p>
        </div>
        <div>
          <h3 className="font-semibold text-earth-700 mb-2 text-sm sm:text-base">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, index) => (
              <span key={index} className="text-xs sm:text-sm bg-natural-100 text-natural-600 px-3 py-1.5 rounded break-words">
                {cert}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-earth-700 mb-2 text-sm sm:text-base">Nutritional Information</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3">
            {Object.entries(nutritionalInfo).map(([key, value]) => (
              <div key={key} className="bg-natural-50 p-3 sm:p-4 rounded min-w-0">
                <span className="text-xs text-earth-500 uppercase block break-words">{key}</span>
                <p className="font-medium text-earth-700 text-sm sm:text-base break-words">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 sm:mt-12">
        <h2 className="text-xl sm:text-2xl font-bold text-earth-700 mb-4">Product Details</h2>
        <div className="prose prose-earth max-w-none">
          {longDescription.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-earth-600 text-sm sm:text-base leading-relaxed break-words">{paragraph}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
