import { createFileRoute } from '@tanstack/react-router'
import { DiagnosticIndexPage } from '@/pages/diagnostic/index.tsx'

export const Route = createFileRoute('/diagnostic/')({
  component: DiagnosticIndexPage,
})
