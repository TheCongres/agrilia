
import { useParams } from 'react-router-dom';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { blogPosts } from '@/data/blogPosts';
import { Calendar, Clock, User, Tag, ArrowLeft } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import BlogCard from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const post = blogPosts.find(post => post.slug === slug);
  
  // Get related posts (same category, excluding current post)
  const relatedPosts = post 
    ? blogPosts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 2)
    : [];
  
  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-custom py-16 text-center">
          <h1 className="font-heading font-bold text-3xl text-earth-700 mb-4">Post Not Found</h1>
          <p className="text-natural-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">Return to Blog</Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container-custom py-8">
        <div className="mb-6">
          <Button variant="ghost" asChild className="hover:bg-natural-100 mb-4">
            <Link to="/blog" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          
          <h1 className="font-heading font-bold text-3xl md:text-4xl text-earth-700 mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-natural-500 text-sm mb-4 gap-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              <span>{post.author.name}</span>
            </div>
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
        
        <div className="mb-8">
          <AspectRatio ratio={21 / 9} className="rounded-lg overflow-hidden">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="object-cover w-full h-full"
            />
          </AspectRatio>
        </div>
        
        {/* Article content */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-3/4">
            <article className="prose prose-earth prose-headings:font-heading prose-img:rounded-lg max-w-none mb-8">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>
            
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-12">
              <Tag className="h-4 w-4 text-natural-500" />
              {post.tags.map(tag => (
                <span key={tag} className="inline-block px-3 py-1 text-xs bg-natural-100 text-earth-600 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h3 className="font-heading font-bold text-xl text-earth-700 mb-4">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map(post => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/4">
            {/* Author */}
            <div className="bg-natural-50 p-6 rounded-lg mb-6">
              <h3 className="font-heading font-bold text-lg text-earth-700 mb-4">About the Author</h3>
              <div className="flex items-center mb-4">
                {post.author.avatar && (
                  <img 
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                )}
                <span className="font-medium">{post.author.name}</span>
              </div>
              <p className="text-sm text-natural-600">
                Our team of writers is passionate about sustainable agriculture, organic food, and healthy living.
              </p>
            </div>
            
            {/* Newsletter */}
            <div className="bg-natural-50 p-6 rounded-lg">
              <h3 className="font-heading font-bold text-lg text-earth-700 mb-2">Subscribe to our Newsletter</h3>
              <p className="text-sm text-natural-600 mb-4">
                Get the latest articles and recipes delivered straight to your inbox.
              </p>
              <form className="space-y-3">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full px-3 py-2 border border-natural-300 rounded-md focus:outline-none focus:ring-1 focus:ring-natural-500"
                />
                <Button className="w-full bg-natural-500 hover:bg-natural-600">
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
