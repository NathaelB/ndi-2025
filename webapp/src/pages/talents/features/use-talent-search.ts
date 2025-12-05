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
      const skillMatch = talent.skills.some((skill) =>
        skill.toLowerCase().includes(query),
      );
      const languageMatch = talent.languages?.some((lang) =>
        lang.toLowerCase().includes(query),
      );

      return nameMatch || skillMatch || languageMatch;
    });
  }, [talents, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredTalents,
  };
}
