# 📋 Exemple de Données Générées

## Structure Complète des Données

### Categories

```json
[
  {
    "id": 1,
    "slug": "sovereignty",
    "label": "Souveraineté Numérique",
    "color": "#3b82f6"
  },
  {
    "id": 2,
    "slug": "sobriety",
    "label": "Sobriété Numérique",
    "color": "#10b981"
  },
  {
    "id": 3,
    "slug": "durability",
    "label": "Durabilité",
    "color": "#f59e0b"
  },
  {
    "id": 4,
    "slug": "inclusion",
    "label": "Inclusion Numérique",
    "color": "#8b5cf6"
  }
]
```

### Question Exemple (Q2 : Hébergement)

```json
{
  "id": 2,
  "category_id": 1,
  "content": "Où sont hébergées les données pédagogiques et administratives de vos élèves ?",
  "order": 2,
  "is_active": true,
  "options": [
    {
      "id": 4,
      "question_id": 2,
      "label": "Sur un cloud public américain (Google Drive, OneDrive, AWS)",
      "value": "cloud_us",
      "impact_scores": {
        "sovereignty": -25,
        "inclusion": -5
      },
      "recommendations": [
        {
          "id": 3,
          "title": "Alerte Souveraineté : Vos données sous juridiction étrangère",
          "description": "Vos données sont soumises au Cloud Act américain...",
          "action_label": "Simuler une migration vers FerrisCloud",
          "action_url": "/simulation/ferris-cloud",
          "priority": 20
        }
      ]
    },
    {
      "id": 5,
      "label": "Chez un hébergeur européen (OVH, Scaleway) ou académique",
      "value": "cloud_eu",
      "impact_scores": {
        "sovereignty": 10,
        "inclusion": 0
      }
    },
    {
      "id": 6,
      "label": "Serveur local auto-hébergé",
      "value": "self_hosted",
      "impact_scores": {
        "sovereignty": 20,
        "durability": 5
      }
    }
  ]
}
```

### Diagnostic Exemple (Résultat Utilisateur)

```json
{
  "id": 1,
  "user_id": 42,
  "created_at": "2025-12-04T10:30:00Z",
  "final_score": {
    "global": 45,
    "sovereignty": 30,
    "sobriety": 40,
    "durability": 55,
    "inclusion": 55
  },
  "answers": [
    {
      "id": 1,
      "diagnostic_id": 1,
      "question_id": 1,
      "question_option_id": 1,
      "question": {
        "content": "La fin du support de Windows 10..."
      },
      "selected_option": {
        "label": "Remplacement systématique du parc...",
        "impact_scores": {
          "durability": -20,
          "sobriety": -15,
          "sovereignty": -5
        }
      }
    }
  ]
}
```

## Calcul du Score Global

### Formule

Pour chaque catégorie :

```
score_category = SUM(impact_scores[category]) / nombre_questions
score_global = MOYENNE(scores_categories)
```

### Exemple de Calcul

Si un utilisateur répond :

- Q1 (Durabilité) → Option A : `{"durability": -20, "sobriety": -15, "sovereignty": -5}`
- Q2 (Souveraineté) → Option A : `{"sovereignty": -25, "inclusion": -5}`
- Q3 (Souveraineté) → Option C : `{"sovereignty": 15, "inclusion": 15}`
- Q4 (Inclusion) → Option C : `{"inclusion": 20, "sovereignty": 10}`
- Q5 (Durabilité) → Option B : `{"durability": 5, "sobriety": 5}`

**Scores par catégorie :**

- Sovereignty: (-5 + -25 + 15 + 10) / 5 = **-1**
- Sobriety: (-15 + 5) / 5 = **-2**
- Durability: (-20 + 5) / 5 = **-3**
- Inclusion: (-5 + 15 + 20) / 5 = **+6**

**Score global:** (-1 + -2 + -3 + 6) / 4 = **0** (sur une échelle -100/+100)

### Normalisation pour l'affichage

Pour un Radar Chart (0-100) :

```javascript
normalized_score = (raw_score + 100) / 2
// -100 → 0
//    0 → 50
// +100 → 100
```

## Recommandations Déclenchées

Lorsqu'un utilisateur choisit une option avec un score négatif, les recommandations associées s'affichent triées par `priority` (DESC).

### Exemple

Si choix Q2 = "Cloud US" (option_id: 4) :

```json
{
  "triggered_recommendations": [
    {
      "category": "Souveraineté",
      "title": "Alerte Souveraineté : Vos données sous juridiction étrangère",
      "description": "Vos données sont soumises au Cloud Act...",
      "action": {
        "label": "Simuler une migration vers FerrisCloud",
        "url": "/simulation/ferris-cloud"
      },
      "priority": 20
    }
  ]
}
```
