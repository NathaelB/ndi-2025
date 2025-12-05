import type { Talent, Skill } from "./mock-talents";

/**
 * Système de notation Gold pour les profils de talents
 * Analyse les skills, projets et attributs pour déterminer un score global
 */

// Définition d'une skill avec nom et clé normalisée
export interface SkillDefinition {
  name: string;
  key: string;
  weight: number;
}

// Configuration des poids pour chaque skill (structure name/key)
export const SKILL_DEFINITIONS: SkillDefinition[] = [
  // Langages de programmation (haute demande)
  { name: "Rust", key: "rust", weight: 45 }, // Triple du poids original
  { name: "TypeScript", key: "typescript", weight: 12 },
  { name: "Go", key: "go", weight: 22 },
  { name: "Kotlin", key: "kotlin", weight: 4 },
  { name: "Python", key: "python", weight: 4 },
  { name: "JavaScript", key: "javascript", weight: 4 },
  { name: "Java", key: "java", weight: 4 },
  { name: "C++", key: "cpp", weight: 26 },
  { name: "C", key: "c", weight: 29 },
  { name: "Swift", key: "swift", weight: 4 },
  { name: "Scala", key: "scala", weight: 4 },
  { name: "Elixir", key: "elixir", weight: 4 },
  { name: "Haskell", key: "haskell", weight: 5 },

  // Frameworks & Libraries
  { name: "React", key: "react", weight: 12 },
  { name: "Vue", key: "vue", weight: 4 },
  { name: "Angular", key: "angular", weight: 4 },
  { name: "Next.js", key: "nextjs", weight: 5 },
  { name: "Node.js", key: "nodejs", weight: 4 },
  { name: "Django", key: "django", weight: 4 },
  { name: "Spring Boot", key: "spring_boot", weight: 4 },
  { name: "FastAPI", key: "fastapi", weight: 4 },
  { name: "Express", key: "express", weight: 3 },
  { name: "NestJS", key: "nestjs", weight: 4 },
  { name: "Svelte", key: "svelte", weight: 4 },

  // DevOps & Cloud - Kubernetes dominance
  { name: "Kubernetes", key: "kubernetes", weight: 35 }, // 5x GCP
  { name: "Docker", key: "docker", weight: 6 },
  { name: "AWS", key: "aws", weight: 5 },
  { name: "Azure", key: "azure", weight: 5 },
  { name: "GCP", key: "gcp", weight: 5 },
  { name: "Terraform", key: "terraform", weight: 5 },
  { name: "CI/CD", key: "cicd", weight: 4 },
  { name: "Jenkins", key: "jenkins", weight: 3 },
  { name: "GitLab CI", key: "gitlab_ci", weight: 4 },
  { name: "GitHub Actions", key: "github_actions", weight: 4 },
  { name: "Ansible", key: "ansible", weight: 4 },

  // Data & AI/ML
  { name: "Machine Learning", key: "machine_learning", weight: 23 },
  { name: "Deep Learning", key: "deep_learning", weight: 5 },
  { name: "TensorFlow", key: "tensorflow", weight: 5 },
  { name: "PyTorch", key: "pytorch", weight: 5 },
  { name: "Data Science", key: "data_science", weight: 4 },
  { name: "Big Data", key: "big_data", weight: 4 },
  { name: "Apache Spark", key: "apache_spark", weight: 4 },
  { name: "Kafka", key: "kafka", weight: 4 },
  { name: "Elasticsearch", key: "elasticsearch", weight: 4 },

  // Bases de données - PostgreSQL se démarque
  { name: "PostgreSQL", key: "postgresql", weight: 20 }, // Dominance
  { name: "MongoDB", key: "mongodb", weight: 4 },
  { name: "Redis", key: "redis", weight: 4 },
  { name: "MySQL", key: "mysql", weight: 3 },
  { name: "Cassandra", key: "cassandra", weight: 4 },
  { name: "Neo4j", key: "neo4j", weight: 4 },
  { name: "DynamoDB", key: "dynamodb", weight: 4 },

  // Architecture & Patterns
  { name: "Microservices", key: "microservices", weight: 5 },
  {
    name: "Event-Driven Architecture",
    key: "event_driven_architecture",
    weight: 5,
  },
  {
    name: "Architectures Distribuées",
    key: "distributed_architecture",
    weight: 5,
  },
  { name: "Domain-Driven Design", key: "domain_driven_design", weight: 5 },
  { name: "Clean Architecture", key: "clean_architecture", weight: 4 },
  { name: "CQRS", key: "cqrs", weight: 4 },
  { name: "GraphQL", key: "graphql", weight: 4 },
  { name: "REST API", key: "rest_api", weight: 3 },
  { name: "gRPC", key: "grpc", weight: 4 },

  // Sécurité & IAM - Keycloak haute valeur
  { name: "Keycloak", key: "keycloak", weight: 15 }, // Haute valeur IAM
  { name: "Security", key: "security", weight: 5 },
  { name: "Cryptography", key: "cryptography", weight: 5 },
  { name: "Blockchain", key: "blockchain", weight: 5 },
  { name: "Linux", key: "linux", weight: 4 },
  { name: "System Programming", key: "system_programming", weight: 5 },
  { name: "Programmation système", key: "system_programming_fr", weight: 5 },
  { name: "Embedded Systems", key: "embedded_systems", weight: 5 },
  { name: "Virtualization", key: "virtualization", weight: 4 },
  { name: "Virtualisation", key: "virtualization_fr", weight: 4 },
  { name: "Confidential Computing", key: "confidential_computing", weight: 5 },

  // Méthodologies
  { name: "Agile", key: "agile", weight: 3 },
  { name: "Scrum", key: "scrum", weight: 3 },
  { name: "Test-Driven Development", key: "tdd", weight: 4 },
  { name: "Continuous Integration", key: "continuous_integration", weight: 4 },

  // Autres compétences techniques
  { name: "WebAssembly", key: "webassembly", weight: 5 },
  { name: "Concurrency", key: "concurrency", weight: 5 },
  {
    name: "Performance Optimization",
    key: "performance_optimization",
    weight: 5,
  },
  { name: "Distributed Systems", key: "distributed_systems", weight: 5 },
  { name: "Systèmes complexes", key: "complex_systems", weight: 2 },
  { name: "Real-time Systems", key: "realtime_systems", weight: 5 },

  // Théorie et algorithmes
  { name: "Graph Theory", key: "graph_theory", weight: 12 },
  { name: "Théorie des graphes", key: "graph_theory_fr", weight: 30 },
  { name: "Parallel Computing", key: "parallel_computing", weight: 35 },
  { name: "RISC-V", key: "riscv", weight: 40 },
  { name: "Hardware Security", key: "hardware_security", weight: 40 },

  // Recherche
  { name: "Recherche", key: "research", weight: 50 },
];

