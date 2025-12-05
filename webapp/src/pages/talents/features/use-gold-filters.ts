import { useMemo, useState } from "react";
import type { Talent } from "./mock-talents";
import { calculateGoldScore, type GoldTier } from "./gold-scoring";

export interface GoldFilters {
  minTier?: GoldTier;
  minScore?: number;
}

export function useGoldFilters(talents: Talent[]) {
  const [filters, setFilters] = useState<GoldFilters>({});

  const filteredTalents = useMemo(() => {
    let result = [...talents];

    // Filtre par tier minimum
    if (filters.minTier) {
      const tierOrder: GoldTier[] = [
        "platinum",
        "gold",
        "silver",
        "bronze",
        "standard",
      ];
      const minTierIndex = tierOrder.indexOf(filters.minTier);

      result = result.filter((talent) => {
        const score = calculateGoldScore(talent);
        const tierIndex = tierOrder.indexOf(score.tier);
        return tierIndex <= minTierIndex;
      });
    }

    // Filtre par score minimum
    if (filters.minScore !== undefined) {
      result = result.filter((talent) => {
        const score = calculateGoldScore(talent);
        return score.total >= filters.minScore!;
      });
    }

    return result;
  }, [talents, filters]);

  const setMinTier = (tier?: GoldTier) => {
    setFilters((prev) => ({ ...prev, minTier: tier }));
  };

  const setMinScore = (score?: number) => {
    setFilters((prev) => ({ ...prev, minScore: score }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const hasActiveFilters = filters.minTier !== undefined || filters.minScore !== undefined;

  return {
    filteredTalents,
    filters,
    setMinTier,
    setMinScore,
    clearFilters,
    hasActiveFilters,
  };
}
