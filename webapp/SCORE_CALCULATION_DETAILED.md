# 📊 Calcul Détaillé des Scores Gold

## 🎯 Nouveaux Seuils (Version 2.0)

```
💎 Platinum   400+ pts  (baissé de 500)
🏆 Gold       300+ pts  (baissé de 350)
🥈 Silver     180+ pts  (baissé de 200)
🥉 Bronze      90+ pts  (baissé de 100)
⭐ Standard   < 90 pts
```

**Justification:** Avec les nouveaux poids stratégiques (Rust 24★, Kubernetes 25★), les seuils originaux étaient trop élevés. Les nouveaux seuils rendent Platinum accessible aux vrais experts.

---

## 🧮 Calcul du Score Total

### Formule Globale

```
SCORE TOTAL = Skills + Projets + Bonus
```

### Détail des Composantes

---

## 1️⃣ Score des Skills

### Poids Stratégiques (Top 20)

| Skill | Poids | Catégorie |
|-------|-------|-----------|
| **Kubernetes** | 25★ | DevOps Ultra-Stratégique |
| **Rust** | 24★ | Langage Ultra-Stratégique |
| **Keycloak** | 15★ | IAM/Sécurité |
| **PostgreSQL** | 12★ | Base de Données |
| **Docker** | 6★ | Container |
| **Graph Theory** | 6★ | Théorie |
| **Hardware Security** | 6★ | Sécurité |
| **TypeScript** | 5★ | Langage Web |
| **Go** | 5★ | Langage Backend |
| **React** | 5★ | Framework Frontend |
| **Terraform** | 5★ | IaC |
| **AWS** | 5★ | Cloud |
| **GCP** | 5★ | Cloud |
| **Azure** | 5★ | Cloud |
| **Microservices** | 5★ | Architecture |
| **Distributed Systems** | 5★ | Architecture |
| **System Programming** | 5★ | Systèmes |
| **Confidential Computing** | 5★ | Sécurité |
| **Security** | 5★ | Sécurité |
| **RISC-V** | 5★ | Hardware |

### Calcul

```
Score Skills = Σ (poids de chaque skill)
```

**Skill non listé = 2★ par défaut**

---

## 2️⃣ Score des Projets

### Points de Base

```
Points Base = Nombre de projets × 15 pts
```

### Bonus Open Source

```
Bonus OS = Nombre de projets OS × 40 pts
```

### Bonus Complexité

```
Si 5+ technologies    → +20 pts par projet
Si 3-4 technologies   → +10 pts par projet
Si < 3 technologies   → +0 pts
```

### Bonus Récent

```
Si année ≥ (année actuelle - 3) → +10 pts par projet
```

### Formule Complète

```
Score Projet = (N × 15) + (N_OS × 40) + Bonus_Complexité + Bonus_Récent
```

---

## 3️⃣ Bonus Profil

### Bonus Fixes

| Attribut | Points |
|----------|--------|
| Profil vérifié | **80 pts** |
| Disponible | **25 pts** |

### Bonus Expérience

```
Si ≥ 10 ans   → +60 pts  (Senior)
Si 5-9 ans    → +30 pts  (Mid-level)
Si < 5 ans    → +(années × 5) pts
```

### Bonus Langues

```
Si > 2 langues → +(langues - 2) × 20 pts
```

### Formule Complète

```
Bonus Total = Vérifié + Disponibilité + Expérience + Langues
```

---

## 📈 Exemples Complets

### Exemple 1: Arnaud Castelltort

#### Skills (32 compétences)

**Compétences Stratégiques:**
```
Rust                    24★
Kubernetes              25★
PostgreSQL              12★
Keycloak                15★
Graph Theory             6★
Théorie des graphes      6★
---
SOUS-TOTAL (6 skills):  88 pts
```

**Autres Compétences de Haute Valeur:**
```
Microservices            5★
Distributed Systems      5★
Event-Driven Arch        5★
Domain-Driven Design     5★
System Programming       5★
Performance Opt          5★
Concurrency              5★
Parallel Computing       5★
TypeScript               5★
React                    5★
Terraform                5★
AWS                      5★
GraphQL                  4★
gRPC                     4★
Node.js                  4★
Docker                   6★
Linux                    4★
Redis                    4★
Kafka                    4★
CI/CD                    4★
GitHub Actions           4★
Clean Architecture       4★
Test-Driven Dev          4★
---
SOUS-TOTAL (23 skills): 107 pts
```

**Compétences Standard:**
```
Architectures distribuées  2★
---
SOUS-TOTAL (3 skills):     6 pts
```

**TOTAL SKILLS: 88 + 107 + 6 = 201 pts**

#### Projets

```
2 projets × 15 pts base                 = 30 pts
2 projets Open Source × 40 pts          = 80 pts
2 projets avec 3 technologies × 10 pts  = 20 pts
2 projets récents (2024, 2023) × 10 pts = 20 pts
---
TOTAL PROJETS:                          150 pts
```

#### Bonus

```
Vérifié                  = 80 pts
Disponible               = 25 pts
15 ans d'expérience      = 60 pts (Senior)
2 langues                =  0 pts (pas de bonus)
---
TOTAL BONUS:             165 pts
```

#### Score Final

```
Skills:   201 pts
Projets:  150 pts
Bonus:    165 pts
---
TOTAL:    516 pts → 💎 PLATINUM
```

---

### Exemple 2: Samuel Ortiz

#### Skills (32 compétences)

