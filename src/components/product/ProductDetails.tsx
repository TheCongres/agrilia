
interface ProductDetailsProps {
  nutritionalInfo: Record<string, string>;
  certifications: string[];
  harvestDate: string;
  longDescription: string;
}

const ProductDetails = ({ nutritionalInfo, certifications, harvestDate, longDescription }: ProductDetailsProps) => {
  return (
    <>
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-earth-700 mb-1">Harvest Date</h3>
          <p className="text-earth-500">{harvestDate}</p>
        </div>
        <div>
          <h3 className="font-semibold text-earth-700 mb-1">Certifications</h3>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert, index) => (
              <span key={index} className="text-xs bg-natural-100 text-natural-600 px-2 py-1 rounded">
                {cert}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-earth-700 mb-1">Nutritional Information</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {Object.entries(nutritionalInfo).map(([key, value]) => (
              <div key={key} className="bg-natural-50 p-2 rounded">
                <span className="text-xs text-earth-500 uppercase">{key}</span>
                <p className="font-medium text-earth-700">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-earth-700 mb-4">Product Details</h2>
        <div className="prose prose-earth max-w-none">
          {longDescription.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-earth-600">{paragraph}</p>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
