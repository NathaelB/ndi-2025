import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SkillCloud } from "./skill-cloud";
import { SkillGraph } from "./skill-graph";
import type { SkillFrequency } from "../features/skills-utils";
import { Network, Cloud } from "lucide-react";

interface SkillVisualizationProps {
  skills: SkillFrequency[];
}

type ViewMode = "cloud" | "graph";

export function SkillVisualization({ skills }: SkillVisualizationProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("graph");

  return (
    <div className="space-y-4">
      {/* Toggle buttons */}
      <div className="flex justify-center gap-2">
        <Button
          variant={viewMode === "cloud" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("cloud")}
          className="gap-2"
        >
          <Cloud className="h-4 w-4" />
          Nuage
        </Button>
        <Button
          variant={viewMode === "graph" ? "default" : "outline"}
          size="sm"
          onClick={() => setViewMode("graph")}
          className="gap-2"
        >
          <Network className="h-4 w-4" />
          Graphe interactif
        </Button>
      </div>

      {/* Visualization */}
      <div className="min-h-[400px]">
        {viewMode === "cloud" ? (
          <div className="py-8">
            <SkillCloud skills={skills} />
          </div>
        ) : (
          <SkillGraph skills={skills} />
        )}
      </div>
    </div>
  );
}
