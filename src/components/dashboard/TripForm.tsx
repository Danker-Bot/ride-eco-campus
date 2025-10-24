import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface TripFormProps {
  userId: string;
  vehicles: any[];
  onClose: () => void;
}

const TripForm = ({ userId, vehicles, onClose }: TripFormProps) => {
  const [vehicleId, setVehicleId] = useState("");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("trips").insert({
        driver_id: userId,
        vehicle_id: vehicleId,
        origin,
        destination,
        departure_date: date,
        departure_time: time,
        seats_available: seats,
        status: "active",
      });

      if (error) throw error;
      toast.success("¡Viaje publicado! Los pasajeros ya pueden solicitarlo.");
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al publicar el viaje");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-usal-light/20 shadow-usal-soft">
      <CardHeader>
        <CardTitle>Publicar Viaje</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vehicle">Vehículo</Label>
            <Select value={vehicleId} onValueChange={setVehicleId} required>
              <SelectTrigger>
                <SelectValue placeholder="Seleccioná tu vehículo" />
              </SelectTrigger>
              <SelectContent>
                {vehicles.map((vehicle) => (
                  <SelectItem key={vehicle.id} value={vehicle.id}>
                    {vehicle.model} {vehicle.color} - {vehicle.license_plate}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="origin">Origen</Label>
              <Input
                id="origin"
                placeholder="Ej: Palermo"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination">Destino</Label>
              <Input
                id="destination"
                placeholder="Ej: USAL Campus"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Fecha</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Hora de salida</Label>
              <Input
                id="time"
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seats">Asientos disponibles</Label>
              <Input
                id="seats"
                type="number"
                min="1"
                max="8"
                value={seats}
                onChange={(e) => setSeats(parseInt(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading || !vehicleId}
              className="bg-usal-gradient hover:opacity-90"
            >
              {loading ? "Publicando..." : "Publicar Viaje"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TripForm;
