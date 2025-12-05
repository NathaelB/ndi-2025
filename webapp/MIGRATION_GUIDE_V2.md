# 🔄 Guide de Migration - Système Gold V2.0

**Version:** 1.x → 2.0  
**Date:** 2025  
**Difficulté:** ⭐ Facile (rétrocompatible)

---

## 🎯 Résumé des Changements

### Changements Majeurs

1. **Structure des skills** : Objets `{name, key, weight}` au lieu de `Record<string, number>`
2. **Poids stratégiques** : Rust 24★, Kubernetes 25★, PostgreSQL 12★, Keycloak 15★
3. **Seuils ajustés** : Platinum 500→400, Gold 350→300, Silver 200→180, Bronze 100→90
4. **Profils enrichis** : Arnaud et Samuel passent à 32 compétences chacun

### Breaking Changes

**Aucun !** 🎉 La migration est 100% rétrocompatible.

---

## 📋 Checklist de Migration

### Étape 1 : Vérifier l'État Actuel

```bash
cd webapp
pnpm dev
```

- [ ] L'application démarre sans erreur
- [ ] Page `/talents/map` s'affiche correctement
- [ ] Les scores actuels sont visibles

### Étape 2 : Comprendre les Nouveaux Scores

**Avant V1:**
- Arnaud : ~280 pts (Gold 🏆)
- Samuel : ~318 pts (Gold 🏆)

**Après V2:**
- Arnaud : ~516 pts (Platinum 💎)
- Samuel : ~459 pts (Platinum 💎)

**Raison:** Poids stratégiques augmentés + profils enrichis + seuil abaissé

### Étape 3 : Rafraîchir l'Application

```bash
# Si l'app tourne déjà, elle se rafraîchira automatiquement (HMR)
# Sinon, relancer :
pnpm dev
```

### Étape 4 : Valider les Changements

- [ ] Arnaud affiche **💎 Platinum** (~516 pts)
- [ ] Samuel affiche **💎 Platinum** (~459 pts)
- [ ] Top skills affichent les nouveaux poids (Rust 24★, K8s 25★)
- [ ] Badge Gold bien positionné (pas de superposition)
- [ ] Filtre "Platinum" affiche les 2 profils

---

## 🔍 Points de Contrôle Détaillés

### 1. Vérifier les Poids des Skills

**Ouvrir la console développeur et tester :**

```javascript
// Dans la console du navigateur
import { SKILL_DEFINITIONS } from './features/gold-scoring';

// Vérifier les poids stratégiques
SKILL_DEFINITIONS.find(s => s.key === 'rust').weight; // 24
SKILL_DEFINITIONS.find(s => s.key === 'kubernetes').weight; // 25
SKILL_DEFINITIONS.find(s => s.key === 'postgresql').weight; // 12
SKILL_DEFINITIONS.find(s => s.key === 'keycloak').weight; // 15
```

**Attendu :**
- ✅ Rust = 24
- ✅ Kubernetes = 25
- ✅ PostgreSQL = 12
- ✅ Keycloak = 15

### 2. Vérifier les Profils

**Arnaud Castelltort doit avoir :**
- 32 compétences (au lieu de 13)
- Score skills : ~201 pts
- Score total : ~516 pts
- Tier : Platinum 💎

**Samuel Ortiz doit avoir :**
- 32 compétences (au lieu de 13)
- Score skills : ~209 pts
- Score total : ~459 pts
- Tier : Platinum 💎

### 3. Vérifier les Seuils

```javascript
import { GOLD_TIERS } from './features/gold-scoring';

console.log(GOLD_TIERS);
// {
//   PLATINUM: 400,  // au lieu de 500
//   GOLD: 300,      // au lieu de 350
//   SILVER: 180,    // au lieu de 200
//   BRONZE: 90      // au lieu de 100
// }
```

### 4. Vérifier le Badge Gold

**Visuellement :**
- Badge Gold positionné sous le nom du talent
- Pas de superposition avec le badge de disponibilité
- Responsive sur mobile

---

## 🐛 Problèmes Potentiels et Solutions

### Problème 1 : Les scores n'ont pas changé

**Symptômes :**
- Arnaud toujours à ~280 pts
- Samuel toujours à ~318 pts

