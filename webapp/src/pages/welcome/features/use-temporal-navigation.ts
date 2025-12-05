import { useState, useEffect } from "react";

/**
 * TEMPORAL NAVIGATION HOOK
 *
 * Parti pris ergonomique : L'interface doit reconnaître l'état mental de l'utilisateur.
 * Au lieu de montrer le même contenu à tous, on adapte selon le contexte temporel cognitif.
 *
 * Pourquoi casser la convention statique ?
 * - Les utilisateurs ne sont jamais dans le même état mental lors de multiples visites
 * - Le besoin d'information évolue : curiosité → validation → action
 * - Les interfaces statiques ignorent complètement cette progression naturelle
 */

export type TemporalState = "present" | "past" | "future";

export interface VisitHistory {
  count: number;
  firstVisit: number;
  lastVisit: number;
  timeSpentTotal: number; // en secondes
  diagnosticStarted: boolean;
  diagnosticCompleted: boolean;
}

export interface TemporalNavigationState {
  // État temporel actif
  activeState: TemporalState;

  // Historique des visites
  history: VisitHistory;

  // Métadonnées de session
  sessionStart: number;
  scrollDepth: number; // 0-100%

  // Intentions détectées
  hasExploredFeatures: boolean;
  hasReadDeeply: boolean; // scroll > 60% + temps > 20s
  isReturningUser: boolean;
}

const STORAGE_KEY = "ndi-temporal-navigation";

/**
 * Détermine automatiquement l'état temporel par défaut selon l'historique
 */
function getDefaultTemporalState(history: VisitHistory): TemporalState {
  // Première visite = PRÉSENT (découverte)
  if (history.count === 0) return "present";

  // Utilisateur revient après avoir complété le diagnostic = PASSÉ (réflexion)
  if (history.diagnosticCompleted && history.count < 5) return "past";

  // Utilisateur revient souvent sans agir = FUTUR (besoin de projection claire)
  if (history.count >= 3 && !history.diagnosticStarted) return "future";

  // Utilisateur a démarré mais pas terminé = FUTUR (continuer l'action)
  if (history.diagnosticStarted && !history.diagnosticCompleted)
    return "future";

  // Par défaut : PRÉSENT
  return "present";
}

/**
 * Charge l'historique depuis localStorage
 */
function loadHistory(): VisitHistory {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        count: parsed.count || 0,
        firstVisit: parsed.firstVisit || Date.now(),
        lastVisit: parsed.lastVisit || Date.now(),
        timeSpentTotal: parsed.timeSpentTotal || 0,
        diagnosticStarted: parsed.diagnosticStarted || false,
        diagnosticCompleted: parsed.diagnosticCompleted || false,
      };
    }
  } catch (error) {
    console.error("Failed to load temporal navigation history:", error);
  }

  // Nouvel utilisateur
  return {
    count: 0,
    firstVisit: Date.now(),
    lastVisit: Date.now(),
    timeSpentTotal: 0,
    diagnosticStarted: false,
    diagnosticCompleted: false,
  };
}

/**
 * Sauvegarde l'historique dans localStorage
 */
function saveHistory(history: VisitHistory): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error("Failed to save temporal navigation history:", error);
  }
}

/**
 * Hook principal pour la navigation temporelle
 */
export function useTemporalNavigation() {
  const [state, setState] = useState<TemporalNavigationState>(() => {
    const history = loadHistory();
    const isFirstVisit = history.count === 0;

    // Incrémenter le compteur de visites
    const updatedHistory = {
      ...history,
      count: history.count + 1,
      lastVisit: Date.now(),
    };

    saveHistory(updatedHistory);

    return {
      activeState: getDefaultTemporalState(history),
      history: updatedHistory,
      sessionStart: Date.now(),
      scrollDepth: 0,
      hasExploredFeatures: false,
      hasReadDeeply: false,
      isReturningUser: !isFirstVisit,
    };
  });

  /**
   * Change l'état temporel (manuel ou automatique)
   */
  const setTemporalState = (newState: TemporalState) => {
    setState((prev) => ({
      ...prev,
      activeState: newState,
    }));
  };

  /**
   * Met à jour la profondeur de scroll
   */
  const updateScrollDepth = (depth: number) => {
    setState((prev) => {
      const hasReadDeeply =
        depth > 60 && Date.now() - prev.sessionStart > 20000;
      return {
        ...prev,
        scrollDepth: Math.max(prev.scrollDepth, depth),
        hasReadDeeply: hasReadDeeply || prev.hasReadDeeply,
      };
    });
  };

  /**
   * Marque les features comme explorées
   */
  const markFeaturesExplored = () => {
    setState((prev) => ({
      ...prev,
      hasExploredFeatures: true,
    }));
  };

  /**
   * Marque le diagnostic comme démarré
   */
  const markDiagnosticStarted = () => {
    const updatedHistory = {
      ...state.history,
      diagnosticStarted: true,
    };
    saveHistory(updatedHistory);
    setState((prev) => ({
      ...prev,
      history: updatedHistory,
    }));
  };

  /**
   * Marque le diagnostic comme complété
   */
  const markDiagnosticCompleted = () => {
    const updatedHistory = {
      ...state.history,
      diagnosticCompleted: true,
    };
    saveHistory(updatedHistory);
    setState((prev) => ({
      ...prev,
      history: updatedHistory,
    }));
  };

  /**
   * Enregistre le temps passé sur la page (appelé au démontage)
   */
  const recordTimeSpent = () => {
    const timeSpent = Math.floor((Date.now() - state.sessionStart) / 1000);
    const updatedHistory = {
      ...state.history,
      timeSpentTotal: state.history.timeSpentTotal + timeSpent,
    };
    saveHistory(updatedHistory);
  };

  // Enregistrer le temps passé lors du démontage
  useEffect(() => {
    return () => {
      recordTimeSpent();
    };
  }, [state.sessionStart, state.history.timeSpentTotal]);

  // Observer le scroll
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const depth = Math.round(
        (scrollTop / (documentHeight - windowHeight)) * 100,
      );

      updateScrollDepth(depth);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return {
    // État actuel
    temporalState: state.activeState,
    history: state.history,
    scrollDepth: state.scrollDepth,

    // Indicateurs comportementaux
    isReturningUser: state.isReturningUser,
    hasExploredFeatures: state.hasExploredFeatures,
    hasReadDeeply: state.hasReadDeeply,

    // Actions
    setTemporalState,
    markFeaturesExplored,
    markDiagnosticStarted,
    markDiagnosticCompleted,

    // Métadonnées utiles pour les composants
    sessionDuration: Math.floor((Date.now() - state.sessionStart) / 1000),
    totalTimeSpent: state.history.timeSpentTotal,
  };
}

/**
 * Helper : Détecte si l'utilisateur est probablement dans un état de "shopping" (comparison)
 */
export function isShoppingMode(state: TemporalNavigationState): boolean {
  return (
    state.isReturningUser &&
    !state.history.diagnosticStarted &&
    state.history.count >= 2
  );
}

/**
 * Helper : Détecte si l'utilisateur est prêt à agir
 */
export function isReadyToAct(state: TemporalNavigationState): boolean {
  return (
    state.hasReadDeeply || state.history.count >= 3 || state.scrollDepth > 75
  );
}
