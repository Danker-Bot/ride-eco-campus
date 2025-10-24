import { useEffect, useState } from "react";
import { Leaf, Car, TrendingDown, Users } from "lucide-react";
import { Card } from "@/components/ui/card";

const WhySection = () => {
  const [co2Saved, setCo2Saved] = useState(0);
  const targetCo2 = 2547;

  useEffect(() => {
    const interval = setInterval(() => {
      setCo2Saved((prev) => {
        if (prev >= targetCo2) return targetCo2;
        return prev + Math.ceil(targetCo2 / 100);
      });
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const benefits = [
    {
      icon: Leaf,
      title: "Reduce tu huella de carbono",
      description: "Cada viaje compartido reduce emisiones de CO₂ significativamente",
      stat: "-40%",
      statLabel: "emisiones promedio"
    },
    {
      icon: Car,
      title: "Ahorra dinero en transporte",
      description: "Comparte los gastos de combustible y reduce drásticamente el consumo",
      stat: "$120K - 140K",
      statLabel: "ahorro mensual"
    },
    {
      icon: Users,
      title: "Construye comunidad",
      description: "Conoce a otros estudiantes en cada viaje",
      stat: "1.2K",
      statLabel: "estudiantes activos"
    },
    {
      icon: TrendingDown,
      title: "Menos tráfico en campus",
      description: "Ayuda a descongestionar el estacionamiento universitario",
      stat: "60%",
      statLabel: "menos congestión"
    }
  ];

  return (
    <section id="inicio" className="py-24 bg-gradient-to-b from-background to-eco-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            ¿Por qué es necesario 
            <span className="text-primary">
              {" "}EcoRide USAL
            </span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La Universidad del Salvador promueve la responsabilidad ambiental y social. 
            Este programa busca reducir la huella de carbono institucional mediante la colaboración de nuestra comunidad.
          </p>
        </div>

        <div className="mb-16 p-8 md:p-12 bg-card rounded-2xl shadow-institutional border border-primary/10">
          <div className="text-center space-y-4">
            <Leaf className="w-16 h-16 text-primary mx-auto" />
            <h3 className="text-2xl font-bold text-foreground">Impacto Ambiental de la Comunidad USAL</h3>
            <div className="text-6xl md:text-7xl font-bold text-primary">
              {co2Saved.toLocaleString()} kg
            </div>
            <p className="text-muted-foreground">
              de CO₂ reducidos • Equivalente a plantar <span className="text-primary font-semibold">{Math.round(co2Saved / 20)}</span> árboles
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-institutional transition-all duration-300 hover:-translate-y-1 border-border bg-card"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-usal-gradient flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
                <div className="pt-4 border-t border-border">
                  <div className="text-3xl font-bold text-primary">{benefit.stat}</div>
                  <div className="text-sm text-muted-foreground">{benefit.statLabel}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-16 p-8 md:p-12 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl border border-primary/20">
          <div className="text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Ejemplo Real: Escobar → Campus USAL Pilar
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Si viajás desde Escobar hasta el Campus Pilar compartiendo auto con otros 3 estudiantes:
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">45 km</div>
                <p className="text-sm text-muted-foreground">Distancia de ida</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">6.75 kg</div>
                <p className="text-sm text-muted-foreground">CO₂ ahorrado por viaje</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">170 kg</div>
                <p className="text-sm text-muted-foreground">CO₂ ahorrado al mes</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-card rounded-lg border border-primary/20">
              <p className="text-sm text-muted-foreground">
                💡 Esto equivale a <span className="text-primary font-semibold">plantar 8 árboles cada mes</span> o evitar 
                <span className="text-primary font-semibold"> 42 kg de plástico</span> en el océano
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
