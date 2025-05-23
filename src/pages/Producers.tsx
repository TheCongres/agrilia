
import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProducerCard from "@/components/producers/ProducerCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const producersData = [
  {
    id: 1,
    name: "Ferme Verte d'Alger",
    location: "Alger, Algeria",
    image: "https://images.unsplash.com/photo-1581578017093-cd30fce4eeb7?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    description: "Family-owned organic farm specializing in heirloom vegetables and fruits. Ferme Verte d'Alger has been practicing sustainable farming for over 20 years in the fertile plains surrounding Algiers.",
    productsCount: 28,
    featured: true,
    specialties: ["Heirloom Tomatoes", "Citrus Fruits", "Leafy Greens"]
  },
  {
    id: 2,
    name: "Coopérative Laitière de Médéa",
    location: "Médéa, Algeria",
    image: "https://plus.unsplash.com/premium_photo-1663134176504-c64cede0d0a2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
    description: "A cooperative of small dairy farms committed to ethical treatment of httpsanimals and organic practices. Producing milk, cheese, and traditional Algerian yogurt including raib and leben.",
    productsCount: 15,
    featured: true,
    specialties: ["Raw Milk", "Artisan Cheese", "Traditional Yogurt"]
  },
  {
    id: 3,
    name: "Ruches de l'Atlas",
    location: "Blida, Algeria",
    image: "https://plus.unsplash.com/premium_photo-1663091140962-a196d64fe28b?q=80&w=1431&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Sustainable beekeeping operation producing raw honey, beeswax products, and pollination services for other organic farms in the Atlas Mountains region of Blida.",
    productsCount: 8,
    featured: false,
    specialties: ["Atlas Mountain Honey", "Bee Pollen", "Honeycomb"]
  },
  {
    id: 4,
    name: "Verger du Sahel",
    location: "Bouira, Algeria",
    image: "https://plus.unsplash.com/premium_photo-1726863299667-bcaa91425faa?q=80&w=1504&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Specializing in organic apples, pears, and stone fruits. Verger du Sahel maintains over 40 varieties of fruit trees adapted to Algeria's unique Mediterranean and semi-arid climate.",
    productsCount: 22,
    featured: false,
    specialties: ["Algerian Apples", "Pears", "Apricots"]
  },
  {
    id: 5,
    name: "Prairies de Kabylie",
    location: "Tizi Ouzou, Algeria",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=500",
    description: "Pasture-raised chicken, eggs, and lamb from a family farm in the beautiful Kabylie mountains, committed to regenerative agriculture and traditional Amazigh farming practices.",
    productsCount: 12,
    featured: true,
    specialties: ["Free-Range Eggs", "Grass-Fed Lamb", "Heritage Chicken"]
  },
  {
    id: 6,
    name: "Céréales de Sétif",
    location: "Sétif, Algeria",
    image: "https://plus.unsplash.com/premium_photo-1664475332585-573f7d80bb9d?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Dedicated to growing ancient and heritage grain varieties using organic methods. Specializing in wheat, barley, and oats in the fertile high plateaus of Sétif, historically known as Algeria's breadbasket.",
    productsCount: 10,
    featured: false,
    specialties: ["Heritage Wheat", "Ancient Grains", "Traditional Couscous"]
  },
];

const Producers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredProducers = producersData.filter(producer => 
    producer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    producer.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
