
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
    name: "Ferme Verte d'Alger",
    location: "Alger, Algeria",
    image: "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    description: "Family-owned organic farm specializing in heirloom vegetables and fruits. Ferme Verte d'Alger has been practicing sustainable farming for over 25 years in the fertile lands outside Algiers.",
    productsCount: 28,
    featured: true,
    specialties: ["Heirloom Tomatoes", "Citrus Fruits", "Leafy Greens"],
    story: "Started in 1996 by the Belhadj family, Ferme Verte d'Alger has grown from a small 5-acre plot to a thriving 40-acre organic operation. We're dedicated to preserving local Algerian varieties and maintaining sustainable practices that nourish both the land and our community.",
    practices: [
      "No synthetic pesticides or fertilizers",
      "Traditional water conservation techniques adapted to Algerian climate",
      "On-site composting program",
      "Seed preservation of local Algerian varieties"
    ],
    certifications: ["Bio Algérie", "Mediterranean Organic Agriculture Network"],
    contactInfo: {
      email: "info@fermeverte-alger.dz",
      phone: "(0)23 55 12 34",
      website: "www.fermeverte-alger.dz"
    }
  },
  {
    id: 2,
    name: "Coopérative Laitière de Médéa",
    location: "Médéa, Algeria",
    image: "https://images.unsplash.com/photo-1594761946718-9442f3ebc349?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500", 
    description: "A cooperative of small dairy farms committed to ethical treatment of animals and organic practices. Producing milk, cheese, and traditional Algerian yogurt products.",
    productsCount: 15,
    featured: true,
    specialties: ["Raw Milk", "Atlas Mountain Cheese", "Leben (Traditional Yogurt)"],
    story: "Founded in 2005, Coopérative Laitière de Médéa brings together 7 small family farms in the Médéa region. Our cooperative model ensures fair prices for farmers while maintaining the highest standards of animal welfare and sustainable production methods that respect our traditional Algerian dairy practices.",
    practices: [
      "100% grass-fed cattle adapted to local climate",
      "No antibiotics or hormones",
      "Rotational grazing systems on Atlas mountain slopes",
      "Traditional handcrafted dairy production methods"
    ],
    certifications: ["Bio Algérie", "Heritage Food Practices Certificate"],
    contactInfo: {
      email: "contact@cooperative-medea.dz",
      phone: "(0)25 58 43 21",
      website: "www.cooperative-medea.dz"
    }
  },
  {
    id: 3,
    name: "Ruches de l'Atlas",
    location: "Blida, Algeria",
    image: "https://images.unsplash.com/photo-1589923188651-268a961fad0d?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    description: "Sustainable beekeeping operation producing raw honey, beeswax products, and pollination services for other organic farms in the Atlas Mountains.",
    productsCount: 8,
    featured: false,
    specialties: ["Atlas Mountain Honey", "Bee Pollen", "Honeycomb"],
    story: "Ruches de l'Atlas was started by former entomologist Dr. Amina Rahal in 2010. What began as two backyard hives has grown to over 50 colonies that we relocate seasonally to support organic farms across the Atlas Mountains, preserving traditional beekeeping knowledge while implementing sustainable practices.",
    practices: [
      "Treatment-free beekeeping",
      "Sustainable harvesting techniques",
      "Pollination services for local farms",
      "Native plant preservation around hive locations"
    ],
    certifications: ["Bio Algérie", "Slow Food Presidium"],
    contactInfo: {
      email: "miel@ruchesdelatlas.dz",
      phone: "(0)25 43 76 98",
      website: "www.ruchesdelatlas.dz"
    }
  },
  {
    id: 4,
    name: "Verger du Sahel",
    location: "Bouira, Algeria",
    image: "https://images.unsplash.com/photo-1613428792678-087afc9d2e0f?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    description: "Specializing in organic apples, pears, and stone fruits. Verger du Sahel maintains over 40 varieties of fruit trees adapted to Algeria's unique climate.",
    productsCount: 22,
    featured: false,
    specialties: ["Algerian Apples", "Pears", "Apricots"],
    story: "For three generations, the Benali family has been tending to these orchards using traditional methods passed down through the generations. Our mission is to preserve rare and heirloom Algerian fruit varieties that might otherwise be lost to commercial standardization.",
    practices: [
      "Traditional organic pest management",
      "Drip irrigation systems optimized for water conservation",
      "Biodiversity promotion in dry climate",
      "Minimal intervention approach respecting natural growth cycles"
    ],
    certifications: ["Bio Algérie", "Biodiversity Protection Initiative"],
    contactInfo: {
      email: "fruits@vergerdusahel.dz",
      phone: "(0)26 76 89 23",
      website: "www.vergerdusahel.dz"
    }
  },
  {
    id: 5,
    name: "Prairies de Kabylie",
    location: "Tizi Ouzou, Algeria",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    description: "Pasture-raised chicken, eggs, and lamb from a family farm in the beautiful Kabylie region committed to regenerative agriculture and traditional animal husbandry.",
    productsCount: 12,
    featured: true,
    specialties: ["Free-Range Eggs", "Grass-Fed Lamb", "Heritage Chicken"],
    story: "Prairies de Kabylie began as a regenerative agriculture project in 2012 by the Ait Mouloud family. We focus on rebuilding soil health while producing nutrient-dense foods. Our integrated animal management system helps sequester carbon while producing exceptional quality meats and eggs using traditional Kabyle farming techniques.",
    practices: [
      "Holistic planned grazing adapted to mountainous terrain",
      "Mobile chicken coops for free ranging",
      "Silvopasture systems with native trees",
      "Traditional animal breeding practices"
    ],
    certifications: ["Bio Algérie", "Regenerative Agricultural Network"],
    contactInfo: {
      email: "ferme@prairiesdekabylie.dz",
      phone: "(0)26 12 45 78",
      website: "www.prairiesdekabylie.dz"
    }
  },
  {
    id: 6,
    name: "Céréales de Sétif",
    location: "Sétif, Algeria",
    image: "https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    description: "Dedicated to growing ancient and heritage grain varieties using organic methods. Specializing in wheat, barley, and oats adapted to Algeria's climate.",
    productsCount: 10,
    featured: false,
    specialties: ["Heritage Wheat", "Ancient Grains", "Traditional Couscous"],
    story: "Céréales de Sétif was established in 2008 by former baker Karim Benmalek, who became fascinated with the lost flavors and nutrition of heritage Algerian grains. Today, we cultivate over 15 varieties of rare and ancient grains on 120 hectares of certified organic farmland in the Sétif region, known as Algeria's breadbasket.",
    practices: [
      "No-till farming techniques",
      "Seed saving program for indigenous grain varieties",
      "On-site stone milling using traditional methods",
      "Drought-resistant varieties adapted to local climate"
    ],
    certifications: ["Bio Algérie", "Heritage Seed Preservation Certificate"],
    contactInfo: {
      email: "grains@cerealesdesetif.dz",
      phone: "(0)36 92 18 45",
      website: "www.cerealesdesetif.dz"
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
