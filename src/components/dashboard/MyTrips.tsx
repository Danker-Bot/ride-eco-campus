import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Check, X, Leaf, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface MyTripsProps {
  userId: string;
}

const MyTrips = ({ userId }: MyTripsProps) => {
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    loadTrips();

    const channel = supabase
      .channel("trip_requests_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "trip_requests",
        },
        () => loadTrips()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const loadTrips = async () => {
    const { data } = await supabase
      .from("trips")
      .select(`
        *,
        vehicle:vehicles(model, color, license_plate),
        requests:trip_requests(
          id,
          status,
          passenger:profiles(full_name, email)
        )
      `)
      .eq("driver_id", userId)
      .order("departure_date", { ascending: false });

    setTrips(data || []);
  };

  const handleRequest = async (requestId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("trip_requests")
        .update({ status: newStatus })
        .eq("id", requestId);

      if (error) throw error;
      toast.success(
        newStatus === "accepted"
          ? "Solicitud aceptada"
          : "Solicitud rechazada"
      );
      loadTrips();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al procesar la solicitud");
    }
  };

  if (trips.length === 0) {
    return null;
  }

  return (
    <Card className="border-usal-light/20 shadow-usal-soft">
      <CardHeader>
        <CardTitle>Mis Viajes Publicados</CardTitle>
        <CardDescription>Gestioná tus viajes y solicitudes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {trips.map((trip) => (
          <Card key={trip.id} className="border-usal-light/20">
            <CardContent className="pt-6 space-y-4">
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
                      {new Date(trip.departure_date).toLocaleDateString("es-AR")} -{" "}
                      {trip.departure_time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {trip.seats_available} disponibles
                    </div>
                  </div>

                  {trip.co2_saved_kg > 0 && (
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-usal-green">
                        <Leaf className="h-4 w-4" />
                        {trip.co2_saved_kg} kg CO₂ ahorrado
                      </div>
                      <div className="flex items-center gap-1 text-usal-green">
                        <DollarSign className="h-4 w-4" />
                        ${trip.money_saved_ars} ARS ahorrado
                      </div>
                    </div>
                  )}
                </div>

                <Badge
                  variant={
                    trip.status === "active" ? "default" : "secondary"
                  }
                >
                  {trip.status === "active" ? "Activo" : "Finalizado"}
                </Badge>
              </div>

              {trip.requests && trip.requests.length > 0 && (
                <div className="space-y-2 pt-4 border-t">
                  <p className="text-sm font-medium">Solicitudes:</p>
                  {trip.requests.map((request: any) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <span className="text-sm">
                        {request.passenger?.full_name || request.passenger?.email}
                      </span>
                      <div className="flex gap-2">
                        {request.status === "pending" ? (
                          <>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRequest(request.id, "accepted")}
                            >
                              <Check className="h-4 w-4 text-green-600" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleRequest(request.id, "rejected")}
                            >
                              <X className="h-4 w-4 text-red-600" />
                            </Button>
                          </>
                        ) : (
                          <Badge
                            variant={
                              request.status === "accepted"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {request.status === "accepted"
                              ? "Aceptado"
                              : "Rechazado"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default MyTrips;
