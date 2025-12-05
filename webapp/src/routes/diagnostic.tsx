import { createFileRoute, Outlet } from "@tanstack/react-router";
import AnimatedSphere from "@/components/three/animated-sphere";
import {
  ScoreProvider,
} from "@/pages/diagnostic/features/score-context";

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
  return (
    <>
      {/* Sphère 3D persistante sur toutes les pages diagnostic */}
      <AnimatedSphere />

      {/* Contenu des sous-routes (index, questions, result) */}
      <div className="relative min-h-screen z-50">
        <Outlet />
      </div>

      {/* Debug: afficher le score en temps réel (dev uniquement) */}
      {/*{import.meta.env.DEV && <ScoreDebug />}*/}
    </>
  );
}
