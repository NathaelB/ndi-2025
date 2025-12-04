import { useQuery } from '@tanstack/react-query'

/**
 * Exemple de hook pour récupérer des données d'API
 *
 * Ce fichier est un exemple de structure pour les hooks métier.
 * Dans features/, on place toute la logique qui ne concerne pas l'affichage.
 */

interface WelcomeStats {
  totalSchools: number
  alternativesCount: number
  dataSaved: string
}

/**
 * Hook d'exemple utilisant TanStack Query
 * À utiliser dans les composants UI quand nécessaire
 */
export function useWelcomeStats() {
  return useQuery({
    queryKey: ['welcome', 'stats'],
    queryFn: async (): Promise<WelcomeStats> => {
      // Exemple d'appel API
      const response = await fetch('/api/welcome/stats')
      if (!response.ok) {
        throw new Error('Failed to fetch welcome stats')
      }
      return response.json()
    },
    // Options de cache
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

/**
 * Exemple de fonction de transformation de données
 * Logique métier pure, facilement testable
 */
export function formatSchoolCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k+`
  }
  return count.toString()
}

/**
 * Exemple de validation
 */
export function validateSchoolData(data: unknown): data is WelcomeStats {
  return (
    typeof data === 'object' &&
    data !== null &&
    'totalSchools' in data &&
    'alternativesCount' in data &&
    'dataSaved' in data
  )
}
