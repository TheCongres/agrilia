
const Features = () => {
  return (
    <section className="py-16 bg-natural-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="inline-block category-badge mb-3">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-earth-700 mb-4">
            The <span className="text-natural-500">Benefits</span> of Shopping with Us
          </h2>
          <p className="text-earth-500 max-w-2xl mx-auto">
            We're committed to providing the freshest organic produce while supporting local farmers and
            sustainable agricultural practices.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-natural-100 text-center">
            <div className="w-16 h-16 bg-natural-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-natural-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-earth-700 mb-2">Local Sourcing</h3>
            <p className="text-earth-500">
              All our products are sourced locally from farmers within a 100-mile radius, reducing transportation
              emissions and supporting local economies.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-natural-100 text-center">
            <div className="w-16 h-16 bg-natural-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-natural-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 9.5V4.5L15.5 15.5H11c-1.1 0-2.1.6-2.7 1.5L5.5 22"></path>
                <path d="M20 5a2 2 0 1 0-4 0v4.5a.5.5 0 0 0 .5.5H20a.5.5 0 0 0 .5-.5V5.5"></path>
                <path d="M22 5c0 2 0 3-1 4"></path>
                <path d="M17 10h.01"></path>
                <path d="M11 12a3 3 0 0 1 .223 5.996L11 18H8l-2 3"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-earth-700 mb-2">Sustainable Farming</h3>
            <p className="text-earth-500">
              We collaborate exclusively with farmers practicing sustainable agriculture methods that protect our soil, 
              water resources, and biodiversity.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-natural-100 text-center">
            <div className="w-16 h-16 bg-natural-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-natural-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"></path>
                <rect x="9" y="3" width="6" height="4" rx="2"></rect>
                <path d="m9 14 2 2 4-4"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-earth-700 mb-2">Quality Guaranteed</h3>
            <p className="text-earth-500">
              Every product undergoes strict quality checks. If you're not completely satisfied with the quality,
              we offer a 100% money-back guarantee.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-natural-100 text-center">
            <div className="w-16 h-16 bg-natural-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-natural-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="M7 15h0M2 9.5h20"></path>
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-earth-700 mb-2">Easy Payment Options</h3>
            <p className="text-earth-500">
              Multiple secure payment options including credit cards, digital wallets, and cash on delivery 
              for your convenience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
