# Guide de Déploiement

Ce guide contient toutes les commandes nécessaires pour déployer et gérer vos applications avec Helm.

## Prérequis

Avant de commencer, assurez-vous que :

1. **Kubernetes cluster** est accessible :
   ```bash
   kubectl cluster-info
   kubectl get nodes
   ```

2. **Helm** est installé (version 3.0+) :
   ```bash
   helm version
   ```

3. **Traefik** est installé comme Ingress Controller :
   ```bash
   kubectl get pods -A | grep traefik
   ```

4. **cert-manager** est installé avec un ClusterIssuer :
   ```bash
   kubectl get clusterissuer
   # Vous devriez voir : letsencrypt-prod (ou letsencrypt-staging)
   ```

## Installation Initiale

### 1. Déployer uniquement la webapp

```bash
# Depuis la racine du projet
cd /opt/polytech/ndi-2025

# Installation
helm install webapp ./charts/apps

# Ou avec un namespace spécifique
helm install webapp ./charts/apps --namespace production --create-namespace
```

### 2. Personnaliser le domaine avant l'installation

Éditez le fichier `charts/apps/values.yaml` et modifiez :

```yaml
apps:
  webapp:
    ingress:
      hosts:
        - host: webapp.votre-domaine.com  # Votre domaine ici
      tls:
        - secretName: webapp-tls
          hosts:
            - webapp.votre-domaine.com  # Votre domaine ici
```

Puis installez :

```bash
helm install webapp ./charts/apps
```

### 3. Déployer avec la webapp ET l'API

```bash
# Activer l'API dans values.yaml (apps.api.enabled: true)
# Puis :
helm install mystack ./charts/apps
```

Ou directement en ligne de commande :

```bash
helm install mystack ./charts/apps \
  --set apps.webapp.enabled=true \
  --set apps.api.enabled=true \
  --set apps.api.ingress.hosts[0].host=api.votre-domaine.com \
  --set apps.api.ingress.tls[0].hosts[0]=api.votre-domaine.com
```

## Vérification du Déploiement

### Vérifier les ressources déployées

```bash
# Liste tous les déploiements
helm list

# Voir le statut du déploiement
helm status webapp

# Voir les pods
kubectl get pods

# Voir les services
kubectl get svc

# Voir les ingress
kubectl get ingress

# Voir les certificats SSL
kubectl get certificate
```

### Vérifier les logs

```bash
# Logs de la webapp
kubectl logs -l app.kubernetes.io/name=webapp --tail=50 -f

# Logs de l'API
kubectl logs -l app.kubernetes.io/name=api --tail=50 -f

# Tous les logs du déploiement
kubectl logs -l app.kubernetes.io/instance=webapp --all-containers=true
```

### Vérifier les événements

```bash
# Événements récents
kubectl get events --sort-by='.lastTimestamp'

# Événements pour un pod spécifique
kubectl describe pod <pod-name>
```

## Mise à Jour

### Mettre à jour avec une nouvelle version d'image

```bash
# Mettre à jour la webapp avec une nouvelle version
helm upgrade webapp ./charts/apps \
  --set apps.webapp.image.tag=v1.2.3

# Forcer le redéploiement même si les valeurs n'ont pas changé
helm upgrade webapp ./charts/apps --force
```

### Mettre à jour avec un fichier de configuration modifié

```bash
# Après avoir modifié values.yaml
helm upgrade webapp ./charts/apps

# Avec un fichier de valeurs personnalisé
helm upgrade webapp ./charts/apps -f charts/apps/values-custom.yaml
```

### Mettre à jour plusieurs paramètres

```bash
helm upgrade webapp ./charts/apps \
  --set apps.webapp.replicaCount=3 \
  --set apps.webapp.resources.limits.memory=1Gi \
  --set apps.webapp.image.tag=latest
```

## Rollback

### Voir l'historique des déploiements

```bash
helm history webapp
```

### Revenir à la version précédente

```bash
helm rollback webapp
```

### Revenir à une version spécifique

```bash
# Revenir à la révision 2
helm rollback webapp 2
```

## Scaling

### Scaler manuellement

```bash
# Scaler la webapp à 5 réplicas
kubectl scale deployment webapp --replicas=5

# Ou via Helm
helm upgrade webapp ./charts/apps --set apps.webapp.replicaCount=5
```

### Activer l'autoscaling

Modifiez `values.yaml` :

```yaml
apps:
  webapp:
    autoscaling:
      enabled: true
      minReplicas: 2
      maxReplicas: 10
      targetCPUUtilizationPercentage: 80
```

Puis mettez à jour :

```bash
helm upgrade webapp ./charts/apps
```

## Gestion des Secrets et ConfigMaps

### Créer un secret pour les variables sensibles

```bash
# Créer un secret pour l'API
kubectl create secret generic api-secrets \
  --from-literal=jwt-secret='votre-secret-jwt' \
  --from-literal=database-password='votre-mot-de-passe'
```

### Utiliser le secret dans values.yaml

```yaml
apps:
  api:
    env:
      - name: JWT_SECRET
        valueFrom:
          secretKeyRef:
            name: api-secrets
            key: jwt-secret
      - name: DATABASE_PASSWORD
        valueFrom:
          secretKeyRef:
            name: api-secrets
            key: database-password
```

## Debugging

### Accéder à un pod en shell

```bash
# Obtenir le nom du pod
kubectl get pods

# Ouvrir un shell dans le pod
kubectl exec -it <pod-name> -- /bin/sh
# ou
kubectl exec -it <pod-name> -- /bin/bash
```

### Port-forward pour tester localement

```bash
# Port-forward de la webapp
kubectl port-forward svc/webapp 8080:80

# Puis accédez à http://localhost:8080
```

