import { useState, useMemo } from "react";
import type { Talent } from "./mock-talents";

export function useTalentSearch(talents: Talent[] | undefined) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTalents = useMemo(() => {
    if (!talents) return [];
    if (!searchQuery.trim()) return talents;

    const query = searchQuery.toLowerCase().trim();

    return talents.filter((talent) => {
      const nameMatch = talent.name.toLowerCase().includes(query);
      const roleMatch = talent.role.toLowerCase().includes(query);
      const bioMatch = talent.bio.toLowerCase().includes(query);
      const locationMatch = talent.location.toLowerCase().includes(query);

      const skillMatch = talent.skills.some((skill) =>
        skill.toLowerCase().includes(query),
      );

      const languageMatch = talent.languages.some((lang) =>
        lang.toLowerCase().includes(query),
      );

      const talentMatch = talent.talents.some((t) =>
        t.toLowerCase().includes(query),
      );

      const projectMatch = talent.projects.some(
        (project) =>
          project.name.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(query),
          ),
      );

      return (
        nameMatch ||
        roleMatch ||
        bioMatch ||
        locationMatch ||
        skillMatch ||
        languageMatch ||
        talentMatch ||
        projectMatch
      );
    });
  }, [talents, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredTalents,
  };
}
