import { motion, AnimatePresence } from "motion/react"
import { Shield, Server, Key, Database, Eye, Cloud, Sparkles, History, Rocket, CheckCircle2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { type TemporalState } from '../features/use-temporal-navigation'

/**
 * ADAPTIVE CONTENT MORPHING
 * 
 * CASSAGE DE CONVENTION MAJEUR :
 * Le contenu ne se cache/affiche pas, il SE TRANSFORME selon l'état temporel.
 * - PRÉSENT : Découverte empathique (pourquoi c'est important)
 * - PASSÉ : Réflexion analytique (comparaison de choix, données chiffrées)
 * - FUTUR : Action directive (étapes concrètes, roadmap)
 * 
 * Pourquoi c'est différent ?
 * - Les interfaces classiques montrent/cachent du contenu (binary thinking)
 * - Ici, le contenu ÉVOLUE organiquement selon le contexte mental
 * - C'est comme une conversation qui s'adapte à ton humeur
 * 
 * Inspiration :
 * - Adaptive learning platforms (Duolingo, Khan Academy)
 * - Narrative games with branching paths
 * - Cognitive psychology: Bloom's Taxonomy (Remember → Understand → Apply)
 */

interface AdaptiveContentMorphingProps {
  temporalState: TemporalState
  isReturningUser: boolean
  visitCount: number
  diagnosticCompleted: boolean
  id?: string
  onFeatureExplored: () => void
}

// Structure des features avec contenu adaptatif selon l'état temporel
interface AdaptiveFeature {
  id: string
  present: {
    title: string
    description: string
    icon: React.ElementType
    color: string
    emotion: string // Ton émotionnel pour le présent
  }
  past: {
    title: string
    description: string
    metric: string // Donnée chiffrée ou comparaison
    risk: string // Risque si on ne fait pas ce choix
  }
  future: {
    title: string
    description: string
    action: string // Action concrète à prendre
    timeline: string // Quand le faire
  }
}

const ADAPTIVE_FEATURES: AdaptiveFeature[] = [
  {
    id: 'sovereignty',
    present: {
      title: ' Souveraineté des données',
      description: 'Imaginez un instant : les données de vos 500 élèves sont analysées par des algorithmes étrangers, sans votre contrôle. C\'est la réalité actuelle.',
      icon: Shield,
      color: 'text-blue-600',
      emotion: 'Préoccupant, non ?',
    },
    past: {
      title: 'Vous vs Big Tech',
      description: 'Avec Google Workspace, vos données transitent par des serveurs US. Avec une solution souveraine, elles restent en France.',
      metric: '100% des données restent sous votre contrôle',
      risk: 'Cloud Act : les USA peuvent accéder à vos données scolaires',
    },
    future: {
      title: ' Reprendre le contrôle',
      description: 'Migrez vers Keycloak + hébergement OVH. Open-source, français, certifié.',
      action: '1. Audit de vos données actuelles\n2. Installation Keycloak\n3. Migration progressive',
      timeline: '3 à 6 mois pour une transition sécurisée',
    },
  },
  {
    id: 'infrastructure',
    present: {
      title: ' Infrastructure autonome',
      description: 'Votre établissement dépend de Microsoft/Google pour tout : emails, documents, stockage. Si demain ils changent de prix ou de politique ?',
      icon: Server,
      color: 'text-green-600',
      emotion: 'La dépendance est un risque',
    },
    past: {
      title: ' Le coût caché',
      description: 'Microsoft 365 : 10€/utilisateur/mois. Pour 500 comptes = 60 000€/an. Sur 5 ans : 300 000€ perdus.',
      metric: 'Économie potentielle : 80% avec open-source',
      risk: 'Vendor lock-in : impossible de partir sans tout perdre',
    },
    future: {
      title: ' Votre propre cloud',
      description: 'Nextcloud + OnlyOffice auto-hébergés. Vous gardez le contrôle, les économies, les données.',
      action: '1. Serveur dédié OVH (100€/mois)\n2. Installation Nextcloud\n3. Formation équipe',
      timeline: '2 mois pour être opérationnel',
    },
  },
  {
    id: 'authentication',
    present: {
      title: ' Authentification sécurisée',
      description: 'Chaque élève utilise son compte Google pour se connecter. Pratique ? Oui. Mais Google collecte tout : recherches, connexions, habitudes.',
      icon: Key,
      color: 'text-purple-600',
      emotion: 'Confort ou surveillance ?',
    },
    past: {
      title: ' Vie privée vs simplicité',
      description: 'Google SSO collecte l\'activité de navigation, localisation, historique de connexion. RGPD = zone grise.',
      metric: '73% des écoles françaises utilisent Google malgré les alertes CNIL',
      risk: 'Amendes RGPD : jusqu\'à 20M€ ou 4% du CA annuel',
    },
    future: {
      title: ' Authentification éthique',
      description: 'Keycloak open-source : SSO sécurisé, aucune collecte, conforme RGPD nativement.',
      action: '1. Installer Keycloak\n2. Connecter vos apps\n3. Migrer les comptes',
      timeline: '1 mois de setup + 1 semaine de migration',
    },
  },
  {
    id: 'storage',
    present: {
      title: ' Stockage local',
      description: 'Vos documents pédagogiques, dossiers élèves, données RH sont sur OneDrive ou Google Drive. Hébergés où ? Vous ne savez pas vraiment.',
      icon: Database,
      color: 'text-orange-600',
      emotion: 'Inquiétant quand on y pense',
    },
    past: {
      title: ' Géolocalisation des données',
      description: 'Google Drive : serveurs multi-zones (US, EU, Asie). Microsoft : principalement US avec réplication.',
      metric: 'Latence moyenne : 200ms (US) vs 15ms (serveur local)',
      risk: 'Perte de connexion internet = perte d\'accès total',
    },
    future: {
      title: ' Hébergement local',
      description: 'Serveur NAS local + backup cloud français (Scaleway, OVH). Vitesse + sécurité + souveraineté.',
      action: '1. Synology NAS (1500€)\n2. Backup automatique OVH\n3. Accès VPN sécurisé',
      timeline: '2 semaines installation + formation',
    },
  },
  {
    id: 'transparency',
    present: {
      title: 'Transparence totale',
      description: 'Logiciels propriétaires = boîte noire. Vous ne savez pas ce qu\'ils font de vos données ni comment ils fonctionnent vraiment.',
      icon: Eye,
      color: 'text-pink-600',
      emotion: 'Confiance aveugle ?',
    },
    past: {
      title: ' Code fermé = risques cachés',
      description: 'Windows 11 : télémétrie activée par défaut, collecte données d\'usage, diagnostics envoyés à Microsoft.',
      metric: '95% des logiciels scolaires sont propriétaires et non-auditables',
      risk: 'Failles de sécurité inconnues, backdoors potentielles',
    },
    future: {
      title: ' Open-source auditable',
      description: 'Linux + logiciels FLOSS : code source consultable, audits communautaires, sécurité prouvée.',
      action: '1. Migration progressive vers Linux\n2. Formation enseignants\n3. Accompagnement technique',
      timeline: '6 mois pour migration complète du parc',
    },
  },
  {
    id: 'alternatives',
    present: {
      title: ' Alternatives GAFAM',
      description: 'Google Classroom, Teams, Zoom... Ces outils dominent l\'éducation. Mais il existe des alternatives tout aussi performantes, éthiques et françaises.',
      icon: Cloud,
      color: 'text-cyan-600',
      emotion: 'D\'autres choix existent',
    },
    past: {
      title: ' Souveraineté numérique',
      description: 'Zoom = serveurs US + failles de sécurité. Jitsi = open-source européen, même qualité, zéro tracking.',
      metric: 'BigBlueButton utilisé par 15 000 établissements français',
      risk: 'Dépendance stratégique : les GAFAM peuvent couper l\'accès',
    },
    future: {
      title: ' Écosystème français',
      description: 'Tchap (messagerie), Jitsi (visio), Moodle (LMS), BigBlueButton (classe virtuelle). Tout existe déjà.',
      action: '1. Diagnostic de vos outils actuels\n2. Identification des équivalents\n3. Migration outil par outil',
      timeline: '12 mois pour transformation complète',
    },
  },
]

export function AdaptiveContentMorphing({
  temporalState,
  isReturningUser,
  visitCount,
  diagnosticCompleted,
  onFeatureExplored,
  id,
}: AdaptiveContentMorphingProps) {
  
  // Titre de section adaptatif
  const getSectionTitle = () => {
    switch (temporalState) {
      case 'present':
        return {
          main: 'Pourquoi c\'est important',
          sub: 'Comprenons d\'abord les enjeux humains derrière la technologie',
        }
      case 'past':
        return {
          main: 'Comparons les choix',
          sub: 'Voici les faits, les chiffres, les risques concrets que vous prenez',
        }
      case 'future':
        return {
          main: 'Plan d\'action concret',
          sub: 'Étapes précises pour reprendre le contrôle, avec timelines réalistes',
        }
    }
  }
  
  const { main, sub } = getSectionTitle()
  
  return (
    <section id={id} className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header with state indicator */}
        <motion.div 
          className="text-center mb-16 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium"
            key={temporalState} // Force re-render on state change
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            {temporalState === 'present' && <Sparkles className="w-4 h-4 text-blue-500" />}
            {temporalState === 'past' && <History className="w-4 h-4 text-purple-500" />}
            {temporalState === 'future' && <Rocket className="w-4 h-4 text-green-500" />}
            <span>Mode : {temporalState === 'present' ? 'Découverte' : temporalState === 'past' ? 'Analyse' : 'Action'}</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {main}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {sub}
          </p>
        </motion.div>

        {/* Features Grid with morphing content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {ADAPTIVE_FEATURES.map((feature, index) => {
              const content = feature[temporalState]
              const Icon = temporalState === 'present' ? feature.present.icon : 
                          temporalState === 'past' ? CheckCircle2 : 
                          Rocket
              
              return (
                <motion.div
                  key={`${feature.id}-${temporalState}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  onViewportEnter={() => onFeatureExplored()}
                >
                  <Card className="h-full border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 hover:shadow-xl">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className={`p-3 rounded-lg bg-gradient-to-br ${
                            temporalState === 'present' ? 'from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800' :
                            temporalState === 'past' ? 'from-purple-100 to-purple-200 dark:from-purple-900 dark:to-purple-800' :
                            'from-green-100 to-green-200 dark:from-green-900 dark:to-green-800'
                          }`}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <Icon className={`w-6 h-6 ${
                            temporalState === 'present' ? 'text-blue-600 dark:text-blue-400' :
                            temporalState === 'past' ? 'text-purple-600 dark:text-purple-400' :
                            'text-green-600 dark:text-green-400'
                          }`} />
                        </motion.div>
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">
                            {content.title}
                          </CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-base leading-relaxed">
                        {content.description}
                      </CardDescription>
                      
                      {/* Present: Emotion */}
                      {temporalState === 'present' && (
                        <motion.div
                          className="pt-3 border-t text-sm italic text-gray-600 dark:text-gray-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          💭 {feature.present.emotion}
                        </motion.div>
                      )}
                      
                      {/* Past: Metrics + Risks */}
                      {temporalState === 'past' && (
                        <motion.div
                          className="pt-3 border-t space-y-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="flex items-center gap-2 text-sm font-semibold text-purple-700 dark:text-purple-300">
                            <CheckCircle2 className="w-4 h-4" />
                            {feature.past.metric}
                          </div>
                          <div className="text-sm text-red-600 dark:text-red-400">
                             <strong>Risque :</strong> {feature.past.risk}
                          </div>
                        </motion.div>
                      )}
                      
                      {/* Future: Action steps */}
                      {temporalState === 'future' && (
                        <motion.div
                          className="pt-3 border-t space-y-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="text-sm font-medium text-green-700 dark:text-green-300">
                            📋 Actions :
                          </div>
                          <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                            {feature.future.action}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            ⏱️ <span>{feature.future.timeline}</span>
                          </div>
                        </motion.div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
        
        {/* Contextual helper based on user journey */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          {temporalState === 'present' && !isReturningUser && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              💡 <strong>Nouveau ici ?</strong> Prends ton temps pour explorer. Quand tu seras prêt, passe en mode <strong>Passé</strong> pour voir les chiffres.
            </p>
          )}
          {temporalState === 'past' && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Les données te parlent ? Passe en mode <strong>Futur</strong> pour voir le plan d'action concret.
            </p>
          )}
          {temporalState === 'future' && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              🚀 Prêt à agir ? Le diagnostic te donnera un plan personnalisé pour ton établissement.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
