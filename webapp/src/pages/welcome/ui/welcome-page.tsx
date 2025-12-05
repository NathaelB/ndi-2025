import { motion } from "motion/react"
import { useTemporalNavigation } from '../features/use-temporal-navigation'
import { TimelineNavigator } from './timeline-navigator'
import { AdaptiveContentMorphing } from './adaptive-content-morphing'
import { ContextualActionPredictor } from './contextual-action-predictor'
import { ScrollIndicator } from './scroll-indicator'
import { Button } from '@/components/ui/button'
import { Users, ArrowRight } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

/**
 * WELCOME PAGE - Navigation Temporelle Cognitive
 *
 * TRANSFORMATION ERGONOMIQUE RADICALE :
 * Abandonne la structure linéaire statique (Hero → Features → CTA)
 * Pour une expérience adaptative basée sur l'état cognitif temporel de l'utilisateur.
 *
 * Au lieu de montrer le même contenu à tous, l'interface détecte :
 * - Si c'est ta première visite ou si tu reviens
 * - Ton comportement (scroll, temps passé, engagement)
 * - Ta progression (diagnostic démarré/complété)
 *
 * Et adapte automatiquement :
 * - Le parcours de navigation (Présent/Passé/Futur)
 * - Le contenu affiché (émotionnel/analytique/actionnable)
 * - Les CTA proposés (explorateur/comparateur/acteur)
 *
 * C'est une révolution : passer d'une interface "vitrine" à une interface "coach"
 */

export function WelcomePage() {
  const navigate = useNavigate()
  const {
    temporalState,
    setTemporalState,
    history,
    isReturningUser,
    hasReadDeeply,
    scrollDepth,
    sessionDuration,
    markFeaturesExplored,
    markDiagnosticStarted,
  } = useTemporalNavigation()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero section amélioré */}
      <section className="relative overflow-hidden bg-linear-to-b from-blue-50 via-white to-blue-50/30 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
          <motion.div
            className="flex flex-col items-center text-center space-y-6 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Badge avec animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >

            </motion.div>

            {/* Main Title avec meilleure hiérarchie */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              <span className="block mb-2">Comment les établissements</span>
              <span className="block mb-2">scolaires peuvent</span>
              <span className="bg-linear-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
                tenir tête aux Big Tech
              </span>
              <span className="text-gray-900 dark:text-gray-100"> ?</span>
            </motion.h1>

            {/* Dynamic subtitle avec meilleur contraste */}
            <motion.p
              key={temporalState}
              className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl leading-relaxed font-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {temporalState === 'present' &&
                "Découvre pourquoi la souveraineté numérique éducative est l'enjeu de cette décennie."
              }
              {temporalState === 'past' &&
                "Compare tes choix actuels avec les alternatives. Les chiffres parlent d'eux-mêmes."
              }
              {temporalState === 'future' &&
                "Plan d'action concret pour reprendre le contrôle de ton infrastructure numérique."
              }
            </motion.p>

            {/* Séparateur visuel */}
            <motion.div
              className="w-24 h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            />

            {/* Lien vers la carte des talents */}
            <motion.div
              className="pt-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
            >
              <Button
                onClick={() => navigate({ to: '/talents/map' })}
                size="lg"
                variant="outline"
                className="gap-3 text-base px-6 py-3 border-2 hover:bg-blue-50 dark:hover:bg-blue-950/30 hover:border-blue-500 transition-all duration-300 group"
              >
                <Users className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Découvrir la carte des talents</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Timeline Navigator avec meilleur espacement */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
          >
            <TimelineNavigator
              activeState={temporalState}
              onStateChange={setTemporalState}
              isReturningUser={isReturningUser}
              visitCount={history.count}
            />
          </motion.div>

          {/* Scroll Indicator - Invite à découvrir la suite */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <ScrollIndicator
              targetId="why-important"
              label="Pourquoi c'est important ?"
            />
          </motion.div>
        </div>

        {/* Decorative elements améliorés */}
        <div className="absolute top-10 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-3xl -z-10 animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-3xl -z-10" />
      </section>

      {/* Adaptive Content - Se transforme selon l'état temporel */}
      <AdaptiveContentMorphing
        id="why-important"
        temporalState={temporalState}
        isReturningUser={isReturningUser}
        visitCount={history.count}
        diagnosticCompleted={history.diagnosticCompleted}
        onFeatureExplored={markFeaturesExplored}
      />

      {/* Contextual Action Predictor - CTA intelligent */}
      <ContextualActionPredictor
        temporalState={temporalState}
        isReturningUser={isReturningUser}
        visitCount={history.count}
        hasReadDeeply={hasReadDeeply}
        scrollDepth={scrollDepth}
        sessionDuration={sessionDuration}
        diagnosticStarted={history.diagnosticStarted}
        diagnosticCompleted={history.diagnosticCompleted}
        onDiagnosticStart={markDiagnosticStarted}
      />
    </div>
  )
}
