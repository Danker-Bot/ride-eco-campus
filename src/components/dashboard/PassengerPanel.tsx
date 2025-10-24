import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Car, Clock, MapPin, Users } from "lucide-react";
import { toast } from "sonner";

interface PassengerPanelProps {
  userId: string;
}

const PassengerPanel = ({ userId }: PassengerPanelProps) => {
  const [trips, setTrips] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadTrips();
  }, []);

  const loadTrips = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("trips")
        .select(`
          *,
          driver:profiles!trips_driver_id_fkey(full_name, email),
          vehicle:vehicles(model, color, license_plate)
        `)
        .eq("status", "active")
        .gte("seats_available", 1)
        .order("departure_date", { ascending: true });

      if (error) throw error;
      setTrips(data || []);
    } catch (error) {
      console.error("Error loading trips:", error);
    } finally {
      setLoading(false);
    }
  };

  const requestTrip = async (tripId: string) => {
    try {
      const { error } = await supabase
        .from("trip_requests")
        .insert({
          trip_id: tripId,
          passenger_id: userId,
        });

      if (error) throw error;
      toast.success("¡Solicitud enviada al conductor!");
      loadTrips();
    } catch (error: any) {
      if (error.code === "23505") {
        toast.error("Ya solicitaste este viaje");
      } else {
        toast.error("Error al solicitar el viaje");
      }
    }
  };

  const filteredTrips = trips.filter(
    (trip) =>
      trip.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      trip.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="border-usal-light/20 shadow-usal-soft">
      <CardHeader>
        <CardTitle>Buscar Viajes</CardTitle>
        <CardDescription>
          Encontrá conductores que vayan a tu destino
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por origen o destino..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="space-y-4 max-h-[600px] overflow-y-auto">
          {loading ? (
            <p className="text-center text-muted-foreground py-8">
              Cargando viajes...
            </p>
          ) : filteredTrips.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No hay viajes disponibles
            </p>
          ) : (
            filteredTrips.map((trip) => (
              <Card key={trip.id} className="border-usal-light/20">
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-usal-green" />
                          <span className="font-medium">{trip.origin}</span>
                          <span className="text-muted-foreground">→</span>
                          <span className="font-medium">{trip.destination}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {new Date(trip.departure_date).toLocaleDateString('es-AR')} - {trip.departure_time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {trip.seats_available} lugar{trip.seats_available !== 1 ? 'es' : ''}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                          <Car className="h-4 w-4 text-muted-foreground" />
                          <span>{trip.vehicle?.model} {trip.vehicle?.color}</span>
                          <span className="text-muted-foreground">•</span>
                          <span>{trip.vehicle?.license_plate}</span>
                        </div>

                        <p className="text-sm text-muted-foreground">
                          Conductor: {trip.driver?.full_name || trip.driver?.email}
                        </p>
                      </div>

                      <Button
                        onClick={() => requestTrip(trip.id)}
                        size="sm"
                        className="bg-usal-gradient hover:opacity-90"
                      >
                        Unirme
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PassengerPanel;
