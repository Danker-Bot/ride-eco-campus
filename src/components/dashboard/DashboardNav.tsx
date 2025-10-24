import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Leaf, LogOut, User } from "lucide-react";

interface DashboardNavProps {
  userName: string;
  onSignOut: () => void;
}

const DashboardNav = ({ userName, onSignOut }: DashboardNavProps) => {
  return (
    <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="bg-usal-gradient p-2 rounded-lg">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-lg">EcoRide USAL</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="hidden sm:inline">{userName}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onSignOut}
              className="gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Salir</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNav;
