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
            <h2 className="text-4xl md:text-5xl font-bold">
              Sobre 
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}EcoRide
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Somos un proyecto nacido del compromiso con el medio ambiente y nuestra comunidad universitaria
            </p>
          </div>

          <div className="mb-12 p-8 md:p-12 bg-gradient-to-br from-eco-light to-background rounded-3xl border border-primary/20">
            <p className="text-lg text-foreground leading-relaxed mb-6">
              EcoRide nació de una simple observación: cada mañana, cientos de autos llegan a la facultad 
              con un solo ocupante. Esto genera congestión, contamina el aire y representa un gasto 
              innecesario para estudiantes y profesores.
            </p>
            <p className="text-lg text-foreground leading-relaxed">
              Nuestro equipo decidió crear una solución que fuera segura, fácil de usar y 
              exclusivamente para nuestra comunidad. Así nació EcoRide: una plataforma donde 
              compartir el viaje es tan simple como un par de clics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card 
                key={index}
                className="p-6 text-center space-y-4 hover:shadow-eco transition-all duration-300 hover:-translate-y-1 bg-card border-border/50"
              >
                <div className="w-16 h-16 rounded-2xl bg-eco-gradient mx-auto flex items-center justify-center">
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
