import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, Users, Leaf } from "lucide-react";
import heroImage from "@/assets/hero-ecoride.jpg";

const HeroSection = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-usal-light via-background to-background -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Programa Institucional USAL</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
              Sistema de Carpooling
              <span className="block text-primary mt-2">
                Universidad del Salvador
              </span>
            </h1>
            
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Plataforma institucional que conecta a la comunidad USAL para compartir viajes hacia el campus. 
              Una iniciativa que promueve la movilidad sostenible y fortalece los vínculos entre estudiantes, docentes y personal administrativo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-usal-gradient text-white hover:opacity-90 transition-all shadow-institutional text-lg group"
              >
                <Link to="/auth">
                  Acceder con email USAL
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all"
                onClick={() => document.getElementById("inicio")?.scrollIntoView({ behavior: "smooth" })}
              >
                Más información
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
            <div className="absolute inset-0 bg-usal-gradient rounded-2xl opacity-15 blur-3xl" />
            <img 
              src={heroImage} 
              alt="Comunidad USAL compartiendo viaje de forma sostenible" 
              className="relative rounded-2xl shadow-2xl w-full h-auto object-cover border border-border/50"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
