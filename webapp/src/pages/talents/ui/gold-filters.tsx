import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { X } from "lucide-react";
import type { GoldTier } from "../features/gold-scoring";
import { getTierEmoji, getTierLabel, GOLD_TIERS } from "../features/gold-scoring";

interface GoldFiltersProps {
  minTier?: GoldTier;
  minScore?: number;
  onMinTierChange: (tier?: GoldTier) => void;
  onMinScoreChange: (score?: number) => void;
  onClear: () => void;
  hasActiveFilters: boolean;
}

export function GoldFilters({
  minTier,
  minScore,
  onMinTierChange,
  onMinScoreChange,
  onClear,
  hasActiveFilters,
}: GoldFiltersProps) {
  const tiers: Array<{ value: GoldTier; label: string }> = [
    { value: "platinum", label: `${getTierEmoji("platinum")} ${getTierLabel("platinum")}` },
    { value: "gold", label: `${getTierEmoji("gold")} ${getTierLabel("gold")}` },
    { value: "silver", label: `${getTierEmoji("silver")} ${getTierLabel("silver")}` },
    { value: "bronze", label: `${getTierEmoji("bronze")} ${getTierLabel("bronze")}` },
    { value: "standard", label: `${getTierEmoji("standard")} ${getTierLabel("standard")}` },
  ];

  return (
    <div className="space-y-4 p-4 bg-white rounded-lg border shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm flex items-center gap-2">
          🏆 Filtres Gold
        </h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="h-7 text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Réinitialiser
          </Button>
        )}
      </div>

      {/* Filtre par Tier */}
      <div className="space-y-2">
        <Label className="text-xs font-medium">Tier minimum</Label>
        <Select
          value={minTier || "none"}
          onValueChange={(value: string) =>
            onMinTierChange(value === "none" ? undefined : (value as GoldTier))
          }
        >
          <SelectTrigger className="h-9 text-xs">
            <SelectValue placeholder="Tous les tiers" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="none" className="text-xs">
              Tous les tiers
            </SelectItem>
            {tiers.map((tier) => (
              <SelectItem key={tier.value} value={tier.value} className="text-xs">
                {tier.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {minTier && (
          <p className="text-xs text-muted-foreground">
            Affiche uniquement les profils {getTierLabel(minTier)} et supérieurs
          </p>
        )}
      </div>

      {/* Filtre par Score */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label className="text-xs font-medium">Score minimum</Label>
          {minScore !== undefined && (
            <span className="text-xs font-semibold text-primary">
              {minScore} pts
            </span>
          )}
        </div>
        <Slider
          value={[minScore || 0]}
          onValueChange={([value]) =>
            onMinScoreChange(value === 0 ? undefined : value)
          }
          min={0}
          max={600}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0</span>
          <span>300</span>
          <span>600+</span>
        </div>
        {minScore !== undefined && minScore > 0 && (
          <div className="text-xs text-muted-foreground">
            {minScore >= GOLD_TIERS.PLATINUM && (
              <span className="text-purple-600 font-medium">
                💎 Niveau Platinum
              </span>
            )}
            {minScore >= GOLD_TIERS.GOLD && minScore < GOLD_TIERS.PLATINUM && (
              <span className="text-yellow-600 font-medium">
                🏆 Niveau Gold
              </span>
            )}
            {minScore >= GOLD_TIERS.SILVER && minScore < GOLD_TIERS.GOLD && (
              <span className="text-gray-600 font-medium">
                🥈 Niveau Silver
              </span>
            )}
            {minScore >= GOLD_TIERS.BRONZE && minScore < GOLD_TIERS.SILVER && (
              <span className="text-orange-600 font-medium">
                🥉 Niveau Bronze
              </span>
            )}
            {minScore < GOLD_TIERS.BRONZE && (
              <span className="text-gray-500 font-medium">
                ⭐ Niveau Standard
              </span>
            )}
          </div>
        )}
      </div>

      {/* Légende des tiers */}
      <div className="pt-3 border-t space-y-1.5">
        <Label className="text-xs font-medium text-muted-foreground">
          Seuils des tiers
        </Label>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-1.5">
            <span>💎</span>
            <span className="text-muted-foreground">
              {GOLD_TIERS.PLATINUM}+ pts
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🏆</span>
            <span className="text-muted-foreground">
              {GOLD_TIERS.GOLD}+ pts
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🥈</span>
            <span className="text-muted-foreground">
              {GOLD_TIERS.SILVER}+ pts
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>🥉</span>
            <span className="text-muted-foreground">
              {GOLD_TIERS.BRONZE}+ pts
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
