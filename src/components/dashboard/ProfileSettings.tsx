import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Wallet } from "lucide-react";
import { toast } from "sonner";

interface ProfileSettingsProps {
  profile: any;
  onProfileUpdate: () => void;
}

const ProfileSettings = ({ profile, onProfileUpdate }: ProfileSettingsProps) => {
  const [saving, setSaving] = useState(false);
  const [firstName, setFirstName] = useState(profile?.first_name || "");
  const [lastName, setLastName] = useState(profile?.last_name || "");
  const [paymentMethod, setPaymentMethod] = useState(profile?.alias || profile?.cbu || profile?.cvu || "");

  const handleSave = async () => {
    setSaving(true);
    try {
      // Determine which field to update based on the input
      let updateData: any = {
        first_name: firstName,
        last_name: lastName,
        full_name: `${firstName} ${lastName}`.trim()
      };

      // Check if paymentMethod looks like CVU/CBU (22 digits) or Alias
      if (paymentMethod) {
        if (/^\d{22}$/.test(paymentMethod)) {
          // It's a 22-digit number, could be CVU or CBU
          updateData.cvu = paymentMethod;
          updateData.cbu = null;
          updateData.alias = null;
        } else if (/^[a-zA-Z0-9.]+$/.test(paymentMethod)) {
          // It's an alias
          updateData.alias = paymentMethod;
          updateData.cvu = null;
          updateData.cbu = null;
        }
      }

      const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", profile.id);

      if (error) throw error;
      toast.success("Datos actualizados correctamente");
      onProfileUpdate();
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Error al actualizar los datos");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="border-usal-light/20 shadow-usal-soft">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Wallet className="h-5 w-5 text-usal-green" />
          <CardTitle>Mi Perfil</CardTitle>
        </div>
        <CardDescription>
          Configurá tus datos bancarios para recibir pagos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Nombre</Label>
          <Input
            id="firstName"
            placeholder="Tu nombre"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Apellido</Label>
          <Input
            id="lastName"
            placeholder="Tu apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentMethod">Alias / CVU / CBU</Label>
          <Input
            id="paymentMethod"
            placeholder="tu.alias.banco o 0000000000000000000000"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Ingresá tu Alias bancario o tu CVU/CBU (22 dígitos)
          </p>
        </div>

        <Button 
          onClick={handleSave} 
          disabled={saving}
          className="w-full bg-usal-gradient hover:opacity-90"
        >
          {saving ? "Guardando..." : "Guardar Datos"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;
