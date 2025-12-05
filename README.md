# 🚀 NDI 2025 - Le Village Numérique Résistant

Une expérience web immersive et éducative développée pour la Nuit de l'Info 2025.
L'objectif : sensibiliser les établissements scolaires à la souveraineté numérique via une interface gamifiée.

![Project Status](https://img.shields.io/badge/status-live-brightgreen)
![License](https://img.shields.io/badge/license-UNLICENSED-red)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?logo=three.js&logoColor=white)

## 📋 Table des Matières

- [🎯 Contexte & Mission](#-contexte--mission)
- [💡 Choix de Design & UX](#-choix-de-design--ux)
- [🎨 L'Expérience Visuelle](#-lexpérience-visuelle)
- [🛠️ Stack Technique](#️-stack-technique)
- [🚀 Installation & Démarrage](#-installation--démarrage)
- [🐳 Docker](#-docker)
- [👥 L'Équipe](#-léquipe)

---

## 🎯 Contexte & Mission

### Le Défi : David contre Goliath 🛡️
Le sujet de la **Nuit de l'Info 2025** nous invite à réfléchir à la dépendance des écoles face aux géants du numérique. Notre réponse est une application de **diagnostic instantané** qui aide les utilisateurs à comprendre leur empreinte numérique et à découvrir des alternatives libres (démarche NIRD).

### Une Approche "Frictionless" ⚡
Pour maximiser l'impact pédagogique et la facilité d'accès, nous avons fait le choix technique d'une **application 100% Frontend sans authentification**.
* **Pas de compte requis** : L'utilisateur accède immédiatement au diagnostic.
* **Pas de barrière à l'entrée** : L'expérience est fluide, rapide et centrée sur le contenu.
* **Confidentialité** : Les données de simulation restent locales à la session.

---

## 🎨 L'Expérience Visuelle

Nous avons opté pour une direction artistique **Spatiale et Futuriste**, symbolisant l'exploration de nouveaux horizons numériques loin des écosystèmes fermés.

### 🌌 Immersion 3D (Three.js)
L'application ne se contente pas d'afficher des formulaires, elle fait vivre les données :

* **L'Univers Interactif** : Un fond étoilé procédural réagit aux mouvements de la souris, créant une profondeur immersive.
* **La Sphère de Souveraineté** : Véritable baromètre visuel, cette sphère 3D évolue en temps réel selon les réponses de l'utilisateur :
    * 🔴 **Danger** : Rougeoyante et instable (score faible).
    * 🟠 **Transition** : Orangée et pulsante (score moyen).
    * 🔵 **Souveraineté** : Bleue, stable et lumineuse (score élevé).

---

## 🛠️ Stack Technique

Le projet est une **Single Page Application (SPA)** moderne, optimisée pour la performance et l'expérience utilisateur.

### Cœur de l'application
-   **React 19.2.0** : Architecture par composants et gestion d'état moderne.
-   **TypeScript** : Pour la robustesse et la maintenabilité du code.
-   **Vite** : Bundler ultra-rapide pour un développement fluide.

### UI & 3D
-   **Three.js / React Three Fiber** : Moteur de rendu 3D pour la sphère et l'univers.
-   **TailwindCSS 4** : Styling utilitaire nouvelle génération.
-   **ShadCN/UI** : Composants d'interface accessibles et esthétiques.
-   **Framer Motion** : Transitions fluides entre les étapes du diagnostic.

### Couleurs & Accessibilité
-   Utilisation de l'espace colorimétrique **OKLCH** pour des dégradés perceptuellement uniformes et vibrants, assurant une lisibilité optimale en mode sombre ("Deep Space").

---

## 🚀 Installation & Démarrage

### Prérequis
-   Node.js (v18+)
-   PNPM

### Lancer le projet

1.  **Cloner le dépôt**
    ```bash
    git clone <repository-url>
    cd ndi-2025
    ```

2.  **Installer les dépendances**
    ```bash
    cd webapp
    pnpm install
    ```

3.  **Démarrer le serveur de développement**
    ```bash
    pnpm dev
    ```

4.  **Accès**
    Ouvrez votre navigateur sur [http://localhost:5173](http://localhost:5173).

---

## 🐳 Docker

Pour faciliter le déploiement ou le test dans un environnement isolé, l'application est conteneurisée.

```bash
# À la racine du dossier webapp
docker build -t ndi-webapp .
docker run -p 5173:80 ndi-webapp
