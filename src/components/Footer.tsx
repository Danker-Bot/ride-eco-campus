import { Leaf, Mail, MapPin, Phone } from "lucide-react";
import usualLogo from "@/assets/usal-logo.png";

const Footer = () => {
  return (
    <footer className="bg-usal-dark text-background py-8 sm:py-12 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={usualLogo} 
                alt="Universidad del Salvador" 
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-lg font-semibold">EcoRide USAL</p>
            <p className="text-background/70 leading-relaxed text-sm">
              Programa institucional de movilidad sostenible de la Universidad del Salvador. 
              Promoviendo el compromiso ambiental y la integración de nuestra comunidad.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Enlaces rápidos</h3>
            <ul className="space-y-2 text-background/80">
              <li><a href="#inicio" className="hover:text-background transition-colors">Inicio</a></li>
              <li><a href="#nosotros" className="hover:text-background transition-colors">Nosotros</a></li>
              <li><a href="#faq" className="hover:text-background transition-colors">FAQ</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contacto Institucional</h3>
            <div className="space-y-3 text-background/70 text-sm">
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5" />
                <span>ecoride@usal.edu.ar</span>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5" />
                <span>+54 11 4813-1408</span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Av. Callao 801, C1020ADP<br />Buenos Aires, Argentina</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-background/20 text-center text-background/50 text-sm">
          <p>&copy; {new Date().getFullYear()} Universidad del Salvador - EcoRide USAL. Todos los derechos reservados.</p>
          <p className="mt-2 text-xs">Programa de Sustentabilidad y Responsabilidad Social Universitaria</p>
          <p className="mt-2 text-sm font-medium">Realizado con amor por alumnos de Ing Informática ❤️</p>
          <p className="mt-1 text-sm font-medium">Realizado en la Hackaton 2025</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
