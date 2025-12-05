import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SkillTagProps {
  skill: string;
  size?: "small" | "medium" | "large";
  variant?: "default" | "secondary" | "outline";
}

export function SkillTag({ skill, size = "medium", variant = "secondary" }: SkillTagProps) {
  const sizeClasses = {
    small: "text-xs px-2 py-1",
    medium: "text-sm px-3 py-1.5",
    large: "text-base px-4 py-2 font-semibold",
  };

  return (
    <Badge
      variant={variant}
      className={cn(
        "transition-all hover:scale-105",
        sizeClasses[size]
      )}
    >
      {skill}
    </Badge>
  );
}
