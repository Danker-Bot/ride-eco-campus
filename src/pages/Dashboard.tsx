import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import DashboardNav from "@/components/dashboard/DashboardNav";
import RoleSelector from "@/components/dashboard/RoleSelector";
import DriverPanel from "@/components/dashboard/DriverPanel";
import PassengerPanel from "@/components/dashboard/PassengerPanel";
import EcologicalMetrics from "@/components/dashboard/EcologicalMetrics";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

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

      <main className="container mx-auto px-4 py-8 space-y-8">
        <RoleSelector profile={profile} onRoleUpdate={() => loadProfile(user!.id)} />
        
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
