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
      answer: "Sí, es seguro. Solo pueden registrarse usuarios con email institucional válido. Además, los perfiles muestran información verificada, puedes ver valoraciones de otros usuarios, y siempre puedes comunicarte a través de nuestro chat interno antes de confirmar un viaje."
    },
    {
      question: "¿Qué pasa si cambia mi horario?",
      answer: "Puedes modificar o cancelar tus viajes programados en cualquier momento desde tu panel. Si eres conductor, te recomendamos avisar a tus pasajeros confirmados con al menos 2 horas de anticipación. Los pasajeros recibirán una notificación automática de cualquier cambio."
    },
    {
      question: "¿Cómo funciona el sistema de costos?",
      answer: "EcoRide es completamente gratuito. La plataforma no cobra comisiones. Los conductores pueden opcionalmente acordar compartir gastos de combustible con los pasajeros de forma directa, pero no es obligatorio. Nuestro objetivo es facilitar la movilidad sostenible, no generar ganancias."
    },
    {
      question: "¿Puedo ser conductor y pasajero?",
      answer: "¡Por supuesto! Tu perfil puede tener ambos roles. Algunos días puedes ofrecer tu auto, y otros días buscar un viaje. Es flexible según tus necesidades de cada jornada."
    },
    {
      question: "¿Qué información necesito para crear un viaje?",
      answer: "Si eres conductor: origen, destino, horario de salida, asientos disponibles y datos de tu vehículo (modelo, color, patente). Si eres pasajero: simplemente buscas por horario y destino, y solicitas unirse a un viaje compatible."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-eco-light to-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold">
              Preguntas 
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                {" "}frecuentes
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Todo lo que necesitas saber sobre EcoRide
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-2xl px-6 shadow-soft hover:shadow-eco transition-all duration-300"
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
