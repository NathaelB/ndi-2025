import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockTalents } from "./mock-talents";
import type { Talent } from "./mock-talents";
import {
  loadTalentsFromStorage,
  addTalent as addTalentToStorage,
  updateTalent as updateTalentInStorage,
  deleteTalent as deleteTalentFromStorage,
} from "./talent-storage";

// Charger tous les talents (mock + localStorage)
function fetchTalents(): Promise<Talent[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const localTalents = loadTalentsFromStorage();
      // Combiner les talents mockés avec ceux du localStorage
      // Les talents du localStorage ont des IDs > 9000
      const mockWithoutDefaults = mockTalents.filter((t) => t.id < 9000);
      const allTalents = [...mockWithoutDefaults, ...localTalents];
      resolve(allTalents);
    }, 300);
  });
}

export function useTalents() {
  return useQuery({
    queryKey: ["talents"],
    queryFn: fetchTalents,
    staleTime: 5 * 60 * 1000,
  });
}

// Hook pour ajouter un talent
export function useAddTalent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (talent: Omit<Talent, "id">) => {
      return addTalentToStorage(talent);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["talents"] });
    },
  });
}

// Hook pour mettre à jour un talent
export function useUpdateTalent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: number;
      updates: Partial<Talent>;
    }) => {
      updateTalentInStorage(id, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["talents"] });
    },
  });
}

// Hook pour supprimer un talent
export function useDeleteTalent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      deleteTalentFromStorage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["talents"] });
    },
  });
}
