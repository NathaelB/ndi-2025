import { createFileRoute, Outlet } from "@tanstack/react-router";
import AnimatedSphere from "@/components/three/animated-sphere";
import {
  ScoreProvider,
  useScore,
} from "@/pages/diagnostic/features/score-context";
import { ScoreDebug } from "@/pages/diagnostic/components/ScoreDebug";

export const Route = createFileRoute("/diagnostic")({
  component: DiagnosticLayout,
});

function DiagnosticLayout() {
  return (
    <ScoreProvider>
      <DiagnosticLayoutInner />
    </ScoreProvider>
  );
}

function DiagnosticLayoutInner() {
  const { score } = useScore();

  return (
    <>
      {/* Sphère 3D persistante sur toutes les pages diagnostic */}
      <AnimatedSphere score={score} />

      {/* Contenu des sous-routes (index, questions, result) */}
      <div className="relative min-h-screen z-50">
        <Outlet />
      </div>

      {/* Debug: afficher le score en temps réel (dev uniquement) */}
      {import.meta.env.DEV && <ScoreDebug />}
    </>
  );
}
