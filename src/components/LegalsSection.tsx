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
            <CardContent className="prose prose-sm max-w-none text-sm md:text-base">
              <p className="text-sm md:text-base">
                EcoRide USAL es una plataforma de carpooling destinada <strong>exclusivamente
                a estudiantes</strong> de la Universidad del Salvador.
                Al utilizar este servicio, aceptás los siguientes términos:
              </p>
              <ul className="text-sm md:text-base space-y-2">
                <li>El servicio es una plataforma de conexión colaborativa entre miembros de la comunidad USAL</li>
                <li>Los usuarios son responsables de verificar la identidad de conductores y pasajeros</li>
                <li>Los conductores deben contar con licencia de conducir vigente y seguro automotor</li>
                <li>Los viajes compartidos están limitados exclusivamente a trayectos hacia/desde las instalaciones de la Universidad del Salvador</li>
                <li>Se espera un comportamiento respetuoso y responsable de todos los usuarios</li>
                <li>La plataforma facilita el contacto entre usuarios pero no es responsable de lo que ocurra durante los viajes</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cobertura de Seguro</CardTitle>
              <CardDescription>Protección para conductores y pasajeros</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-sm md:text-base">
              <h3 className="font-semibold text-base md:text-lg mb-2">Convenio con Federación Patronal</h3>
              <p className="text-sm md:text-base">
                EcoRide USAL mantiene un convenio especial con <strong>Federación Patronal Seguros</strong>,
                aseguradora líder en Argentina, para brindar protección adicional a nuestra comunidad.
              </p>
              
              <h4 className="font-semibold text-sm md:text-base mt-4 mb-2">Seguro por Tercero Transportado Total</h4>
              <p className="text-sm md:text-base">
                Los conductores que participen activamente en EcoRide (mínimo 25 conductores activos)
                podrán acceder a un <strong>15% de descuento</strong> en la contratación del seguro
                por tercero transportado total, que cubre:
              </p>
              <ul className="text-sm md:text-base space-y-2">
                <li>Lesiones y/o muerte de pasajeros transportados</li>
                <li>Gastos médicos, farmacéuticos y de internación</li>
                <li>Indemnizaciones por incapacidad total o parcial</li>
                <li>Cobertura hasta los montos establecidos por la póliza</li>
              </ul>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-3 md:p-4 rounded-lg mt-4 border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-semibold text-xs md:text-sm mb-2 text-yellow-900 dark:text-yellow-200">⚠️ Importante: Limitación Geográfica</h4>
                <p className="text-yellow-800 dark:text-yellow-300 text-xs md:text-sm">
                  La cobertura del convenio con Federación Patronal es <strong>exclusivamente válida
                  para viajes con destino u origen en las instalaciones de la Universidad del Salvador</strong>.
                  Los viajes realizados fuera de este contexto no están cubiertos por este convenio especial.
                </p>
              </div>

              <h4 className="font-semibold text-sm md:text-base mt-4 mb-2">Responsabilidad del Conductor</h4>
              <p className="text-sm md:text-base">
                Cada conductor es responsable de mantener vigente su seguro automotor obligatorio
                y, opcionalmente, contratar coberturas adicionales. La participación en el programa
                de descuentos es voluntaria y requiere cumplir con los requisitos establecidos.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Política de Privacidad</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-sm md:text-base">
              <p className="text-sm md:text-base">
                Protegemos tu información personal y la utilizamos únicamente
                para facilitar el servicio de carpooling:
              </p>
              <ul className="text-sm md:text-base space-y-2">
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
            <CardContent className="prose prose-sm max-w-none text-sm md:text-base">
              <p className="text-sm md:text-base">
                Los conductores se comprometen a:
              </p>
              <ul className="text-sm md:text-base space-y-2">
                <li>Mantener su vehículo en condiciones seguras</li>
                <li>Cumplir con todas las normas de tránsito</li>
                <li>Poseer licencia de conducir vigente y seguro del vehículo</li>
              </ul>
              <p className="text-sm md:text-base mt-4">
                Los pasajeros se comprometen a:
              </p>
              <ul className="text-sm md:text-base space-y-2">
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
