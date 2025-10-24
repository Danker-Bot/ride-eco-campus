import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import WhySection from "@/components/WhySection";
import AboutSection from "@/components/AboutSection";
import ODSSection from "@/components/ODSSection";
import FAQSection from "@/components/FAQSection";
import LegalsSection from "@/components/LegalsSection";
import ContactSection from "@/components/ContactSection";
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
        <LegalsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
