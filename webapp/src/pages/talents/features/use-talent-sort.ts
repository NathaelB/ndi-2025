import { useMemo } from "react";
import type { Talent } from "./mock-talents";

export type SortField = "name" | "experience" | "projects" | "availability";
export type SortDirection = "asc" | "desc";

interface UseTalentSortProps {
  talents: Talent[];
  sortField: SortField;
  sortDirection: SortDirection;
}

function extractYearsFromExperience(experience: string): number {
  const match = experience.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function getAvailabilityPriority(availability: string): number {
  const priorities = {
    available: 1,
    busy: 2,
    unavailable: 3,
  };
  return priorities[availability as keyof typeof priorities] || 4;
}

export function useTalentSort({
  talents,
  sortField,
  sortDirection,
}: UseTalentSortProps) {
  const sortedTalents = useMemo(() => {
    const talentsCopy = [...talents];

    talentsCopy.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;

        case "experience":
          const yearsA = extractYearsFromExperience(a.experience);
          const yearsB = extractYearsFromExperience(b.experience);
          comparison = yearsA - yearsB;
          break;

        case "projects":
          comparison = a.projects.length - b.projects.length;
          break;

        case "availability":
          const priorityA = getAvailabilityPriority(a.availability);
          const priorityB = getAvailabilityPriority(b.availability);
          comparison = priorityA - priorityB;
          break;

        default:
          comparison = 0;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    return talentsCopy;
  }, [talents, sortField, sortDirection]);

  return sortedTalents;
}
