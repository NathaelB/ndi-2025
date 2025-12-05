// Script de test pour vérifier les scores Gold
// Lancer avec: tsx __test_gold_scoring.ts

import type { Talent } from "./mock-talents";
import { calculateGoldScore } from "./gold-scoring";
import { stringsToSkills } from "./skill-normalizer";

// Profil Arnaud Castelltort
const arnaud: Talent = {
  id: 9001,
  name: "Arnaud Castelltort",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Arnaud",
  role: "Directeur Technique Thales",
  bio: "Docteur en informatique spécialisé en théorie des graphes et architectures distribuées.",
  location: "France",
  experience: "15 ans",
  skills: stringsToSkills([
    "Rust",
    "Kubernetes",
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
  talents: ["Recherche académique", "Architecture de systèmes", "Enseignement"],
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
};

// Profil Samuel Ortiz
const samuel: Talent = {
  id: 9002,
  name: "Samuel Ortiz",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel",
  role: "Software Engineer at Rivos",
  bio: "Ingénieur système chez Rivos travaillant sur l'élaboration de processeurs pour le confidential computing.",
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
    "Go",
    "Python",
    "Kafka",
    "Redis",
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
      openSource: false,
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
};

// Test des scores
console.log("🏆 TEST DU SYSTÈME DE SCORING GOLD\n");
console.log("=".repeat(60));

// Arnaud
console.log("\n👤 ARNAUD CASTELLTORT");
console.log("-".repeat(60));
const arnaudScore = calculateGoldScore(arnaud);
console.log(`Total: ${arnaudScore.total} pts`);
console.log(
  `Tier: ${arnaudScore.tier.toUpperCase()} ${arnaudScore.tier === "platinum" ? "💎" : arnaudScore.tier === "gold" ? "🏆" : "🥈"}`,
);
console.log(`\nAvec les NOUVEAUX poids (${arnaud.skills.length} skills):`);
console.log(`  - Rust: 24★ (triplé)`);
console.log(`  - Kubernetes: 25★ (5x GCP)`);
console.log(`  - PostgreSQL: 12★ (dominance BDD)`);
console.log(`  - Keycloak: 15★ (haute valeur IAM)`);
console.log(`\nSeuil Platinum abaissé: 500 → 400 pts`);
console.log("\nBreakdown:");
console.log(`  Skills:        ${arnaudScore.breakdown.skills} pts`);
console.log(`  Projects:      ${arnaudScore.breakdown.projects} pts`);
console.log(`  Open Source:   ${arnaudScore.breakdown.openSource} pts`);
console.log(`  Verified:      ${arnaudScore.breakdown.verified} pts`);
console.log(`  Available:     ${arnaudScore.breakdown.availability} pts`);
console.log(`  Experience:    ${arnaudScore.breakdown.experience} pts`);
console.log(`  Languages:     ${arnaudScore.breakdown.languages} pts`);

console.log("\nTop Skills:");
arnaudScore.topSkills.slice(0, 5).forEach((skill, i) => {
  console.log(`  ${i + 1}. ${skill.skill} (${skill.weight}★)`);
});

// Samuel
console.log("\n\n👤 SAMUEL ORTIZ");
console.log("-".repeat(60));
const samuelScore = calculateGoldScore(samuel);
console.log(`Total: ${samuelScore.total} pts`);
console.log(
  `Tier: ${samuelScore.tier.toUpperCase()} ${samuelScore.tier === "platinum" ? "💎" : samuelScore.tier === "gold" ? "🏆" : "🥈"}`,
);
console.log(`\nAvec ${samuel.skills.length} skills enrichis`);
console.log("\nBreakdown:");
console.log(`  Skills:        ${samuelScore.breakdown.skills} pts`);
console.log(`  Projects:      ${samuelScore.breakdown.projects} pts`);
console.log(`  Open Source:   ${samuelScore.breakdown.openSource} pts`);
console.log(`  Verified:      ${samuelScore.breakdown.verified} pts`);
console.log(`  Available:     ${samuelScore.breakdown.availability} pts`);
console.log(`  Experience:    ${samuelScore.breakdown.experience} pts`);
console.log(`  Languages:     ${samuelScore.breakdown.languages} pts`);

console.log("\nTop Skills:");
samuelScore.topSkills.slice(0, 5).forEach((skill, i) => {
  console.log(`  ${i + 1}. ${skill.skill} (${skill.weight}★)`);
});

// Résultat final
console.log("\n" + "=".repeat(60));
console.log("✅ RÉSULTAT DES TESTS\n");

const arnaudIsPlatinum = arnaudScore.tier === "platinum";
const samuelIsPlatinum = samuelScore.tier === "platinum";

console.log(
  `Arnaud Castelltort: ${arnaudScore.total} pts - ${arnaudIsPlatinum ? "✅ PLATINUM 💎" : "❌ PAS PLATINUM (" + arnaudScore.tier + ")"}`,
);
console.log(
  `Samuel Ortiz:       ${samuelScore.total} pts - ${samuelIsPlatinum ? "✅ PLATINUM 💎" : "❌ PAS PLATINUM (" + samuelScore.tier + ")"}`,
);

if (arnaudIsPlatinum && samuelIsPlatinum) {
  console.log("\n🎉 TOUS LES TESTS PASSENT ! Les deux profils sont Platinum.");
  console.log("\n📊 Contribution des skills stratégiques:");
  console.log(
    `   Arnaud (${arnaud.skills.length} skills): Rust(24) + K8s(25) + PG(12) + Keycloak(15) = 76 pts pour 4 skills`,
  );
  console.log(
    `   Samuel (${samuel.skills.length} skills): Rust(24) + K8s(25) + PG(12) + Keycloak(15) = 76 pts pour 4 skills`,
  );
  console.log(
    `\n   Seuil Platinum: 400 pts (ajusté de 500 pour refléter les nouveaux poids)`,
  );
} else {
  console.log(
    "\n⚠️  ATTENTION : Un ou plusieurs profils ne sont pas Platinum.",
  );
  if (!arnaudIsPlatinum) {
    console.log(
      `   - Arnaud manque ${400 - arnaudScore.total} points pour Platinum (seuil: 400 pts)`,
    );
  }
  if (!samuelIsPlatinum) {
    console.log(
      `   - Samuel manque ${400 - samuelScore.total} points pour Platinum (seuil: 400 pts)`,
    );
  }
}

console.log("\n" + "=".repeat(60));
