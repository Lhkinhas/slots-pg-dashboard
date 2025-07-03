import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Slot, insertSlotSchema, updateSlotSchema } from "@shared/schema";
import { z } from "zod";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X } from "lucide-react";

interface SlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot?: Slot | null;
}

const formSchema = insertSlotSchema.extend({
  porcentagem: z.coerce.number().min(50).max(98),
  jogadores: z.coerce.number().min(0),
});

type FormData = z.infer<typeof formSchema>;

export default function SlotModal({ isOpen, onClose, slot }: SlotModalProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const isEditing = !!slot;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: slot?.nome || "",
      categoria: slot?.categoria || "Fortune",
      imagem: slot?.imagem || "",
      porcentagem: slot?.porcentagem || 75,
      jogadores: slot?.jogadores || 0,
    },
  });

  const createSlotMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("POST", "/api/slots", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/slots"] });
      toast({
        title: "Slot criado",
        description: "O slot foi criado com sucesso.",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível criar o slot.",
        variant: "destructive",
      });
    },
  });

  const updateSlotMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const response = await apiRequest("PUT", `/api/slots/${slot!.id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/slots"] });
      toast({
        title: "Slot atualizado",
        description: "O slot foi atualizado com sucesso.",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o slot.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    if (isEditing) {
      updateSlotMutation.mutate(data);
    } else {
      createSlotMutation.mutate(data);
    }
  };

  const isPending = createSlotMutation.isPending || updateSlotMutation.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-surface border-slot text-white max-w-2xl">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-xl font-semibold text-primary">
              {isEditing ? "Editar Slot" : "Adicionar Novo Slot"}
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Nome do Slot</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Ex: Slot Egito Dourado"
                        className="bg-surface-light border-slot text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="categoria"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Categoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-surface-light border-slot text-white">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-surface-light border-slot">
                        <SelectItem value="Fortune">Fortune</SelectItem>
                        <SelectItem value="Mahjong">Mahjong</SelectItem>
                        <SelectItem value="Temático">Temático</SelectItem>
                        <SelectItem value="Clássico">Clássico</SelectItem>
                        <SelectItem value="Jackpot">Jackpot</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="porcentagem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">RTP (%)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={50}
                        max={98}
                        placeholder="85"
                        className="bg-surface-light border-slot text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jogadores"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Jogadores Simulados</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        placeholder="1000"
                        className="bg-surface-light border-slot text-white placeholder:text-gray-400"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="imagem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-300">URL da Imagem</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      className="bg-surface-light border-slot text-white placeholder:text-gray-400"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-4 pt-6 border-t border-slot">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-slot text-gray-300 hover:bg-surface-light"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isPending ? "Salvando..." : "Salvar Slot"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
