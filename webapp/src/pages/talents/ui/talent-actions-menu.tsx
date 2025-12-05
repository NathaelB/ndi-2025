import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Upload,
  RotateCcw,
  Settings,
  X,
  AlertTriangle,
} from "lucide-react";
import {
  exportTalents,
  importTalents,
  resetToDefaultTalents,
  loadTalentsFromStorage,
} from "../features/talent-storage";

interface TalentActionsMenuProps {
  onUpdate: () => void;
}

export function TalentActionsMenu({ onUpdate }: TalentActionsMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleExport = () => {
    const jsonData = exportTalents();
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `talents-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const jsonData = event.target?.result as string;
            importTalents(jsonData);
            onUpdate();
            alert("Talents importés avec succès !");
          } catch {
            alert("Erreur lors de l'importation. Vérifiez le format du fichier.");
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  const handleReset = () => {
    resetToDefaultTalents();
    onUpdate();
    setShowResetConfirm(false);
    alert("Les talents ont été réinitialisés aux valeurs par défaut.");
  };

  const localTalentsCount = loadTalentsFromStorage().filter(
    (t) => t.id >= 9000
  ).length;

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="gap-2"
      >
        <Settings className="h-4 w-4" />
        Gestion
        {localTalentsCount > 0 && (
          <Badge variant="secondary" className="ml-1">
            {localTalentsCount}
          </Badge>
        )}
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 bg-background border rounded-lg shadow-lg p-4 space-y-3 w-80 animate-in slide-in-from-bottom-2 fade-in duration-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold">Gestion des talents</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => {
            setIsOpen(false);
            setShowResetConfirm(false);
          }}
          className="h-7 w-7"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">
          Talents locaux:{" "}
          <span className="font-medium text-foreground">{localTalentsCount}</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="w-full justify-start gap-2"
        >
          <Download className="h-4 w-4" />
          Exporter tous les talents
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleImport}
          className="w-full justify-start gap-2"
        >
          <Upload className="h-4 w-4" />
          Importer des talents
        </Button>

        {!showResetConfirm ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowResetConfirm(true)}
            className="w-full justify-start gap-2 text-destructive hover:text-destructive"
          >
            <RotateCcw className="h-4 w-4" />
            Réinitialiser
          </Button>
        ) : (
          <div className="border border-destructive rounded-md p-3 space-y-2 bg-destructive/5">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
              <p className="text-xs text-destructive">
                Êtes-vous sûr ? Cette action supprimera tous vos talents
                personnalisés et restaurera les profils par défaut.
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleReset}
                className="flex-1"
              >
                Confirmer
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1"
              >
                Annuler
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="pt-2 border-t text-xs text-muted-foreground">
        Les données sont stockées localement dans votre navigateur.
      </div>
    </div>
  );
}
