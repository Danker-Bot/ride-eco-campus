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
  const [alias, setAlias] = useState(profile?.alias || "");
  const [cbu, setCbu] = useState(profile?.cbu || "");
  const [cvu, setCvu] = useState(profile?.cvu || "");

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ alias, cbu, cvu })
        .eq("id", profile.id);

      if (error) throw error;
      toast.success("Datos bancarios actualizados");
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
          <Label htmlFor="alias">Alias</Label>
          <Input
            id="alias"
            placeholder="tu.alias.banco"
            value={alias}
            onChange={(e) => setAlias(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cbu">CBU</Label>
          <Input
            id="cbu"
            placeholder="0000000000000000000000"
            maxLength={22}
            value={cbu}
            onChange={(e) => setCbu(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cvu">CVU</Label>
          <Input
            id="cvu"
            placeholder="0000000000000000000000"
            maxLength={22}
            value={cvu}
            onChange={(e) => setCvu(e.target.value)}
          />
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
