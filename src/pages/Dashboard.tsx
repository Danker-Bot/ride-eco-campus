import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import RoleSelector from "@/components/dashboard/RoleSelector";
import ProfileSettings from "@/components/dashboard/ProfileSettings";
import DriverPanel from "@/components/dashboard/DriverPanel";
import PassengerPanel from "@/components/dashboard/PassengerPanel";
import EcologicalMetrics from "@/components/dashboard/EcologicalMetrics";
import { useGeolocation } from "@/hooks/useGeolocation";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [locationRequested, setLocationRequested] = useState(false);
  const { getCurrentLocation, error: geoError } = useGeolocation();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        loadProfile(session.user.id);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        loadProfile(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const loadProfile = async (userId: string) => {
    try {
      // Load profile data
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (profileError) throw profileError;

      // Load user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId);

      if (rolesError) throw rolesError;

      // Determine the role (if user has both driver and passenger roles, set to 'both')
      let userRole: "driver" | "passenger" | "both" = "passenger";
      if (rolesData && rolesData.length > 0) {
        const roles = rolesData.map((r) => r.role);
        if ((roles.includes("driver") && roles.includes("passenger")) || roles.includes("both")) {
          userRole = "both";
        } else if (roles.includes("driver")) {
          userRole = "driver";
        }
      }

      setProfile({ ...profileData, role: userRole });
      
      // Pedir ubicación después de cargar el perfil
      if (!locationRequested) {
        setLocationRequested(true);
        requestLocationPermission();
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const requestLocationPermission = () => {
    toast.info("Para mejorar tu experiencia, podés activar la ubicación", {
      action: {
        label: "Activar",
        onClick: () => {
          getCurrentLocation();
          toast.success("Ubicación activada");
        },
      },
      duration: 5000,
    });
  };

  useEffect(() => {
    if (geoError) {
      toast.error(geoError);
    }
  }, [geoError]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-usal-green/5 via-background to-usal-light/10">
        <Loader2 className="h-8 w-8 animate-spin text-usal-green" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-usal-green/5 via-background to-usal-light/10">
      <DashboardNav
        userName={profile?.full_name || user?.email || "Usuario"}
        onSignOut={handleSignOut}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 sm:space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <RoleSelector profile={profile} onRoleUpdate={() => loadProfile(user!.id)} />
          <ProfileSettings profile={profile} onProfileUpdate={() => loadProfile(user!.id)} />
        </div>
        
        {profile?.role === "driver" || profile?.role === "both" ? (
          <DriverPanel userId={user!.id} />
        ) : null}

        {profile?.role === "passenger" || profile?.role === "both" ? (
          <PassengerPanel userId={user!.id} />
        ) : null}

        <EcologicalMetrics userId={user!.id} />
      </main>
    </div>
  );
};

export default Dashboard;
