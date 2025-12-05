import { useTalents } from "./features/use-talents";
import { useTalentSearch } from "./features/use-talent-search";
import { extractAllSkills } from "./features/skills-utils";
import { SearchBar } from "./ui/search-bar";
import { TalentCard } from "./ui/talent-card";
import { SkillCloud } from "./ui/skill-cloud";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";

export function TalentMap() {
  const { data: talents, isLoading, error } = useTalents();
  const { searchQuery, setSearchQuery, filteredTalents } = useTalentSearch(talents);

  const skillsData = talents ? extractAllSkills(talents) : [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-destructive font-semibold">Erreur de chargement</p>
          <p className="text-muted-foreground text-sm mt-2">
            Impossible de charger les talents
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* En-tête */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Carte des Talents
          </h1>
          <p className="text-muted-foreground text-lg">
            Découvrez les compétences et expertises de notre communauté de talents
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="mb-10 flex justify-center">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Rechercher un talent, une compétence, une langue..."
          />
        </div>

        {/* Nuage de compétences */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">
            Compétences
          </h2>
          <div className="bg-muted/30 rounded-lg p-6">
            <SkillCloud skills={skillsData} />
          </div>
        </div>

        <Separator className="my-8" />

        {/* Liste des talents */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              Talents
            </h2>
            <p className="text-sm text-muted-foreground">
              {filteredTalents.length} {filteredTalents.length > 1 ? "profils" : "profil"}
            </p>
          </div>

          {filteredTalents.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Aucun talent trouvé pour cette recherche
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTalents.map((talent) => (
                <TalentCard key={talent.id} talent={talent} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
