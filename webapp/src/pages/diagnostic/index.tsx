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
=======
import { StartButton } from './ui/start-button.tsx'
import { Shield, Zap, Target } from 'lucide-react'
import { motion } from 'motion/react'
import styles from './styles/diagnostic-page.module.css'

export function DiagnosticIndexPage() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Header */}
          <header className={styles.header}>
          
            <motion.h1 
              className={styles.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <span className={styles.titleMain}>
                Diagnostic Numérique
              </span>
              <span className={styles.titleGradient}>
                Village Gaulois
              </span>
            </motion.h1>
            <motion.div 
              className={styles.separator}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            ></motion.div>
            <motion.p 
              className={styles.subtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              Évaluez la souveraineté numérique de votre établissement et découvrez comment résister aux Big Tech comme un village d'irréductibles gaulois !
            </motion.p>
          </header>

          {/* Timeline des étapes */}
          <motion.section 
            className={styles.stepsSection}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className={styles.stepsHeader}>
              <h2 className={styles.stepsTitle}>Comment ça marche ?</h2>
              <p className={styles.stepsSubtitle}>
                Un diagnostic en 3 étapes pour évaluer votre maturité numérique
              </p>
            </div>
            
            <div className={styles.stepsTimeline}>
              <motion.div 
                className={styles.timelineLine}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 1.2, ease: "easeInOut" }}
              ></motion.div>
              
              <div className={styles.stepsGrid}>
                {/* Étape 1 */}
                <motion.div 
                  className={styles.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                >
                  <motion.div 
                    className={`${styles.stepCircle} ${styles.stepCircleBlue}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Shield className={styles.stepIcon} />
                  </motion.div>
                  <div className={styles.stepContent}>
                   
                    <h3 className={styles.stepTitle}>Répondez</h3>
                    <p className={styles.stepDescription}>
                      10 questions sur vos pratiques numériques
                    </p>
                  </div>
                </motion.div>

                {/* Étape 2 */}
                <motion.div 
                  className={styles.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                >
                  <motion.div 
                    className={`${styles.stepCircle} ${styles.stepCircleGreen}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Zap className={styles.stepIcon} />
                  </motion.div>
                  <div className={styles.stepContent}>
                   
                    <h3 className={styles.stepTitle}>Obtenez votre score</h3>
                    <p className={styles.stepDescription}>
                      Évaluation de votre souveraineté numérique
                    </p>
                  </div>
                </motion.div>

                {/* Étape 3 */}
                <motion.div 
                  className={styles.step}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  whileHover={{ y: -8 }}
                >
                  <motion.div 
                    className={`${styles.stepCircle} ${styles.stepCirclePurple}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Target className={styles.stepIcon} />
                  </motion.div>
                  <div className={styles.stepContent}>
                    
                    <h3 className={styles.stepTitle}>Recommandations</h3>
                    <p className={styles.stepDescription}>
                      Conseils personnalisés et village gaulois animé
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          {/* CTA */}
          <section className={styles.ctaSection}>
            <StartButton />
            <p className={styles.ctaInfo}>
              <span className={styles.ctaInfoItem}>
                <span className={styles.ctaEmoji}>⏱️</span>
                <span>5 minutes</span>
              </span>
              <span className={styles.ctaInfoItem}>
                <span className={styles.ctaEmoji}>🔒</span>
                <span>Aucune donnée sauvegardée</span>
              </span>
            </p>
          </section>
>>>>>>> cf0de8d (feat: Enhance Diagnostic Index Page with improved animations and layout adjustments)
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
