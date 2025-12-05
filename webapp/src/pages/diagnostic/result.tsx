import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useDiagnosticResult } from "./features/use-diagnostic.ts";
import { useScore } from "./features/score-context";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download, Share2, Sparkles, Home } from "lucide-react";

export function DiagnosticResultPage() {
  const navigate = useNavigate();
  const { answers, reset } = useScore();

  const { data: result, isLoading } = useDiagnosticResult(answers);

  const handleRestart = () => {
    reset();
    navigate({ to: "/diagnostic" });
  };

  if (isLoading || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin mx-auto" />
          </div>
          <p className="text-xl font-semibold text-white">
            Analyse de vos réponses...
          </p>
          <p className="text-slate-400">Calcul du score en cours</p>
        </div>
      </div>
    );
  }

  const getMessage = () => {
    if (result.totalScore < 25)
      return "Votre voyage vers la souveraineté numérique commence ici !";
    if (result.totalScore < 50)
      return "Vous êtes sur la bonne voie, continuez vos efforts !";
    if (result.totalScore < 75)
      return "Excellent travail ! Vous êtes bien engagé.";
    return "Remarquable ! Vous êtes un modèle de souveraineté numérique.";
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl space-y-12">
        {/* Bouton retour à l'accueil */}
        <div className="flex justify-start">
          <Link to="/welcome">
            <Button
              variant="ghost"
              className="gap-2 text-slate-300 hover:text-white hover:bg-slate-800/90 backdrop-blur-xl shadow-lg"
            >
              <Home className="w-4 h-4" />
              Retour à l'accueil
            </Button>
          </Link>
        </div>
        {/* Score principal */}
        <div className="text-center space-y-8 animate-in fade-in zoom-in duration-700">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 backdrop-blur-xl border border-slate-700 shadow-xl">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium text-white">
              Résultat du diagnostic
            </span>
          </div>

          <div className="relative flex justify-center">
            {/* Score circulaire */}
            <div className="relative w-72 h-72 p-6 rounded-full bg-slate-900/90 backdrop-blur-xl border-2 border-slate-700 shadow-2xl">
              <div className="relative w-full h-full">
                <svg className="w-full h-full -rotate-90 drop-shadow-xl">
                  {/* Background circle */}
                  <circle
                    cx="120"
                    cy="120"
                    r="100"
                    stroke="currentColor"
                    strokeWidth="16"
                    fill="none"
                    className="text-slate-800"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="120"
                    cy="120"
                    r="100"
                    stroke="url(#gradient)"
                    strokeWidth="16"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 100}`}
                    strokeDashoffset={`${2 * Math.PI * 100 * (1 - result.totalScore / 100)}`}
                    className="transition-all duration-1000 ease-out drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  />
                  <defs>
                    <linearGradient
                      id="gradient"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50 rounded-full backdrop-blur-sm">
                  <div className="text-7xl font-bold text-white drop-shadow-2xl tracking-tight">
                    {result.totalScore}
                  </div>
                  <div className="text-2xl text-slate-200 font-medium drop-shadow-lg">/ 100</div>
                  <div className="mt-2 text-sm text-cyan-400 font-semibold uppercase tracking-wider">
                    Points
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="inline-block px-8 py-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border-2 border-slate-700 shadow-2xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                {getMessage()}
              </h1>
            </div>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500/30 to-blue-500/30 border-2 border-cyan-500/50 backdrop-blur-xl shadow-xl">
              <span className="text-2xl">
                {result.level === "débutant" && "🌱"}
                {result.level === "intermédiaire" && "🌿"}
                {result.level === "avancé" && "🌳"}
                {result.level === "expert" && "🏆"}
              </span>
              <span className="text-lg font-semibold text-white capitalize drop-shadow">
                Niveau {result.level}
              </span>
            </div>
          </div>
        </div>

        {/* Scores par catégorie */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              label: "Souveraineté",
              score: result.categoryScores.souverainete,
              icon: "🔐",
              color: "cyan",
            },
            {
              label: "Durabilité",
              score: result.categoryScores.durabilite,
              icon: "🌱",
              color: "green",
            },
            {
              label: "Inclusion",
              score: result.categoryScores.inclusion,
              icon: "🤝",
              color: "purple",
            },
          ].map((category) => (
            <div
              key={category.label}
              className="p-6 rounded-2xl bg-slate-900/80 backdrop-blur-xl border-2 border-slate-700 space-y-4 hover:bg-slate-900/90 transition-all shadow-xl"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{category.icon}</span>
                <span className="text-2xl font-bold text-white drop-shadow">
                  {category.score}%
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-slate-300 mb-2">
                  {category.label}
                </div>
                <div className="h-2 bg-slate-800/80 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${category.color === "cyan"
                      ? "from-cyan-500 to-blue-500"
                      : category.color === "green"
                        ? "from-green-500 to-emerald-500"
                        : "from-purple-500 to-pink-500"
                      } transition-all duration-1000`}
                    style={{ width: `${category.score}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommandations */}
        <div className="space-y-6">
          <div className="text-center inline-block w-full">
            <div className="inline-block px-8 py-4 rounded-2xl bg-slate-900/90 backdrop-blur-xl border-2 border-slate-700 shadow-2xl">
              <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                Recommandations personnalisées
              </h2>
              <p className="text-slate-100">
                Des pistes concrètes pour améliorer votre score
              </p>
            </div>
          </div>

          <div className="grid gap-4">
            {result.recommendations.map((recommendation, index) => (
              <div
                key={index}
                className="flex gap-4 p-5 rounded-xl bg-slate-900/80 backdrop-blur-xl border-2 border-slate-700 hover:bg-slate-900/90 transition-all group shadow-lg"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold shadow-lg">
                  {index + 1}
                </div>
                <p className="text-slate-200 leading-relaxed flex-1 group-hover:text-white transition-colors">
                  {recommendation}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Button
            onClick={handleRestart}
            className="gap-2 px-8 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg shadow-cyan-500/30"
          >
            <RefreshCw className="w-4 h-4" />
            Refaire le diagnostic
          </Button>
          <Button
            variant="ghost"
            className="gap-2 px-8 text-slate-300 hover:text-white hover:bg-slate-800/90 backdrop-blur-xl shadow-lg"
          >
            <Share2 className="w-4 h-4" />
            Partager
          </Button>
          <Button
            variant="ghost"
            className="gap-2 px-8 text-slate-300 hover:text-white hover:bg-slate-800/90 backdrop-blur-xl shadow-lg"
          >
            <Download className="w-4 h-4" />
            Télécharger
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-slate-400 pt-8">
          <p>🔒 Aucune donnée sauvegardée • 100% anonyme</p>
        </div>
      </div>
    </div>
  );
}
