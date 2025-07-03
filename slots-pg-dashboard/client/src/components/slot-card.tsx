import { Slot } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface SlotCardProps {
  slot: Slot;
}

export default function SlotCard({ slot }: SlotCardProps) {
  const isHot = slot.porcentagem > 85;

  return (
    <div className="bg-surface rounded-xl overflow-hidden shadow-lg border border-slot hover:border-primary transition-colors group relative">
      {isHot && (
        <div className="absolute top-3 right-3 z-10">
          <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center fire-animation">
            🔥 HOT
          </div>
        </div>
      )}
      
      <img 
        src={slot.imagem} 
        alt={slot.nome} 
        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{slot.nome}</h3>
        <div className="flex items-center justify-between mb-3">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{slot.porcentagem}%</p>
            <p className="text-xs text-gray-400">Pagando</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold">{slot.jogadores.toLocaleString()}</p>
            <p className="text-xs text-gray-400">Jogando</p>
          </div>
        </div>
        <Button 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
          onClick={() => window.open("https://91-elefantepg.com/?id=622685207", "_blank")}
        >
          <Play className="mr-2 h-4 w-4" />
          Jogar Agora
        </Button>
      </div>
    </div>
  );
}
