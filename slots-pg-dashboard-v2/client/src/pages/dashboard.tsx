import { useQuery } from "@tanstack/react-query";
import { Slot } from "@shared/schema";
import Navigation from "@/components/navigation";
import StatsOverview from "@/components/stats-overview";
import SlotCard from "@/components/slot-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");

  const { data: slots = [], isLoading } = useQuery<Slot[]>({
    queryKey: ["/api/slots"],
    refetchInterval: 10000, // Refresh every 10 seconds for real-time updates
  });

  const filteredSlots = slots.filter(slot => {
    const matchesSearch = slot.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "todos" || slot.categoria.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const categories = ["todos", ...Array.from(new Set(slots.map(slot => slot.categoria)))];

  return (
    <div className="min-h-screen bg-dark text-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <StatsOverview slots={slots} />
        
        {/* Filter and Search */}
        <div className="bg-surface rounded-xl p-6 mb-8 border border-slot">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <h2 className="text-xl font-semibold flex items-center">
              <span className="text-2xl mr-2">🔥</span>
              Slots Pagantes Agora
            </h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <Input
                type="text"
                placeholder="Buscar slots..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-surface-light border-slot text-white placeholder:text-gray-400"
              />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="bg-surface-light border-slot text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-surface-light border-slot">
                  {categories.map((category) => (
                    <SelectItem key={category} value={category} className="text-white">
                      {category === "todos" ? "Todos os tipos" : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Slots Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-surface rounded-xl p-4 border border-slot animate-pulse">
                <div className="w-full h-40 bg-surface-light rounded-lg mb-4"></div>
                <div className="h-4 bg-surface-light rounded mb-2"></div>
                <div className="h-6 bg-surface-light rounded mb-3"></div>
                <div className="h-10 bg-surface-light rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSlots.map((slot) => (
              <SlotCard key={slot.id} slot={slot} />
            ))}
          </div>
        )}

        {filteredSlots.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Nenhum slot encontrado com os filtros aplicados.</p>
          </div>
        )}
      </div>
    </div>
  );
}
