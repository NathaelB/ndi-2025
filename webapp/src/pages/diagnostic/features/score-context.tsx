import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { type DiagnosticAnswers, DIAGNOSTIC_QUESTIONS } from "./types";
import { computeDiagnosticScore } from "./scoring";

interface ScoreContextValue {
  /** Score actuel (0-100) */
  score: number;
  /** Réponses actuelles */
  answers: DiagnosticAnswers;
  /** Mettre à jour une réponse et recalculer le score */
  updateAnswer: (questionId: string, value: string) => void;
  /** Réinitialiser toutes les réponses et le score */
  reset: () => void;
  /** Vérifier si le diagnostic est complet */
  isComplete: boolean;
}

const ScoreContext = createContext<ScoreContextValue | undefined>(undefined);

interface ScoreProviderProps {
  children: ReactNode;
}

export function ScoreProvider({ children }: ScoreProviderProps) {
  const [answers, setAnswers] = useState<DiagnosticAnswers>({});
  const [score, setScore] = useState(0);

  // Recalculer le score chaque fois que les réponses changent
  useEffect(() => {
    const result = computeDiagnosticScore(answers);
    // Le score total est déjà calculé par computeDiagnosticScore
    setScore(result.totalScore);
  }, [answers]);

  const updateAnswer = useCallback((questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  }, []);

  const reset = useCallback(() => {
    setAnswers({});
    setScore(0);
  }, []);

  // Vérifier si toutes les questions ont une réponse
  const isComplete = Object.keys(answers).length >= DIAGNOSTIC_QUESTIONS.length;

  const value: ScoreContextValue = {
    score,
    answers,
    updateAnswer,
    reset,
    isComplete,
  };

  return (
    <ScoreContext.Provider value={value}>{children}</ScoreContext.Provider>
  );
}

/**
 * Hook pour accéder au score et aux réponses du diagnostic
 */
export function useScore() {
  const context = useContext(ScoreContext);
  if (context === undefined) {
    throw new Error("useScore doit être utilisé dans un ScoreProvider");
  }
  return context;
}
