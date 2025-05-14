
import { Link } from "react-router-dom";

interface BreadcrumbsProps {
  category: string;
  productName: string;
}

const Breadcrumbs = ({ category, productName }: BreadcrumbsProps) => {
  return (
    <nav className="mb-6">
      <ol className="flex text-sm text-earth-500">
        <li><Link to="/" className="hover:text-natural-600">Home</Link></li>
        <li><span className="mx-2">/</span></li>
        <li><Link to="/products" className="hover:text-natural-600">Products</Link></li>
        <li><span className="mx-2">/</span></li>
        <li><Link to={`/category/${category.toLowerCase()}`} className="hover:text-natural-600">{category}</Link></li>
        <li><span className="mx-2">/</span></li>
        <li className="text-earth-700 font-medium">{productName}</li>
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
