export interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  year: number;
  openSource?: boolean;
}

export interface Skill {
  name: string;
  key: string;
}

export interface Talent {
  id: number;
  name: string;
  avatar: string;
  role: string;
  bio: string;
  location: string;
  experience: string;
  skills: Skill[];
  languages: string[];
  talents: string[];
  projects: Project[];
  verified: boolean;
  availability: "available" | "busy" | "unavailable";
  email?: string;
  linkedin?: string;
  github?: string;
}

export const mockTalents: Talent[] = [];
