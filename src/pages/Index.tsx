
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import ProducerHighlight from "@/components/home/ProducerHighlight";
import SubscribeSection from "@/components/home/SubscribeSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Features />
        <ProducerHighlight />
        <Testimonials />
        <SubscribeSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
