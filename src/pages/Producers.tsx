
import { useState } from "react";
import { useProducers } from "@/hooks/useProducts"; 
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProducerCard from "@/components/producers/ProducerCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const Producers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: producers, isLoading, error } = useProducers();
  
  // Filter producers based on search term
  const filteredProducers = producers?.filter(producer => 
    producer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (producer.location && producer.location.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <div className="container-custom py-8">
            <div className="text-center mb-10">
              <Skeleton className="h-10 w-1/2 mx-auto mb-4" />
              <Skeleton className="h-6 w-2/3 mx-auto mb-6" />
              <div className="relative max-w-md mx-auto">
                <Skeleton className="h-10 w-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, index) => (
                <Skeleton key={index} className="h-96 w-full" />
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <div className="container-custom py-16 text-center">
            <h2 className="text-2xl font-semibold mb-4">Error Loading Producers</h2>
            <p className="text-earth-500">
              There was a problem loading producer information. Please try again later.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <div className="container-custom py-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-earth-700 mb-4">
              Our <span className="text-natural-500">Producers</span>
            </h1>
            <p className="text-earth-500 max-w-2xl mx-auto">
              Meet the dedicated farmers and producers behind our products. We partner with local farms 
              across Algeria committed to sustainable and organic practices.
            </p>
            
            <div className="relative max-w-md mx-auto mt-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-natural-400" />
              <Input
                type="text"
                placeholder="Search producers by name, location or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 py-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducers.map((producer) => (
              <ProducerCard key={producer.id} producer={producer} />
            ))}
          </div>
          
          {filteredProducers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-earth-500 text-lg">
                No producers found matching your search. Please try different keywords.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Producers;
