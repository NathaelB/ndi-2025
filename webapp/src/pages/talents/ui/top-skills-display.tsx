import type { GoldScore } from "../features/gold-scoring";

interface TopSkillsDisplayProps {
  score: GoldScore;
  maxSkills?: number;
}

export function TopSkillsDisplay({
  score,
  maxSkills = 5,
}: TopSkillsDisplayProps) {
  const topSkills = score.topSkills.slice(0, maxSkills);

  // Trouver le poids max pour normaliser les barres
  const maxWeight = Math.max(...topSkills.map((s) => s.weight), 1);

  return (
    <div className="space-y-3">
      <h4 className="text-sm font-semibold text-gray-700">
        Top Skills
      </h4>
      <div className="space-y-2">
        {topSkills.map(({ skill, weight }, index) => {
          const percentage = (weight / maxWeight) * 100;

          // Couleur en fonction du poids
          let barColor = "bg-gray-400";
          if (weight >= 5) {
            barColor = "bg-gradient-to-r from-amber-500 to-yellow-500";
          } else if (weight >= 4) {
            barColor = "bg-gradient-to-r from-blue-500 to-cyan-500";
          } else if (weight >= 3) {
            barColor = "bg-gradient-to-r from-green-500 to-emerald-500";
          }

          return (
            <div key={`${skill}-${index}`} className="flex items-center gap-2">
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-700">
                    {skill}
                  </span>
                  <span className="text-xs font-semibold text-gray-600">
                    {weight}★
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-500 ${barColor}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-xs text-gray-500 mt-2">
        Poids: 1★ (base) à 5★ (haute valeur)
      </div>
    </div>
  );
}