**Compétences Stratégiques:**
```
Rust                    24★
Kubernetes              25★
PostgreSQL              12★
Keycloak                15★
Hardware Security        6★
RISC-V                   5★
---
SOUS-TOTAL (6 skills):  87 pts
```

**Autres Compétences de Haute Valeur:**
```
C                        4★
C++                      5★
System Programming       5★
Programmation système    5★
Confidential Computing   5★
Security                 5★
Cryptography             5★
Embedded Systems         5★
Performance Opt          5★
Concurrency              5★
Microservices            5★
Distributed Systems      5★
Real-time Systems        5★
WebAssembly              5★
Go                       5★
Terraform                5★
AWS                      5★
gRPC                     4★
Docker                   6★
Linux                    4★
Python                   4★
Kafka                    4★
Redis                    4★
---
SOUS-TOTAL (23 skills): 114 pts
```

**Compétences Standard:**
```
Virtualisation          4★
---
SOUS-TOTAL (3 skills):  8 pts
```

**TOTAL SKILLS: 87 + 114 + 8 = 209 pts**

#### Projets

```
2 projets × 15 pts base                 = 30 pts
1 projet Open Source × 40 pts           = 40 pts
2 projets avec 3 technologies × 10 pts  = 20 pts
2 projets récents (2024, 2023) × 10 pts = 20 pts
---
TOTAL PROJETS:                          110 pts
```

#### Bonus

```
Vérifié                  = 80 pts
Occupé (busy)            =  0 pts (pas disponible)
18 ans d'expérience      = 60 pts (Senior)
2 langues                =  0 pts (pas de bonus)
---
TOTAL BONUS:             140 pts
```

#### Score Final

```
Skills:   209 pts
Projets:  110 pts
Bonus:    140 pts
---
TOTAL:    459 pts → 💎 PLATINUM
```

---

## 🎯 Stratégies pour Atteindre Platinum (400+ pts)

### Stratégie 1: Expert Cloud-Native

**Skills nécessaires (15-20 skills):**
```
Obligatoires:
- Rust (24★)
- Kubernetes (25★)
- PostgreSQL (12★)
- Docker (6★)
= 67 pts

Recommandées:
- Terraform (5★)
- Microservices (5★)
- Distributed Systems (5★)
- gRPC (4★)
- Kafka (4★)
- Redis (4★)
+ 5-8 autres skills
= ~60-80 pts supplémentaires

TOTAL SKILLS: 127-147 pts
```

**Projets:**
```
3 projets dont 2 Open Source
2 projets complexes (5+ techs)
3 projets récents

TOTAL: ~180 pts
```

**Bonus:**
```
Vérifié + Disponible + 10+ ans
TOTAL: 165 pts
```

**SCORE FINAL: 127-147 + 180 + 165 = 472-492 pts → PLATINUM 💎**

---

### Stratégie 2: Expert Sécurité/Systèmes

**Skills nécessaires:**
```
Obligatoires:
- Rust (24★)
- Keycloak (15★)
- Hardware Security (6★)
- Security (5★)
- Cryptography (5★)
= 55 pts

Recommandées:
- Kubernetes (25★)
- PostgreSQL (12★)
- C++ (5★)
- System Programming (5★)
+ 8-10 autres skills
= ~80-100 pts

TOTAL SKILLS: 135-155 pts
```

**Projets:**
```
4 projets dont 2 OS
TOTAL: ~160 pts
```

**Bonus:**
```
Vérifié + 10+ ans
TOTAL: 140 pts
```

**SCORE FINAL: 135-155 + 160 + 140 = 435-455 pts → PLATINUM 💎**

---

## 📊 Distribution Typique des Scores

### Par Niveau d'Expertise

| Niveau | Skills | Projets | Bonus | Total | Tier |
|--------|--------|---------|-------|-------|------|
| Junior (2 ans) | 20-40 | 20-40 | 10-30 | 50-110 | Bronze/Silver |
| Mid (5 ans) | 40-80 | 60-100 | 50-80 | 150-260 | Silver/Gold |
| Senior (10+ ans) | 80-150 | 100-180 | 100-165 | 280-495 | Gold/Platinum |
| Expert (15+ ans) | 120-220 | 120-200 | 140-185 | 380-605 | Platinum |

---

## 🔍 Audit de Score

### Points de Contrôle

1. **Skills < 100 pts** → Ajouter des compétences stratégiques (Rust, K8s, PostgreSQL)
2. **Projets < 80 pts** → Créer plus de projets Open Source
3. **Bonus < 100 pts** → Se faire vérifier, indiquer disponibilité
4. **Total < 400 pts** → Combiner les 3 stratégies ci-dessus

---

## 💡 Conseils Pro

### Pour Maximiser le Score

1. **Prioriser les skills ultra-stratégiques**
   - Rust (24★) et Kubernetes (25★) = 49 pts à eux seuls !
   
2. **Contribuer à l'Open Source**
   - Chaque projet OS = +40 pts
   - 3 projets OS = +120 pts
   
3. **Se faire vérifier**
   - +80 pts garantis
   
4. **Être disponible**
   - +25 pts gratuits
   
5. **Accumuler de l'expérience**
   - 10+ ans = +60 pts

### Exemple Optimal

```
Skills (20 compétences bien choisies):  180 pts
Projets (4 dont 3 OS):                  200 pts
Bonus (vérifié + dispo + senior):       165 pts
---
TOTAL:                                  545 pts → PLATINUM 💎
```

---

**Version:** 2.0  
**Date:** 2025  
**Seuil Platinum:** 400 pts (ajusté)
