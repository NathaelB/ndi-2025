import { Users, Award, Briefcase, Globe } from "lucide-react";
import type { Talent } from "../features/mock-talents";

interface StatsOverviewProps {
  talents: Talent[];
}

export function StatsOverview({ talents }: StatsOverviewProps) {
  const totalTalents = talents.length;
  const verifiedTalents = talents.filter((t) => t.verified).length;
  const availableTalents = talents.filter(
    (t) => t.availability === "available"
  ).length;
  const totalProjects = talents.reduce(
    (sum, talent) => sum + talent.projects.length,
    0
  );

  const stats = [
    {
      label: "Talents",
      value: totalTalents,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Vérifiés",
      value: verifiedTalents,
      icon: Award,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Disponibles",
      value: availableTalents,
      icon: Briefcase,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      label: "Projets",
      value: totalProjects,
      icon: Globe,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="bg-card border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className={`${stat.bg} p-2 rounded-lg`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
