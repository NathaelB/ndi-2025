import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Talent } from "../features/mock-talents";
import { calculateGoldScore } from "../features/gold-scoring";
import { GoldBadge } from "./gold-badge";
import { TopSkillsDisplay } from "./top-skills-display";
import {
  CheckCircle2,
  MapPin,
  Briefcase,
  Mail,
  Linkedin,
  Github,
  Sparkles,
  FolderGit2,
  Circle,
  Edit,
  Trash2,
} from "lucide-react";

interface TalentCardProps {
  talent: Talent;
  onEdit?: (talent: Talent) => void;
  onDelete?: (id: number) => void;
}

export function TalentCard({ talent, onEdit, onDelete }: TalentCardProps) {
  const goldScore = calculateGoldScore(talent);
  const displayedSkills = talent.skills.slice(0, 4);
  const remainingSkills = talent.skills.length - displayedSkills.length;
  const displayedProjects = talent.projects.slice(0, 2);

  const availabilityConfig = {
    available: {
      color: "text-green-500",
      bg: "bg-green-500/10",
      label: "Disponible",
    },
    busy: { color: "text-orange-500", bg: "bg-orange-500/10", label: "Occupé" },
    unavailable: {
      color: "text-red-500",
      bg: "bg-red-500/10",
      label: "Indisponible",
    },
  };

  const availability = availabilityConfig[talent.availability];
  const isLocalTalent = talent.id >= 9000; // Talents locaux ont des IDs >= 9000

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50 overflow-hidden">
      {/* Header avec avatar et info principale */}
      <CardHeader className="pb-3 relative">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <img
              src={talent.avatar}
              alt={talent.name}
              className="w-16 h-16 rounded-full border-2 border-border group-hover:border-primary transition-colors"
            />
            {talent.verified && (
              <div className="absolute -bottom-1 -right-1 bg-primary rounded-full p-0.5">
                <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
              </div>
            )}
          </div>

          {/* Nom et rôle */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg truncate">
                  {talent.name}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {talent.role}
                </p>
              </div>
              {/* Badge disponibilité */}
              <div
                className={`flex items-center gap-1.5 px-2 py-1 rounded-full ${availability.bg} shrink-0`}
              >
                <Circle
                  className={`h-2 w-2 fill-current ${availability.color}`}
                />
                <span className={`text-xs font-medium ${availability.color}`}>
                  {availability.label}
                </span>
              </div>
            </div>
            {/* Gold Badge sous le nom */}
            <div className="mt-1">
              <GoldBadge score={goldScore} size="sm" showScore={false} />
            </div>
          </div>
        </div>

        {/* Actions pour talents locaux */}
        {isLocalTalent && (onEdit || onDelete) && (
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onEdit && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 bg-background/80 backdrop-blur-sm hover:bg-background"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(talent);
                }}
              >
                <Edit className="h-3.5 w-3.5" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-destructive-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  if (confirm(`Supprimer ${talent.name} ?`)) {
                    onDelete(talent.id);
                  }
                }}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Gold Score Breakdown */}
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-3">
          <GoldBadge score={goldScore} size="md" showScore={true} showBreakdown={false} />
        </div>

        {/* Bio */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {talent.bio}
        </p>

        {/* Localisation et expérience */}
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            <span>{talent.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            <span>{talent.experience} d'expérience</span>
          </div>
        </div>

        {/* Compétences techniques */}
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-xs font-medium text-muted-foreground">
              Compétences
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {displayedSkills.map((skill) => (
              <Badge key={skill.key} variant="secondary" className="text-xs">
                {skill.name}
              </Badge>
            ))}
            {remainingSkills > 0 && (
              <Badge variant="outline" className="text-xs">
                +{remainingSkills}
              </Badge>
            )}
          </div>
        </div>

        {/* Top Skills avec poids */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-lg p-3">
          <TopSkillsDisplay score={goldScore} maxSkills={5} />
        </div>

        {/* Talents/Soft skills */}
        {talent.talents.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <Sparkles className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">
                Talents
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {talent.talents.slice(0, 3).map((talent) => (
                <Badge
                  key={talent}
                  variant="outline"
                  className="text-xs border-primary/30 text-primary"
                >
                  {talent}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Projets récents */}
        {displayedProjects.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 mb-2">
              <FolderGit2 className="h-3 w-3 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">
                Projets récents
              </span>
            </div>
            <div className="space-y-2">
              {displayedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-muted/50 rounded-md p-2 space-y-1"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-medium truncate">
                      {project.name}
                    </h4>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-1.5 py-0.5 bg-background rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.openSource && (
                      <Badge
                        variant="outline"
                        className="text-xs border-green-500 text-green-600 bg-green-50"
                      >
                        Open Source
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Langues */}
        {talent.languages.length > 0 && (
          <div className="pt-2 border-t">
            <span className="text-xs text-muted-foreground">
              Langues: {talent.languages.join(", ")}
            </span>
          </div>
        )}

        {/* Actions - Contact */}
        <div className="flex gap-2 pt-2">
          {talent.email && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-8 text-xs"
              asChild
            >
              <a href={`mailto:${talent.email}`}>
                <Mail className="h-3 w-3 mr-1" />
                Contact
              </a>
            </Button>
          )}
          <div className="flex gap-1">
            {talent.linkedin && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                asChild
              >
                <a
                  href={`https://linkedin.com/in/${talent.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-3.5 w-3.5" />
                </a>
              </Button>
            )}
            {talent.github && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                asChild
              >
                <a
                  href={`https://github.com/${talent.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-3.5 w-3.5" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
