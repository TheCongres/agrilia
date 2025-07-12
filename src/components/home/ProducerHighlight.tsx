
import { Link } from "react-router-dom";

const featuredProducers = [
  {
    id: 1,
    name: 'Ferme Verte d\'Alger',
    location: 'Alger, Algeria',
    image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    specialties: ['Organic Vegetables', 'Citrus', 'Herbs'],
    story: 'We\'ve been farming organically for two generations, focusing on biodiversity and sustainable water practices adapted to Algeria\'s climate.',
    years: 18,
  },
  {
    id: 2,
    name: 'Coopérative Laitière de Médéa',
    location: 'Médéa, Algeria',
    image: 'https://images.unsplash.com/photo-1516253593875-bd7ba052fbc5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    specialties: ['Milk', 'Traditional Cheese', 'Yogurt'],
    story: 'Our grass-fed cattle produce exceptional dairy products while we maintain the highest animal welfare standards in the Médéa region.',
    years: 12,
  },
  {
    id: 3,
    name: 'Céréales de Sétif',
    location: 'Sétif, Algeria',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    specialties: ['Grains', 'Couscous', 'Semolina'],
    story: 'We believe in preserving traditional Algerian cereal varieties while implementing modern sustainable farming techniques to create authentic products.',
    years: 15,
  },
];

const ProducerHighlight = () => {
  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block category-badge mb-3">Our Producers</span>
          <h2 className="text-3xl md:text-4xl font-bold text-earth-700 mb-4">
            Meet the <span className="text-natural-500">Farmers</span> Behind Your Food
          </h2>
          <p className="text-earth-500 max-w-2xl mx-auto">
            We work directly with passionate local farmers across Algeria committed to sustainable and organic 
            farming practices. Get to know the people who grow your food using traditional Algerian agricultural methods.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {featuredProducers.map((producer) => (
            <div key={producer.id} className="card-organic overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={producer.image}
                  alt={producer.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-earth-700/80 to-transparent p-4">
                  <h3 className="font-semibold text-white text-xl">{producer.name}</h3>
                  <p className="text-white/80">{producer.location}</p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-xs text-natural-600 font-medium bg-natural-100 rounded-full px-3 py-1">
                    {producer.years} Years of Organic Farming
                  </div>
                  <div className="flex space-x-1">
                    {producer.specialties.slice(0, 2).map((specialty, index) => (
                      <span key={index} className="text-xs bg-earth-100 text-earth-600 px-2 py-1 rounded">
                        {specialty}
                      </span>
                    ))}
                    {producer.specialties.length > 2 && (
                      <span className="text-xs bg-earth-100 text-earth-600 px-2 py-1 rounded">
                        +{producer.specialties.length - 2}
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-earth-600 mb-4">{producer.story}</p>
                <div className="text-center">
                  <Link to={`/producer/${producer.id}`} className="text-natural-600 hover:text-natural-700 font-medium">
                    View Producer Profile →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Link to="/producers" className="btn-secondary inline-block">
            Meet All Our Producers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProducerHighlight;
