# Documentation Docker - Projet NDI

Ce document décrit l'architecture Docker du projet et comment builder/déployer chaque service.

## 🏗️ Architecture

Le projet utilise un Dockerfile multi-stage pour builder tous les services :

```
┌─────────────────────────────────────────┐
│           Base (Node 22 Alpine)         │
└─────────────────────────────────────────┘
                    │
        ┌───────────┼───────────┬──────────┐
        │           │           │          │
    ┌───▼───┐  ┌───▼───┐  ┌───▼────┐ ┌──▼──────┐
    │  API  │  │WebApp │  │Keycloak│ │Postgres │
    └───────┘  └───────┘  └────────┘ └─────────┘
```

## 📦 Services

### 1. PostgreSQL (Base de données)

```yaml
Image: postgres:17
Ports: 5454:5432
Database: ndi
```

**Variables d'environnement :**
- `POSTGRES_USER`: postgres
- `POSTGRES_PASSWORD`: postgres
- `POSTGRES_DB`: ndi

### 2. API (Backend AdonisJS)

```yaml
Image: Compilée depuis ./api
Port: 6000
```

**Stages de build :**
1. `api-deps` : Installation des dépendances
2. `api-production-deps` : Dépendances de production
3. `api-build` : Build de l'application
4. `api` : Image finale de production

**Variables d'environnement :**
- `PORT`: 6000
- `APP_KEY`: Clé de chiffrement AdonisJS
- `DB_HOST`: postgres
- `DB_PORT`: 5432
- `NODE_ENV`: production

### 3. WebApp (Frontend React)

```yaml
Image: nginx:1.28.0-alpine3.21-slim
Port: 5173
```

**Stages de build :**
1. `webapp-build` : Build de l'application React
2. `webapp` : Serveur Nginx pour les fichiers statiques

**Configuration :**
- Build avec Vite
- Servi par Nginx
- Configuration dans `webapp/nginx.conf`

### 4. Keycloak (Authentification)

```yaml
Image: quay.io/keycloak/keycloak:26.4.7
Port: 8080
```

**Stages de build :**
1. `keycloak-theme-build` : Build du thème Keycloakify
2. `keycloak` : Image Keycloak avec thème personnalisé

**Variables d'environnement :**
- `KEYCLOAK_ADMIN`: admin
- `KEYCLOAK_ADMIN_PASSWORD`: admin
- `KC_DB`: postgres
- `KC_DB_URL`: jdbc:postgresql://postgres:5432/keycloak
- `KC_HOSTNAME`: localhost
- `KC_HTTP_ENABLED`: true
- `KC_PROXY`: edge

## 🚀 Démarrage rapide

### Démarrer tous les services

```bash
docker-compose --profile build up -d
```

### Démarrer un service spécifique

```bash
# API uniquement
docker-compose --profile build up -d api

# WebApp uniquement
docker-compose --profile build up -d webapp

# Keycloak uniquement
docker-compose --profile build up -d keycloak
```

## 🔨 Build des images

### Build toutes les images

```bash
docker-compose --profile build build
```

### Build une image spécifique

```bash
# API
docker build -t ndi-api:latest --target api .

# WebApp
docker build -t ndi-webapp:latest --target webapp .

# Keycloak
docker build -t ndi-keycloak:latest --target keycloak .
```

## 📊 Gestion des services

### Voir les logs

```bash
# Tous les services
docker-compose logs -f

# Service spécifique
docker-compose logs -f api
docker-compose logs -f webapp
docker-compose logs -f keycloak
docker-compose logs -f postgres
```

### Statut des services

```bash
docker-compose ps
```

### Arrêter les services

```bash
# Arrêter tous les services
docker-compose down

# Arrêter un service spécifique
docker-compose stop api
```

### Redémarrer un service

```bash
docker-compose restart api
```

## 🔄 Workflow de développement

### 1. Développement local (sans Docker)

```bash
# API
cd api
npm install
npm run dev

# WebApp
cd webapp
npm install
npm run dev

# Keycloak theme
cd keycloak
pnpm install
pnpm run storybook
```

### 2. Test avec Docker

```bash
# Build et démarrer
docker-compose --profile build up -d

# Vérifier les logs
docker-compose logs -f
```

### 3. Rebuild après modifications

