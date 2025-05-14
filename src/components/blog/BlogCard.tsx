
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { BlogPostType } from '@/data/blogPosts';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface BlogCardProps {
  post: BlogPostType;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/blog/${post.slug}`}>
        <AspectRatio ratio={16 / 9}>
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      </Link>
      <CardHeader className="pt-4 pb-0">
        <div className="flex items-center space-x-2 mb-2">
          <span className="inline-block px-3 py-1 text-xs bg-natural-100 text-earth-600 rounded-full">
            {post.category}
          </span>
        </div>
        <Link to={`/blog/${post.slug}`} className="hover:underline">
          <h3 className="font-heading font-bold text-xl text-earth-700 line-clamp-2">{post.title}</h3>
        </Link>
      </CardHeader>
      <CardContent className="py-2">
        <p className="text-natural-600 line-clamp-3">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="pt-0 flex items-center justify-between text-sm text-natural-500">
        <div className="flex items-center">
          <Calendar className="h-4 w-4 mr-1" />
          <span>{post.publishedDate}</span>
        </div>
        <div className="flex items-center">
          <Clock className="h-4 w-4 mr-1" />
          <span>{post.readTime} min read</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
