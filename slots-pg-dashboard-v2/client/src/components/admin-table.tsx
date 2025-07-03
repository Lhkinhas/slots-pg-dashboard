import { Slot } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface AdminTableProps {
  slots: Slot[];
  isLoading: boolean;
  onEdit: (slot: Slot) => void;
}

export default function AdminTable({ slots, isLoading, onEdit }: AdminTableProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const deleteSlotMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/slots/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/slots"] });
      toast({
        title: "Slot deletado",
        description: "O slot foi removido com sucesso.",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível deletar o slot.",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (slot: Slot) => {
    if (window.confirm(`Tem certeza que deseja excluir "${slot.nome}"?`)) {
      deleteSlotMutation.mutate(slot.id);
    }
  };

  const getStatusBadge = (porcentagem: number) => {
    if (porcentagem > 85) {
      return <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">🔥 Quente</span>;
    }
    return <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">Ativo</span>;
  };

  if (isLoading) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-surface-light">
            <tr>
              <th className="text-left p-4 font-semibold text-gray-300">Slot</th>
              <th className="text-left p-4 font-semibold text-gray-300">RTP %</th>
              <th className="text-left p-4 font-semibold text-gray-300">Jogadores</th>
              <th className="text-left p-4 font-semibold text-gray-300">Status</th>
              <th className="text-left p-4 font-semibold text-gray-300">Ações</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, i) => (
              <tr key={i} className="border-b border-slot animate-pulse">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-surface-light rounded-lg"></div>
                    <div>
                      <div className="h-4 bg-surface-light rounded w-32 mb-1"></div>
                      <div className="h-3 bg-surface-light rounded w-20"></div>
                    </div>
                  </div>
                </td>
                <td className="p-4"><div className="h-4 bg-surface-light rounded w-12"></div></td>
                <td className="p-4"><div className="h-4 bg-surface-light rounded w-16"></div></td>
                <td className="p-4"><div className="h-6 bg-surface-light rounded w-20"></div></td>
                <td className="p-4">
                  <div className="flex space-x-2">
                    <div className="h-6 w-6 bg-surface-light rounded"></div>
                    <div className="h-6 w-6 bg-surface-light rounded"></div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-surface-light">
          <tr>
            <th className="text-left p-4 font-semibold text-gray-300">Slot</th>
            <th className="text-left p-4 font-semibold text-gray-300">RTP %</th>
            <th className="text-left p-4 font-semibold text-gray-300">Jogadores</th>
            <th className="text-left p-4 font-semibold text-gray-300">Status</th>
            <th className="text-left p-4 font-semibold text-gray-300">Ações</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((slot) => (
            <tr key={slot.id} className="border-b border-slot hover:bg-surface-light transition-colors">
              <td className="p-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={slot.imagem} 
                    alt={slot.nome} 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">{slot.nome}</p>
                    <p className="text-sm text-gray-400">{slot.categoria}</p>
                  </div>
                </div>
              </td>
              <td className="p-4">
                <span className={`font-semibold ${slot.porcentagem > 85 ? 'text-primary' : 'text-yellow-500'}`}>
                  {slot.porcentagem}%
                </span>
              </td>
              <td className="p-4">{slot.jogadores.toLocaleString()}</td>
              <td className="p-4">{getStatusBadge(slot.porcentagem)}</td>
              <td className="p-4">
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(slot)}
                    className="text-primary hover:text-primary/80"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(slot)}
                    className="text-red-500 hover:text-red-400"
                    disabled={deleteSlotMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
