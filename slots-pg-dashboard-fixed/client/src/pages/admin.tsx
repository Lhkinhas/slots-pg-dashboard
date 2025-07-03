import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Slot } from "@shared/schema";
import Navigation from "@/components/navigation";
import AdminTable from "@/components/admin-table";
import SlotModal from "@/components/slot-modal";
import { Button } from "@/components/ui/button";
import { Plus, Settings, Users, TrendingUp, Zap } from "lucide-react";

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<Slot | null>(null);

  const { data: slots = [], isLoading } = useQuery<Slot[]>({
    queryKey: ["/api/slots"],
    refetchInterval: 5000,
  });

  const handleAddSlot = () => {
    setEditingSlot(null);
    setIsModalOpen(true);
  };

  const handleEditSlot = (slot: Slot) => {
    setEditingSlot(slot);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSlot(null);
  };

  const totalSlots = slots.length;
  const hotSlots = slots.filter(slot => slot.porcentagem > 85).length;
  const averageRtp = slots.length > 0 ? (slots.reduce((sum, slot) => sum + slot.porcentagem, 0) / slots.length).toFixed(1) : "0";
  const totalPlayers = slots.reduce((sum, slot) => sum + slot.jogadores, 0);

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        {/* Admin Header */}
        <div className="bg-surface rounded-xl p-6 mb-8 border border-slot">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-2">Painel Administrativo</h2>
              <p className="text-gray-400">Gerencie slots, percentuais e configurações</p>
            </div>
            <Button 
              onClick={handleAddSlot}
              className="bg-primary text-primary-foreground hover:bg-primary/90 mt-4 md:mt-0"
            >
              <Plus className="mr-2 h-4 w-4" />
              Adicionar Slot
            </Button>
          </div>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-surface rounded-xl p-6 border border-slot">
            <div className="text-center">
              <Settings className="text-primary text-2xl mb-2 mx-auto" />
              <p className="text-2xl font-bold">{totalSlots}</p>
              <p className="text-gray-400 text-sm">Total Slots</p>
            </div>
          </div>
          <div className="bg-surface rounded-xl p-6 border border-slot">
            <div className="text-center">
              <Zap className="text-red-500 text-2xl mb-2 mx-auto" />
              <p className="text-2xl font-bold">{hotSlots}</p>
              <p className="text-gray-400 text-sm">Slots Quentes</p>
            </div>
          </div>
          <div className="bg-surface rounded-xl p-6 border border-slot">
            <div className="text-center">
              <TrendingUp className="text-primary text-2xl mb-2 mx-auto" />
              <p className="text-2xl font-bold text-primary">{averageRtp}%</p>
              <p className="text-gray-400 text-sm">RTP Médio</p>
            </div>
          </div>
          <div className="bg-surface rounded-xl p-6 border border-slot">
            <div className="text-center">
              <Users className="text-primary text-2xl mb-2 mx-auto" />
              <p className="text-2xl font-bold">{totalPlayers.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">Jogadores</p>
            </div>
          </div>
        </div>

        {/* Admin Table */}
        <div className="bg-surface rounded-xl overflow-hidden border border-slot">
          <div className="p-6 border-b border-slot">
            <h3 className="text-xl font-semibold">Gerenciar Slots</h3>
          </div>
          <AdminTable 
            slots={slots} 
            isLoading={isLoading}
            onEdit={handleEditSlot}
          />
        </div>
      </div>

      {/* Slot Modal */}
      <SlotModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        slot={editingSlot}
      />
    </div>
  );
}
