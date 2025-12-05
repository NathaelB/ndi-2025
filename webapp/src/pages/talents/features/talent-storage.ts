import type { Talent } from "./mock-talents";

const STORAGE_KEY = "talents_local_storage";

// Talents par défaut
const DEFAULT_TALENTS: Talent[] = [
  {
    id: 9001,
    name: "Arnaud Castelltort",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arnaud",
    role: "PhD Informatique",
    bio: "Docteur en informatique spécialisé en théorie des graphes et architectures distribuées. Passionné par les systèmes complexes et les langages systèmes modernes.",
    location: "France",
    experience: "15 ans",
    skills: [
      "Rust",
      "Théorie des graphes",
      "Microservices",
      "Architectures distribuées",
      "Systèmes complexes",
      "Recherche",
    ],
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
      },
      {
        id: 90002,
        name: "Microservices Framework",
        description:
          "Framework de microservices avec gestion avancée de la résilience et du tracing",
        technologies: ["Rust", "gRPC", "Distributed Systems"],
        year: 2023,
      },
    ],
    verified: true,
    availability: "available",
    linkedin: "acastelltort",
  },
  {
    id: 9002,
    name: "Samuel Ortiz",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel",
    role: "Ingénieur Informatique",
    bio: "Ingénieur système chez Rivos travaillant sur l'élaboration de processeurs pour le confidential computing. Expert en virtualisation et systèmes bas niveau.",
    location: "France",
    experience: "18 ans",
    skills: [
      "Rust",
      "C",
      "Programmation système",
      "Virtualisation",
      "Confidential Computing",
      "Hardware Security",
    ],
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
      },
      {
        id: 90004,
        name: "Hypervisor Development",
        description:
          "Hyperviseur léger optimisé pour les environnements de confiance",
        technologies: ["C", "Rust", "Virtualization"],
        year: 2023,
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
    return data.talents || [];
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
    t.id === id ? { ...t, ...updates } : t
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
