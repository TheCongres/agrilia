
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Leaf } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "@/components/ui/use-toast";

// Sample producer data - in a real app this would come from an API
const producersData = [
  {
    id: 1,
    name: "Green Valley Farm",
    location: "Sonoma County, CA",
    image: "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    description: "Family-owned organic farm specializing in heirloom vegetables and fruits. Green Valley has been practicing sustainable farming for over 25 years.",
    productsCount: 28,
    featured: true,
    specialties: ["Heirloom Tomatoes", "Stone Fruits", "Leafy Greens"],
    story: "Started in 1996 by the Johnson family, Green Valley Farm has grown from a small 5-acre plot to a thriving 40-acre organic operation. We're dedicated to preserving heirloom varieties and maintaining sustainable practices that nourish both the land and our community.",
    practices: [
      "No synthetic pesticides or fertilizers",
      "Cover cropping and crop rotation",
      "Water conservation techniques",
      "On-site composting program"
    ],
    certifications: ["USDA Organic", "California Certified Organic Farmers (CCOF)"],
    contactInfo: {
      email: "info@greenvalleyfarm.com",
      phone: "(707) 555-1234",
      website: "www.greenvalleyfarm.com"
    }
  },
  {
    id: 2,
    name: "Sunshine Dairy Co-op",
    location: "Marin County, CA",
    image: "https://images.unsplash.com/photo-1594761946718-9442f3ebc349?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500", 
    description: "A cooperative of small dairy farms committed to ethical treatment of animals and organic practices. Producing milk, cheese, and yogurt.",
    productsCount: 15,
    featured: true,
    specialties: ["Raw Milk", "Artisan Cheese", "Greek Yogurt"],
    story: "Founded in 2005, Sunshine Dairy Co-op brings together 7 small family farms in Marin County. Our cooperative model ensures fair prices for farmers while maintaining the highest standards of animal welfare and sustainable production methods.",
    practices: [
      "100% grass-fed cows",
      "No antibiotics or hormones",
      "Rotational grazing systems",
      "Animal welfare prioritized"
    ],
    certifications: ["USDA Organic", "Animal Welfare Approved"],
    contactInfo: {
      email: "contact@sunshinedairycoop.com",
      phone: "(415) 555-9876",
      website: "www.sunshinedairycoop.com"
    }
  },
  {
    id: 3,
    name: "Wild Honey Apiaries",
    location: "Napa Valley, CA",
    image: "https://images.unsplash.com/photo-1589923188651-268a961fad0d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    description: "Sustainable beekeeping operation producing raw honey, beeswax products, and pollination services for other organic farms.",
    productsCount: 8,
    featured: false,
    specialties: ["Wildflower Honey", "Bee Pollen", "Honeycomb"],
    story: "Wild Honey Apiaries was started by former entomologist Dr. Maya Chen in 2010. What began as two backyard hives has grown to over 50 colonies that we relocate seasonally to support organic farms across Northern California.",
    practices: [
      "Treatment-free beekeeping",
      "Sustainable harvesting techniques",
      "Pollination services for local farms",
      "Native plant preservation"
    ],
    certifications: ["Certified Naturally Grown"],
    contactInfo: {
      email: "hello@wildhoneyapiaries.com",
      phone: "(707) 555-8765",
      website: "www.wildhoneyapiaries.com"
    }
  },
  {
    id: 4,
    name: "Heritage Orchard",
    location: "Sacramento Valley, CA",
    image: "https://images.unsplash.com/photo-1613428792678-087afc9d2e0f?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    description: "Specializing in organic apples, pears, and stone fruits. Heritage Orchard maintains over 50 varieties of heirloom fruit trees.",
    productsCount: 22,
    featured: false,
    specialties: ["Heirloom Apples", "Asian Pears", "Plums"],
    story: "For three generations, the Rivera family has been tending to these orchards using traditional methods passed down through the generations. Our mission is to preserve rare and heirloom fruit varieties that might otherwise be lost to commercial standardization.",
    practices: [
      "Organic pest management",
      "Drip irrigation",
      "Biodiversity promotion",
      "Minimal intervention approach"
    ],
    certifications: ["USDA Organic", "Demeter Certified Biodynamic"],
    contactInfo: {
      email: "trees@heritageorchard.org",
      phone: "(916) 555-3456",
      website: "www.heritageorchard.org"
    }
  },
  {
    id: 5,
    name: "Coastal Meadows",
    location: "Mendocino County, CA",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    description: "Pasture-raised chicken, eggs, and lamb from a family farm committed to regenerative agriculture and carbon sequestration.",
    productsCount: 12,
    featured: true,
    specialties: ["Pasture-Raised Eggs", "Grass-Fed Lamb", "Organic Chicken"],
    story: "Coastal Meadows began as a regenerative agriculture project in 2012. We focus on rebuilding soil health while producing nutrient-dense foods. Our integrated animal management system helps sequester carbon while producing exceptional quality meats and eggs.",
    practices: [
      "Holistic planned grazing",
      "Mobile chicken coops",
      "Silvopasture systems",
      "Carbon farming practices"
    ],
    certifications: ["USDA Organic", "Regenerative Organic Certified"],
    contactInfo: {
      email: "farm@coastalmeadows.com",
      phone: "(707) 555-2345",
      website: "www.coastalmeadows.com"
    }
  },
  {
    id: 6,
    name: "Earth First Grains",
    location: "Yolo County, CA",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    description: "Dedicated to growing ancient and heritage grain varieties using organic methods. Specializing in wheat, barley, and oats.",
    productsCount: 10,
    featured: false,
    specialties: ["Heritage Wheat", "Ancient Grains", "Organic Flour"],
    story: "Earth First Grains was established in 2008 by former bakery owner Mai Wong, who became fascinated with the lost flavors and nutrition of heritage grains. Today, we cultivate over 15 varieties of rare and ancient grains on 120 acres of certified organic farmland.",
    practices: [
      "No-till farming techniques",
      "Seed saving program",
      "On-site stone milling",
      "Drought-resistant varieties"
    ],
    certifications: ["USDA Organic", "Real Organic Project Certified"],
    contactInfo: {
      email: "grains@earthfirstgrains.com",
      phone: "(530) 555-7890",
      website: "www.earthfirstgrains.com"
    }
  },
];

const ProducerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [producer, setProducer] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchProducer = () => {
      setLoading(true);
      setTimeout(() => {
        const foundProducer = producersData.find(p => p.id === Number(id));
        if (foundProducer) {
          setProducer(foundProducer);
        } else {
          toast({
            title: "Producer not found",
            description: "We couldn't find the producer you're looking for.",
            variant: "destructive"
          });
        }
        setLoading(false);
      }, 500); // Simulate network delay
    };

    fetchProducer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-custom py-8">
          <div className="mb-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-6 w-64" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Skeleton className="h-80 w-full mb-6" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-2/3" />
            </div>
            <div>
              <Skeleton className="h-60 w-full mb-4" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-full mb-2" />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!producer) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container-custom py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-earth-700 mb-4">Producer Not Found</h1>
            <p className="text-earth-500 mb-8">We couldn't find the producer you're looking for.</p>
            <Link to="/producers">
              <Button className="bg-natural-500 hover:bg-natural-600">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to All Producers
              </Button>
            </Link>
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
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link to="/producers" className="text-natural-500 hover:text-natural-600 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" /> All Producers
            </Link>
          </div>

          {/* Producer Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-earth-700 mb-2">
              {producer.name}
            </h1>
            <div className="flex items-center text-earth-500">
              <MapPin className="h-4 w-4 mr-1" /> 
              {producer.location}
              {producer.featured && (
                <span className="ml-4 bg-earth-500 text-white text-xs font-medium px-2.5 py-1 rounded-full flex items-center">
                  <Leaf className="h-3 w-3 mr-1" /> Featured Producer
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Image */}
              <div className="rounded-lg overflow-hidden">
                <AspectRatio ratio={16/9}>
                  <img 
                    src={producer.image} 
                    alt={producer.name} 
                    className="w-full h-full object-cover"
                  />
                </AspectRatio>
              </div>

              {/* About Section */}
              <section>
                <h2 className="text-2xl font-semibold text-earth-700 mb-4">About {producer.name}</h2>
                <p className="text-earth-600 mb-4">{producer.description}</p>
                <p className="text-earth-600">{producer.story}</p>
              </section>

              {/* Farming Practices */}
              <section>
                <h2 className="text-2xl font-semibold text-earth-700 mb-4">Sustainable Practices</h2>
                <ul className="list-disc pl-5 text-earth-600 space-y-2">
                  {producer.practices.map((practice: string, index: number) => (
                    <li key={index}>{practice}</li>
                  ))}
                </ul>
              </section>

              {/* Products Section */}
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-earth-700">Featured Products</h2>
                  <Link to={`/products?producer=${producer.id}`}>
                    <Button variant="outline" className="text-natural-500 border-natural-500 hover:bg-natural-50">
                      View All Products
                    </Button>
                  </Link>
                </div>

                <div className="bg-natural-50 rounded-lg p-6 text-center">
                  <p className="text-earth-600">
                    {producer.name} offers {producer.productsCount} products in our marketplace.
                  </p>
                  <Link to={`/products?producer=${producer.id}`}>
                    <Button className="mt-4 bg-natural-500 hover:bg-natural-600">
                      Browse Their Products
                    </Button>
                  </Link>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Specialties Card */}
              <div className="bg-white rounded-lg border border-natural-200 p-6">
                <h3 className="text-lg font-semibold text-earth-700 mb-3">Specialties</h3>
                <div className="flex flex-wrap gap-2">
                  {producer.specialties.map((specialty: string, index: number) => (
                    <span
                      key={index}
                      className="bg-natural-100 text-earth-600 text-sm px-3 py-1 rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications Card */}
              <div className="bg-white rounded-lg border border-natural-200 p-6">
                <h3 className="text-lg font-semibold text-earth-700 mb-3">Certifications</h3>
                <ul className="space-y-2">
                  {producer.certifications.map((certification: string, index: number) => (
                    <li key={index} className="flex items-center text-earth-600">
                      <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      {certification}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info Card */}
              <div className="bg-white rounded-lg border border-natural-200 p-6">
                <h3 className="text-lg font-semibold text-earth-700 mb-3">Contact Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-start text-earth-600">
                    <span className="font-medium mr-2">Email:</span>
                    <a href={`mailto:${producer.contactInfo.email}`} className="text-natural-500 hover:underline">
                      {producer.contactInfo.email}
                    </a>
                  </li>
                  <li className="flex items-start text-earth-600">
                    <span className="font-medium mr-2">Phone:</span>
                    <a href={`tel:${producer.contactInfo.phone}`} className="text-natural-500 hover:underline">
                      {producer.contactInfo.phone}
                    </a>
                  </li>
                  <li className="flex items-start text-earth-600">
                    <span className="font-medium mr-2">Website:</span>
                    <a href={`https://${producer.contactInfo.website}`} target="_blank" rel="noopener noreferrer" className="text-natural-500 hover:underline">
                      {producer.contactInfo.website}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProducerDetail;
