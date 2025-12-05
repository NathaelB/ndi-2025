import { useScore } from "../features/score-context";

/**
 * Composant de débogage pour afficher le score en temps réel
 * Utile en développement pour vérifier que le score est bien synchronisé
 *
 * Usage: Ajoutez <ScoreDebug /> dans le layout diagnostic
 * Pour masquer en production, utilisez: {import.meta.env.DEV && <ScoreDebug />}
 */
export function ScoreDebug() {
  const { score, answers, isComplete } = useScore();

  const answeredCount = Object.keys(answers).length;

  return (
    <div className="fixed bottom-4 right-4 z-[100] p-4 rounded-lg bg-slate-900/95 backdrop-blur-md border border-cyan-500/50 shadow-lg shadow-cyan-500/20 max-w-xs">
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">Score actuel:</span>
          <span className="text-2xl font-bold text-cyan-400">{score}</span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">Réponses:</span>
          <span className="text-white font-semibold">
            {answeredCount} / 11
          </span>
        </div>

        <div className="flex items-center justify-between gap-4">
          <span className="text-slate-400">Complet:</span>
          <span className={`font-semibold ${isComplete ? "text-green-400" : "text-orange-400"}`}>
            {isComplete ? "✓ Oui" : "✗ Non"}
          </span>
        </div>

        <div className="pt-2 border-t border-slate-700">
          <div className="text-xs text-slate-500">
            🐛 Debug mode
          </div>
        </div>
      </div>
    </div>
  );
}
