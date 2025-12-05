import type { GoldScore } from "../features/gold-scoring";
import {
  getTierColor,
  getTierEmoji,
  getTierLabel,
} from "../features/gold-scoring";

interface GoldBadgeProps {
  score: GoldScore;
  size?: "sm" | "md" | "lg";
  showScore?: boolean;
  showBreakdown?: boolean;
}

export function GoldBadge({
  score,
  size = "md",
  showScore = true,
  showBreakdown = false,
}: GoldBadgeProps) {
  const tierColor = getTierColor(score.tier);
  const tierEmoji = getTierEmoji(score.tier);
  const tierLabel = getTierLabel(score.tier);

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-2",
  };

  return (
    <div className="inline-flex flex-col gap-2">
      <div
        className={`inline-flex items-center gap-2 rounded-full font-semibold ${sizeClasses[size]} border-2`}
        style={{
          backgroundColor: `${tierColor}20`,
          borderColor: tierColor,
          color: score.tier === "platinum" ? "#4B5563" : "#1F2937",
        }}
      >
        <span className="text-lg">{tierEmoji}</span>
        <span className="text-white">{tierLabel}</span>
        {showScore && (
          <span className="font-bold ml-1 text-white">
            {score.total} pts
          </span>
        )}
      </div>

      {showBreakdown && (
        <div className="bg-white border rounded-lg p-3 text-xs space-y-1 shadow-sm">
          <div className="font-semibold text-gray-700 mb-2">Score Breakdown:</div>
          <div className="flex justify-between">
            <span className="text-gray-600">Skills:</span>
            <span className="font-medium">{score.breakdown.skills} pts</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Projects:</span>
            <span className="font-medium">{score.breakdown.projects} pts</span>
          </div>
          {score.breakdown.openSource > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Open Source:</span>
              <span className="font-medium text-green-600">
                +{score.breakdown.openSource} pts
              </span>
            </div>
          )}
          {score.breakdown.verified > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Verified:</span>
              <span className="font-medium text-blue-600">
                +{score.breakdown.verified} pts
              </span>
            </div>
          )}
          {score.breakdown.availability > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Available:</span>
              <span className="font-medium text-emerald-600">
                +{score.breakdown.availability} pts
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">Experience:</span>
            <span className="font-medium">{score.breakdown.experience} pts</span>
          </div>
          {score.breakdown.languages > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Languages:</span>
              <span className="font-medium">{score.breakdown.languages} pts</span>
            </div>
          )}
          <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
            <span className="text-gray-700">Total:</span>
            <span>{score.total} pts</span>
          </div>
        </div>
      )}
    </div>
  );
}
