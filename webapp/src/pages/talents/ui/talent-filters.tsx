import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle } from "lucide-react";

export type AvailabilityFilter = "all" | "available" | "busy" | "unavailable";
export type VerificationFilter = "all" | "verified" | "unverified";

interface TalentFiltersProps {
  availabilityFilter: AvailabilityFilter;
  verificationFilter: VerificationFilter;
  onAvailabilityChange: (filter: AvailabilityFilter) => void;
  onVerificationChange: (filter: VerificationFilter) => void;
}

export function TalentFilters({
  availabilityFilter,
  verificationFilter,
  onAvailabilityChange,
  onVerificationChange,
}: TalentFiltersProps) {
  const availabilityOptions: {
    value: AvailabilityFilter;
    label: string;
    color: string;
  }[] = [
      { value: "all", label: "Tous", color: "text-muted-foreground" },
      { value: "available", label: "Disponible", color: "text-green-500" },
      { value: "busy", label: "Occupé", color: "text-orange-500" },
      { value: "unavailable", label: "Indisponible", color: "text-red-500" },
    ];

  const verificationOptions: {
    value: VerificationFilter;
    label: string;
  }[] = [
      { value: "all", label: "Tous" },
      { value: "verified", label: "Vérifiés uniquement" },
      { value: "unverified", label: "Non vérifiés" },
    ];

  return (
    <div className="space-y-4">
      {/* Filtre disponibilité */}
      <div>
        <h3 className="text-sm font-medium mb-2">Disponibilité</h3>
        <div className="flex flex-wrap gap-2">
          {availabilityOptions.map((option) => (
            <Badge
              key={option.value}
              variant={
                availabilityFilter === option.value ? "default" : "outline"
              }
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => onAvailabilityChange(option.value)}
            >
              {option.value !== "all" && (
                <Circle className={`h-2 w-2 mr-1 fill-current ${option.color}`} />
              )}
              {option.label}
            </Badge>
          ))}
        </div>
      </div>

      {/* Filtre vérification */}
      <div>
        <h3 className="text-sm font-medium mb-2">Vérification</h3>
        <div className="flex flex-wrap gap-2">
          {verificationOptions.map((option) => (
            <Badge
              key={option.value}
              variant={
                verificationFilter === option.value ? "default" : "outline"
              }
              className="cursor-pointer hover:bg-primary/10 transition-colors"
              onClick={() => onVerificationChange(option.value)}
            >
              {option.value === "verified" && (
                <CheckCircle2 className="h-3 w-3 mr-1" />
              )}
              {option.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
