import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "¿Cómo se calcula el CO₂ ahorrado?",
      answer: "Calculamos las emisiones promedio de un auto según la distancia del viaje. Cuando compartes el viaje, dividimos esas emisiones entre los pasajeros. La diferencia entre viajar solo y compartir es el CO₂ que ahorras. Por ejemplo, un viaje de 10km compartido entre 3 personas ahorra aproximadamente 1.5kg de CO₂."
    },
    {
      question: "¿Es seguro compartir viaje?",
      answer: "Absolutamente. Solo pueden registrarse usuarios con email institucional @usal.edu.ar verificado. Los perfiles incluyen información validada por la universidad, puedes ver valoraciones de otros miembros de la comunidad USAL, y la comunicación se realiza a través de nuestro sistema interno seguro antes de confirmar cualquier viaje."
    },
    {
      question: "¿Qué pasa si cambia mi horario?",
      answer: "Puedes modificar o cancelar tus viajes programados en cualquier momento desde tu panel. Si eres conductor, te recomendamos avisar a tus pasajeros confirmados con al menos 2 horas de anticipación. Los pasajeros recibirán una notificación automática de cualquier cambio."
    },
    {
      question: "¿Cómo funciona el sistema de costos?",
      answer: "EcoRide USAL es un servicio institucional completamente gratuito provisto por la universidad. No se cobran comisiones. Los usuarios pueden opcionalmente coordinar de forma privada el compartir gastos de combustible, pero no es un requisito del programa. El objetivo es promover la sustentabilidad, no generar lucro."
    },
    {
      question: "¿Puedo ser conductor y pasajero?",
      answer: "¡Por supuesto! Tu perfil puede tener ambos roles. Algunos días puedes ofrecer tu auto, y otros días buscar un viaje. Es flexible según tus necesidades de cada jornada."
    },
    {
      question: "¿Qué información necesito para crear un viaje?",
      answer: "Como conductor: punto de partida, destino (campus USAL), horario de salida, asientos disponibles y datos del vehículo (modelo, color, patente). Como pasajero: simplemente busca por horario y destino, y solicita unirse a un viaje compatible con tu itinerario."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-eco-light to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Preguntas 
              <span className="text-primary">
                {" "}frecuentes
              </span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Todo lo que necesita saber sobre el programa EcoRide USAL
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border rounded-xl px-6 shadow-subtle hover:shadow-institutional transition-all duration-300"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
