import { createFileRoute } from '@tanstack/react-router'
import { TalentMap } from '@/pages/talents/talent-map'

export const Route = createFileRoute('/talents/map')({
  component: TalentMapRoute,
})

function TalentMapRoute() {
  return <TalentMap />
}
