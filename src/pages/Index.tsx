import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhySection from "@/components/WhySection";
import AboutSection from "@/components/AboutSection";
import ODSSection from "@/components/ODSSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <WhySection />
        <AboutSection />
        <ODSSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
