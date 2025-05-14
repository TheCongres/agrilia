
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { BlogPostType } from '@/data/blogPosts';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface FeaturedPostProps {
  post: BlogPostType;
}

const FeaturedPost = ({ post }: FeaturedPostProps) => {
  return (
    <div className="grid md:grid-cols-5 gap-6 bg-natural-50 rounded-lg overflow-hidden">
      <div className="md:col-span-3">
        <AspectRatio ratio={16 / 9} className="md:h-full">
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </div>
      <div className="md:col-span-2 p-6 flex flex-col justify-center">
        <div className="flex items-center space-x-2 mb-3">
          <span className="inline-block px-3 py-1 text-xs bg-natural-200 text-earth-700 rounded-full">
            {post.category}
          </span>
        </div>
        <Link to={`/blog/${post.slug}`} className="hover:underline">
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-earth-700 mb-4">{post.title}</h2>
        </Link>
        
        <p className="text-natural-600 mb-4">{post.excerpt}</p>
        
        <div className="flex items-center space-x-4 text-sm text-natural-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{post.publishedDate}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
