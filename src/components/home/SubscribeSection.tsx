
import { useState } from 'react';

const SubscribeSection = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would normally handle the email submission
    // For MVP, just show success state
    setSubmitted(true);
  };
  
  return (
    <section className="py-16 bg-natural-600 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Fresh Updates & Special Offers
          </h2>
          <p className="text-natural-50 mb-8">
            Subscribe to our newsletter to receive updates on new products, seasonal harvests, 
            special promotions, and organic farming tips.
          </p>
          
          {submitted ? (
            <div className="p-4 bg-white/10 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-natural-100" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <h3 className="text-xl font-semibold mt-4">Thank You For Subscribing!</h3>
              <p className="text-natural-100 mt-2">
                You've been added to our mailing list and will receive updates on our latest products and offers.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-white"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit" 
                className="bg-white text-natural-600 hover:bg-natural-50 font-medium py-3 px-6 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          )}
          
          <p className="mt-4 text-sm text-natural-100">
            We respect your privacy and will never share your information.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white/10 p-4 rounded-md">
              <div className="text-2xl font-bold">25+</div>
              <div className="text-natural-100">Local Farms</div>
            </div>
            <div className="bg-white/10 p-4 rounded-md">
              <div className="text-2xl font-bold">150+</div>
              <div className="text-natural-100">Organic Products</div>
            </div>
            <div className="bg-white/10 p-4 rounded-md">
              <div className="text-2xl font-bold">10k+</div>
              <div className="text-natural-100">Happy Customers</div>
            </div>
            <div className="bg-white/10 p-4 rounded-md">
              <div className="text-2xl font-bold">98%</div>
              <div className="text-natural-100">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscribeSection;
