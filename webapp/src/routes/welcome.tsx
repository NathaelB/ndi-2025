import { createFileRoute } from '@tanstack/react-router'
import { WelcomePage } from '@/pages/welcome/ui/welcome-page.tsx'

export const Route = createFileRoute('/welcome')({
  component: WelcomePage,
})
