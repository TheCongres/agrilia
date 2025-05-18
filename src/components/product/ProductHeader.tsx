
import { Link } from "react-router-dom";

interface ProductHeaderProps {
  name: string;
  category: string;
  description: string;
  producer: {
    name: string;
    location: string;
    id: string;
  };
}

const ProductHeader = ({ name, category, description, producer }: ProductHeaderProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="category-badge">{category}</span>
        <span className="category-badge bg-natural-100 text-natural-600">Organic</span>
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-earth-700 mb-2">
        {name}
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
      <p className="text-earth-500 mb-4">{description}</p>
      <div className="flex items-center">
        <Link to={`/producer/${producer.id}`} className="text-earth-600 hover:text-natural-600">
          <span className="font-medium">From:</span> {producer.name}, {producer.location}
        </Link>
      </div>
    </div>
  );
};

export default ProductHeader;
