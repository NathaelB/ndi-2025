export interface DiagnosticAnswer {
  questionId: string;
  value: string | number;
}

export interface DiagnosticQuestion {
  id: string;
  title: string;
  description: string;
  type: "radio" | "select";
  options: DiagnosticOption[];
  category: "souverainete" | "durabilite" | "inclusion";
}

export interface DiagnosticOption {
  value: string;
  label: string;
  score: number;
  description?: string;
}

export interface DiagnosticAnswers {
  [questionId: string]: string;
}

export interface DiagnosticResult {
  totalScore: number;
  categoryScores: {
    souverainete: number;
    durabilite: number;
    inclusion: number;
  };
  level: "débutant" | "intermédiaire" | "avancé" | "expert";
  recommendations: string[];
  villageLevel: number; // 0-5 huttes allumées
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: "os",
    title: "Quel système d'exploitation utilisez-vous principalement ?",
    description: "Le choix de l'OS impacte votre souveraineté numérique",
    type: "radio",
    category: "souverainete",
    options: [
      { value: "windows", label: "Windows (propriétaire)", score: 0 },
      { value: "macos", label: "macOS (propriétaire)", score: 0 },
      { value: "linux", label: "Linux (open-source)", score: 10 },
      { value: "mix", label: "Mélange Linux + autres", score: 5 },
    ],
  },
  {
    id: "data-location",
    title: "Où sont hébergées vos données ?",
    description: "L'hébergement des données est crucial pour la souveraineté",
    type: "radio",
    category: "souverainete",
    options: [
      {
        value: "gafam",
        label: "Services GAFAM (Google, Microsoft...)",
        score: 0,
      },
      { value: "cloud-eu", label: "Cloud européen certifié", score: 7 },
      {
        value: "on-premise",
        label: "Sur nos serveurs (on-premise)",
        score: 10,
      },
      { value: "hybrid", label: "Solution hybride", score: 5 },
    ],
  },
  {
    id: "authentication",
    title: "Quel système d'authentification utilisez-vous ?",
    description:
      "La gestion des identités impacte la sécurité et la souveraineté",
    type: "radio",
    category: "souverainete",
    options: [
      { value: "google-sso", label: "Google SSO / Microsoft SSO", score: 0 },
      {
        value: "proprietary",
        label: "Solution propriétaire externe",
        score: 3,
      },
      {
        value: "keycloak",
        label: "Keycloak / solution open-source",
        score: 10,
      },
      { value: "ldap", label: "LDAP / Active Directory interne", score: 7 },
    ],
  },
  {
    id: "hosting",
    title: "Comment hébergez-vous vos applications ?",
    description: "Le mode d'hébergement détermine votre autonomie",
    type: "radio",
    category: "souverainete",
    options: [
      {
        value: "saas",
        label: "SaaS uniquement (ex: Google Workspace)",
        score: 0,
      },
      {
        value: "cloud-foreign",
        label: "Cloud étranger (AWS, Azure...)",
        score: 3,
      },
      {
        value: "cloud-eu",
        label: "Cloud européen (OVH, Scaleway...)",
        score: 7,
      },
      { value: "self-hosted", label: "Auto-hébergé", score: 10 },
    ],
  },
  {
    id: "hardware-reuse",
    title: "Quelle est votre politique de réemploi du matériel ?",
    description: "Le réemploi réduit l'empreinte écologique",
    type: "radio",
    category: "durabilite",
    options: [
      { value: "none", label: "Pas de politique de réemploi", score: 0 },
      { value: "occasional", label: "Réemploi occasionnel", score: 4 },
      { value: "systematic", label: "Réemploi systématique", score: 8 },
      {
        value: "reconditioned",
        label: "Achat de matériel reconditionné",
        score: 10,
      },
    ],
  },
  {
    id: "software",
    title: "Quels outils bureautiques utilisez-vous ?",
    description: "Les logiciels libres favorisent la souveraineté",
    type: "radio",
    category: "souverainete",
    options: [
      { value: "office365", label: "Microsoft 365", score: 0 },
      { value: "google-workspace", label: "Google Workspace", score: 0 },
      { value: "libreoffice", label: "LibreOffice / OnlyOffice", score: 10 },
      { value: "mix", label: "Mélange des deux", score: 5 },
    ],
  },
  {
    id: "resource-sharing",
    title:
      "Mutualisez-vous des ressources libres avec d'autres établissements ?",
    description: "La mutualisation renforce l'écosystème libre",
    type: "radio",
    category: "inclusion",
    options: [
      { value: "no", label: "Non, pas de mutualisation", score: 0 },
      { value: "informal", label: "De manière informelle", score: 5 },
      { value: "formal", label: "Partenariats formels", score: 10 },
      {
        value: "contribute",
        label: "Nous contribuons à des projets libres",
        score: 12,
      },
    ],
  },
  {
    id: "digital-policy",
    title: "Avez-vous une politique de numérique responsable ?",
    description: "Une politique formalisée structure vos actions",
    type: "radio",
    category: "durabilite",
    options: [
      { value: "none", label: "Aucune politique", score: 0 },
      { value: "informal", label: "Initiatives ponctuelles", score: 4 },
      { value: "formal", label: "Politique formalisée", score: 8 },
      {
        value: "certified",
        label: "Démarche certifiée (label numérique responsable)",
        score: 10,
      },
    ],
  },
  {
    id: "training",
    title: "Formez-vous vos équipes aux enjeux du numérique responsable ?",
    description: "La formation est essentielle pour la transition",
    type: "radio",
    category: "inclusion",
    options: [
      { value: "none", label: "Pas de formation", score: 0 },
      { value: "occasional", label: "Formations ponctuelles", score: 5 },
      { value: "regular", label: "Programme de formation régulier", score: 10 },
      {
        value: "mandatory",
        label: "Formation obligatoire pour tous",
        score: 12,
      },
    ],
  },
  {
    id: "accessibility",
    title: "Quelle importance accordez-vous à l'accessibilité numérique ?",
    description: "L'accessibilité garantit l'inclusion de tous",
    type: "radio",
    category: "inclusion",
    options: [
      { value: "none", label: "Peu pris en compte", score: 0 },
      { value: "basic", label: "Conformité minimale", score: 4 },
      { value: "advanced", label: "Démarche active (RGAA)", score: 8 },
      { value: "certified", label: "Certification accessibilité", score: 10 },
    ],
  },
];
