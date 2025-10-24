import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf, DollarSign, TrendingUp, Award } from "lucide-react";

interface EcologicalMetricsProps {
  userId: string;
}

const EcologicalMetrics = ({ userId }: EcologicalMetricsProps) => {
  const [metrics, setMetrics] = useState<any>(null);
  const [globalMetrics, setGlobalMetrics] = useState<any>(null);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);

  useEffect(() => {
    loadMetrics();
    loadGlobalMetrics();
    loadLeaderboard();
  }, [userId]);

  const loadMetrics = async () => {
    const { data } = await supabase
      .from("ecological_metrics")
      .select("*")
      .eq("user_id", userId)
      .single();
    setMetrics(data);
  };

  const loadGlobalMetrics = async () => {
    const { data } = await supabase
      .from("ecological_metrics")
      .select("total_trips, total_co2_saved_kg, total_money_saved_ars");
    
    if (data) {
      const totals = data.reduce(
        (acc, curr) => ({
          trips: acc.trips + curr.total_trips,
          co2: acc.co2 + parseFloat(String(curr.total_co2_saved_kg || "0")),
          money: acc.money + parseFloat(String(curr.total_money_saved_ars || "0")),
        }),
        { trips: 0, co2: 0, money: 0 }
      );
      setGlobalMetrics(totals);
    }
  };

  const loadLeaderboard = async () => {
    const { data } = await supabase
      .from("ecological_metrics")
      .select("*, user:profiles(full_name, email)")
      .order("total_co2_saved_kg", { ascending: false })
      .limit(5);
    setLeaderboard(data || []);
  };

  return (
    <div className="space-y-6">
      <Card className="border-usal-light/20 shadow-usal-soft">
        <CardHeader>
          <CardTitle>Mi Impacto Ecológico</CardTitle>
          <CardDescription>
            Tu contribución al medio ambiente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Leaf className="h-4 w-4" />
                <span className="text-sm">CO₂ Ahorrado</span>
              </div>
              <p className="text-2xl font-bold text-usal-green">
                {metrics?.total_co2_saved_kg || 0} kg
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">Dinero Ahorrado</span>
              </div>
              <p className="text-2xl font-bold text-usal-green">
                ${metrics?.total_money_saved_ars || 0} ARS
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">Viajes Compartidos</span>
              </div>
              <p className="text-2xl font-bold text-usal-green">
                {metrics?.total_trips || 0}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-usal-light/20 shadow-usal-soft">
        <CardHeader>
          <CardTitle>Impacto Comunitario</CardTitle>
          <CardDescription>
            El impacto de toda la comunidad USAL
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-usal-green/5 rounded-lg">
              <p className="text-3xl font-bold text-usal-green mb-1">
                {globalMetrics?.co2.toFixed(1) || 0} kg
              </p>
              <p className="text-sm text-muted-foreground">CO₂ Total Ahorrado</p>
            </div>

            <div className="text-center p-4 bg-usal-green/5 rounded-lg">
              <p className="text-3xl font-bold text-usal-green mb-1">
                ${globalMetrics?.money.toFixed(0) || 0}
              </p>
              <p className="text-sm text-muted-foreground">Dinero Total Ahorrado</p>
            </div>

            <div className="text-center p-4 bg-usal-green/5 rounded-lg">
              <p className="text-3xl font-bold text-usal-green mb-1">
                {globalMetrics?.trips || 0}
              </p>
              <p className="text-sm text-muted-foreground">Viajes Compartidos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-usal-light/20 shadow-usal-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-usal-green" />
            Ranking Ecológico
          </CardTitle>
          <CardDescription>
            Los usuarios con mayor impacto positivo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((entry, index) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 rounded-lg bg-usal-green/5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-usal-gradient text-white font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium">
                    {entry.user?.full_name || entry.user?.email}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-usal-green">
                    {entry.total_co2_saved_kg} kg CO₂
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {entry.total_trips} viajes
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EcologicalMetrics;
