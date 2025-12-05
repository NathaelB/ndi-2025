import { createFileRoute } from '@tanstack/react-router'
import MoodTest from '@/pages/mood/MoodTest'

export const Route = createFileRoute('/mood')({
  component: MoodTest,
})
