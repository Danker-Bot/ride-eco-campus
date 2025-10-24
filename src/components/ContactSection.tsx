import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, MessageCircle, Phone } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contacto" className="py-16 sm:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-12">
          <MessageCircle className="h-8 w-8 text-usal-green" />
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Contacto
          </h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="border-usal-light/20 shadow-usal-soft">
            <CardHeader className="text-center">
              <CardTitle>¿Necesitás ayuda?</CardTitle>
              <CardDescription>
                Estamos para ayudarte con cualquier consulta sobre EcoRide USAL
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center space-y-3">
                  <div className="bg-usal-gradient p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold">Email</h3>
                  <a 
                    href="mailto:ecoride@usal.edu.ar"
                    className="text-sm text-muted-foreground hover:text-usal-green transition-colors"
                  >
                    ecoride@usal.edu.ar
                  </a>
                </div>

                <div className="text-center space-y-3">
                  <div className="bg-usal-gradient p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold">Teléfono</h3>
                  <a 
                    href="tel:+541143721500"
                    className="text-sm text-muted-foreground hover:text-usal-green transition-colors"
                  >
                    +54 11 4372-1500
                  </a>
                </div>

                <div className="text-center space-y-3">
                  <div className="bg-usal-gradient p-3 rounded-full w-12 h-12 mx-auto flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <a 
                    href="https://wa.me/5491143721500"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-usal-green transition-colors"
                  >
                    Enviar mensaje
                  </a>
                </div>
              </div>

              <div className="mt-8 p-4 bg-muted/50 rounded-lg text-center">
                <p className="text-sm text-muted-foreground">
                  Horario de atención: Lunes a Viernes de 9:00 a 18:00 hs
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
