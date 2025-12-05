import type { Talent, Skill } from "./mock-talents";
import { stringsToSkills } from "./skill-normalizer";
import { migrateTalents } from "./migrate-skills";

// Type pour les talents avec skills potentiellement au format legacy
interface LegacyTalent extends Omit<Talent, "skills"> {
  skills: string[] | Skill[];
}

const STORAGE_KEY = "talents_local_storage";

// Talents par défaut
const DEFAULT_TALENTS: Talent[] = [
  {
    id: 9001,
    name: "Arnaud Castelltort",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Brian",
    role: "Directeur Technique Thales",
    bio: "Docteur en informatique spécialisé en théorie des graphes et architectures distribuées. Passionné par les systèmes complexes et les langages systèmes modernes.",
    location: "France",
    experience: "15 ans",
    skills: stringsToSkills([
      "Rust",
      "Kubernetes",
      "Machine Learning",
      "PostgreSQL",
      "Keycloak",
      "Graph Theory",
      "Théorie des graphes",
      "Microservices",
      "Architectures distribuées",
      "Distributed Systems",
      "Docker",
      "Linux",
      "TypeScript",
      "React",
      "Node.js",
      "gRPC",
      "Terraform",
      "AWS",
      "GraphQL",
      "Redis",
      "Kafka",
      "CI/CD",
      "GitHub Actions",
      "Performance Optimization",
      "Concurrency",
      "Event-Driven Architecture",
      "Domain-Driven Design",
      "Clean Architecture",
      "Test-Driven Development",
      "Parallel Computing",
      "System Programming",
    ]),
    languages: ["Français", "Anglais"],
    talents: [
      "Recherche académique",
      "Architecture de systèmes",
      "Enseignement",
    ],
    projects: [
      {
        id: 90001,
        name: "Graph Processing Engine",
        description:
          "Moteur de traitement de graphes haute performance en Rust pour analyse de réseaux sociaux",
        technologies: ["Rust", "Graph Theory", "Parallel Computing"],
        year: 2024,
        openSource: true,
      },
      {
        id: 90002,
        name: "Microservices Framework",
        description:
          "Framework de microservices avec gestion avancée de la résilience et du tracing",
        technologies: ["Rust", "gRPC", "Distributed Systems"],
        year: 2023,
        openSource: true,
      },
    ],
    verified: true,
    availability: "available",
    linkedin: "acastelltort",
  },
  {
    id: 9002,
    name: "Samuel Ortiz",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Easton",
    role: "Software Engineer at Rivos",
    bio: "Ingénieur système chez Rivos travaillant sur l'élaboration de processeurs pour le confidential computing. Expert en virtualisation et systèmes bas niveau.",
    location: "France",
    experience: "18 ans",
    skills: stringsToSkills([
      "Rust",
      "Kubernetes",
      "PostgreSQL",
      "Keycloak",
      "Hardware Security",
      "C",
      "C++",
      "Programmation système",
      "System Programming",
      "Virtualisation",
      "Confidential Computing",
      "Linux",
      "Docker",
      "Security",
      "Cryptography",
      "RISC-V",
      "Embedded Systems",
      "Performance Optimization",
      "Concurrency",
      "Microservices",
      "gRPC",
      "Terraform",
      "AWS",
      "Distributed Systems",
      "Real-time Systems",
      "WebAssembly",
    ]),
    languages: ["Français", "Anglais"],
    talents: [
      "Architecture matérielle",
      "Sécurité système",
      "Innovation technologique",
    ],
    projects: [
      {
        id: 90003,
        name: "Confidential Computing Processor",
        description:
          "Développement d'un processeur RISC-V pour l'exécution sécurisée de workloads confidentiels",
        technologies: ["Rust", "RISC-V", "Hardware Security"],
        year: 2024,
        openSource: true,
      },
      {
        id: 90004,
        name: "Hypervisor Development",
        description:
          "Hyperviseur léger optimisé pour les environnements de confiance",
        technologies: ["C", "Rust", "Virtualization"],
        year: 2023,
        openSource: true,
      },
    ],
    verified: true,
    availability: "busy",
    linkedin: "samuelortiz",
  },
];

export interface TalentStorage {
  talents: Talent[];
  lastUpdated: string;
}

// Charger les talents depuis le LocalStorage
export function loadTalentsFromStorage(): Talent[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Première visite : initialiser avec les talents par défaut
      saveTalentsToStorage(DEFAULT_TALENTS);
      return DEFAULT_TALENTS;
    }

    const data: TalentStorage = JSON.parse(stored);

    // Migration automatique si les données sont au format legacy (skills: string[])
    const talents = data.talents || [];
    const migratedTalents = migrateTalents(talents as LegacyTalent[]);

    // Sauvegarder les données migrées si nécessaire
    if (
      talents.length > 0 &&
      typeof (talents[0] as LegacyTalent).skills?.[0] === "string"
    ) {
      console.log("Migration automatique des skills détectée et appliquée");
      saveTalentsToStorage(migratedTalents);
    }

    return migratedTalents;
  } catch (error) {
    console.error("Erreur lors du chargement des talents:", error);
    return DEFAULT_TALENTS;
  }
}

// Sauvegarder les talents dans le LocalStorage
export function saveTalentsToStorage(talents: Talent[]): void {
  try {
    const data: TalentStorage = {
      talents,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des talents:", error);
  }
}

// Ajouter un nouveau talent
export function addTalent(talent: Omit<Talent, "id">): Talent {
  const talents = loadTalentsFromStorage();
  const newId = Math.max(...talents.map((t) => t.id), 9000) + 1;
  const newTalent: Talent = { ...talent, id: newId };
  saveTalentsToStorage([...talents, newTalent]);
  return newTalent;
}

// Mettre à jour un talent existant
export function updateTalent(id: number, updates: Partial<Talent>): void {
  const talents = loadTalentsFromStorage();
  const updatedTalents = talents.map((t) =>
    t.id === id ? { ...t, ...updates } : t,
  );
  saveTalentsToStorage(updatedTalents);
}

// Supprimer un talent
export function deleteTalent(id: number): void {
  const talents = loadTalentsFromStorage();
  const filteredTalents = talents.filter((t) => t.id !== id);
  saveTalentsToStorage(filteredTalents);
}

// Réinitialiser avec les talents par défaut
export function resetToDefaultTalents(): void {
  saveTalentsToStorage(DEFAULT_TALENTS);
}

// Exporter tous les talents en JSON
export function exportTalents(): string {
  const talents = loadTalentsFromStorage();
  return JSON.stringify(talents, null, 2);
}

// Importer des talents depuis JSON
export function importTalents(jsonData: string): void {
  try {
    const talents: Talent[] = JSON.parse(jsonData);
    if (Array.isArray(talents)) {
      saveTalentsToStorage(talents);
    } else {
      throw new Error("Format JSON invalide");
    }
  } catch (error) {
    console.error("Erreur lors de l'importation:", error);
    throw error;
  }
}
