# Architecture du projet NDI 2025 - WebApp

## Vue d'ensemble

Ce projet est une application web React construite pour répondre au sujet NDI 2025 :
**"Comment les établissements scolaires peuvent tenir tête aux Big Tech ?"**

## Stack technique

### Frontend
- **React 19** - Framework UI moderne avec Server Components
- **TypeScript 5.9** - Typage statique pour plus de fiabilité
- **Vite** (Rolldown) - Build tool ultra-rapide
- **TailwindCSS 4** - Framework CSS utility-first
- **ShadCN/ui** - Composants UI accessibles et personnalisables

### Routing & State Management
- **TanStack Router v1** - Routing file-based type-safe
- **TanStack Query v5** - Gestion d'état serveur et cache

### Outils de développement
- **ESLint** - Linting du code
- **TypeScript ESLint** - Règles TypeScript spécifiques
- **pnpm** - Gestionnaire de paquets performant

## Structure du projet

```
webapp/
├── public/                    # Assets statiques
├── src/
│   ├── assets/               # Images, fonts, etc.
│   ├── components/           # Composants réutilisables globaux
│   │   └── ui/              # Composants ShadCN
│   ├── lib/                 # Utilitaires et helpers
│   ├── pages/               # Pages organisées par domaine
│   │   └── [domain]/
│   │       ├── features/    # Logique métier
│   │       └── ui/          # Composants UI
│   ├── routes/              # Routes TanStack Router
│   │   ├── __root.tsx       # Route racine
│   │   ├── index.tsx        # Page d'accueil
│   │   └── routeTree.gen.ts # Arbre des routes
│   ├── index.css            # Styles globaux
│   └── main.tsx             # Point d'entrée
├── components.json          # Configuration ShadCN
├── tsconfig.json            # Configuration TypeScript
├── vite.config.ts           # Configuration Vite
└── package.json             # Dependencies
```

## Principes architecturaux

### 1. Domain-Driven Design (DDD)

Les pages sont organisées par **domaine métier** :

```
pages/
├── welcome/           # Domaine: Page d'accueil
├── dashboard/         # Domaine: Tableau de bord
└── solutions/         # Domaine: Solutions alternatives
```

Chaque domaine est **autonome** et contient sa propre logique et ses propres composants.

### 2. Séparation des responsabilités

#### `/features` - Logique métier (Business Logic)
- Custom hooks React
- Services d'appel API
- Transformations de données
- Validations
- Types TypeScript métier

**Règle :** Aucun JSX dans `/features`

#### `/ui` - Interface utilisateur (Presentation Layer)
- Composants React avec JSX
- Composition de composants
- Styling TailwindCSS
- Gestion de l'affichage uniquement

**Règle :** Logique minimale dans `/ui`, uniquement pour l'affichage

### 3. File-based Routing

TanStack Router utilise un système de routes basé sur les fichiers :

```
routes/
├── __root.tsx         → Layout racine
├── index.tsx          → /
├── welcome.tsx        → /welcome
└── dashboard.tsx      → /dashboard
```

### 4. Type Safety

- **100% TypeScript** - Pas de fichiers `.js` ou `.jsx`
- **Types stricts** - `strict: true` dans tsconfig
- **Props typées** - Toutes les props de composants sont typées
- **Router typé** - TanStack Router fournit un typage complet

## Patterns et conventions

### Naming conventions

#### Fichiers
- Composants : `PascalCase.tsx` (ex: `WelcomePage.tsx`)
- Hooks : `camelCase.ts` avec préfixe `use` (ex: `useWelcomeData.ts`)
- Services : `camelCase.ts` avec suffixe `Service` (ex: `authService.ts`)
- Types : `PascalCase.ts` ou dans le fichier concerné

#### Code
- Composants : `PascalCase` (ex: `function WelcomeCard()`)
- Hooks : `camelCase` avec préfixe `use` (ex: `useQuery()`)
- Variables : `camelCase`
- Constantes : `UPPER_SNAKE_CASE` ou `camelCase`

### Structure d'un composant

```tsx
// Imports - Groupés par catégorie
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { useWelcomeData } from '../features/useWelcomeData'

// Types/Interfaces
interface MyComponentProps {
  title: string
  onAction?: () => void
}

// Composant principal
export function MyComponent({ title, onAction }: MyComponentProps) {
  // Hooks React
  const [state, setState] = useState(false)
  
  // Hooks custom
  const { data, isLoading } = useWelcomeData()
  
  // Handlers
  const handleClick = () => {
    setState(true)
    onAction?.()
  }
  
  // Early returns
  if (isLoading) return <div>Loading...</div>
  
  // Render
  return (
    <div>
      <h1>{title}</h1>
      <Button onClick={handleClick}>Action</Button>
    </div>
  )
}
```

### TanStack Query - Data fetching

