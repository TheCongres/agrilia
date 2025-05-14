
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Regular Customer',
    image: 'https://randomuser.me/api/portraits/women/62.jpg',
    content: 'The quality of organic produce I receive from OrganiMarket is exceptional! Everything is always fresh, and I love knowing exactly which local farm my food comes from. The delivery is always on time and the packaging is eco-friendly.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Health Coach',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    content: 'As a health coach, I often recommend OrganiMarket to my clients. The variety of organic options and the transparency about farming practices really sets them apart. My clients have reported great experiences with both the products and service.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Roberts',
    role: 'Mother of Two',
    image: 'https://randomuser.me/api/portraits/women/42.jpg',
    content: "Since switching to OrganiMarket for my family's groceries, I've noticed a significant difference in the taste and quality. My children are now more excited about eating fruits and vegetables, which is a win for any parent!",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-cream">
      <div className="container-custom">
        <div className="text-center mb-12">
          <span className="inline-block category-badge mb-3">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-earth-700 mb-4">
            What Our <span className="text-natural-500">Customers Say</span>
          </h2>
          <p className="text-earth-500 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our loyal customers have to say about 
            their experiences shopping with OrganiMarket.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg p-6 shadow-sm border border-natural-200">
              <div className="flex text-honey mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i}
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-honey' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
              </div>
              <blockquote className="mb-4 text-earth-600">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="h-12 w-12 rounded-full object-cover mr-4"
                />
                <div>
                  <p className="font-semibold text-earth-700">{testimonial.name}</p>
                  <p className="text-sm text-earth-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
