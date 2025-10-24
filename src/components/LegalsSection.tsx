import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Scale } from "lucide-react";

const LegalsSection = () => {
  return (
    <section id="legales" className="py-16 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-12">
          <Scale className="h-8 w-8 text-usal-green" />
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Información Legal
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Términos y Condiciones</CardTitle>
              <CardDescription>Última actualización: 2025</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                EcoRide USAL es una plataforma de carpooling destinada exclusivamente
                a estudiantes, docentes y personal de la Universidad del Salvador.
                Al utilizar este servicio, aceptás los siguientes términos:
              </p>
              <ul>
                <li>El servicio es gratuito y de carácter colaborativo</li>
                <li>Los usuarios son responsables de verificar la identidad de conductores y pasajeros</li>
                <li>La plataforma no se hace responsable por incidentes durante los viajes</li>
                <li>Se espera un comportamiento respetuoso y responsable de todos los usuarios</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Política de Privacidad</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                Protegemos tu información personal y la utilizamos únicamente
                para facilitar el servicio de carpooling:
              </p>
              <ul>
                <li>Recopilamos nombre, email y datos de contacto</li>
                <li>La información de ubicación se usa solo durante viajes activos</li>
                <li>No compartimos datos personales con terceros</li>
                <li>Los datos bancarios (CBU/CVU/Alias) son opcionales y solo para pagos entre usuarios</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responsabilidades</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none">
              <p>
                Los conductores se comprometen a:
              </p>
              <ul>
                <li>Mantener su vehículo en condiciones seguras</li>
                <li>Cumplir con todas las normas de tránsito</li>
                <li>Poseer licencia de conducir vigente y seguro del vehículo</li>
              </ul>
              <p>
                Los pasajeros se comprometen a:
              </p>
              <ul>
                <li>Ser puntuales en los puntos de encuentro</li>
                <li>Respetar las normas del conductor</li>
                <li>Contribuir con gastos de combustible según acordado</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default LegalsSection;