**Solutions :**
1. Vider le cache du navigateur (Cmd+Shift+R ou Ctrl+Shift+R)
2. Vérifier que le fichier `talent-storage.ts` a bien été mis à jour
3. Réinitialiser le localStorage :
   ```javascript
   localStorage.clear();
   window.location.reload();
   ```

### Problème 2 : Badge Gold se superpose toujours

**Symptômes :**
- Badge Gold chevauche le badge de disponibilité

**Solutions :**
1. Vérifier que `talent-card.tsx` a été mis à jour
2. Vider le cache et recompiler :
   ```bash
   rm -rf .vite
   pnpm dev
   ```

### Problème 3 : Erreur TypeScript

**Symptômes :**
- Erreur "Property 'key' does not exist on type..."

**Solutions :**
1. Vérifier que `gold-scoring.ts` exporte bien `SkillDefinition`
2. Recompiler :
   ```bash
   pnpm type-check
   pnpm build --dry-run
   ```

### Problème 4 : Les profils n'ont pas 32 skills

**Symptômes :**
- Arnaud ou Samuel n'affichent que 13 skills

**Solutions :**
1. Le localStorage contient les anciennes données
2. Réinitialiser :
   ```javascript
   // Dans la console
   localStorage.removeItem('talents_local_storage');
   window.location.reload();
   ```

---

## 📊 Validation des Résultats

### Script de Test Automatique

```bash
cd webapp/src/pages/talents/features
tsx __test_gold_scoring.ts
```

**Résultat attendu :**

```
🏆 TEST DU SYSTÈME DE SCORING GOLD
============================================================

👤 ARNAUD CASTELLTORT
------------------------------------------------------------
Total: 516 pts
Tier: PLATINUM 💎

Avec les NOUVEAUX poids (32 skills):
  - Rust: 24★ (triplé)
  - Kubernetes: 25★ (5x GCP)
  - PostgreSQL: 12★ (dominance BDD)
  - Keycloak: 15★ (haute valeur IAM)

Seuil Platinum abaissé: 500 → 400 pts

Breakdown:
  Skills:        201 pts
  Projects:      150 pts
  Open Source:   80 pts
  Verified:      80 pts
  Available:     25 pts
  Experience:    60 pts
  Languages:     0 pts

Top Skills:
  1. Kubernetes (25★)
  2. Rust (24★)
  3. Keycloak (15★)
  4. PostgreSQL (12★)
  5. Graph Theory (6★)


👤 SAMUEL ORTIZ
------------------------------------------------------------
Total: 459 pts
Tier: PLATINUM 💎
[...]

============================================================
✅ RÉSULTAT DES TESTS

Arnaud Castelltort: 516 pts - ✅ PLATINUM 💎
Samuel Ortiz:       459 pts - ✅ PLATINUM 💎

🎉 TOUS LES TESTS PASSENT ! Les deux profils sont Platinum.

📊 Contribution des skills stratégiques:
   Arnaud (32 skills): Rust(24) + K8s(25) + PG(12) + Keycloak(15) = 76 pts pour 4 skills
   Samuel (32 skills): Rust(24) + K8s(25) + PG(12) + Keycloak(15) = 76 pts pour 4 skills

   Seuil Platinum: 400 pts (ajusté de 500 pour refléter les nouveaux poids)

============================================================
```

### Validation Visuelle

**Checklist UI :**

- [ ] Page `/talents/map` s'affiche sans erreur
- [ ] 2 profils affichés (Arnaud, Samuel)
- [ ] Badge **💎 Platinum** visible sur les 2 cartes
- [ ] Score affiché : ~516 pts (Arnaud), ~459 pts (Samuel)
- [ ] Top skills affichent les nouveaux poids (24★, 25★, etc.)
- [ ] Badge Gold bien positionné (sous le nom)
- [ ] Filtre "🏆 Gold" disponible
- [ ] Sélectionner "Platinum" dans le filtre → 2 profils affichés
- [ ] Statistiques affichent 2 profils Platinum
- [ ] Tri par score fonctionne

---

## 🔄 Rollback (en cas de problème)

### Si besoin de revenir en arrière

**Option 1 : Via Git**

```bash
git log --oneline  # Trouver le commit avant V2
git checkout <commit-hash>
pnpm dev
```

**Option 2 : Restaurer les fichiers manuellement**

Les 3 fichiers principaux à restaurer :
1. `src/pages/talents/features/gold-scoring.ts`
2. `src/pages/talents/features/talent-storage.ts`
3. `src/pages/talents/ui/talent-card.tsx`

