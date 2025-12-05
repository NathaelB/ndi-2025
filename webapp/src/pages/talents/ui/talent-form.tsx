import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import type { Talent, Project } from "../features/mock-talents";
import { X, Plus, Trash2 } from "lucide-react";

interface TalentFormProps {
  talent?: Talent;
  onSubmit: (talent: Omit<Talent, "id">) => void;
  onCancel: () => void;
}

export function TalentForm({ talent, onSubmit, onCancel }: TalentFormProps) {
  const [formData, setFormData] = useState<Omit<Talent, "id">>({
    name: talent?.name || "",
    avatar: talent?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=default`,
    role: talent?.role || "",
    bio: talent?.bio || "",
    location: talent?.location || "",
    experience: talent?.experience || "",
    skills: talent?.skills || [],
    languages: talent?.languages || [],
    talents: talent?.talents || [],
    projects: talent?.projects || [],
    verified: talent?.verified || false,
    availability: talent?.availability || "available",
    email: talent?.email || "",
    linkedin: talent?.linkedin || "",
    github: talent?.github || "",
  });

  const [currentSkill, setCurrentSkill] = useState("");
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [currentTalent, setCurrentTalent] = useState("");
  const [currentProject, setCurrentProject] = useState<Partial<Project>>({
    name: "",
    description: "",
    technologies: [],
    year: new Date().getFullYear(),
  });
  const [currentTech, setCurrentTech] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, currentSkill.trim()],
      });
      setCurrentSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const addLanguage = () => {
    if (
      currentLanguage.trim() &&
      !formData.languages.includes(currentLanguage.trim())
    ) {
      setFormData({
        ...formData,
        languages: [...formData.languages, currentLanguage.trim()],
      });
      setCurrentLanguage("");
    }
  };

  const removeLanguage = (language: string) => {
    setFormData({
      ...formData,
      languages: formData.languages.filter((l) => l !== language),
    });
  };

  const addTalent = () => {
    if (
      currentTalent.trim() &&
      !formData.talents.includes(currentTalent.trim())
    ) {
      setFormData({
        ...formData,
        talents: [...formData.talents, currentTalent.trim()],
      });
      setCurrentTalent("");
    }
  };

  const removeTalent = (talent: string) => {
    setFormData({
      ...formData,
      talents: formData.talents.filter((t) => t !== talent),
    });
  };

  const addTechToProject = () => {
    if (
      currentTech.trim() &&
      !currentProject.technologies?.includes(currentTech.trim())
    ) {
      setCurrentProject({
        ...currentProject,
        technologies: [...(currentProject.technologies || []), currentTech.trim()],
      });
      setCurrentTech("");
    }
  };

  const removeTechFromProject = (tech: string) => {
    setCurrentProject({
      ...currentProject,
      technologies:
        currentProject.technologies?.filter((t) => t !== tech) || [],
    });
  };

  const addProject = () => {
    if (
      currentProject.name &&
      currentProject.description &&
      currentProject.technologies &&
      currentProject.technologies.length > 0
    ) {
      const newProject: Project = {
        id: Date.now(),
        name: currentProject.name,
        description: currentProject.description,
        technologies: currentProject.technologies,
        year: currentProject.year || new Date().getFullYear(),
      };
      setFormData({
        ...formData,
        projects: [...formData.projects, newProject],
      });
      setCurrentProject({
        name: "",
        description: "",
        technologies: [],
        year: new Date().getFullYear(),
      });
    }
  };

  const removeProject = (projectId: number) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((p) => p.id !== projectId),
    });
  };

  const generateNewAvatar = () => {
    const seed = formData.name || Date.now().toString();
    setFormData({
      ...formData,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informations de base */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Informations de base</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Jean Dupont"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Rôle / Titre *</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              placeholder="Développeur Full Stack"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Localisation</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              placeholder="Paris, France"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Expérience</Label>
            <Input
              id="experience"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              placeholder="5 ans"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Biographie</Label>
          <textarea
            id="bio"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Décrivez votre parcours et vos passions..."
            className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Avatar</Label>
          <div className="flex items-center gap-3">
            <img
              src={formData.avatar}
              alt="Avatar"
              className="w-16 h-16 rounded-full border-2"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={generateNewAvatar}
            >
              Générer un nouvel avatar
            </Button>
          </div>
        </div>
      </div>

      {/* Compétences techniques */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Compétences techniques</h3>
        <div className="flex gap-2">
          <Input
            value={currentSkill}
            onChange={(e) => setCurrentSkill(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
            placeholder="Ex: React, Python, Docker..."
          />
          <Button type="button" onClick={addSkill} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="gap-1">
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Talents / Soft skills */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Talents / Soft Skills</h3>
        <div className="flex gap-2">
          <Input
            value={currentTalent}
            onChange={(e) => setCurrentTalent(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTalent())}
            placeholder="Ex: Leadership, Communication..."
          />
          <Button type="button" onClick={addTalent} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.talents.map((talent) => (
            <Badge key={talent} variant="outline" className="gap-1">
              {talent}
              <button
                type="button"
                onClick={() => removeTalent(talent)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Langues */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Langues</h3>
        <div className="flex gap-2">
          <Input
            value={currentLanguage}
            onChange={(e) => setCurrentLanguage(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addLanguage())
            }
            placeholder="Ex: Français, Anglais..."
          />
          <Button type="button" onClick={addLanguage} size="icon">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.languages.map((language) => (
            <Badge key={language} variant="secondary" className="gap-1">
              {language}
              <button
                type="button"
                onClick={() => removeLanguage(language)}
                className="ml-1 hover:text-destructive"
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Projets */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Projets</h3>

        {/* Liste des projets existants */}
        {formData.projects.length > 0 && (
          <div className="space-y-2">
            {formData.projects.map((project) => (
              <div
                key={project.id}
                className="bg-muted/50 rounded-lg p-3 space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{project.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Année: {project.year}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeProject(project.id)}
                    className="shrink-0"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Formulaire pour nouveau projet */}
        <div className="border rounded-lg p-4 space-y-3 bg-muted/20">
          <p className="text-sm font-medium">Ajouter un projet</p>
          <Input
            value={currentProject.name || ""}
            onChange={(e) =>
              setCurrentProject({ ...currentProject, name: e.target.value })
            }
            placeholder="Nom du projet"
          />
          <textarea
            value={currentProject.description || ""}
            onChange={(e) =>
              setCurrentProject({
                ...currentProject,
                description: e.target.value,
              })
            }
            placeholder="Description du projet"
            className="flex min-h-15 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            rows={2}
          />
          <div className="flex gap-2">
            <Input
              value={currentTech}
              onChange={(e) => setCurrentTech(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTechToProject())
              }
              placeholder="Technologies utilisées"
            />
            <Button type="button" onClick={addTechToProject} size="icon">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-1">
            {currentProject.technologies?.map((tech) => (
              <Badge key={tech} variant="outline" className="gap-1">
                {tech}
                <button
                  type="button"
                  onClick={() => removeTechFromProject(tech)}
                  className="ml-1 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <Input
            type="number"
            value={currentProject.year || new Date().getFullYear()}
            onChange={(e) =>
              setCurrentProject({
                ...currentProject,
                year: parseInt(e.target.value, 10),
              })
            }
            placeholder="Année"
            min="1990"
            max={new Date().getFullYear() + 1}
          />
          <Button
            type="button"
            onClick={addProject}
            variant="outline"
            size="sm"
            disabled={
              !currentProject.name ||
              !currentProject.description ||
              !currentProject.technologies ||
              currentProject.technologies.length === 0
            }
          >
            <Plus className="h-4 w-4 mr-2" />
            Ajouter ce projet
          </Button>
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Contact & Réseaux</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="email@exemple.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn (username)</Label>
            <Input
              id="linkedin"
              value={formData.linkedin}
              onChange={(e) =>
                setFormData({ ...formData, linkedin: e.target.value })
              }
              placeholder="jean-dupont"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub (username)</Label>
            <Input
              id="github"
              value={formData.github}
              onChange={(e) =>
                setFormData({ ...formData, github: e.target.value })
              }
              placeholder="jeandupont"
            />
          </div>
        </div>
      </div>

      {/* Statut */}
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Statut</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="availability">Disponibilité</Label>
            <select
              id="availability"
              value={formData.availability}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  availability: e.target.value as Talent["availability"],
                })
              }
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="available">Disponible</option>
              <option value="busy">Occupé</option>
              <option value="unavailable">Indisponible</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="verified" className="flex items-center gap-2">
              <input
                id="verified"
                type="checkbox"
                checked={formData.verified}
                onChange={(e) =>
                  setFormData({ ...formData, verified: e.target.checked })
                }
                className="h-4 w-4 rounded border-input"
              />
              <span>Profil vérifié</span>
            </Label>
          </div>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="flex gap-3 justify-end pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit">
          {talent ? "Mettre à jour" : "Créer le talent"}
        </Button>
      </div>
    </form>
  );
}
