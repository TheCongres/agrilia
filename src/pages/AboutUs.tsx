
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-natural-50 py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block category-badge mb-3">Our Story</span>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-earth-700 mb-6">
                  Bringing <span className="text-natural-500">Organic Goodness</span> to Your Table
                </h1>
                <p className="text-earth-600 text-lg mb-6">
                  AgriLia was founded in 2025 with a simple mission: to create a direct connection between 
                  local organic farmers and conscious consumers. We believe in supporting sustainable agriculture 
                  and making organic food accessible to everyone.
                </p>
                <p className="text-earth-600">
                  What started as a small cooperative of 5 farms has grown into a thriving marketplace 
                  with over 50 producers offering hundreds of organic products, while maintaining our 
                  core values of sustainability, transparency, and community support.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden shadow-xl">
                <AspectRatio ratio={4/3}>
                  <img
                    src="https://images.unsplash.com/photo-1626906722163-bd4c03cb3b9b?ixlib=rb-4.0.3&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800"
                    alt="Organic farmers at work"
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="inline-block category-badge mb-3">Our Values</span>
              <h2 className="text-3xl md:text-4xl font-bold text-earth-700 mb-4">
                What We <span className="text-natural-500">Stand For</span>
              </h2>
              <p className="text-earth-500 max-w-2xl mx-auto">
                These core principles guide every decision we make as we build a more sustainable food system.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm border border-natural-200 text-center">
                <div className="bg-natural-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-natural-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-earth-700">Sustainability</h3>
                <p className="text-earth-500">
                  We prioritize farming practices that protect and enhance our environment for future generations, 
                  supporting regenerative agriculture and reducing food miles.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-natural-200 text-center">
                <div className="bg-natural-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-natural-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-earth-700">Community Support</h3>
                <p className="text-earth-500">
                  We believe in fair prices for farmers and accessibility for consumers, creating a food 
                  system that supports local communities and economies.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-sm border border-natural-200 text-center">
                <div className="bg-natural-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-natural-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-earth-700">Transparency</h3>
                <p className="text-earth-500">
                  We provide complete information about our products' origins and farming methods, 
                  empowering customers to make informed choices about their food.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 bg-cream">
          <div className="container-custom">
            <div className="text-center mb-12">
              <span className="inline-block category-badge mb-3">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-bold text-earth-700 mb-4">
                Meet The <span className="text-natural-500">Team</span>
              </h2>
              <p className="text-earth-500 max-w-2xl mx-auto">
                Our passionate team is dedicated to building a better food system for everyone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Amina Benali",
                  role: "Founder & CEO",
                  image: "https://randomuser.me/api/portraits/women/23.jpg",
                  bio: "Former organic farmer with 15 years of experience in sustainable agriculture."
                },
                {
                  name: "Karim Boudaoud",
                  role: "Operations Director",
                  image: "https://randomuser.me/api/portraits/men/52.jpg",
                  bio: "Logistics expert passionate about reducing food waste and improving efficiency."
                },
                {
                  name: "Leila Medjdoub",
                  role: "Producer Relations",
                  image: "https://randomuser.me/api/portraits/women/33.jpg", 
                  bio: "Works directly with our farmers to ensure quality and sustainable practices."
                },
                {
                  name: "Nassim Hadjadj",
                  role: "Customer Experience",
                  image: "https://randomuser.me/api/portraits/men/41.jpg",
                  bio: "Dedicated to creating a seamless shopping experience for our customers."
                }
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-natural-200">
                  <div className="p-1">
                    <img src={member.image} alt={member.name} className="w-full aspect-square object-cover" />
                  </div>
                  <div className="p-4 text-center">
                    <h3 className="text-xl font-semibold text-earth-700">{member.name}</h3>
                    <p className="text-natural-500 font-medium mb-2">{member.role}</p>
                    <p className="text-earth-500 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <div className="container-custom">
            <div className="bg-natural-100 rounded-lg p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <div>
                  <span className="inline-block category-badge mb-3">Get In Touch</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-earth-700 mb-4">
                    Have <span className="text-natural-500">Questions?</span>
                  </h2>
                  <p className="text-earth-500 mb-6">
                    We'd love to hear from you. Whether you're a customer with questions or a producer 
                    interested in joining our marketplace, reach out to us.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-white p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-natural-500" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-earth-700">Address</h4>
                        <p className="text-earth-500">123 Agriculture Lane, Algiers, Algeria</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-white p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-natural-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-earth-700">Email</h4>
                        <p className="text-earth-500">hello@agrilia.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="bg-white p-2 rounded-full mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-natural-500" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-earth-700">Phone</h4>
                        <p className="text-earth-500">(+213) 555-123-456</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow-sm border border-natural-200">
                  <h3 className="text-xl font-semibold mb-4 text-earth-700">Send us a message</h3>
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-earth-600 mb-1">Name</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full px-3 py-2 border border-natural-300 rounded-md focus:outline-none focus:ring-1 focus:ring-natural-500"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-earth-600 mb-1">Email</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full px-3 py-2 border border-natural-300 rounded-md focus:outline-none focus:ring-1 focus:ring-natural-500"
                          placeholder="Your email"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="subject" className="block text-sm font-medium text-earth-600 mb-1">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        className="w-full px-3 py-2 border border-natural-300 rounded-md focus:outline-none focus:ring-1 focus:ring-natural-500"
                        placeholder="Subject of your message"
                      />
                    </div>
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-medium text-earth-600 mb-1">Message</label>
                      <textarea
                        id="message"
                        rows={4}
                        className="w-full px-3 py-2 border border-natural-300 rounded-md focus:outline-none focus:ring-1 focus:ring-natural-500"
                        placeholder="Your message"
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="bg-natural-500 hover:bg-natural-600 text-white font-medium py-2 px-6 rounded-md transition-colors w-full"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;
