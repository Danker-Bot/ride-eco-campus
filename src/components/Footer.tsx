import { Leaf, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-eco-gradient flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">EcoRide</span>
            </div>
            <p className="text-background/80 leading-relaxed">
              Movilidad sostenible para nuestra comunidad universitaria. 
              Juntos reducimos nuestra huella de carbono.
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
            <h3 className="text-lg font-bold">Contacto</h3>
            <div className="space-y-3 text-background/80">
              <div className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <span>contacto@ecoride.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Campus Universitario</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-background/20 text-center text-background/60">
          <p>&copy; {new Date().getFullYear()} EcoRide. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
