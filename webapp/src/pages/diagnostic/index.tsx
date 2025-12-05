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
            </CardContent>
          </Card>

          <Card className="border border-slate-700/50 bg-slate-900/30 backdrop-blur-md hover:bg-slate-900/50 transition-all">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">⚡</div>
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
