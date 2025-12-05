import { useMemo } from "react";
import type { Talent } from "../features/mock-talents";
import {
  calculateGoldScore,
  getTierEmoji,
  getTierLabel,
  type GoldTier,
} from "../features/gold-scoring";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface GoldStatsProps {
  talents: Talent[];
}

export function GoldStats({ talents }: GoldStatsProps) {
  const stats = useMemo(() => {
    const tierCounts: Record<GoldTier, number> = {
      platinum: 0,
      gold: 0,
      silver: 0,
      bronze: 0,
      standard: 0,
    };

    let totalScore = 0;
    let maxScore = 0;
    let minScore = Infinity;
    let topTalent: { name: string; score: number } | undefined = undefined;

    talents.forEach((talent) => {
      const score = calculateGoldScore(talent);
      tierCounts[score.tier]++;
      totalScore += score.total;

      if (score.total > maxScore) {
        maxScore = score.total;
        topTalent = { name: talent.name, score: score.total };
      }

      if (score.total < minScore) {
        minScore = score.total;
      }
    });

    const avgScore = talents.length > 0 ? Math.round(totalScore / talents.length) : 0;

    return {
      tierCounts,
      avgScore,
      maxScore,
      minScore: minScore === Infinity ? 0 : minScore,
      topTalent: topTalent as { name: string; score: number } | undefined,
      total: talents.length,
    };
  }, [talents]);

  const tiers: GoldTier[] = ["platinum", "gold", "silver", "bronze", "standard"];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          📊 Statistiques Gold
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Répartition par tier */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gray-700">Répartition par tier</h4>
          <div className="space-y-2">
            {tiers.map((tier) => {
              const count = stats.tierCounts[tier];
              const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;

              return (
                <div key={tier} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5">
                      <span>{getTierEmoji(tier)}</span>
                      <span className="font-medium">{getTierLabel(tier)}</span>
                    </span>
                    <span className="font-semibold text-gray-700">
                      {count} ({percentage.toFixed(0)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ${tier === "platinum"
                        ? "bg-linear-to-r from-purple-500 to-pink-500"
                        : tier === "gold"
                          ? "bg-linear-to-r from-amber-500 to-yellow-500"
                          : tier === "silver"
                            ? "bg-linear-to-r from-gray-400 to-gray-500"
                            : tier === "bronze"
                              ? "bg-linear-to-r from-orange-600 to-orange-700"
                              : "bg-gray-400"
                        }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scores globaux */}
        <div className="pt-3 border-t space-y-2">
          <h4 className="text-sm font-semibold text-gray-700">Scores</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-lg p-2.5 border border-blue-200">
              <div className="text-xs text-blue-700 font-medium mb-0.5">
                Moyenne
              </div>
              <div className="text-lg font-bold text-blue-900">
                {stats.avgScore}
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-2.5 border border-green-200">
              <div className="text-xs text-green-700 font-medium mb-0.5">
                Maximum
              </div>
              <div className="text-lg font-bold text-green-900">
                {stats.maxScore}
              </div>
            </div>
          </div>
        </div>

        {/* Top talent */}
        {stats.topTalent && (
          <div className="pt-3 border-t">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              🏆 Meilleur profil
            </h4>
            <div className="bg-linear-to-br from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-3">
              <div className="font-semibold text-sm text-gray-800">
                {stats.topTalent.name}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                Score: {stats.topTalent.score} pts
              </div>
            </div>
          </div>
        )}

        {/* Résumé */}
        <div className="pt-3 border-t text-xs text-muted-foreground">
          Total: {stats.total} talent{stats.total > 1 ? "s" : ""} analysé{stats.total > 1 ? "s" : ""}
        </div>
      </CardContent>
    </Card>
  );
}
