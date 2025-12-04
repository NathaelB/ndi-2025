#!/bin/bash

# Script pour créer un nouveau domaine dans le projet NDI 2025
# Usage: ./scripts/create-domain.sh nom-du-domaine

set -e

# Couleurs pour les messages
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Fonction pour afficher les messages
log_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

log_success() {
    echo -e "${GREEN}✓${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

log_error() {
    echo -e "${RED}✗${NC} $1"
}

# Fonction pour convertir en PascalCase
to_pascal_case() {
    echo "$1" | sed -r 's/(^|-)([a-z])/\U\2/g'
}

# Vérifier qu'un argument est fourni
if [ -z "$1" ]; then
    log_error "Usage: $0 <domain-name>"
    log_info "Exemple: $0 dashboard"
    exit 1
fi

DOMAIN_NAME=$1
DOMAIN_NAME_PASCAL=$(to_pascal_case "$DOMAIN_NAME")
DOMAIN_PATH="src/pages/$DOMAIN_NAME"

log_info "Création du domaine: $DOMAIN_NAME"
log_info "Nom Pascal Case: $DOMAIN_NAME_PASCAL"
echo ""

# Vérifier si le domaine existe déjà
if [ -d "$DOMAIN_PATH" ]; then
    log_error "Le domaine '$DOMAIN_NAME' existe déjà dans $DOMAIN_PATH"
    exit 1
fi

# Créer la structure de dossiers
log_info "Création de la structure de dossiers..."
mkdir -p "$DOMAIN_PATH/features"
mkdir -p "$DOMAIN_PATH/ui"
log_success "Dossiers créés"

# Créer le composant principal de la page
log_info "Création du composant ${DOMAIN_NAME_PASCAL}Page..."
cat > "$DOMAIN_PATH/ui/${DOMAIN_NAME}-page.tsx" << EOF
export function ${DOMAIN_NAME_PASCAL}Page() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">
        ${DOMAIN_NAME_PASCAL}
      </h1>
      <p className="text-muted-foreground">
        Page du domaine ${DOMAIN_NAME}
      </p>
    </div>
  )
}
EOF
log_success "Composant ${DOMAIN_NAME_PASCAL}Page créé"

# Créer le fichier d'export
log_info "Création du fichier d'export..."
cat > "$DOMAIN_PATH/ui/index.ts" << EOF
export { ${DOMAIN_NAME_PASCAL}Page } from './${DOMAIN_NAME}-page';
EOF
log_success "Fichier d'export créé"

# Créer un hook exemple
log_info "Création du hook exemple..."
cat > "$DOMAIN_PATH/features/use-${DOMAIN_NAME}-example.ts" << EOF
import { useQuery } from '@tanstack/react-query'

/**
 * Hook exemple pour le domaine ${DOMAIN_NAME}
 *
 * Ce fichier est un template pour créer vos propres hooks.
 * Supprimez-le ou adaptez-le selon vos besoins.
 */

interface ${DOMAIN_NAME_PASCAL}Data {
  // Définissez votre structure de données ici
  id: string
  name: string
}

export function use${DOMAIN_NAME_PASCAL}Data() {
  return useQuery({
    queryKey: ['${DOMAIN_NAME}', 'data'],
    queryFn: async (): Promise<${DOMAIN_NAME_PASCAL}Data[]> => {
      const response = await fetch('/api/${DOMAIN_NAME}')
      if (!response.ok) {
        throw new Error('Failed to fetch ${DOMAIN_NAME} data')
      }
      return response.json()
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
EOF
log_success "Hook exemple créé"

# Créer le README du domaine
log_info "Création du README..."
cat > "$DOMAIN_PATH/README.md" << EOF
# ${DOMAIN_NAME_PASCAL} Domain

Description du domaine ${DOMAIN_NAME}.

## Structure

\`\`\`
${DOMAIN_NAME}/
├── features/              # Logique métier et hooks
│   └── use-${DOMAIN_NAME}-example.ts
├── ui/                   # Composants d'interface utilisateur
│   ├── ${DOMAIN_NAME}-page.tsx
│   └── index.ts
└── README.md
\`\`\`

## Composants

### ${DOMAIN_NAME_PASCAL}Page

Composant principal de la page ${DOMAIN_NAME}.

## Hooks

### use${DOMAIN_NAME_PASCAL}Data

Hook exemple pour récupérer les données du domaine.

## Routes associées

- \`/${DOMAIN_NAME}\` → ${DOMAIN_NAME_PASCAL}Page

## TODO

- [ ] Implémenter la logique métier
- [ ] Ajouter les composants UI nécessaires
- [ ] Créer les tests
- [ ] Documenter l'API

## Convention de nommage

- Fichiers: kebab-case (\`${DOMAIN_NAME}-page.tsx\`)
- Composants: PascalCase (\`${DOMAIN_NAME_PASCAL}Page\`)
- Hooks: camelCase avec préfixe use (\`use${DOMAIN_NAME_PASCAL}Data\`)
EOF
log_success "README créé"

# Créer la route
log_info "Création de la route..."
cat > "src/routes/${DOMAIN_NAME}.tsx" << EOF
import { createFileRoute } from '@tanstack/react-router'
import { ${DOMAIN_NAME_PASCAL}Page } from '@/pages/${DOMAIN_NAME}/ui/${DOMAIN_NAME}-page.tsx'

export const Route = createFileRoute('/${DOMAIN_NAME}')({
  component: ${DOMAIN_NAME_PASCAL}Page,
})
EOF
log_success "Route créée"

echo ""
log_success "✨ Domaine '$DOMAIN_NAME' créé avec succès !"
echo ""
log_warning "Prochaines étapes:"
echo "  1. Mettre à jour src/routes/routeTree.gen.ts avec la nouvelle route"
echo "  2. Implémenter la logique métier dans $DOMAIN_PATH/features/"
echo "  3. Créer les composants UI dans $DOMAIN_PATH/ui/"
echo "  4. Mettre à jour $DOMAIN_PATH/README.md"
echo ""
log_info "Route accessible à: /${DOMAIN_NAME}"
log_info "Documentation: $DOMAIN_PATH/README.md"
echo ""
log_info "Convention: Fichiers en kebab-case, composants en PascalCase"
log_success "Bon développement ! 🚀"
