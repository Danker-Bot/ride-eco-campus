import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { vehicleSchema } from "@/lib/validationSchemas";

interface VehicleFormProps {
  userId: string;
  onClose: () => void;
}

const VehicleForm = ({ userId, onClose }: VehicleFormProps) => {
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [seats, setSeats] = useState(4);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate inputs
      const validation = vehicleSchema.safeParse({
        model,
        color,
        licensePlate: licensePlate.toUpperCase(),
        seats,
      });

      if (!validation.success) {
        const errors = validation.error.errors.map((err) => err.message).join(", ");
        toast.error(errors);
        setLoading(false);
        return;
      }

      const { error } = await supabase.from("vehicles").insert({
        driver_id: userId,
        model: validation.data.model,
        color: validation.data.color,
        license_plate: validation.data.licensePlate,
        seats_available: validation.data.seats,
      });

      if (error) throw error;
      toast.success("¡Vehículo registrado exitosamente!");
      onClose();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al registrar el vehículo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-usal-light/20 shadow-usal-soft">
      <CardHeader>
        <CardTitle>Registrar Vehículo</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="model">Modelo</Label>
              <Input
                id="model"
                placeholder="Ej: Fiat Cronos"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Color</Label>
              <Input
                id="color"
                placeholder="Ej: Gris"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="plate">Patente</Label>
              <Input
                id="plate"
                placeholder="Ej: ABC123"
                value={licensePlate}
                onChange={(e) => setLicensePlate(e.target.value)}
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
              disabled={loading}
              className="bg-usal-gradient hover:opacity-90"
            >
              {loading ? "Registrando..." : "Registrar Vehículo"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default VehicleForm;
