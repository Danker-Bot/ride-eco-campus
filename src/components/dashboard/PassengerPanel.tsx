import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Car, Clock, MapPin, Users } from "lucide-react";
import { toast } from "sonner";
import AudioRecorder from "./AudioRecorder";
import { audioNoteSchema } from "@/lib/validationSchemas";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PassengerPanelProps {
  userId: string;
}

const PassengerPanel = ({ userId }: PassengerPanelProps) => {
  const [trips, setTrips] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null);
  const [audioNote, setAudioNote] = useState<string>("");

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
      // Validate audio note if present
      if (audioNote) {
        const validation = audioNoteSchema.safeParse(audioNote);
        if (!validation.success) {
          toast.error(validation.error.errors[0].message);
          return;
        }
      }

      const { error } = await supabase
        .from("trip_requests")
        .insert({
          trip_id: tripId,
          passenger_id: userId,
          audio_note: audioNote || null,
        });

      if (error) throw error;
      toast.success("¡Solicitud enviada al conductor!");
      setSelectedTripId(null);
      setAudioNote("");
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
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4">
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
                            <span className="truncate">{new Date(trip.departure_date).toLocaleDateString('es-AR')} - {trip.departure_time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 shrink-0" />
                            <span>{trip.seats_available} lugar{trip.seats_available !== 1 ? 'es' : ''}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm flex-wrap">
                          <Car className="h-4 w-4 text-muted-foreground shrink-0" />
                          <span className="truncate">{trip.vehicle?.model} {trip.vehicle?.color}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="truncate">{trip.vehicle?.license_plate}</span>
                        </div>

                        <p className="text-sm text-muted-foreground truncate">
                          Conductor: {trip.driver?.full_name || trip.driver?.email}
                        </p>
                      </div>

                      <div className="shrink-0 w-full sm:w-auto">
                        <Dialog open={selectedTripId === trip.id} onOpenChange={(open) => {
                        if (!open) {
                          setSelectedTripId(null);
                          setAudioNote("");
                        }
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            onClick={() => setSelectedTripId(trip.id)}
                            size="sm"
                            className="bg-usal-gradient hover:opacity-90"
                          >
                            Unirme
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Solicitar viaje</DialogTitle>
                            <DialogDescription>
                              Podés agregar una nota de voz opcional para el conductor
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <AudioRecorder onAudioRecorded={setAudioNote} />
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setSelectedTripId(null);
                                  setAudioNote("");
                                }}
                              >
                                Cancelar
                              </Button>
                              <Button
                                onClick={() => requestTrip(trip.id)}
                                className="bg-usal-gradient hover:opacity-90"
                              >
                                Enviar solicitud
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                        </Dialog>
                      </div>
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
