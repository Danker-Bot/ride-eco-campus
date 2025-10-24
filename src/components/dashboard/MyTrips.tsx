import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Check, X, Leaf, DollarSign, XCircle, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

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
          audio_note,
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

  const handleCancelTrip = async (tripId: string) => {
    try {
      const { error } = await supabase
        .from("trips")
        .update({ 
          status: "cancelled",
          cancelled_at: new Date().toISOString()
        })
        .eq("id", tripId);

      if (error) throw error;
      toast.success("Viaje cancelado");
      loadTrips();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al cancelar el viaje");
    }
  };

  const handleCompleteTrip = async (tripId: string) => {
    try {
      const { error } = await supabase
        .from("trips")
        .update({ 
          status: "completed",
          completed_at: new Date().toISOString()
        })
        .eq("id", tripId);

      if (error) throw error;
      toast.success("¡Viaje completado!");
      loadTrips();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al completar el viaje");
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
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <MapPin className="h-4 w-4 text-usal-green shrink-0" />
                    <span className="font-medium truncate">{trip.origin}</span>
                    <span className="text-muted-foreground shrink-0">→</span>
                    <span className="font-medium truncate">{trip.destination}</span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 shrink-0" />
                      <span className="truncate">{new Date(trip.departure_date).toLocaleDateString("es-AR")} - {trip.departure_time}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 shrink-0" />
                      <span>{trip.seats_available} disponibles</span>
                    </div>
                  </div>

                  {trip.co2_saved_kg > 0 && (
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
                      <div className="flex items-center gap-1 text-usal-green">
                        <Leaf className="h-4 w-4 shrink-0" />
                        <span className="truncate">{trip.co2_saved_kg} kg CO₂ ahorrado</span>
                      </div>
                      <div className="flex items-center gap-1 text-usal-green">
                        <DollarSign className="h-4 w-4 shrink-0" />
                        <span className="truncate">${trip.money_saved_ars} ARS ahorrado</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2 flex-wrap shrink-0">
                  <Badge variant={
                    trip.status === "active" ? "default" : 
                    trip.status === "cancelled" ? "destructive" : 
                    "secondary"
                  }>
                    {trip.status === "active" ? "Activo" : 
                     trip.status === "cancelled" ? "Cancelado" :
                     "Completado"}
                  </Badge>
                  
                  {trip.status === "active" && (
                    <>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            <span className="hidden sm:inline">Finalizar</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Finalizar viaje?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esto marcará el viaje como completado y se actualizarán tus métricas ecológicas.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleCompleteTrip(trip.id)}>
                              Confirmar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="gap-1">
                            <XCircle className="h-3 w-3" />
                            <span className="hidden sm:inline">Cancelar</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>¿Cancelar viaje?</AlertDialogTitle>
                            <AlertDialogDescription>
                              Esta acción cancelará el viaje y notificará a los pasajeros.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>No cancelar</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleCancelTrip(trip.id)}>
                              Sí, cancelar viaje
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </div>
              </div>

              {trip.requests && trip.requests.length > 0 && (
                <div className="space-y-2 pt-4 border-t">
                  <p className="text-sm font-medium">Solicitudes:</p>
                  {trip.requests.map((request: any) => (
                    <div key={request.id} className="flex flex-col gap-3 p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {request.passenger?.full_name || request.passenger?.email}
                          </p>
                          <Badge variant={
                            request.status === "accepted" ? "default" : 
                            request.status === "pending" ? "outline" :
                            "secondary"
                          } className="mt-1">
                            {request.status === "accepted" ? "Aceptado" :
                             request.status === "pending" ? "Pendiente" : 
                             "Rechazado"}
                          </Badge>
                        </div>
                        {request.status === "pending" && trip.status === "active" && (
                          <div className="flex gap-2 shrink-0">
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
                          </div>
                        )}
                      </div>
                      {request.audio_note && (
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Nota de voz:</p>
                          <audio 
                            src={request.audio_note} 
                            controls 
                            className="h-8 w-full max-w-md"
                          />
                        </div>
                      )}
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
