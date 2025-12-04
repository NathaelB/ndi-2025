import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type DiagnosticAnswers, type DiagnosticResult } from "./types";
import { computeDiagnosticScore, validateAnswers } from "./scoring";
import { useState } from "react";

/**
 * Hook pour gérer l'état des réponses du diagnostic
 */
export function useDiagnosticAnswers() {
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});

  const saveAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const clearAnswers = () => {
    setAnswers({});
  };

  const isComplete = validateAnswers(answers);

  return {
    answers,
    saveAnswer,
    clearAnswers,
    isComplete,
  };
}

/**
 * Hook pour calculer le résultat du diagnostic
 */
export function useDiagnosticResult(answers: DiagnosticAnswers) {
  return useQuery({
    queryKey: ["diagnostic", "result", answers],
    queryFn: (): DiagnosticResult => {
      return computeDiagnosticScore(answers);
    },
    enabled: validateAnswers(answers),
    staleTime: Infinity, // Le résultat ne change pas pour les mêmes réponses
  });
}

/**
 * Hook pour sauvegarder le diagnostic (simulation API)
 */
export function useSaveDiagnostic() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      answers: DiagnosticAnswers;
      result: DiagnosticResult;
    }) => {
      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Ici on pourrait envoyer les données à une API
      // const response = await fetch('/api/diagnostic', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data),
      // })
      // return response.json()

      return { success: true, id: Date.now().toString() };
    },
    onSuccess: () => {
      // Invalider le cache si nécessaire
      queryClient.invalidateQueries({ queryKey: ["diagnostics"] });
    },
  });
}

/**
 * Hook pour récupérer l'historique des diagnostics (simulation)
 */
export function useDiagnosticHistory() {
  return useQuery({
    queryKey: ["diagnostics", "history"],
    queryFn: async () => {
      // Simulation d'un appel API
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Retourner des données mockées pour l'instant
      return [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
