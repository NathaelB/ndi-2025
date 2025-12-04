# 🌱 Seeder du Questionnaire NIRD

## Description

Ce seeder peuple la base de données avec les questions du diagnostic **NIRD** (Numérique Inclusif, Responsable et Durable) pour la Nuit de l'Info 2025.

## Contenu généré

### 📊 4 Catégories (Piliers NIRD)

- **Souveraineté Numérique** (Bleu #3b82f6)
- **Sobriété Numérique** (Vert #10b981)
- **Durabilité** (Orange #f59e0b)
- **Inclusion Numérique** (Violet #8b5cf6)

### ❓ 5 Questions avec options et recommandations

1. **Obsolescence & Matériel** (Durabilité)
   - Windows 10 EOL et stratégie matériel
   - 3 options avec impacts différenciés
   - 2 recommandations pour les mauvais choix

2. **Hébergement & Données** (Souveraineté)
   - Localisation des données pédagogiques
   - Lien vers simulation FerrisCloud

3. **Identité Numérique** (Souveraineté)
   - Système d'authentification
   - Lien vers simulation FerrisKey

4. **Logiciels & Ressources** (Inclusion)
   - Outils bureautiques utilisés
   - Alternatives libres

5. **Écologie & Réemploi** (Durabilité)
   - Politique d'achat matériel
   - Impact carbone

## 🚀 Utilisation

### Lancer le seeder

```bash
# Depuis le dossier /api
node ace db:seed
```

### Lancer uniquement ce seeder

```bash
node ace db:seed --files database/seeders/questionnaire_seeder.ts
```

### Reset + Seed (⚠️ Supprime toutes les données)

```bash
node ace migration:fresh --seed
```

## 📋 Pré-requis

- Les migrations doivent être exécutées en premier
- Les modèles doivent être correctement configurés
- PostgreSQL doit être actif

```bash
# Lancer les migrations d'abord
node ace migration:run
```

## 🎯 Structure des données

### Impact Scores (JSON)

Chaque option de réponse contient un objet `impactScores` :

```json
{
  "sovereignty": -20, // Impact sur la souveraineté (-100 à +100)
  "sobriety": -15, // Impact sur la sobriété
  "durability": 10, // Impact sur la durabilité
  "inclusion": 5 // Impact sur l'inclusion
}
```

### Recommandations

Les recommandations sont liées aux **mauvaises réponses** (scores négatifs) et proposent :

- Un titre accrocheur
- Une description pédagogique
- Un lien d'action (vers simulateur ou doc)
- Une priorité (pour le tri d'affichage)

## 🔗 Liens intégrés

- **FerrisCloud** : `/simulation/ferris-cloud` (Migration hébergement souverain)
- **FerrisKey** : `/simulation/ferris-key` (SSO Keycloak)
- **Guide NIRD** : `https://nird.forge.apps.education.fr/`
- **Forge des Communs** : `https://forge.apps.education.fr/`

## 📊 Statistiques

- **4** catégories
- **5** questions
- **15** options au total (3 par question)
- **7** recommandations ciblées
- **100%** aligné sur le sujet NDI 2025
