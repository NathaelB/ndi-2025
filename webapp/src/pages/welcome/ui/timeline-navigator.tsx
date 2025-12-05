import { motion } from "motion/react"
import { Clock, Sparkles, TrendingUp } from 'lucide-react'
import { type TemporalState } from '../features/use-temporal-navigation'

/**
 * TIMELINE NAVIGATOR - Interface verticale non conventionnelle
 * 
 * CASSAGE DE CONVENTION :
 * Au lieu d'une navigation horizontale classique, on propose une timeline VERTICALE
 * qui représente visuellement l'état mental/temporel de l'utilisateur.
 * 
 * Inspirations :
 * - Les timelines de montage vidéo (Adobe Premiere, DaVinci Resolve)
 * - Les interfaces de jeux vidéo avec états temporels (Life is Strange, Prince of Persia)
 * - Les visualisations scientifiques de flux cognitifs
 * 
 * Justification UX :
 * - La lecture verticale est naturelle pour le web (scroll)
 * - La métaphore temporelle est universellement comprise
 * - Permet de visualiser "où on en est" dans sa réflexion
 * - Réduit la charge cognitive : 3 choix clairs au lieu de navigation complexe
 */

interface TimelineNavigatorProps {
  activeState: TemporalState
  onStateChange: (state: TemporalState) => void
  isReturningUser: boolean
  visitCount: number
}

interface TimelineNode {
  state: TemporalState
  label: string
  description: string
  icon: React.ElementType
  color: string
  glowColor: string
}

const TIMELINE_NODES: TimelineNode[] = [
  {
    state: 'present',
    label: 'Présent',
    description: 'Découvrir maintenant',
    icon: Sparkles,
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.5)',
  },
  {
    state: 'past',
    label: 'Passé',
    description: 'Comprendre mes choix',
    icon: Clock,
    color: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.5)',
  },
  {
    state: 'future',
    label: 'Futur',
    description: 'Agir concrètement',
    icon: TrendingUp,
    color: 'from-green-500 to-emerald-500',
    glowColor: 'rgba(34, 197, 94, 0.5)',
  },
]

export function TimelineNavigator({ 
  activeState, 
  onStateChange, 
  isReturningUser,
  visitCount 
}: TimelineNavigatorProps) {
  const activeIndex = TIMELINE_NODES.findIndex(node => node.state === activeState)
  
  return (
    <div className="relative flex flex-col items-center py-12 sm:py-16">
      <div className="relative w-full max-w-4xl">
        {/* Timeline line horizontale */}
        <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-linear-to-r from-blue-200 via-purple-200 to-green-200 dark:from-blue-900 dark:via-purple-900 dark:to-green-900" />
        
        {/* Active state indicator horizontale */}
        <motion.div
          className="absolute top-1/2 h-1 -translate-y-1/2 bg-linear-to-r from-blue-500 via-purple-500 to-green-500"
          initial={false}
          animate={{
            left: `${activeIndex * 33.33}%`,
            width: '33.33%',
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        />
        
        {/* Timeline nodes horizontale */}
        <div className="relative flex justify-between items-center">
          {TIMELINE_NODES.map((node) => {
            const isActive = node.state === activeState
            const Icon = node.icon
            
            return (
              <motion.button
                key={node.state}
                onClick={() => onStateChange(node.state)}
                className="relative flex-1 group focus:outline-none"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="relative flex flex-col items-center">
                  {/* Node circle */}
                  <motion.div
                    className={`
                      relative z-10 flex items-center justify-center
                      w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full
                      ${isActive ? 'ring-4 ring-white dark:ring-gray-900 ring-offset-2' : ''}
                      bg-linear-to-br ${node.color}
                      shadow-xl
                      transition-all duration-300
                    `}
                    animate={{
                      boxShadow: isActive
                        ? `0 0 40px ${node.glowColor}, 0 0 80px ${node.glowColor}`
                        : '0 10px 40px rgba(0, 0, 0, 0.2)',
                    }}
                  >
                    <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-white" />
                  </motion.div>
                  
                  {/* Label container en dessous */}
                  <motion.div
                    className="mt-6 flex flex-col items-center text-center"
                    animate={{
                      opacity: isActive ? 1 : 0.6,
                      y: isActive ? 0 : 5,
                    }}
                  >
                    <div className={`
                      px-4 py-2 rounded-lg
                      ${isActive 
                        ? 'bg-white dark:bg-gray-800 shadow-xl' 
                        : 'bg-gray-100 dark:bg-gray-800/50 group-hover:bg-white dark:group-hover:bg-gray-800'
                      }
                      transition-all duration-300
                    `}>
                      <div className={`
                        text-base sm:text-lg font-bold
                        bg-linear-to-r ${node.color} bg-clip-text text-transparent
                      `}>
                        {node.label}
                      </div>
                      <div className={`
                        text-xs sm:text-sm
                        ${isActive 
                          ? 'text-gray-700 dark:text-gray-300' 
                          : 'text-gray-500 dark:text-gray-400'
                        }
                      `}>
                        {node.description}
                      </div>
                    </div>
                    
                    {/* État indicators */}
                    {isActive && (
                      <motion.div
                        className="mt-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {isReturningUser && (
                          <span className="px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                            Visite #{visitCount}
                          </span>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                </div>
                
                {/* Subtle animations for non-active states */}
                {!isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-linear-to-r from-transparent via-white/5 to-transparent"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
        
        {/* Helper text */}
        <motion.div
          className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {isReturningUser ? (
            <p>Bienvenue à nouveau ! Choisis ton état d'esprit pour une expérience adaptée.</p>
          ) : (
            <p>Première visite ? Commence par <strong>Présent</strong> pour découvrir.</p>
          )}
        </motion.div>
      </div>
    </div>
  )
}
