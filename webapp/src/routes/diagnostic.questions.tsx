import { createFileRoute } from '@tanstack/react-router'
import { DiagnosticQuestionsPage } from '@/pages/diagnostic/questions.tsx'

export const Route = createFileRoute('/diagnostic/questions')({
  component: DiagnosticQuestionsPage,
})
