import { SkillTag } from "./skill-tag";
import type { SkillFrequency } from "../features/skills-utils";

interface SkillCloudProps {
  skills: SkillFrequency[];
}

export function SkillCloud({ skills }: SkillCloudProps) {
  if (skills.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Aucune compétence à afficher
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 items-center justify-center">
      {skills.map((item) => (
        <SkillTag
          key={item.skill}
          skill={item.skill}
          size={item.size}
          variant="outline"
        />
      ))}
    </div>
  );
}