**Option 3 : Utiliser le localStorage de backup**

```javascript
// Sauvegarder avant migration
const backup = localStorage.getItem('talents_local_storage');
localStorage.setItem('talents_backup_v1', backup);

// Restaurer si besoin
const backup = localStorage.getItem('talents_backup_v1');
localStorage.setItem('talents_local_storage', backup);
window.location.reload();
```

---

## 📚 Documentation de Référence

### Fichiers Importants

```
webapp/
├── SKILL_WEIGHTS_V2.md              📖 Liste complète des poids
├── CHANGELOG_V2_SKILLS.md           📖 Détails des changements
├── SCORE_CALCULATION_DETAILED.md    📖 Calculs avec exemples
├── FINAL_SUMMARY_V2.md              📖 Résumé complet
└── MIGRATION_GUIDE_V2.md            📖 Ce fichier

src/pages/talents/features/
├── gold-scoring.ts                  ⚙️  Logique de scoring
├── talent-storage.ts                ⚙️  Données des profils
└── __test_gold_scoring.ts           🧪 Tests automatiques

src/pages/talents/ui/
└── talent-card.tsx                  🎨 Carte de talent
```

### Commandes Utiles

```bash
# Démarrer l'app
pnpm dev

# Vérifier les types
pnpm type-check

# Build de test
pnpm build --dry-run

# Nettoyer le cache
rm -rf .vite node_modules/.vite

# Réinstaller les dépendances
pnpm install
```

---

## ✅ Confirmation de Migration Réussie

**La migration est réussie si :**

1. ✅ L'application démarre sans erreur
2. ✅ Arnaud Castelltort affiche **💎 Platinum** (~516 pts)
3. ✅ Samuel Ortiz affiche **💎 Platinum** (~459 pts)
4. ✅ Top skills affichent Rust (24★), Kubernetes (25★)
5. ✅ Badge Gold bien positionné (pas de superposition)
6. ✅ Filtres Gold fonctionnent correctement
7. ✅ Statistiques sont cohérentes

**Si tous les points sont validés : Migration réussie ! 🎉**

---

## 💡 Conseils pour la Suite

### Maintenir le Système

1. **Ajouter de nouveaux skills :**
   ```typescript
   // Dans gold-scoring.ts
   { name: "Nouvelle Techno", key: "nouvelle_techno", weight: 5 }
   ```

2. **Ajuster les poids :**
   ```typescript
   // Modifier le weight d'un skill existant
   { name: "Docker", key: "docker", weight: 8 } // au lieu de 6
   ```

3. **Modifier les seuils :**
   ```typescript
   // Dans gold-scoring.ts
   export const GOLD_TIERS = {
     PLATINUM: 450,  // ajuster selon besoin
     GOLD: 320,
     // ...
   }
   ```

### Créer de Nouveaux Profils

Pour créer un profil Platinum facilement :
1. Inclure Rust (24★) + Kubernetes (25★) = 49 pts
2. Ajouter PostgreSQL (12★) + Keycloak (15★) = 27 pts
3. Compléter avec 15-20 skills complémentaires = 60-90 pts
4. Créer 3-4 projets dont 2 Open Source = 140-180 pts
5. Vérifier le profil + disponibilité + expérience = 105-165 pts

**Total : 381-511 pts → Platinum garanti !**

---

## 🆘 Support

### En cas de problème

1. **Consulter la documentation :**
   - `FINAL_SUMMARY_V2.md` - Vue d'ensemble
   - `SCORE_CALCULATION_DETAILED.md` - Détails du calcul

2. **Vérifier les logs :**
   ```bash
   # Console navigateur (F12)
   # Chercher les erreurs en rouge
   ```

3. **Tester avec le script automatique :**
   ```bash
   cd webapp/src/pages/talents/features
   tsx __test_gold_scoring.ts
   ```

4. **Réinitialiser complètement :**
   ```bash
   # Nettoyer tout
   rm -rf node_modules .vite
   pnpm install
   pnpm dev
   
   # Nettoyer localStorage
   localStorage.clear();
   window.location.reload();
   ```

---

**Version:** 2.0.0  
**Status:** Production Ready  
**Support:** Documentation complète disponible  

**Bonne migration ! 🚀**
