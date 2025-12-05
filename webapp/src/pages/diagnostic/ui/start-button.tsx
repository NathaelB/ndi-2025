import { Button } from '@/components/ui/button'
import { ArrowRight, Shield } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

interface StartButtonProps {
  className?: string
}

export function StartButton({ className }: StartButtonProps) {
  const navigate = useNavigate()

  const handleStart = () => {
    navigate({ to: '/diagnostic/questions' })
  }

  return (
    <Button
      size="lg"
      onClick={handleStart}
      className={`gap-2 text-lg px-8 py-6 ${className} bg-slate-800 text-white`}
    >
      <Shield className="w-6 h-6" />
      Commencer le diagnostic
      <ArrowRight className="w-6 h-6" />
    </Button>
  )
}
