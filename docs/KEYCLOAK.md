# Keycloak avec Thème Personnalisé

Ce document explique comment builder et déployer Keycloak avec le thème personnalisé basé sur Keycloakify.

## 🏗️ Architecture

L'image Keycloak personnalisée est construite en plusieurs étapes :

1. **Build du thème** : Le thème Keycloakify est compilé en un fichier JAR
2. **Image Keycloak** : Le JAR est copié dans l'image officielle Keycloak
3. **Configuration** : Keycloak est configuré pour utiliser le thème

## 🚀 Démarrage rapide

### Avec Docker Compose

```bash
# Builder et démarrer tous les services (incluant Keycloak)
docker-compose --profile build up -d

# Accéder à Keycloak
open http://localhost:8080
```

### Credentials par défaut

- **Admin Console** : http://localhost:8080/admin
  - Username: `admin`
  - Password: `admin`

## 🎨 Développement du thème

### Développement local avec Storybook

```bash
cd keycloak
pnpm install
pnpm run storybook
```

Storybook sera disponible sur http://localhost:6006

### Build du thème

```bash
cd keycloak
pnpm run build-keycloak-theme
```

Le thème sera généré dans le dossier `dist_keycloak/` en tant que fichier JAR.

## 🐳 Build de l'image Docker

### Build uniquement Keycloak

```bash
docker build -t ndi-keycloak:latest --target keycloak .
```

### Build avec tous les services

```bash
docker-compose --profile build build
```

## 📦 Structure du thème

```
keycloak/
├── src/
│   └── login/
│       ├── pages/
│       │   ├── Login.tsx          # Page de login personnalisée
│       │   └── Login.stories.tsx  # Stories pour Storybook
│       ├── KcPage.tsx             # Router des pages
│       ├── KcContext.ts           # Types du contexte
│       ├── i18n.ts                # Traductions
│       └── main.css               # Styles personnalisés
├── package.json
└── vite.config.ts
```

## 🎨 Personnalisation du thème

### Modifier les styles

Les styles sont dans `keycloak/src/login/main.css` et utilisent Tailwind CSS v4.

### Ajouter une nouvelle page

1. Créer un nouveau composant dans `src/login/pages/`
2. Ajouter le cas dans `KcPage.tsx`
3. Créer un fichier `.stories.tsx` pour tester dans Storybook

### Modifier les traductions

Les traductions sont dans `src/login/i18n.ts` :

```typescript
.withCustomTranslations({
    en: {
        loginAccountSubtitle: "Your custom text in English",
        or: "or"
    },
    fr: {
        loginAccountSubtitle: "Votre texte en français",
        or: "ou"
    }
})
```

## 🔧 Configuration de Keycloak

### Variables d'environnement

Les variables d'environnement importantes pour la configuration :

```yaml
KEYCLOAK_ADMIN: admin                    # Nom d'utilisateur admin
KEYCLOAK_ADMIN_PASSWORD: admin           # Mot de passe admin
KC_DB: postgres                          # Type de base de données
KC_DB_URL: jdbc:postgresql://...         # URL de la base de données
KC_HOSTNAME: localhost                   # Hostname public
KC_HTTP_ENABLED: true                    # Activer HTTP (dev uniquement)
KC_PROXY: edge                           # Mode proxy (pour reverse proxy)
```

### Base de données

Keycloak nécessite une base de données PostgreSQL. Le docker-compose crée automatiquement :

- Une base de données `keycloak` dans le service PostgreSQL
- Les tables sont créées automatiquement au premier démarrage

## 🔐 Configuration d'un Realm

### Via l'interface Admin

1. Accéder à http://localhost:8080/admin
2. Se connecter avec `admin` / `admin`
3. Créer un nouveau realm ou utiliser le realm `master`
4. Aller dans **Realm Settings** > **Themes**
5. Sélectionner votre thème personnalisé pour **Login Theme**

### Via fichier JSON

Créer un fichier `realm-export.json` et l'importer :

```bash
docker exec -it keycloak /opt/keycloak/bin/kc.sh import \
  --file /path/to/realm-export.json
```

## 🧪 Tests

### Tester le thème localement

```bash
cd keycloak
pnpm run storybook
```

### Tester avec Keycloak en local

```bash
# Démarrer Keycloak
docker-compose --profile build up keycloak

# Le thème sera disponible dans l'interface Keycloak
```

## 📝 Fonctionnalités du thème

### ✅ Implémenté

- ✅ Page de login avec design Google-like (fond blanc)
- ✅ Support des social providers (Google, Facebook, GitHub, etc.)
- ✅ Internationalisation (français/anglais)
- ✅ Nom du realm dynamique
- ✅ Champs username/password
- ✅ Remember me
- ✅ Mot de passe oublié
- ✅ Lien d'inscription
- ✅ Messages d'erreur/succès
- ✅ Responsive design

### 🚧 À venir

- 🚧 Page de création de compte (register.ftl)
- 🚧 Page de mot de passe oublié
- 🚧 Page de vérification d'email
- 🚧 Page de profil utilisateur

## 🐛 Dépannage

### Le thème n'apparaît pas dans Keycloak

1. Vérifier que le JAR est bien copié :
   ```bash
   docker exec -it keycloak ls /opt/keycloak/providers/
   ```

2. Rebuilder Keycloak :
   ```bash
   docker exec -it keycloak /opt/keycloak/bin/kc.sh build
   ```

3. Redémarrer le conteneur :
   ```bash
   docker-compose restart keycloak
   ```

### Erreur de build du thème

```bash
# Nettoyer le cache
cd keycloak
rm -rf node_modules dist dist_keycloak
pnpm install
pnpm run build-keycloak-theme
```

### Problème de connexion à la base de données

Vérifier que PostgreSQL est bien démarré et accessible :

```bash
docker-compose ps postgres
docker-compose logs postgres
```

## 📚 Ressources

- [Documentation Keycloakify](https://docs.keycloakify.dev/)
- [Documentation Keycloak](https://www.keycloak.org/documentation)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Storybook](https://storybook.js.org/)

## 🤝 Contribution

Pour contribuer au thème :

1. Développer dans Storybook
2. Tester localement avec Keycloak
3. Créer une pull request

## 📄 Licence

MIT