```tsx
// features/useWelcomeData.ts
import { useQuery } from '@tanstack/react-query'

export function useWelcomeData() {
  return useQuery({
    queryKey: ['welcome', 'data'],
    queryFn: async () => {
      const response = await fetch('/api/welcome')
      if (!response.ok) throw new Error('Failed to fetch')
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
```

### TanStack Router - Routes

```tsx
// routes/welcome.tsx
import { createFileRoute } from '@tanstack/react-router'
import { WelcomePage } from '@/pages/welcome/ui/WelcomePage.tsx'

export const Route = createFileRoute('/welcome')({
  component: WelcomePage,
  // Optionnel: loader pour pre-fetching
  loader: ({ context }) => {
    return context.queryClient.ensureQueryData({
      queryKey: ['welcome'],
      queryFn: fetchWelcomeData,
    })
  },
})
```

## Styling avec TailwindCSS

### Approche utility-first

Nous utilisons TailwindCSS v4 avec une approche **utility-first** :

```tsx
<div className="flex flex-col gap-4 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
    Titre
  </h2>
  <p className="text-gray-600 dark:text-gray-400">
    Description
  </p>
</div>
```

### Responsive design

Mobile-first avec breakpoints TailwindCSS :

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Contenu */}
</div>
```

### Dark mode

Support natif du dark mode :

```tsx
<div className="bg-white dark:bg-gray-900">
  <h1 className="text-gray-900 dark:text-white">Title</h1>
</div>
```

## ShadCN/ui

### Installation de composants

```bash
pnpm dlx shadcn@latest add [component-name]
```

### Composants disponibles

- `button` - Boutons avec variants
- `card` - Cartes de contenu
- `badge` - Badges/labels
- `separator` - Séparateurs
- Plus selon les besoins...

### Customisation

Les composants ShadCN sont entièrement customisables via TailwindCSS.
Ils sont copiés dans `src/components/ui/` et peuvent être modifiés.

## Gestion d'état

### État local
- `useState` pour l'état local simple
- `useReducer` pour l'état complexe

### État serveur
- **TanStack Query** pour les données serveur
- Cache automatique
- Revalidation intelligente
- Optimistic updates

### Contexte global
- React Context pour les données globales (theme, auth, etc.)
- Éviter le prop drilling

## Performance

### Code splitting
- Routes automatiquement code-splittées par TanStack Router
- Lazy loading des composants lourds

### Optimisations React
- `React.memo()` pour éviter les re-renders inutiles
- `useMemo()` et `useCallback()` pour optimiser les calculs

### TanStack Query
- Cache intelligent
- Prefetching des données
- Deduplication des requêtes

## Tests (à venir)

### Structure recommandée
```
src/
├── pages/
│   └── welcome/
│       ├── features/
│       │   ├── useWelcomeData.ts
│       │   └── useWelcomeData.test.ts
│       └── ui/
│           ├── WelcomePage.tsx
│           └── WelcomePage.test.tsx
```

### Stack de tests recommandée
- **Vitest** - Test runner
- **React Testing Library** - Tests de composants
- **MSW** - Mock des APIs

## Déploiement

### Build de production

```bash
pnpm run build
```

Génère un dossier `dist/` avec les fichiers statiques optimisés.

### Variables d'environnement

Créer un fichier `.env` :

```env
VITE_API_URL=https://api.example.com
VITE_APP_NAME=NDI 2025
```

Accès dans le code :

```tsx
const apiUrl = import.meta.env.VITE_API_URL
```

## Bonnes pratiques

### ✅ À faire

1. **Typer tout** - Utiliser TypeScript pour tout
2. **Séparer logique et UI** - features/ vs ui/
3. **Composants purs** - Éviter les side-effects dans le render
4. **Hooks personnalisés** - Extraire la logique réutilisable
5. **Documenter** - README.md dans chaque domaine
6. **Responsive** - Mobile-first toujours
7. **Accessibilité** - Utiliser les composants ShadCN accessibles

### ❌ À éviter

1. ❌ Logique métier dans les composants UI
2. ❌ Appels API directs dans les composants
3. ❌ State management complexe sans raison
4. ❌ CSS custom sans raison (utiliser Tailwind)
5. ❌ Prop drilling excessif
6. ❌ Re-renders inutiles
7. ❌ Code non typé

## Ressources

- [React 19 Docs](https://react.dev)
- [TanStack Router](https://tanstack.com/router)
- [TanStack Query](https://tanstack.com/query)
- [TailwindCSS](https://tailwindcss.com)
- [ShadCN/ui](https://ui.shadcn.com)
- [TypeScript](https://www.typescriptlang.org)

## Contribution

Avant de contribuer :
1. Lire cette documentation
2. Respecter les conventions de nommage
3. Suivre la structure par domaine
4. Typer tout le code
5. Tester localement avec `pnpm dev`

---

**Projet NDI 2025** - Comment les établissements scolaires peuvent tenir tête aux Big Tech ?