```bash
# Rebuild tout
docker-compose --profile build build
docker-compose --profile build up -d

# Rebuild un service spécifique
docker-compose build api
docker-compose up -d api
```

## 🗄️ Gestion des données

### Volumes

Le projet utilise un volume pour PostgreSQL :

```yaml
volumes:
  pgdata:
```

### Backup de la base de données

```bash
# Créer un backup
docker-compose exec postgres pg_dump -U postgres ndi > backup.sql

# Restaurer un backup
docker-compose exec -T postgres psql -U postgres ndi < backup.sql
```

### Réinitialiser les données

```bash
# ATTENTION : Supprime toutes les données !
docker-compose down -v
docker-compose --profile build up -d
```

## 🔧 Configuration avancée

### Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
# API
API_PORT=6000
APP_KEY=your-secret-key

# Database
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_DATABASE=ndi

# Keycloak
KEYCLOAK_ADMIN=admin
KEYCLOAK_ADMIN_PASSWORD=admin
KC_HOSTNAME=localhost
```

### Utiliser .env dans docker-compose

```yaml
services:
  api:
    environment:
      - PORT=${API_PORT}
      - APP_KEY=${APP_KEY}
```

## 🐛 Dépannage

### Les conteneurs ne démarrent pas

```bash
# Vérifier les logs
docker-compose logs

# Reconstruire depuis zéro
docker-compose down -v
docker-compose build --no-cache
docker-compose --profile build up -d
```

### Erreur de connexion à la base de données

```bash
# Vérifier que PostgreSQL est démarré
docker-compose ps postgres

# Voir les logs de PostgreSQL
docker-compose logs postgres

# Se connecter à PostgreSQL
docker-compose exec postgres psql -U postgres -d ndi
```

### Erreur de build

```bash
# Nettoyer les images et caches Docker
docker system prune -a

# Rebuild avec cache désactivé
docker-compose build --no-cache
```

### Port déjà utilisé

```bash
# Trouver quel processus utilise le port
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows

# Modifier le port dans docker-compose.yaml
ports:
  - "8081:8080"  # Utiliser 8081 au lieu de 8080
```

## 📈 Optimisation

### Réduire la taille des images

1. **Utiliser des images Alpine** : Plus petites et sécurisées
2. **Multi-stage builds** : Déjà implémenté dans le Dockerfile
3. **Nettoyer les caches** :
   ```dockerfile
   RUN npm ci --only=production && npm cache clean --force
   ```

### Améliorer les temps de build

1. **Utiliser le cache Docker** :
   ```bash
   docker-compose build --parallel
   ```

2. **Optimiser l'ordre des COPY** :
   - Copier package.json avant le code source
   - Permet de cacher la layer npm install

3. **Build en parallèle** :
   ```bash
   docker-compose build --parallel
   ```

## 🔒 Sécurité

### En production

1. **Ne pas utiliser les mots de passe par défaut**
2. **Utiliser HTTPS** (avec reverse proxy)
3. **Limiter les ports exposés**
4. **Scanner les images** :
   ```bash
   docker scan ndi-api:latest
   ```

5. **Utiliser des secrets Docker** :
   ```yaml
   secrets:
     db_password:
       file: ./secrets/db_password.txt
   ```

## 📚 Ressources

- [Documentation Docker](https://docs.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Best practices Dockerfile](https://docs.docker.com/develop/dev-best-practices/)
- [Multi-stage builds](https://docs.docker.com/build/building/multi-stage/)

## 🚢 Déploiement en production

### Avec Docker Swarm

```bash
# Initialiser le swarm
docker swarm init

# Déployer le stack
docker stack deploy -c docker-compose.yaml ndi
```

### Avec Kubernetes

```bash
# Générer les manifests Kubernetes
kompose convert -f docker-compose.yaml

# Déployer
kubectl apply -f .
```

### Avec un CI/CD

Exemple avec GitHub Actions dans `.github/workflows/docker.yml` :

```yaml
name: Build and Push Docker Images

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Build and push
        run: |
          docker-compose build
          docker-compose push
```

## 📝 Notes importantes

- Le profil `build` est requis pour démarrer les services custom
- PostgreSQL doit démarrer avant les autres services
- Les migrations sont exécutées par le service `migrate`
- Keycloak nécessite une base de données dédiée
- Toujours utiliser des volumes pour les données persistantes
