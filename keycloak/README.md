# Keycloak Custom Theme - NDI Project

Thème Keycloak personnalisé basé sur [Keycloakify v11](https://keycloakify.dev) avec un design inspiré de Google.

## 🚀 Démarrage rapide

### Installation

```bash
cd keycloak
pnpm install
```

### Développement avec Storybook

```bash
pnpm run storybook
```

Storybook sera disponible sur http://localhost:6006

### Build du thème

```bash
pnpm run build-keycloak-theme
```

Le thème sera généré dans le dossier `dist_keycloak/` en tant que fichier JAR.

## 🎨 Fonctionnalités

- ✅ Design moderne inspiré de Google avec fond blanc
- ✅ Support des social providers (Google, Facebook, GitHub, etc.)
- ✅ Internationalisation (français/anglais)
- ✅ Nom du realm dynamique
- ✅ Formulaire avec username/password
- ✅ Remember me
- ✅ Mot de passe oublié
- ✅ Lien d'inscription
- ✅ Messages d'erreur/succès
- ✅ Responsive design

## 🐳 Docker

### Utiliser le script helper (recommandé)

```bash
# Depuis la racine du projet
./scripts/keycloak.sh dev      # Développement avec Storybook
./scripts/keycloak.sh build    # Build du thème
./scripts/keycloak.sh start    # Démarrer Keycloak
./scripts/keycloak.sh rebuild  # Rebuild et restart rapide
./scripts/keycloak.sh help     # Voir toutes les commandes
```

### Avec Docker Compose

```bash
# Depuis la racine du projet
docker-compose --profile build up -d keycloak
```

Accès à Keycloak :
- Admin console: http://localhost:8080/admin
- Credentials: `admin` / `admin`

## 📁 Structure du projet

```
src/
├── login/
│   ├── pages/
│   │   ├── Login.tsx          # Page de login personnalisée
│   │   └── Login.stories.tsx  # Stories Storybook
│   ├── KcPage.tsx             # Router des pages
│   ├── KcContext.ts           # Types du contexte
│   ├── i18n.ts                # Traductions
│   └── main.css               # Styles (Tailwind CSS v4)
```

## 🎨 Personnalisation

### Modifier les styles

Les styles sont dans `src/login/main.css` et utilisent Tailwind CSS v4 :

```css
/* Modifier les couleurs */
.login-form-card {
    background-color: #2d2e30;
}

/* Ajouter des styles personnalisés */
.custom-button {
    padding: 12px 24px;
    border-radius: 4px;
}
```

### Ajouter des traductions

Dans `src/login/i18n.ts` :

```typescript
.withCustomTranslations({
    en: {
        myCustomKey: "My custom text in English"
    },
    fr: {
        myCustomKey: "Mon texte personnalisé en français"
    }
})
```

### Créer une nouvelle page

1. Créer un composant dans `src/login/pages/`
2. Ajouter le cas dans `src/login/KcPage.tsx`
3. Créer un fichier `.stories.tsx` pour Storybook

## 📚 Documentation

Pour plus d'informations, consultez :

- [Documentation complète](../docs/KEYCLOAK.md)
- [Keycloakify Documentation](https://docs.keycloakify.dev)
- [Tailwind CSS v4](https://tailwindcss.com/docs)

## 🛠️ Commandes disponibles

```bash
pnpm run dev                    # Vite dev server
pnpm run build                  # Build TypeScript et Vite
pnpm run build-keycloak-theme   # Build le thème Keycloak (génère le JAR)
pnpm run storybook              # Démarrer Storybook
pnpm run format                 # Formater le code avec Prettier
```

## 🐛 Dépannage

### Le thème ne s'affiche pas dans Keycloak

1. Vérifier que le JAR est généré : `ls dist_keycloak/`
2. Rebuilder l'image Docker : `docker-compose build keycloak`
3. Redémarrer Keycloak : `docker-compose restart keycloak`

### Erreur de build

```bash
# Nettoyer et réinstaller
rm -rf node_modules dist dist_keycloak
pnpm install
pnpm run build-keycloak-theme
```

## 📝 Notes

- **Maven n'est plus requis** : Keycloakify v11 ne nécessite plus Maven
- Le thème est optimisé pour Keycloak 26.4.7
- Le design est basé sur le style Google avec personnalisations NDI
