import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <div className="w-10 h-10 rounded-full bg-eco-gradient flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EcoRide
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection("inicio")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Inicio
            </button>
            <button 
              onClick={() => scrollToSection("nosotros")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Nosotros
            </button>
            <button 
              onClick={() => scrollToSection("faq")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              FAQ
            </button>
          </div>

          <Button 
            onClick={() => scrollToSection("hero")}
            className="bg-eco-gradient text-white hover:opacity-90 transition-opacity shadow-eco"
          >
            Empezar ahora
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
