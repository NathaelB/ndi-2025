export interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  year: number;
}

export interface Talent {
  id: number;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  location: string;
  experience: string;
  skills: string[];
  languages: string[];
  talents: string[];
  projects: Project[];
  verified: boolean;
  availability: "available" | "busy" | "unavailable";
  email?: string;
  linkedin?: string;
  github?: string;
}

export const mockTalents: Talent[] = [
  {
    id: 1,
    name: "Alice Dubois",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alice",
    role: "Full Stack Developer",
    bio: "Passionnée par le développement web moderne et l'architecture scalable. Adore créer des expériences utilisateur fluides.",
    location: "Paris, France",
    experience: "5 ans",
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "GraphQL",
      "PostgreSQL",
      "Docker",
    ],
    languages: ["Français", "Anglais"],
    talents: [
      "Architecture logicielle",
      "Mentorat d'équipe",
      "Communication client",
    ],
    projects: [
      {
        id: 1,
        name: "E-commerce Platform",
        description:
          "Plateforme de vente en ligne avec panier intelligent et recommandations IA",
        technologies: ["React", "Node.js", "PostgreSQL"],
        year: 2024,
      },
      {
        id: 2,
        name: "Task Management App",
        description:
          "Application collaborative de gestion de tâches en temps réel",
        technologies: ["TypeScript", "GraphQL", "WebSocket"],
        year: 2023,
      },
    ],
    verified: true,
    availability: "available",
    email: "alice.dubois@example.com",
    linkedin: "alice-dubois",
    github: "alicedubois",
  },
  {
    id: 2,
    name: "Bob Martin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bob",
    role: "Backend Engineer",
    bio: "Expert en systèmes distribués et bases de données. Spécialisé dans l'optimisation de performances.",
    location: "Lyon, France",
    experience: "7 ans",
    skills: ["Python", "Django", "PostgreSQL", "Docker", "Redis", "Celery"],
    languages: ["Français", "Espagnol", "Anglais"],
    talents: [
      "Optimisation de requêtes",
      "Design de bases de données",
      "CI/CD",
    ],
    projects: [
      {
        id: 3,
        name: "Analytics Engine",
        description:
          "Moteur d'analyse de données en temps réel pour 10M+ d'utilisateurs",
        technologies: ["Python", "PostgreSQL", "Redis"],
        year: 2024,
      },
      {
        id: 4,
        name: "API Gateway",
        description:
          "Gateway haute performance avec rate limiting et authentification",
        technologies: ["Django", "Docker", "Nginx"],
        year: 2023,
      },
    ],
    verified: true,
    availability: "busy",
    email: "bob.martin@example.com",
    github: "bobmartin",
  },
  {
    id: 3,
    name: "Claire Lefebvre",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Claire",
    role: "UX/UI Designer & Frontend Dev",
    bio: "Designer passionnée par l'accessibilité et l'expérience utilisateur. Je code mes propres designs.",
    location: "Bordeaux, France",
    experience: "4 ans",
    skills: [
      "Vue.js",
      "CSS",
      "Figma",
      "UX Design",
      "Design System",
      "Animations",
    ],
    languages: ["Français", "Anglais", "Allemand"],
    talents: ["Design thinking", "Prototypage rapide", "User research"],
    projects: [
      {
        id: 5,
        name: "Banking App Redesign",
        description: "Refonte complète de l'application bancaire mobile",
        technologies: ["Figma", "Vue.js", "CSS"],
        year: 2024,
      },
      {
        id: 6,
        name: "Design System",
        description:
          "Système de design complet avec 100+ composants réutilisables",
        technologies: ["Storybook", "Vue.js", "CSS"],
        year: 2023,
      },
    ],
    verified: false,
    availability: "available",
    email: "claire.lefebvre@example.com",
    linkedin: "claire-lefebvre",
  },
  {
    id: 4,
    name: "David Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    role: "DevOps & Cloud Architect",
    bio: "Architecte cloud certifié AWS et Kubernetes. J'automatise tout ce qui peut l'être.",
    location: "Toulouse, France",
    experience: "8 ans",
    skills: [
      "Java",
      "Spring Boot",
      "Kubernetes",
      "AWS",
      "Terraform",
      "Jenkins",
    ],
    languages: ["Français", "Anglais", "Mandarin"],
    talents: ["Infrastructure as Code", "Scaling", "Sécurité cloud"],
    projects: [
      {
        id: 7,
        name: "Multi-Cloud Migration",
        description:
          "Migration d'infrastructure legacy vers architecture cloud-native",
        technologies: ["Kubernetes", "Terraform", "AWS"],
        year: 2024,
      },
      {
        id: 8,
        name: "CI/CD Pipeline",
        description: "Pipeline de déploiement continu pour 50+ microservices",
        technologies: ["Jenkins", "Docker", "Kubernetes"],
        year: 2023,
      },
    ],
    verified: true,
    availability: "unavailable",
    linkedin: "david-chen",
    github: "davidchen",
  },
  {
    id: 5,
    name: "Emma Bernard",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
    role: "Mobile Developer",
    bio: "Développeuse mobile native et cross-platform. Amoureuse des interfaces fluides et performantes.",
    location: "Nantes, France",
    experience: "3 ans",
    skills: [
      "React Native",
      "Swift",
      "iOS",
      "Firebase",
      "Flutter",
      "Mobile UI",
    ],
    languages: ["Français", "Anglais"],
    talents: [
      "Animations natives",
      "Performance mobile",
      "App Store optimization",
    ],
    projects: [
      {
        id: 9,
        name: "Fitness Tracker App",
        description: "Application de suivi sportif avec gamification",
        technologies: ["React Native", "Firebase"],
        year: 2024,
      },
      {
        id: 10,
        name: "Restaurant Booking",
        description: "App de réservation de restaurants avec paiement intégré",
        technologies: ["Swift", "iOS", "Firebase"],
        year: 2023,
      },
    ],
    verified: true,
    availability: "available",
    email: "emma.bernard@example.com",
    github: "emmabernard",
  },
  {
    id: 6,
    name: "François Dupont",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Francois",
    role: "Full Stack Developer",
    bio: "Développeur polyvalent avec un penchant pour les architectures modernes et les APIs REST.",
    location: "Lille, France",
    experience: "6 ans",
    skills: ["Angular", "NestJS", "MongoDB", "Redis", "TypeScript", "REST API"],
    languages: ["Français", "Anglais"],
    talents: ["API Design", "Documentation technique", "Code review"],
    projects: [
      {
        id: 11,
        name: "CRM System",
        description:
          "Système de gestion client avec tableaux de bord personnalisables",
        technologies: ["Angular", "NestJS", "MongoDB"],
        year: 2024,
      },
      {
        id: 12,
        name: "Real-time Chat",
        description: "Messagerie instantanée avec support vidéo",
        technologies: ["NestJS", "WebSocket", "Redis"],
        year: 2023,
      },
    ],
    verified: false,
    availability: "busy",
    email: "francois.dupont@example.com",
  },
  {
    id: 7,
    name: "Gabrielle Rousseau",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Gabrielle",
    role: "Data Scientist",
    bio: "Data scientist spécialisée en machine learning et visualisation de données complexes.",
    location: "Marseille, France",
    experience: "5 ans",
    skills: [
      "Data Science",
      "Python",
      "TensorFlow",
      "SQL",
      "Pandas",
      "Jupyter",
    ],
    languages: ["Français", "Anglais"],
    talents: ["Machine Learning", "Data visualization", "Statistical analysis"],
    projects: [
      {
        id: 13,
        name: "Fraud Detection ML",
        description:
          "Modèle de détection de fraude bancaire avec 98% de précision",
        technologies: ["Python", "TensorFlow", "SQL"],
        year: 2024,
      },
      {
        id: 14,
        name: "Customer Insights Dashboard",
        description: "Tableau de bord prédictif pour analyse comportementale",
        technologies: ["Python", "Pandas", "Jupyter"],
        year: 2023,
      },
    ],
    verified: true,
    availability: "available",
    email: "gabrielle.rousseau@example.com",
    linkedin: "gabrielle-rousseau",
  },
  {
    id: 8,
    name: "Hugo Petit",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hugo",
    role: "DevOps Engineer",
    bio: "Ingénieur DevOps passionné par l'automatisation et le monitoring des infrastructures.",
    location: "Strasbourg, France",
    experience: "6 ans",
    skills: ["DevOps", "Terraform", "Jenkins", "Linux", "Docker", "Ansible"],
    languages: ["Français", "Allemand"],
    talents: ["Monitoring", "Incident management", "Infrastructure automation"],
    projects: [
      {
        id: 15,
        name: "Auto-scaling Infrastructure",
        description: "Infrastructure auto-scalable économisant 40% des coûts",
        technologies: ["Terraform", "AWS", "Ansible"],
        year: 2024,
      },
      {
        id: 16,
        name: "Monitoring Platform",
        description:
          "Plateforme centralisée de monitoring avec alertes intelligentes",
        technologies: ["Prometheus", "Grafana", "Docker"],
        year: 2023,
      },
    ],
    verified: true,
    availability: "busy",
    github: "hugopetit",
  },
  {
    id: 9,
    name: "Isabelle Moreau",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabelle",
    role: "PHP Developer",
    bio: "Développeuse PHP avec expertise en Laravel et e-commerce. Aime résoudre des problèmes complexes.",
    location: "Nice, France",
    experience: "4 ans",
    skills: ["PHP", "Laravel", "MySQL", "Vue.js", "E-commerce", "Payment APIs"],
    languages: ["Français", "Italien", "Anglais"],
    talents: [
      "E-commerce solutions",
      "Payment integration",
      "Legacy code refactoring",
    ],
    projects: [
      {
        id: 17,
        name: "Marketplace Platform",
        description:
          "Plateforme marketplace multi-vendeurs avec 1000+ produits",
        technologies: ["Laravel", "MySQL", "Vue.js"],
        year: 2024,
      },
      {
        id: 18,
        name: "Payment Gateway Integration",
        description:
          "Intégration multi-gateway de paiement avec Stripe, PayPal",
        technologies: ["PHP", "Laravel", "APIs"],
        year: 2023,
      },
    ],
    verified: false,
    availability: "available",
    email: "isabelle.moreau@example.com",
  },
  {
    id: 10,
    name: "Jacques Laurent",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jacques",
    role: "Backend Architect",
    bio: "Architecte backend spécialisé en microservices et systèmes distribués haute performance.",
    location: "Rennes, France",
    experience: "9 ans",
    skills: [
      "Go",
      "Microservices",
      "gRPC",
      "Kafka",
      "RabbitMQ",
      "Event Sourcing",
    ],
    languages: ["Français", "Anglais"],
    talents: [
      "System design",
      "Event-driven architecture",
      "Performance tuning",
    ],
    projects: [
      {
        id: 19,
        name: "Event-Driven Platform",
        description: "Architecture événementielle traitant 1M+ événements/jour",
        technologies: ["Go", "Kafka", "gRPC"],
        year: 2024,
      },
      {
        id: 20,
        name: "Microservices Migration",
        description: "Migration monolithe vers architecture microservices",
        technologies: ["Go", "RabbitMQ", "Docker"],
        year: 2023,
      },
    ],
    verified: true,
    availability: "unavailable",
    linkedin: "jacques-laurent",
    github: "jacqueslaurent",
  },
  {
    id: 11,
    name: "Karine Simon",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Karine",
    role: "Frontend Developer",
    bio: "Développeuse frontend spécialisée en React et Next.js. Obsédée par les performances web.",
    location: "Montpellier, France",
    experience: "4 ans",
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "Vercel",
      "SEO",
      "Web Performance",
    ],
    languages: ["Français", "Anglais"],
    talents: ["Web performance", "SEO optimization", "Responsive design"],
    projects: [
      {
        id: 21,
        name: "E-learning Platform",
        description:
          "Plateforme d'apprentissage en ligne avec 10k+ utilisateurs",
        technologies: ["Next.js", "React", "Tailwind CSS"],
        year: 2024,
      },
      {
        id: 22,
        name: "Corporate Website",
        description: "Site corporate avec score Lighthouse de 100/100",
        technologies: ["Next.js", "Vercel", "SEO"],
        year: 2023,
      },
    ],
    verified: true,
    availability: "available",
    email: "karine.simon@example.com",
    github: "karinesimon",
  },
  {
    id: 12,
    name: "Louis Mercier",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Louis",
    role: "Systems Programmer",
    bio: "Développeur systèmes passionné par les langages bas niveau et l'optimisation extrême.",
    location: "Grenoble, France",
    experience: "3 ans",
    skills: ["Rust", "WebAssembly", "Actix", "Performance", "C++", "Low-level"],
    languages: ["Français", "Anglais"],
    talents: [
      "Performance optimization",
      "Memory management",
      "Systems programming",
    ],
    projects: [
      {
        id: 23,
        name: "WASM Graphics Engine",
        description: "Moteur graphique WebAssembly ultra-performant",
        technologies: ["Rust", "WebAssembly", "WebGL"],
        year: 2024,
      },
      {
        id: 24,
        name: "High-Performance API",
        description: "API REST capable de gérer 100k req/sec",
        technologies: ["Rust", "Actix", "Performance"],
        year: 2023,
      },
    ],
    verified: false,
    availability: "available",
    github: "louismercier",
  },
];
