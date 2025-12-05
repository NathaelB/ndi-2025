import { StartButton } from "./ui/start-button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Shield, Zap, Target, ArrowLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function DiagnosticIndexPage() {
  return (
    <div className="h-screen overflow-hidden flex items-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Back Button */}
          <div className="flex justify-start">
            <Link to="/welcome">
              <Button
                variant="ghost"
                className="text-slate-300 hover:text-white hover:bg-slate-800/50 transition-all"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>

          {/* Header */}
          <Card className="border border-slate-700/50 bg-slate-900/40 backdrop-blur-md shadow-2xl">
            <div className="text-center space-y-4 py-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
                Diagnostic Numérique
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mt-2">
                  de Souveraineté
                </span>
              </h1>
              <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
                Évaluez la souveraineté numérique de votre établissement face aux
                géants du numérique
              </p>
            </div>
          </Card>

          {/* Description Card */}
          <Card className="border border-slate-700/50 bg-slate-900/40 backdrop-blur-md shadow-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-2xl text-white">
                Comment ça marche ?
              </CardTitle>
              <CardDescription className="text-sm text-slate-100">
                Un diagnostic en 3 étapes pour évaluer votre maturité numérique
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-white">
                    1. Répondez
                  </h3>
                  <p className="text-xs text-slate-100 leading-relaxed">
                    Questions sur vos pratiques : OS, hébergement,
                    authentification, durabilité...
                  </p>
                </div>

                <div className="space-y-2 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-white">
                    2. Obtenez votre score
                  </h3>
                  <p className="text-xs text-slate-100 leading-relaxed">
                    Un score évaluant votre niveau de souveraineté, durabilité et
                    inclusion
                  </p>
                </div>

                <div className="space-y-2 group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg text-white">
                    3. Améliorez-vous
                  </h3>
                  <p className="text-xs text-slate-100 leading-relaxed">
                    Des recommandations personnalisées pour renforcer votre
                    souveraineté
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border border-slate-700/50 bg-slate-900/30 backdrop-blur-md hover:bg-slate-900/50 transition-all">
              <CardContent className="py-3 px-3">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="text-2xl">🎯</div>
                  <h3 className="font-semibold text-sm text-white">
                    3 axes évalués
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-700/50 bg-slate-900/30 backdrop-blur-md hover:bg-slate-900/50 transition-all">
              <CardContent className="py-3 px-3">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="text-2xl">⚡</div>
                  <h3 className="font-semibold text-sm text-white">
                    Rapide et ludique
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-700/50 bg-slate-900/30 backdrop-blur-md hover:bg-slate-900/50 transition-all">
              <CardContent className="py-3 px-3">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="text-2xl">💡</div>
                  <h3 className="font-semibold text-sm text-white">
                    Conseils personnalisés
                  </h3>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-700/50 bg-slate-900/30 backdrop-blur-md hover:bg-slate-900/50 transition-all">
              <CardContent className="py-3 px-3">
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="text-2xl">🔒</div>
                  <h3 className="font-semibold text-sm text-white">
                    Données sécurisées
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4 pt-4">
            <StartButton />
            <p className="text-xs text-slate-400">
              ⏱️ Temps estimé : 5 minutes • 🔒 100% anonyme
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
