import { useMemo } from "react";
import type { Talent } from "./mock-talents";

export type AvailabilityFilter = "all" | "available" | "busy" | "unavailable";
export type VerificationFilter = "all" | "verified" | "unverified";

interface UseTalentFiltersProps {
  talents: Talent[];
  availabilityFilter: AvailabilityFilter;
  verificationFilter: VerificationFilter;
}

export function useTalentFilters({
  talents,
  availabilityFilter,
  verificationFilter,
}: UseTalentFiltersProps) {
  const filteredTalents = useMemo(() => {
    let result = [...talents];

    // Filtre par disponibilité
    if (availabilityFilter !== "all") {
      result = result.filter(
        (talent) => talent.availability === availabilityFilter
      );
    }

    // Filtre par vérification
    if (verificationFilter === "verified") {
      result = result.filter((talent) => talent.verified === true);
    } else if (verificationFilter === "unverified") {
      result = result.filter((talent) => talent.verified === false);
    }

    return result;
  }, [talents, availabilityFilter, verificationFilter]);

  return filteredTalents;
}
