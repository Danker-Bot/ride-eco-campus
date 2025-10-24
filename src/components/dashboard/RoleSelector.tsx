import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Users } from "lucide-react";
import { toast } from "sonner";

interface RoleSelectorProps {
  profile: any;
  onRoleUpdate: () => void;
}

const RoleSelector = ({ profile, onRoleUpdate }: RoleSelectorProps) => {
  const [updating, setUpdating] = useState(false);

  const updateRole = async (newRole: "driver" | "passenger" | "both") => {
    setUpdating(true);
    try {
      // Delete existing role
      await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", profile.id);

      // Insert new role
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: profile.id, role: newRole });

      if (error) throw error;
      toast.success("Rol actualizado correctamente");
      onRoleUpdate();
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Error al actualizar el rol");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Card className="border-usal-light/20 shadow-usal-soft">
      <CardHeader>
        <CardTitle>Mi Rol en EcoRide</CardTitle>
        <CardDescription>
          Seleccioná cómo querés usar la plataforma
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          <Button
            variant={profile?.role === "driver" ? "default" : "outline"}
            className={
              profile?.role === "driver"
                ? "bg-usal-gradient hover:opacity-90"
                : ""
            }
            onClick={() => updateRole("driver")}
            disabled={updating}
          >
            <Car className="mr-2 h-4 w-4" />
            Conductor
          </Button>

          <Button
            variant={profile?.role === "passenger" ? "default" : "outline"}
            className={
              profile?.role === "passenger"
                ? "bg-usal-gradient hover:opacity-90"
                : ""
            }
            onClick={() => updateRole("passenger")}
            disabled={updating}
          >
            <Users className="mr-2 h-4 w-4" />
            Pasajero
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoleSelector;
