# Apps Helm Chart

Ce chart Helm permet de déployer plusieurs applications sur Kubernetes avec support de Traefik et cert-manager pour les certificats SSL.

## Prérequis

- Kubernetes 1.19+
- Helm 3.0+
- Traefik installé comme Ingress Controller
- cert-manager installé avec un ClusterIssuer configuré (ex: `letsencrypt-prod`)

## Structure du Chart

```
charts/apps/
├── Chart.yaml
├── values.yaml          # Configuration centralisée de toutes les apps
├── README.md
└── templates/
    ├── _helpers.tpl
    ├── webapp/          # Templates spécifiques à la webapp
    │   ├── deployment.yaml
    │   ├── service.yaml
    │   ├── ingress.yaml
    │   └── serviceaccount.yaml
    └── api/             # Templates spécifiques à l'API
        ├── deployment.yaml
        ├── service.yaml
        ├── ingress.yaml
        └── serviceaccount.yaml
```

## Applications Disponibles

### Webapp

Application frontend Next.js/React

- **Image**: `ghcr.io/nathaelb/ndi-2025-webapp:latest`
- **Port**: 3000
- **État par défaut**: Activé (`enabled: true`)

### API

Application backend (disponible mais désactivée par défaut)

- **Image**: `ghcr.io/nathaelb/ndi-2025-api:latest`
- **Port**: 8080
- **État par défaut**: Désactivé (`enabled: false`)

## Installation

### Installation complète

Déployer toutes les applications activées :

```bash
helm install myapps ./charts/apps
```

### Installation avec un namespace spécifique

```bash
helm install myapps ./charts/apps --namespace production --create-namespace
```

### Activer/Désactiver des applications

Pour activer l'API :

```bash
helm install myapps ./charts/apps --set apps.api.enabled=true
```

Pour désactiver la webapp :

```bash
helm install myapps ./charts/apps --set apps.webapp.enabled=false
```

## Configuration

### Structure des valeurs

Le fichier `values.yaml` est organisé par application :

```yaml
global:
  imagePullPolicy: Always
  imagePullSecrets: []

apps:
  webapp:
    enabled: true
    replicaCount: 2
    image:
      repository: ghcr.io/nathaelb/ndi-2025-webapp
      tag: "latest"
    # ... configuration spécifique
  
  api:
    enabled: false
    replicaCount: 2
    # ... configuration spécifique
```

### Personnaliser le domaine

Modifiez le fichier `values.yaml` :

```yaml
apps:
  webapp:
    ingress:
      hosts:
        - host: webapp.votre-domaine.com
          paths:
            - path: /
              pathType: Prefix
      tls:
        - secretName: webapp-tls
          hosts:
            - webapp.votre-domaine.com
```

Ou via la ligne de commande :

```bash
helm install myapps ./charts/apps \
  --set apps.webapp.ingress.hosts[0].host=webapp.votre-domaine.com \
  --set apps.webapp.ingress.tls[0].hosts[0]=webapp.votre-domaine.com
```

### Configurer les variables d'environnement

Pour la webapp :

```yaml
apps:
  webapp:
    env:
      - name: NODE_ENV
        value: "production"
      - name: API_URL
        value: "https://api.example.com"
      - name: KEYCLOAK_URL
        value: "https://keycloak.example.com"
```

Pour l'API :

```yaml
apps:
  api:
    env:
      - name: NODE_ENV
        value: "production"
      - name: DATABASE_URL
        value: "postgresql://user:password@postgres:5432/db"
```

### Configurer les ressources

```yaml
apps:
  webapp:
    resources:
      limits:
        cpu: 500m
        memory: 512Mi
      requests:
        cpu: 250m
        memory: 256Mi
```

### Changer le ClusterIssuer

Pour utiliser Let's Encrypt staging (pour les tests) :

```yaml
apps:
  webapp:
    ingress:
      annotations:
        cert-manager.io/cluster-issuer: "letsencrypt-staging"
```

## Mise à jour

### Mise à jour complète

```bash
helm upgrade myapps ./charts/apps
```

### Mise à jour d'une seule application

Pour mettre à jour uniquement la webapp avec une nouvelle image :

```bash
helm upgrade myapps ./charts/apps --set apps.webapp.image.tag=v2.0.0
```

### Mise à jour avec nouveau fichier de valeurs

```bash
helm upgrade myapps ./charts/apps -f custom-values.yaml
```

## Désinstallation

```bash
helm uninstall myapps
```

Pour supprimer également les PVC et secrets :

```bash
helm uninstall myapps
kubectl delete pvc -l app.kubernetes.io/instance=myapps
kubectl delete secret -l app.kubernetes.io/instance=myapps
```

## Paramètres Principaux

### Configuration Globale

| Paramètre | Description | Valeur par défaut |
|-----------|-------------|-------------------|
| `global.imagePullPolicy` | Politique de pull des images | `Always` |
| `global.imagePullSecrets` | Secrets pour registry privé | `[]` |

### Configuration par Application

Chaque application sous `apps.<nom>` supporte les paramètres suivants :

