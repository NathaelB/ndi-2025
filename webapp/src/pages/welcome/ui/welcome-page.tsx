import { WelcomeHero } from './welcome-hero.tsx'
import { WelcomeFeatures } from './welcome-features.tsx'
import { WelcomeCallToAction } from './welcome-call-to-action.tsx'

export function WelcomePage() {
  return (
    <div className="flex flex-col">
      <WelcomeHero />
      <WelcomeFeatures />
      <WelcomeCallToAction />
    </div>
  )
}
