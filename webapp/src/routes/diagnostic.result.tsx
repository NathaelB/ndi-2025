import { createFileRoute } from '@tanstack/react-router'
import { DiagnosticResultPage } from '@/pages/diagnostic/result.tsx'

export const Route = createFileRoute('/diagnostic/result')({
  component: DiagnosticResultPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      answers: (search.answers as string) || '',
    }
  },
})
