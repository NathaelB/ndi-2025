import { useState } from "react";
import AnimatedSphere from "@/components/three/AnimatedSphere";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MoodTest() {
  const [score, setScore] = useState(50);

  const getMoodLabel = (score: number) => {
    if (score < 20) return { text: "Chaos Total", color: "text-red-500" };
    if (score < 40) return { text: "Instable", color: "text-orange-500" };
    if (score < 60) return { text: "Équilibre", color: "text-yellow-500" };
    if (score < 80) return { text: "Stable", color: "text-blue-500" };
    return { text: "Zen Total", color: "text-cyan-500" };
  };

  const mood = getMoodLabel(score);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Sphère 3D en arrière-plan */}
      <AnimatedSphere score={score} />

      {/* Interface de contrôle */}
      <div className="relative z-50 flex min-h-screen items-center justify-center p-8">
        <Card className="w-full max-w-lg bg-slate-900/80 backdrop-blur-lg border-slate-700">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white text-center">
              Test Sphère 3D
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Affichage du score */}
            <div className="text-center">
              <div
                className={`text-7xl font-bold ${mood.color} transition-colors duration-500`}
              >
                {score}
              </div>
              <div className={`mt-2 text-xl ${mood.color}`}>{mood.text}</div>
            </div>

            {/* Slider de contrôle */}
            <div className="space-y-4">
              <label className="text-sm font-medium text-slate-300">
                Contrôle du Score
              </label>
              <input
                type="range"
                value={score}
                onChange={(e) => setScore(Number(e.target.value))}
                min={0}
                max={100}
                step={1}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-slate-400">
                <span>0 - Spiky / Chaos</span>
                <span>100 - Lisse / Calme</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
