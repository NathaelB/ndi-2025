import type { Talent } from "./mock-talents";

export interface SkillFrequency {
  skill: string;
  count: number;
  size: "small" | "medium" | "large";
}

export function extractAllSkills(talents: Talent[]): SkillFrequency[] {
  const skillMap = new Map<string, number>();

  talents.forEach((talent) => {
    talent.skills.forEach((skill) => {
      skillMap.set(skill.name, (skillMap.get(skill.name) || 0) + 1);
    });
  });

  const skills = Array.from(skillMap.entries()).map(([skill, count]) => ({
    skill,
    count,
    size: "medium" as const,
  }));

  skills.sort((a, b) => b.count - a.count);

  const maxCount = skills[0]?.count || 1;
  const minCount = skills[skills.length - 1]?.count || 1;
  const range = maxCount - minCount;

  return skills.map((item) => {
    let size: "small" | "medium" | "large" = "medium";

    if (range > 0) {
      const normalized = (item.count - minCount) / range;
      if (normalized >= 0.66) {
        size = "large";
      } else if (normalized >= 0.33) {
        size = "medium";
      } else {
        size = "small";
      }
    }

    return {
      ...item,
      size,
    };
  });
}

export function getUniqueSkills(talents: Talent[]): string[] {
  const skillSet = new Set<string>();

  talents.forEach((talent) => {
    talent.skills.forEach((skill) => {
      skillSet.add(skill.name);
    });
  });

  return Array.from(skillSet).sort();
}
