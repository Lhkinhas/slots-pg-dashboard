import { Slot } from "@shared/schema";
import { Settings, Users, TrendingUp } from "lucide-react";

interface StatsOverviewProps {
  slots: Slot[];
}

export default function StatsOverview({ slots }: StatsOverviewProps) {
  const totalSlots = slots.length;
  const totalPlayers = slots.reduce((sum, slot) => sum + slot.jogadores, 0);
  const averageRtp = slots.length > 0 ? (slots.reduce((sum, slot) => sum + slot.porcentagem, 0) / slots.length).toFixed(1) : "0";

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-surface rounded-xl p-6 border border-slot">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Total de Slots</p>
            <p className="text-2xl font-bold text-white">{totalSlots}</p>
          </div>
          <Settings className="text-primary text-2xl" />
        </div>
      </div>
      <div className="bg-surface rounded-xl p-6 border border-slot">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Jogadores Online</p>
            <p className="text-2xl font-bold text-white">{totalPlayers.toLocaleString()}</p>
          </div>
          <Users className="text-primary text-2xl" />
        </div>
      </div>
      <div className="bg-surface rounded-xl p-6 border border-slot">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm">Média de Pagamento</p>
            <p className="text-2xl font-bold text-primary">{averageRtp}%</p>
          </div>
          <TrendingUp className="text-primary text-2xl" />
        </div>
      </div>
    </div>
  );
}
