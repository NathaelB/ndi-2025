import { ChevronDown } from 'lucide-react'
import styles from '../styles/scroll-indicator.module.css'

interface ScrollIndicatorProps {
  targetId: string
  label?: string
}

/**
 * SCROLL INDICATOR
 * 
 * Composant de flèche animée qui invite l'utilisateur à découvrir la suite de la page.
 * Au clic, scroll automatiquement vers la section ciblée avec une animation smooth.
 * 
 * Design :
 * - Flèche animée avec effet de bounce
 * - Glow effect autour de l'icône
 * - Label explicatif
 * - Hover effect pour l'interactivité
 */
export function ScrollIndicator({ targetId, label = "Découvrir la suite" }: ScrollIndicatorProps) {
  const handleScroll = () => {
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  return (
    <div 
      className={styles.scrollIndicator}
      onClick={handleScroll}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleScroll()
        }
      }}
      aria-label={label}
    >
      <span className={styles.label}>{label}</span>
      <div className={styles.arrowContainer}>
        <div className={styles.arrowGlow} />
        <ChevronDown className={styles.arrowIcon} />
      </div>
    </div>
  )
}
