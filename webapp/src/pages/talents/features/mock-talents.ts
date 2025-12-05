export interface Talent {
  id: number;
  name: string;
  skills: string[];
  languages?: string[];
  verified: boolean;
}

export const mockTalents: Talent[] = [
  {
    id: 1,
    name: "Alice Dubois",
    skills: ["React", "TypeScript", "Node.js", "GraphQL"],
    languages: ["Français", "Anglais"],
    verified: true,
  },
  {
    id: 2,
    name: "Bob Martin",
    skills: ["Python", "Django", "PostgreSQL", "Docker"],
    languages: ["Français", "Espagnol"],
    verified: true,
  },
  {
    id: 3,
    name: "Claire Lefebvre",
    skills: ["Vue.js", "CSS", "Figma", "UX Design"],
    languages: ["Français", "Anglais", "Allemand"],
    verified: false,
  },
  {
    id: 4,
    name: "David Chen",
    skills: ["Java", "Spring Boot", "Kubernetes", "AWS"],
    languages: ["Français", "Anglais", "Mandarin"],
    verified: true,
  },
  {
    id: 5,
    name: "Emma Bernard",
    skills: ["React Native", "Swift", "iOS", "Firebase"],
    languages: ["Français"],
    verified: true,
  },
  {
    id: 6,
    name: "François Dupont",
    skills: ["Angular", "NestJS", "MongoDB", "Redis"],
    languages: ["Français", "Anglais"],
    verified: false,
  },
  {
    id: 7,
    name: "Gabrielle Rousseau",
    skills: ["Data Science", "Python", "TensorFlow", "SQL"],
    languages: ["Français", "Anglais"],
    verified: true,
  },
  {
    id: 8,
    name: "Hugo Petit",
    skills: ["DevOps", "Terraform", "Jenkins", "Linux"],
    languages: ["Français"],
    verified: true,
  },
  {
    id: 9,
    name: "Isabelle Moreau",
    skills: ["PHP", "Laravel", "MySQL", "Vue.js"],
    languages: ["Français", "Italien"],
    verified: false,
  },
  {
    id: 10,
    name: "Jacques Laurent",
    skills: ["Go", "Microservices", "gRPC", "Kafka"],
    languages: ["Français", "Anglais"],
    verified: true,
  },
  {
    id: 11,
    name: "Karine Simon",
    skills: ["React", "Next.js", "Tailwind CSS", "Vercel"],
    languages: ["Français", "Anglais"],
    verified: true,
  },
  {
    id: 12,
    name: "Louis Mercier",
    skills: ["Rust", "WebAssembly", "Actix", "Performance"],
    languages: ["Français"],
    verified: false,
  },
];
