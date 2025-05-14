
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-natural-50 overflow-hidden">
      <div className="container-custom py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 text-center md:text-left">
            <span className="inline-block category-badge bg-natural-100 text-natural-600 uppercase tracking-wide">
              Fresh & Organic
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-earth-700 leading-tight">
              <span className="text-natural-500">Fresh</span> Organic <br /> Products Directly <br /> from Farmers
            </h1>
            <p className="text-earth-500 md:text-lg max-w-md mx-auto md:mx-0">
              Support local agriculture and enjoy the freshest organic produce delivered right to your doorstep.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="/products" className="btn-primary inline-block">
                Shop Now
              </Link>
              <Link to="/producers" className="btn-secondary inline-block">
                Meet Our Producers
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 mt-8 justify-center md:justify-start text-sm">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-natural-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-natural-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <span className="text-earth-600">Local Delivery<br /><span className="text-xs text-earth-400">Within 24-48 hours</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-natural-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-natural-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <span className="text-earth-600">Certified Organic<br /><span className="text-xs text-earth-400">100% guaranteed</span></span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-natural-100 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-natural-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <span className="text-earth-600">Secure Payments<br /><span className="text-xs text-earth-400">100% protected</span></span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] bg-natural-200 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                alt="Fresh organic vegetables"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-white p-4 rounded-lg shadow-lg max-w-xs hidden md:block">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-natural-100 flex items-center justify-center">
                  <span className="text-natural-600 font-bold">100%</span>
                </div>
                <div>
                  <h4 className="font-medium text-earth-700">Organic Certified</h4>
                  <p className="text-xs text-earth-500">All our products are certified organic</p>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -left-4 md:top-1/4 md:left-auto md:-right-6 bg-white p-3 rounded-lg shadow-lg text-center max-w-[130px]">
              <div className="text-natural-600 mb-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 1 0 10 10H12V2Z"></path>
                  <path d="M12 12 2.1 12.5"></path>
                  <path d="M16.47 7.53 12 12"></path>
                </svg>
              </div>
              <h4 className="font-medium text-earth-700">Farm Fresh</h4>
              <p className="text-xs text-earth-500">Directly from local farms to your table</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
    </section>
  );
};

export default Hero;
