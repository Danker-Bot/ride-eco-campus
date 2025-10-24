import { Card, CardContent } from "@/components/ui/card";
import ods11 from "@/assets/ods-11.png";
import ods12 from "@/assets/ods-12.png";
import ods13 from "@/assets/ods-13.png";
import ods17 from "@/assets/ods-17.png";

const ODSSection = () => {
  const odsItems = [
    {
      number: 11,
      title: "Ciudades y Comunidades Sostenibles",
      description: "EcoRide contribuye a crear un campus universitario más accesible y sostenible, reduciendo el tráfico vehicular individual y promoviendo la movilidad compartida dentro de la comunidad USAL.",
      image: ods11,
    },
    {
      number: 13,
      title: "Acción por el Clima",
      description: "Cada viaje compartido reduce significativamente las emisiones de CO₂. Nuestro sistema calcula y visualiza el impacto ambiental positivo, motivando a la comunidad a seguir contribuyendo a la lucha contra el cambio climático.",
      image: ods13,
    },
    {
      number: 12,
      title: "Producción y Consumo Responsable",
      description: "Fomentamos el uso eficiente de recursos al maximizar la ocupación de vehículos, reduciendo el consumo de combustible per cápita y promoviendo patrones de movilidad más conscientes y sostenibles.",
      image: ods12,
    },
    {
      number: 17,
      title: "Alianzas para Lograr los Objetivos",
      description: "EcoRide fortalece la colaboración entre estudiantes, creando una red de apoyo mutuo que trasciende lo académico y construye una comunidad universitaria más unida y comprometida.",
      image: ods17,
    },
  ];

  return (
    <section id="ods" className="py-20 bg-gradient-to-b from-background to-usal-light/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-sm font-medium text-primary">Compromiso Institucional</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Objetivos de Desarrollo Sostenible
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            EcoRide USAL está alineado con la Agenda 2030 de las Naciones Unidas, 
            contribuyendo activamente a cuatro Objetivos de Desarrollo Sostenible clave.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {odsItems.map((item) => {
            return (
              <Card
                key={item.number}
                className="border-usal-light/20 shadow-usal-soft hover:shadow-usal-glow transition-all duration-300 group"
              >
                <CardContent className="pt-6 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="group-hover:scale-105 transition-transform">
                      <img 
                        src={item.image} 
                        alt={`ODS ${item.number} - ${item.title}`}
                        className="w-20 h-20 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 text-foreground">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Card className="border-usal-green/20 bg-usal-green/5 shadow-usal-soft max-w-4xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold text-usal-green mb-4">
                Nuestro Compromiso con el 2030
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Para el año 2030, EcoRide USAL se compromete a consolidar una cultura de movilidad 
                sostenible en toda la comunidad universitaria, reduciendo significativamente la huella 
                de carbono del transporte hacia el campus, promoviendo la equidad en el acceso a la 
                educación mediante soluciones de movilidad accesibles, y fortaleciendo las alianzas 
                entre los miembros de nuestra comunidad para construir un futuro más sostenible y justo.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ODSSection;
