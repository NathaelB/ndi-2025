import { Users, Award, Briefcase, Globe, TrendingUp, Sparkles } from "lucide-react";
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

  const verifiedPercentage = totalTalents > 0 ? Math.round((verifiedTalents / totalTalents) * 100) : 0;
  const availablePercentage = totalTalents > 0 ? Math.round((availableTalents / totalTalents) * 100) : 0;

  const stats = [
    {
      label: "Talents",
      value: totalTalents,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-gradient-to-br from-blue-500/20 to-blue-600/10",
      border: "border-blue-500/30",
      iconBg: "bg-gradient-to-br from-blue-500 to-blue-600",
      trend: "+12%",
      description: "Membres actifs",
    },
    {
      label: "Vérifiés",
      value: verifiedTalents,
      icon: Award,
      color: "text-green-600",
      bg: "bg-gradient-to-br from-green-500/20 to-green-600/10",
      border: "border-green-500/30",
      iconBg: "bg-gradient-to-br from-green-500 to-green-600",
      percentage: verifiedPercentage,
      description: `${verifiedPercentage}% certifiés`,
    },
    {
      label: "Disponibles",
      value: availableTalents,
      icon: Briefcase,
      color: "text-purple-600",
      bg: "bg-gradient-to-br from-purple-500/20 to-purple-600/10",
      border: "border-purple-500/30",
      iconBg: "bg-gradient-to-br from-purple-500 to-purple-600",
      percentage: availablePercentage,
      description: `${availablePercentage}% disponibles`,
    },
    {
      label: "Projets",
      value: totalProjects,
      icon: Globe,
      color: "text-orange-600",
      bg: "bg-gradient-to-br from-orange-500/20 to-orange-600/10",
      border: "border-orange-500/30",
      iconBg: "bg-gradient-to-br from-orange-500 to-orange-600",
      description: "Total réalisés",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className={`group relative overflow-hidden bg-gray-900 backdrop-blur-sm border ${stat.border} rounded-xl p-5 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Background gradient overlay */}
            <div className={`absolute inset-0 ${stat.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

            {/* Content */}
            <div className="relative space-y-3">
              {/* Icon and trend */}
              <div className="flex items-start justify-between">
                <div className={`${stat.iconBg} p-2.5 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                {stat.trend && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                    <TrendingUp className="h-3 w-3" />
                    {stat.trend}
                  </div>
                )}
                {stat.percentage !== undefined && (
                  <div className="flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    <Sparkles className="h-3 w-3" />
                    {stat.percentage}%
                  </div>
                )}
              </div>

              {/* Value */}
              <div>
                <div className={`text-3xl font-bold ${stat.color} group-hover:scale-105 transition-transform duration-300`}>
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-gray-100 mt-0.5">
                  {stat.label}
                </div>
              </div>

              {/* Description */}
              <div className="text-xs text-muted-foreground border-t border-dashed pt-2">
                {stat.description}
              </div>
            </div>

            {/* Shine effect on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-r from-transparent via-white to-transparent -translate-x-full group-hover:translate-x-full" style={{ transition: "transform 0.8s" }} />
          </div>
        );
      })}
    </div>
  );
}
