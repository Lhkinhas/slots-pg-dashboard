import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Settings, Eye, Dices } from "lucide-react";

export default function Navigation() {
  const [location] = useLocation();

  return (
    <header className="bg-surface shadow-lg border-b border-slot">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Dices className="text-primary text-2xl" />
            <h1 className="text-2xl font-bold text-primary">SlotManager Pro</h1>
          </div>
          <div className="flex items-center space-x-4">
            {location === "/admin" ? (
              <Link href="/">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Eye className="mr-2 h-4 w-4" />
                  Visão Pública
                </Button>
              </Link>
            ) : (
              <Link href="/admin">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Settings className="mr-2 h-4 w-4" />
                  Admin Panel
                </Button>
              </Link>
            )}
            <div className="flex items-center space-x-2 text-sm text-gray-300">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span>Tempo Real</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