// Créer un map pour recherche rapide par nom (insensible à la casse)
export const SKILL_WEIGHTS_MAP = new Map<string, number>(
  SKILL_DEFINITIONS.map((skill) => [skill.name.toLowerCase(), skill.weight]),
);

// Poids par défaut pour les skills non définis
const DEFAULT_SKILL_WEIGHT = 2;

// Points bonus
export const BONUS_POINTS = {
  VERIFIED: 120,
  OPEN_SOURCE_PROJECT: 60,
  PROJECT_BASE: 15,
  AVAILABLE: 25,
  MULTILINGUAL: 20, // Par langue supplémentaire (après 2)
  SENIOR_EXPERIENCE: 90, // 10+ ans d'expérience
  MID_EXPERIENCE: 30, // 5-10 ans
};

// Seuils pour les niveaux Gold
export const GOLD_TIERS = {
  PLATINUM: 600,
  GOLD: 400,
  SILVER: 200,
  BRONZE: 90,
} as const;

export type GoldTier = "platinum" | "gold" | "silver" | "bronze" | "standard";

export interface GoldScore {
  total: number;
  breakdown: {
    skills: number;
    projects: number;
    verified: number;
    availability: number;
    experience: number;
    languages: number;
    openSource: number;
  };
  tier: GoldTier;
  topSkills: Array<{ skill: string; weight: number }>;
}

/**
 * Extrait le nombre d'années d'expérience à partir du texte
 */
function extractYearsOfExperience(experience: string): number {
  const match = experience.match(/(\d+)\+?\s*(ans|years?)/i);
  return match ? parseInt(match[1], 10) : 0;
}

/**
 * Calcule le score des skills en fonction de leur poids
 */
function calculateSkillsScore(skills: Skill[]): {
  score: number;
  topSkills: Array<{ skill: string; weight: number }>;
} {
  const skillScores = skills.map((skill) => {
    // Recherche insensible à la casse avec le nouveau système
    // Utilise skill.key pour la recherche dans SKILL_WEIGHTS_MAP
    const weight =
      SKILL_WEIGHTS_MAP.get(skill.key.toLowerCase()) || DEFAULT_SKILL_WEIGHT;

    return { skill: skill.name, weight };
  });

  // Trier par poids décroissant
  const topSkills = [...skillScores]
    .sort((a, b) => b.weight - a.weight)
    .slice(0, 10);

  const score = skillScores.reduce((sum, { weight }) => sum + weight, 0);

  return { score, topSkills };
}

/**
 * Calcule le score des projets
 */
