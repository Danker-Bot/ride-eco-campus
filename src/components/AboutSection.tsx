import { Target, Heart, Sprout } from "lucide-react";
import { Card } from "@/components/ui/card";

const AboutSection = () => {
  const values = [
    {
      icon: Target,
      title: "Nuestra misión",
      description: "Fomentar una movilidad más sostenible dentro de nuestra comunidad universitaria, reduciendo el impacto ambiental del transporte diario."
    },
    {
      icon: Heart,
      title: "Nuestra visión",
      description: "Crear una red de transporte compartido que conecte a toda la comunidad académica, haciendo que cada viaje cuente para el planeta."
    },
    {
      icon: Sprout,
      title: "Nuestro compromiso",
      description: "Facilitar el acceso a transporte sostenible y seguro, mientras construimos una comunidad más conectada y consciente del medio ambiente."
    }
  ];

  return (
    <section id="nosotros" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Sobre el 
              <span className="text-primary">
                {" "}Programa EcoRide USAL
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Una iniciativa institucional de la Universidad del Salvador para promover la movilidad sostenible
            </p>
          </div>

          <div className="mb-12 p-8 md:p-12 bg-gradient-to-br from-usal-light to-background rounded-2xl border border-primary/15">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              EcoRide USAL es un programa institucional que surge del compromiso de la Universidad del Salvador 
              con el desarrollo sostenible y la responsabilidad social universitaria. En línea con los valores 
              de nuestra institución expresados en el lema <em>"Ciencia a la mente y virtud al corazón"</em>, 
              buscamos fomentar prácticas sustentables entre nuestra comunidad académica.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              Esta plataforma facilita la organización de viajes compartidos entre estudiantes, docentes y personal 
              administrativo, contribuyendo a la reducción de la huella de carbono institucional y fortaleciendo 
              los lazos de nuestra comunidad universitaria.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="p-6 text-center space-y-4 hover:shadow-institutional transition-all duration-300 hover:-translate-y-1 bg-card border-border"
              >
                <div className="w-16 h-16 rounded-xl bg-usal-gradient mx-auto flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
