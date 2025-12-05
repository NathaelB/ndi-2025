# 🏆 Système de Notation Gold

Le système Gold est une fonctionnalité d'évaluation automatique des profils de talents basée sur l'analyse de leurs compétences, projets et attributs.

## Vue d'ensemble

Le système attribue un **score** à chaque profil et le classe dans un **tier** (Platinum, Gold, Silver, Bronze ou Standard) en fonction de critères objectifs et pondérés.

## Composants du Score

### 1. Compétences Techniques (Skills)
Chaque compétence technique possède un **poids** de 1 à 5 étoiles :

- **5★** : Technologies haute demande / expertise rare
  - Exemples : Rust, TypeScript, Go, React, Kubernetes, Machine Learning, WebAssembly
- **4★** : Technologies recherchées
  - Exemples : Python, Node.js, Docker, PostgreSQL, Angular
- **3★** : Technologies standards
  - Exemples : REST API, MySQL, Agile
- **2★** : Poids par défaut pour les compétences non listées

**Calcul** : Somme des poids de toutes les compétences du profil

### 2. Projets
- **Points de base** : 10 points par projet
- **Bonus complexité** :
  - 10 pts si 5+ technologies utilisées
  - 5 pts si 3-4 technologies utilisées
- **Bonus récent** : 5 pts si projet des 3 dernières années

### 3. Open Source 🎯 NOUVEAU
- **+30 points** par projet Open Source
- Encourage la contribution à la communauté
- Indique une culture de partage et de transparence

### 4. Profil Vérifié
- **+50 points** si le profil est vérifié
- Garantit l'authenticité des informations

### 5. Disponibilité
- **+20 points** si le talent est disponible
- Favorise les profils accessibles pour collaboration

### 6. Expérience
- **+40 points** pour 10+ ans d'expérience (Senior)
- **+20 points** pour 5-10 ans d'expérience (Mid)
- **+5 points par année** pour moins de 5 ans (Junior)

### 7. Multilinguisme
- **+15 points** par langue supplémentaire (après les 2 premières)
- Valorise la communication internationale

## Tiers Gold

Les profils sont classés en 5 tiers selon leur score total :

| Tier | Seuil | Badge | Description |
|------|-------|-------|-------------|
| **Platinum** 💎 | 500+ pts | Elite | Profils exceptionnels, experts reconnus |
| **Gold** 🏆 | 350+ pts | Expert | Professionnels hautement qualifiés |
| **Silver** 🥈 | 200+ pts | Confirmé | Talents solides avec expertise établie |
| **Bronze** 🥉 | 100+ pts | Intermédiaire | Professionnels en développement |
| **Standard** ⭐ | < 100 pts | Base | Profils débutants ou spécialisés |

## Fonctionnalités UI

### 1. Badge Gold sur les Cartes
Chaque carte de talent affiche :
- Badge du tier en haut à droite (compact)
- Score détaillé dans une section dédiée
- Breakdown des points par catégorie

### 2. Top Skills Display
Visualisation des 5 meilleures compétences avec :
- Barre de progression proportionnelle au poids
- Notation en étoiles (1★ à 5★)
- Gradient de couleur selon le niveau

### 3. Filtres Gold
Panel dédié permettant de :
- Filtrer par tier minimum (ex: uniquement Gold et supérieur)
- Filtrer par score minimum (slider de 0 à 600+)
- Trier les talents par score Gold (décroissant)

### 4. Statistiques Gold
Composant affichant :
- Répartition des talents par tier (avec barres de progression)
- Score moyen de tous les talents
- Score maximum
- Meilleur profil (nom + score)

### 5. Indicateur Open Source
- Badge vert "Open Source" sur les projets concernés
- Checkbox dans le formulaire de création/édition de projet
- Points bonus visibles dans le breakdown du score

## Utilisation

### Filtrer par Tier
```typescript
import { filterByGoldTier } from './features/gold-scoring';

const goldTalents = filterByGoldTier(talents, 'gold'); // Gold et supérieur
```

### Trier par Score
```typescript
import { sortByGoldScore } from './features/gold-scoring';

const sortedTalents = sortByGoldScore(talents); // Ordre décroissant
```

### Calculer le Score
```typescript
import { calculateGoldScore } from './features/gold-scoring';

const score = calculateGoldScore(talent);
console.log(score.total); // Score total
console.log(score.tier); // Tier attribué
console.log(score.breakdown); // Détail par catégorie
console.log(score.topSkills); // Top skills avec poids
```

### Hook de Filtrage
```typescript
const {
  filteredTalents,
  setMinTier,
  setMinScore,
  clearFilters,
  hasActiveFilters,
} = useGoldFilters(talents);

// Filtrer par tier
setMinTier('gold');

// Filtrer par score
setMinScore(300);

// Réinitialiser
clearFilters();
```

## Configuration des Poids

Les poids des compétences sont configurables dans `gold-scoring.ts` :

```typescript
export const SKILL_WEIGHTS: Record<string, number> = {
  "Rust": 5,
  "TypeScript": 5,
  "React": 5,
  // ... ajoutez vos compétences
};
```

Les points bonus sont également configurables :

```typescript
export const BONUS_POINTS = {
  VERIFIED: 50,
  OPEN_SOURCE_PROJECT: 30,
  PROJECT_BASE: 10,
  AVAILABLE: 20,
  // ...
};
```

## Fichiers Principaux

```
src/pages/talents/
├── features/
│   ├── gold-scoring.ts         # Logique de calcul et configuration
│   ├── use-gold-filters.ts     # Hook de filtrage
│   └── mock-talents.ts         # Interface avec champ openSource
└── ui/
    ├── gold-badge.tsx          # Badge d'affichage du tier
    ├── gold-filters.tsx        # Panel de filtres Gold
    ├── gold-stats.tsx          # Statistiques globales
    ├── top-skills-display.tsx  # Visualisation des top skills
    └── talent-card.tsx         # Carte enrichie avec Gold badge
```

## Exemples de Scores

### Profil Platinum (550 pts)
- 15 skills haute valeur (moyenne 4★) : ~240 pts
- 8 projets dont 4 open source : ~200 pts
- Vérifié : +50 pts
- 12 ans d'expérience : +40 pts
- Disponible : +20 pts

### Profil Gold (380 pts)
- 10 skills diverses (moyenne 3.5★) : ~175 pts
- 5 projets dont 2 open source : ~110 pts
- Vérifié : +50 pts
- 7 ans d'expérience : +20 pts
- 3 langues : +15 pts
- Disponible : +20 pts

### Profil Silver (220 pts)
- 8 skills (moyenne 3★) : ~120 pts
- 3 projets : ~40 pts
- Vérifié : +50 pts
- 3 ans d'expérience : +15 pts

## Améliorations Futures

- [ ] Historique de score dans le temps
- [ ] Badges d'expertise par domaine
- [ ] Recommandations pour améliorer son score
- [ ] Comparaison de profils
- [ ] Export du classement Gold
- [ ] API d'analyse de profil
- [ ] Pondération personnalisable par entreprise
- [ ] Machine Learning pour ajuster les poids automatiquement

## Notes Techniques

- Les calculs sont effectués côté client (pas de backend requis)
- Le score est recalculé dynamiquement à chaque modification
- Les poids des skills sont insensibles à la casse
- Le système est extensible et configurable
- Compatible React 19 avec hooks modernes

---

**Créé le** : 2025  
**Version** : 1.0.0  
**Auteur** : Équipe Talents Platform
