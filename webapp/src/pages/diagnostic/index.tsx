import { StartButton } from "./ui/start-button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Shield, Zap, Target } from "lucide-react";

export function DiagnosticIndexPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white">
            Diagnostic Numérique
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-2">
              de Souveraineté
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Évaluez la souveraineté numérique de votre établissement face aux
            géants du numérique
          </p>
        </div>

        {/* Description Card */}
        <Card className="border border-slate-700/50 bg-slate-900/40 backdrop-blur-md shadow-2xl">
          <CardHeader>
            <CardTitle className="text-3xl text-white">
              Comment ça marche ?
            </CardTitle>
            <CardDescription className="text-base text-slate-400">
              Un diagnostic en 3 étapes pour évaluer votre maturité numérique
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-3 group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-xl text-white">
                  1. Répondez
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Questions sur vos pratiques : OS, hébergement,
                  authentification, durabilité...
                </p>
              </div>

              <div className="space-y-3 group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-xl text-white">
                  2. Obtenez votre score
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Un score évaluant votre niveau de souveraineté, durabilité et
                  inclusion
                </p>
              </div>

              <div className="space-y-3 group">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-xl text-white">
                  3. Améliorez-vous
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Des recommandations personnalisées pour renforcer votre
                  souveraineté
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          <Card className="border border-slate-700/50 bg-slate-900/30 backdrop-blur-md hover:bg-slate-900/50 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🎯</div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-white">
                    3 axes évalués
                  </h3>
                  <p className="text-sm text-slate-400">
                    Souveraineté, durabilité et inclusion numérique
                  </p>
                </div>
              </div>
            </div>
          </div>

<<<<<<< HEAD
          <Card className="border border-slate-700/50 bg-slate-900/30 backdrop-blur-md hover:bg-slate-900/50 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">⚡</div>
=======
          {/* Features simplifiées */}
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-2 border-blue-200 dark:border-blue-800 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 hover:shadow-2xl transition-all duration-300">
              <CardContent className="pt-8 pb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">🎯</div>
                    <h3 className="font-bold text-xl">Évaluation complète</h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">3 axes évalués</strong> : souveraineté, durabilité et inclusion numérique pour une vision à 360°.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300 font-medium">
                    <Zap className="w-4 h-4" />
                    5 minutes chrono
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-800 bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 hover:shadow-2xl transition-all duration-300">
              <CardContent className="pt-8 pb-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="text-4xl">🏆</div>
                    <h3 className="font-bold text-xl">Résultats visuels</h3>
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    <strong className="text-foreground">Village gaulois animé</strong> avec recommandations personnalisées pour progresser vers l'autonomie numérique.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-purple-700 dark:text-purple-300 font-medium">
                    <Award className="w-4 h-4" />
                    Conseils sur-mesure
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center space-y-8 pt-12">
            <div className="space-y-4">
              <StartButton />
              <p className="text-base text-muted-foreground flex items-center justify-center gap-6 flex-wrap">
                <span className="flex items-center gap-2">
                  <span className="text-lg">⏱️</span>
                  <span>Temps estimé : 5 minutes</span>
                </span>
                <span className="flex items-center gap-2">
                  <span className="text-lg">🔒</span>
                  <span>Aucune donnée sauvegardée</span>
                </span>
              </p>
            </div>
          </div>

          {/* Info banner */}
          <Card className="border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Award className="w-8 h-8 text-blue-600 dark:text-blue-400 shrink-0" />
>>>>>>> 1144679 (feat: Implement scroll indicator and adaptive content morphing features)
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-white">
                    Rapide et ludique
                  </h3>
                  <p className="text-sm text-slate-400">
                    5 minutes pour découvrir votre niveau
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-700/50 bg-slate-900/30 backdrop-blur-md hover:bg-slate-900/50 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💡</div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-white">
                    Conseils personnalisés
                  </h3>
                  <p className="text-sm text-slate-400">
                    Des pistes concrètes pour améliorer votre souveraineté
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-700/50 bg-slate-900/30 backdrop-blur-md hover:bg-slate-900/50 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">🔒</div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-white">
                    Données sécurisées
                  </h3>
                  <p className="text-sm text-slate-400">
                    Aucune donnée sauvegardée, anonymat total
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center space-y-6 pt-8">
          <StartButton />
          <p className="text-sm text-slate-400">
            ⏱️ Temps estimé : 5 minutes • 🔒 100% anonyme
          </p>
        </div>
      </div>
    </div>
  );
}
