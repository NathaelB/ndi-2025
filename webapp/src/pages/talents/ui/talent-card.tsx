import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SkillTag } from "./skill-tag";
import type { Talent } from "../features/mock-talents";
import { CheckCircle2 } from "lucide-react";

interface TalentCardProps {
  talent: Talent;
}

export function TalentCard({ talent }: TalentCardProps) {
  const displayedSkills = talent.skills.slice(0, 3);
  const remainingSkills = talent.skills.length - displayedSkills.length;

  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{talent.name}</h3>
            {talent.languages && talent.languages.length > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {talent.languages.join(", ")}
              </p>
            )}
          </div>
          {talent.verified && (
            <Badge variant="default" className="gap-1 shrink-0">
              <CheckCircle2 className="h-3 w-3" />
              Verified
            </Badge>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {displayedSkills.map((skill) => (
            <SkillTag key={skill} skill={skill} size="small" variant="secondary" />
          ))}
          {remainingSkills > 0 && (
            <Badge variant="outline" className="text-xs">
              +{remainingSkills}
            </Badge>
          )}
        </div>
      </div>
    </Card>
  );
}
