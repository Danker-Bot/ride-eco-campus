import { Button } from "@/components/ui/button";
import { ArrowRight, Car, Users, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-ecoride.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-eco-light via-background to-background -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Movilidad sostenible institucional</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Comparte el viaje,
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}reduce tu huella
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              Conecta con estudiantes y profesores que hacen el mismo recorrido. 
              Ahorra dinero, reduce emisiones de CO₂ y construye comunidad.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-eco-gradient text-white hover:opacity-90 transition-opacity shadow-eco text-lg group"
              >
                Empezar ahora
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
              >
                Conocer más
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Car className="w-5 h-5" />
                  <span className="text-3xl font-bold">350+</span>
                </div>
                <p className="text-sm text-muted-foreground">Viajes compartidos</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Users className="w-5 h-5" />
                  <span className="text-3xl font-bold">1.2K</span>
                </div>
                <p className="text-sm text-muted-foreground">Usuarios activos</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary">
                  <Leaf className="w-5 h-5" />
                  <span className="text-3xl font-bold">2.5T</span>
                </div>
                <p className="text-sm text-muted-foreground">CO₂ reducido</p>
              </div>
            </div>
          </div>

          <div className="relative lg:block hidden">
            <div className="absolute inset-0 bg-eco-gradient rounded-3xl opacity-20 blur-3xl" />
            <img 
              src={heroImage} 
              alt="Estudiantes compartiendo viaje de forma sostenible" 
              className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