function calculateProjectsScore(talent: Talent): {
  projectScore: number;
  openSourceScore: number;
} {
  let projectScore = 0;
  let openSourceScore = 0;

  talent.projects.forEach((project) => {
    // Points de base par projet
    projectScore += BONUS_POINTS.PROJECT_BASE;

    // Bonus pour projet open source
    if (project.openSource) {
      openSourceScore += BONUS_POINTS.OPEN_SOURCE_PROJECT;
    }

    // Bonus pour la complexité (basé sur le nombre de technologies)
    if (project.technologies.length >= 5) {
      projectScore += 20;
    } else if (project.technologies.length >= 3) {
      projectScore += 10;
    }

    // Bonus pour les projets récents (dernières 3 années)
    const currentYear = new Date().getFullYear();
    if (currentYear - project.year <= 3) {
      projectScore += 10;
    }
  });

  return { projectScore, openSourceScore };
}

/**
 * Calcule le score d'expérience
 */
function calculateExperienceScore(experience: string): number {
  const years = extractYearsOfExperience(experience);

  if (years >= 10) {
    return BONUS_POINTS.SENIOR_EXPERIENCE;
  } else if (years >= 5) {
    return BONUS_POINTS.MID_EXPERIENCE;
  }

  return years * 5; // 5 points par année pour les juniors
}

/**
 * Calcule le score des langues
 */
function calculateLanguagesScore(languages: string[]): number {
  if (languages.length <= 2) {
    return 0;
  }

  // Bonus pour chaque langue supplémentaire après 2
  return (languages.length - 2) * BONUS_POINTS.MULTILINGUAL;
}

/**
 * Détermine le tier Gold en fonction du score
 */
function determineTier(score: number): GoldTier {
  if (score >= GOLD_TIERS.PLATINUM) return "platinum";
  if (score >= GOLD_TIERS.GOLD) return "gold";
  if (score >= GOLD_TIERS.SILVER) return "silver";
  if (score >= GOLD_TIERS.BRONZE) return "bronze";
  return "standard";
}

/**
 * Calcule le score Gold complet d'un talent
 */
export function calculateGoldScore(talent: Talent): GoldScore {
  // 1. Score des skills
  const { score: skillsScore, topSkills } = calculateSkillsScore(talent.skills);

  // 2. Score des projets
  const { projectScore, openSourceScore } = calculateProjectsScore(talent);

  // 3. Bonus verified
  const verifiedScore = talent.verified ? BONUS_POINTS.VERIFIED : 0;

  // 4. Bonus disponibilité
  const availabilityScore =
    talent.availability === "available" ? BONUS_POINTS.AVAILABLE : 0;

  // 5. Score d'expérience
  const experienceScore = calculateExperienceScore(talent.experience);

  // 6. Score des langues
  const languagesScore = calculateLanguagesScore(talent.languages);

  // Total
  const total =
    skillsScore +
    projectScore +
    openSourceScore +
    verifiedScore +
    availabilityScore +
    experienceScore +
    languagesScore;

  // Déterminer le tier
  const tier = determineTier(total);

  return {
    total,
    breakdown: {
      skills: skillsScore,
      projects: projectScore,
      verified: verifiedScore,
      availability: availabilityScore,
      experience: experienceScore,
      languages: languagesScore,
      openSource: openSourceScore,
    },
    tier,
    topSkills,
  };
}

/**
 * Trie les talents par score Gold (décroissant)
 */
export function sortByGoldScore(talents: Talent[]): Talent[] {
  return [...talents].sort((a, b) => {
    const scoreA = calculateGoldScore(a).total;
    const scoreB = calculateGoldScore(b).total;
    return scoreB - scoreA;
  });
}

/**
 * Filtre les talents par tier minimum
 */
export function filterByGoldTier(
  talents: Talent[],
  minTier: GoldTier,
): Talent[] {
  const tierOrder: GoldTier[] = [
    "platinum",
    "gold",
    "silver",
    "bronze",
    "standard",
  ];
  const minTierIndex = tierOrder.indexOf(minTier);

  return talents.filter((talent) => {
    const tier = calculateGoldScore(talent).tier;
    const tierIndex = tierOrder.indexOf(tier);
    return tierIndex <= minTierIndex;
  });
}

/**
 * Retourne la couleur associée à un tier
 */
export function getTierColor(tier: GoldTier): string {
  switch (tier) {
    case "platinum":
      return "#E5E4E2"; // Platine
    case "gold":
      return "#FFD700"; // Or
    case "silver":
      return "#C0C0C0"; // Argent
    case "bronze":
      return "#CD7F32"; // Bronze
    default:
      return "#9CA3AF"; // Gris standard
  }
}

/**
 * Retourne l'émoji associé à un tier
 */
export function getTierEmoji(tier: GoldTier): string {
  switch (tier) {
    case "platinum":
      return "💎";
    case "gold":
      return "🏆";
    case "silver":
      return "🥈";
    case "bronze":
      return "🥉";
    default:
      return "⭐";
  }
}

/**
 * Retourne le label associé à un tier
 */
export function getTierLabel(tier: GoldTier): string {
  switch (tier) {
    case "platinum":
      return "Platinum";
    case "gold":
      return "Gold";
    case "silver":
      return "Silver";
    case "bronze":
      return "Bronze";
    default:
      return "Standard";
  }
}
