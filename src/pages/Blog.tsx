
import { useState } from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { blogPosts } from '@/data/blogPosts';
import BlogCard from '@/components/blog/BlogCard';
import FeaturedPost from '@/components/blog/FeaturedPost';
import { Input } from '@/components/ui/input';
import { Search, BookOpen } from 'lucide-react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';

const categories = Array.from(new Set(blogPosts.map(post => post.category)));

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const featuredPost = blogPosts[0];
  
  const filteredPosts = blogPosts.filter(post => {
    // Skip the featured post
    if (post.id === featuredPost.id) return false;
    
    // Filter by search query
    const matchesQuery = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category if selected
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-earth-700 mb-2 flex items-center">
              <BookOpen className="mr-2 h-8 w-8" />
              Our Blog
            </h1>
            <p className="text-natural-600">
              Insights on organic farming, sustainability, and healthy living
            </p>
          </div>
          <div className="relative w-full md:w-64 mt-4 md:mt-0">
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-natural-400" />
          </div>
        </div>
        
        {/* Featured post */}
        <section className="mb-12">
          <FeaturedPost post={featuredPost} />
        </section>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main content - blog posts */}
          <div className="md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="mt-8">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationLink href="#" isActive>1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="md:w-1/4">
            {/* Categories */}
            <div className="bg-natural-50 p-6 rounded-lg mb-6">
              <h3 className="font-heading font-bold text-lg text-earth-700 mb-4">Categories</h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedCategory(null)} 
                  className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === null ? 'bg-natural-200 text-earth-700' : 'hover:bg-natural-100 text-natural-600'}`}
                >
                  All Categories
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${selectedCategory === category ? 'bg-natural-200 text-earth-700' : 'hover:bg-natural-100 text-natural-600'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Popular Tags */}
            <div className="bg-natural-50 p-6 rounded-lg">
              <h3 className="font-heading font-bold text-lg text-earth-700 mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(blogPosts.flatMap(post => post.tags))).map(tag => (
                  <span key={tag} className="inline-block px-3 py-1 text-xs bg-natural-200 text-earth-600 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