| Paramètre | Description | Valeur par défaut |
|-----------|-------------|-------------------|
| `enabled` | Activer/Désactiver l'application | - |
| `replicaCount` | Nombre de réplicas | `2` |
| `image.repository` | Repository de l'image | - |
| `image.tag` | Tag de l'image | `latest` |
| `image.pullPolicy` | Pull policy | Hérite de `global.imagePullPolicy` |
| `containerPort` | Port du container | - |
| `service.type` | Type de service | `ClusterIP` |
| `service.port` | Port du service | `80` |
| `ingress.enabled` | Activer l'ingress | `true` |
| `ingress.className` | Classe d'ingress | `traefik` |
| `ingress.hosts` | Liste des hosts | - |
| `ingress.tls` | Configuration TLS | - |
| `env` | Variables d'environnement | `[]` |
| `resources` | Limites de ressources | - |
| `autoscaling.enabled` | Activer l'autoscaling | `false` |

## Exemples d'Utilisation

### Déployer webapp en production

```bash
helm install webapp ./charts/apps \
  --set apps.webapp.enabled=true \
  --set apps.api.enabled=false \
  --set apps.webapp.replicaCount=3 \
  --set apps.webapp.ingress.hosts[0].host=app.mondomaine.com \
  --set apps.webapp.ingress.tls[0].hosts[0]=app.mondomaine.com
```

### Déployer webapp et api ensemble

```bash
helm install mystack ./charts/apps \
  --set apps.webapp.enabled=true \
  --set apps.api.enabled=true \
  --set apps.webapp.ingress.hosts[0].host=app.mondomaine.com \
  --set apps.api.ingress.hosts[0].host=api.mondomaine.com
```

### Déployer en environnement de développement

Créez un fichier `values-dev.yaml` :

```yaml
global:
  imagePullPolicy: Always

apps:
  webapp:
    enabled: true
    replicaCount: 1
    ingress:
      annotations:
        cert-manager.io/cluster-issuer: "letsencrypt-staging"
      hosts:
        - host: webapp-dev.example.com
          paths:
            - path: /
              pathType: Prefix
      tls:
        - secretName: webapp-dev-tls
          hosts:
            - webapp-dev.example.com
    resources:
      limits:
        cpu: 200m
        memory: 256Mi
      requests:
        cpu: 100m
        memory: 128Mi
    env:
      - name: NODE_ENV
        value: "development"

  api:
    enabled: true
    replicaCount: 1
    # ... configuration similaire
```

Puis déployez :

```bash
helm install myapps ./charts/apps -f values-dev.yaml
```

## Dépannage

### Vérifier le statut des déploiements

```bash
kubectl get deployments
kubectl get pods -l app.kubernetes.io/instance=myapps
```

### Consulter les logs

Pour la webapp :

```bash
kubectl logs -l app.kubernetes.io/name=webapp --tail=100 -f
```

Pour l'API :

```bash
kubectl logs -l app.kubernetes.io/name=api --tail=100 -f
```

### Vérifier les ingress

```bash
kubectl get ingress
kubectl describe ingress webapp
kubectl describe ingress api
```

### Vérifier les certificats SSL

```bash
kubectl get certificate
kubectl describe certificate webapp-tls
kubectl describe certificate api-tls
```

### Problèmes courants

#### Les pods ne démarrent pas

1. Vérifier les événements :
   ```bash
   kubectl describe pod <pod-name>
   ```

2. Vérifier les logs :
   ```bash
   kubectl logs <pod-name>
   ```

3. Vérifier que l'image est accessible :
   ```bash
   kubectl get events --sort-by='.lastTimestamp'
   ```

#### L'ingress ne fonctionne pas

1. Vérifier que Traefik est installé :
   ```bash
   kubectl get pods -A | grep traefik
   ```

2. Vérifier la configuration de l'ingress :
   ```bash
   kubectl describe ingress webapp
   ```

3. Vérifier les logs de Traefik :
   ```bash
   kubectl logs -n kube-system -l app.kubernetes.io/name=traefik
   ```

#### Les certificats SSL ne sont pas générés

1. Vérifier cert-manager :
   ```bash
   kubectl get pods -n cert-manager
   ```

2. Vérifier les certificats :
   ```bash
   kubectl get certificate
   kubectl describe certificate webapp-tls
   ```

3. Vérifier les CertificateRequest :
   ```bash
   kubectl get certificaterequest
   ```

4. Vérifier les logs de cert-manager :
   ```bash
   kubectl logs -n cert-manager -l app=cert-manager
   ```

## Ajouter une Nouvelle Application

Pour ajouter une nouvelle application (ex: `keycloak`) :

1. Créer le dossier de templates :
   ```bash
   mkdir -p templates/keycloak
   ```

2. Créer les fichiers de templates :
   - `templates/keycloak/deployment.yaml`
   - `templates/keycloak/service.yaml`
   - `templates/keycloak/ingress.yaml`
   - `templates/keycloak/serviceaccount.yaml`

3. Ajouter la configuration dans `values.yaml` :
   ```yaml
   apps:
     # ... autres apps
     keycloak:
       enabled: false
       replicaCount: 1
       image:
         repository: quay.io/keycloak/keycloak
         tag: "latest"
       # ... reste de la configuration
   ```

4. Adapter les templates en utilisant `.Values.apps.keycloak.*`

## Support et Documentation

- [Documentation Helm](https://helm.sh/docs/)
- [Documentation Traefik](https://doc.traefik.io/traefik/)
- [Documentation cert-manager](https://cert-manager.io/docs/)
- [Documentation Kubernetes Ingress](https://kubernetes.io/docs/concepts/services-networking/ingress/)

## Licence

Voir le fichier LICENSE du projet principal.
