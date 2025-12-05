import { Badge } from "@/components/ui/badge";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

export type SortField = "name" | "experience" | "projects" | "availability";
export type SortDirection = "asc" | "desc";

interface TalentSortProps {
  sortField: SortField;
  sortDirection: SortDirection;
  onSortChange: (field: SortField, direction: SortDirection) => void;
}

export function TalentSort({
  sortField,
  sortDirection,
  onSortChange,
}: TalentSortProps) {
  const sortOptions: { value: SortField; label: string }[] = [
    { value: "name", label: "Nom" },
    { value: "experience", label: "Expérience" },
    { value: "projects", label: "Projets" },
    { value: "availability", label: "Disponibilité" },
  ];

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field
      onSortChange(field, sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Default to ascending for new field
      onSortChange(field, "asc");
    }
  };

  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Trier par</h3>
      <div className="flex flex-wrap gap-2">
        {sortOptions.map((option) => {
          const isActive = sortField === option.value;
          return (
            <Badge
              key={option.value}
              variant={isActive ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 transition-colors gap-1"
              onClick={() => handleSort(option.value)}
            >
              {option.label}
              {isActive ? (
                sortDirection === "asc" ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )
              ) : (
                <ArrowUpDown className="h-3 w-3 opacity-50" />
              )}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}
