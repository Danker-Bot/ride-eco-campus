import { Button } from "@/components/ui/button";
import usualLogo from "@/assets/usal-logo.png";

const Navbar = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b border-border shadow-subtle">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection("hero")}>
            <img 
              src={usualLogo} 
              alt="Universidad del Salvador" 
              className="h-14 w-auto"
            />
            <div className="border-l border-border pl-3 ml-1">
              <span className="text-xl font-bold text-primary">
                EcoRide USAL
              </span>
              <p className="text-xs text-muted-foreground">Movilidad Sostenible</p>
            </div>
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
            className="bg-usal-gradient text-white hover:opacity-90 transition-all shadow-institutional"
          >
            Acceder al Sistema
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