### Obtenir les détails d'une ressource

```bash
# Détails du deployment
kubectl describe deployment webapp

# Détails du service
kubectl describe service webapp

# Détails de l'ingress
kubectl describe ingress webapp

# Détails du certificat
kubectl describe certificate webapp-tls
```

### Vérifier les logs de Traefik

```bash
kubectl logs -n kube-system -l app.kubernetes.io/name=traefik --tail=100 -f
```

### Vérifier les logs de cert-manager

```bash
kubectl logs -n cert-manager -l app=cert-manager --tail=100 -f
```

## Nettoyage et Désinstallation

### Désinstaller le déploiement

```bash
# Désinstaller le chart Helm
helm uninstall webapp

# Avec un namespace spécifique
helm uninstall webapp --namespace production
```

### Nettoyer complètement

```bash
# Désinstaller le chart
helm uninstall webapp

# Supprimer les PVC (si vous en avez)
kubectl delete pvc -l app.kubernetes.io/instance=webapp

# Supprimer les secrets générés
kubectl delete secret webapp-tls

# Supprimer le namespace (si vous voulez tout supprimer)
kubectl delete namespace production
```

## Environnements Multiples

### Production

```bash
# Créer un fichier values-production.yaml
cp charts/apps/values.yaml charts/apps/values-production.yaml

# Modifier les valeurs pour la production
# Puis déployer
helm install webapp-prod ./charts/apps \
  -f charts/apps/values-production.yaml \
  --namespace production \
  --create-namespace
```

### Staging

```bash
# Créer un fichier values-staging.yaml avec letsencrypt-staging
cp charts/apps/values.yaml charts/apps/values-staging.yaml

# Modifier le ClusterIssuer pour staging
# apps.webapp.ingress.annotations.cert-manager.io/cluster-issuer: "letsencrypt-staging"

# Déployer
helm install webapp-staging ./charts/apps \
  -f charts/apps/values-staging.yaml \
  --namespace staging \
  --create-namespace
```

### Développement

```bash
helm install webapp-dev ./charts/apps \
  --set apps.webapp.replicaCount=1 \
  --set apps.webapp.ingress.hosts[0].host=webapp-dev.example.com \
  --set apps.webapp.ingress.annotations."cert-manager\.io/cluster-issuer"=letsencrypt-staging \
  --namespace development \
  --create-namespace
```

## Tests et Validation

### Tester le chart avant installation

```bash
# Dry-run : voir ce qui sera créé sans l'appliquer
helm install webapp ./charts/apps --dry-run --debug

# Linter le chart
helm lint ./charts/apps

# Générer les manifests sans installer
helm template webapp ./charts/apps > manifests.yaml
```

### Tester l'accès à l'application

```bash
# Via port-forward
kubectl port-forward svc/webapp 8080:80
curl http://localhost:8080

# Via l'ingress (après configuration DNS)
curl https://webapp.votre-domaine.com

# Vérifier le certificat SSL
curl -vI https://webapp.votre-domaine.com 2>&1 | grep -i 'issuer\|subject'
```

## Monitoring

### Vérifier l'état des ressources

```bash
# Watch les pods en temps réel
kubectl get pods -w

# Top des ressources utilisées
kubectl top pods
kubectl top nodes

# Statistiques du deployment
kubectl get deployment webapp -o wide
```

## Commandes Utiles Rapides

```bash
# Redémarrer tous les pods d'un deployment
kubectl rollout restart deployment webapp

# Voir le statut d'un rollout
kubectl rollout status deployment webapp

# Voir l'historique des rollouts
kubectl rollout history deployment webapp

# Obtenir le YAML complet d'une ressource
kubectl get deployment webapp -o yaml

# Obtenir toutes les ressources liées à une release
kubectl get all -l app.kubernetes.io/instance=webapp

# Supprimer tous les pods en erreur
kubectl delete pods --field-selector status.phase=Failed

# Obtenir les IP des pods
kubectl get pods -o wide
```

## Troubleshooting Commun

### Le pod est en CrashLoopBackOff

```bash
# Voir les logs du conteneur qui crash
kubectl logs <pod-name> --previous

# Voir les événements
kubectl describe pod <pod-name>
```

### L'image ne peut pas être pull

```bash
# Vérifier les secrets d'accès au registry
kubectl get secrets

# Créer un secret pour un registry privé
kubectl create secret docker-registry regcred \
  --docker-server=ghcr.io \
  --docker-username=<username> \
  --docker-password=<token> \
  --docker-email=<email>

# Utiliser le secret dans values.yaml
# global.imagePullSecrets: [name: regcred]
```

### Les certificats SSL ne sont pas générés

```bash
# Vérifier le ClusterIssuer
kubectl get clusterissuer
kubectl describe clusterissuer letsencrypt-prod

# Vérifier le Certificate
kubectl get certificate
kubectl describe certificate webapp-tls

# Vérifier les CertificateRequest
kubectl get certificaterequest

# Forcer la régénération d'un certificat
kubectl delete certificate webapp-tls
# Le certificat sera automatiquement recréé
```

### L'ingress ne route pas correctement

```bash
# Vérifier la configuration de l'ingress
kubectl get ingress webapp -o yaml

# Vérifier que le service existe et a des endpoints
kubectl get svc webapp
kubectl get endpoints webapp

# Tester le service directement
kubectl run test-pod --rm -i --tty --image=curlimages/curl -- sh
# Puis dans le pod :
# curl http://webapp:80
```

## Support

Pour plus d'aide :
- Documentation Helm : https://helm.sh/docs/
- Documentation Kubernetes : https://kubernetes.io/docs/
- Documentation Traefik : https://doc.traefik.io/traefik/
- Documentation cert-manager : https://cert-manager.io/docs/
