import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import VehicleForm from "./VehicleForm";
import TripForm from "./TripForm";
import MyTrips from "./MyTrips";

interface DriverPanelProps {
  userId: string;
}

const DriverPanel = ({ userId }: DriverPanelProps) => {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [showVehicleForm, setShowVehicleForm] = useState(false);
  const [showTripForm, setShowTripForm] = useState(false);

  useEffect(() => {
    loadVehicles();
  }, [userId]);

  const loadVehicles = async () => {
    const { data } = await supabase
      .from("vehicles")
      .select("*")
      .eq("driver_id", userId);
    setVehicles(data || []);
  };

  return (
    <div className="space-y-6">
      <Card className="border-usal-light/20 shadow-usal-soft">
        <CardHeader>
          <CardTitle>Panel de Conductor</CardTitle>
          <CardDescription>
            Gestioná tus vehículos y publicá viajes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {vehicles.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p className="mb-4">Primero, registrá tu vehículo</p>
              <Button
                onClick={() => setShowVehicleForm(true)}
                className="bg-usal-gradient hover:opacity-90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Agregar Vehículo
              </Button>
            </div>
          ) : (
            <div className="flex gap-4">
              <Button
                variant="outline"
                onClick={() => setShowVehicleForm(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Agregar Vehículo
              </Button>
              <Button
                onClick={() => setShowTripForm(true)}
                className="bg-usal-gradient hover:opacity-90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Publicar Viaje
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {showVehicleForm && (
        <VehicleForm
          userId={userId}
          onClose={() => {
            setShowVehicleForm(false);
            loadVehicles();
          }}
        />
      )}

      {showTripForm && vehicles.length > 0 && (
        <TripForm
          userId={userId}
          vehicles={vehicles}
          onClose={() => setShowTripForm(false)}
        />
      )}

      <MyTrips userId={userId} />
    </div>
  );
};

export default DriverPanel;
