import { useState } from "react";
import { useTalents, useAddTalent, useUpdateTalent, useDeleteTalent } from "./features/use-talents";
import { useTalentSearch } from "./features/use-talent-search";
import { useTalentFilters } from "./features/use-talent-filters";
import { useTalentSort } from "./features/use-talent-sort";
import type {
  AvailabilityFilter,
  VerificationFilter,
} from "./features/use-talent-filters";
import type { SortField, SortDirection } from "./features/use-talent-sort";
import type { Talent } from "./features/mock-talents";
import { extractAllSkills } from "./features/skills-utils";
import { SearchBar } from "./ui/search-bar";
import { TalentCard } from "./ui/talent-card";
import { SkillVisualization } from "./ui/skill-visualization";
import { TalentFilters } from "./ui/talent-filters";
import { TalentSort } from "./ui/talent-sort";
import { StatsOverview } from "./ui/stats-overview";
import { TalentModal } from "./ui/talent-modal";
import { TalentForm } from "./ui/talent-form";
import { TalentActionsMenu } from "./ui/talent-actions-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Loader2, SlidersHorizontal, X, Plus, UserPlus } from "lucide-react";

export function TalentMap() {
  const { data: talents, isLoading, error, refetch } = useTalents();
  const addTalentMutation = useAddTalent();
  const updateTalentMutation = useUpdateTalent();
  const deleteTalentMutation = useDeleteTalent();

  const [showFilters, setShowFilters] = useState(false);
  const [availabilityFilter, setAvailabilityFilter] =
    useState<AvailabilityFilter>("all");
  const [verificationFilter, setVerificationFilter] =
    useState<VerificationFilter>("all");
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTalent, setEditingTalent] = useState<Talent | undefined>(undefined);

  // Appliquer d'abord les filtres
  const filteredByFilters = useTalentFilters({
    talents: talents || [],
    availabilityFilter,
    verificationFilter,
  });

  // Puis appliquer la recherche sur les résultats filtrés
  const { searchQuery, setSearchQuery, filteredTalents } =
    useTalentSearch(filteredByFilters);

  // Enfin, trier les résultats
  const sortedTalents = useTalentSort({
    talents: filteredTalents,
    sortField,
    sortDirection,
  });

  const skillsData = talents ? extractAllSkills(talents) : [];

  const handleSortChange = (field: SortField, direction: SortDirection) => {
    setSortField(field);
    setSortDirection(direction);
  };

  const hasActiveFilters =
    availabilityFilter !== "all" || verificationFilter !== "all";

  const clearFilters = () => {
    setAvailabilityFilter("all");
    setVerificationFilter("all");
  };

  const handleAddTalent = () => {
    setEditingTalent(undefined);
    setIsModalOpen(true);
  };

  const handleEditTalent = (talent: Talent) => {
    setEditingTalent(talent);
    setIsModalOpen(true);
  };

  const handleDeleteTalent = (id: number) => {
    deleteTalentMutation.mutate(id);
  };

  const handleSubmitTalent = (talentData: Omit<Talent, "id">) => {
    if (editingTalent) {
      updateTalentMutation.mutate(
        { id: editingTalent.id, updates: talentData },
        {
          onSuccess: () => {
            setIsModalOpen(false);
            setEditingTalent(undefined);
          },
        }
      );
    } else {
      addTalentMutation.mutate(talentData, {
        onSuccess: () => {
          setIsModalOpen(false);
        },
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTalent(undefined);
  };

  const handleDataUpdate = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-3">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="text-sm text-muted-foreground">
            Chargement des talents...
          </p>
        </div>
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
          <div className="flex items-center justify-center gap-4 mb-3">
            <h1 className="text-4xl font-bold tracking-tight">
              Carte des Talents
            </h1>
            <Button
              onClick={handleAddTalent}
              size="lg"
              className="gap-2"
            >
              <Plus className="h-5 w-5" />
              Créer un talent
            </Button>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Découvrez les compétences et expertises de notre communauté de
            talents. Explorez leurs projets, leurs talents uniques et connectez
            avec eux.
          </p>
        </div>

        {/* Stats Overview */}
        {talents && talents.length > 0 && (
          <div className="mb-10">
            <StatsOverview talents={talents} />
          </div>
        )}

        {/* Barre de recherche et filtres */}
        <div className="mb-10 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Rechercher par nom, compétence, projet, localisation..."
            />
            <div className="flex gap-2 shrink-0">
              <Button
                variant={showFilters || hasActiveFilters ? "default" : "outline"}
                size="default"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filtres
                {hasActiveFilters && (
                  <span className="ml-1 bg-primary-foreground text-primary rounded-full px-1.5 py-0.5 text-xs font-bold">
                    !
                  </span>
                )}
              </Button>
              <Button
                onClick={handleAddTalent}
                size="default"
                className="gap-2"
              >
                <UserPlus className="h-4 w-4" />
                Nouveau
              </Button>
            </div>
          </div>

          {/* Panel de filtres */}
          {showFilters && (
            <div className="bg-muted/30 rounded-lg p-4 border animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold">Filtres avancés</h3>
                <div className="flex gap-2">
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="h-8 text-xs"
                    >
                      <X className="h-3 w-3 mr-1" />
                      Réinitialiser
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(false)}
                    className="h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <TalentFilters
                availabilityFilter={availabilityFilter}
                verificationFilter={verificationFilter}
                onAvailabilityChange={setAvailabilityFilter}
                onVerificationChange={setVerificationFilter}
              />
              <Separator className="my-4" />
              <TalentSort
                sortField={sortField}
                sortDirection={sortDirection}
                onSortChange={handleSortChange}
              />
            </div>
          )}
        </div>

        {/* Visualisation des compétences */}
        <div className="mb-12">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-semibold mb-2">Compétences</h2>
            <p className="text-sm text-muted-foreground">
              Les technologies et outils maîtrisés par notre communauté
            </p>
          </div>
          <div className="bg-linear-to-br from-muted/30 to-muted/10 rounded-lg p-6 border">
            <SkillVisualization skills={skillsData} />
          </div>
        </div>

        <Separator className="my-8" />

        {/* Liste des talents */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Talents</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {sortedTalents.length}{" "}
                {sortedTalents.length > 1 ? "profils trouvés" : "profil trouvé"}
                {searchQuery && (
                  <span>
                    {" "}
                    pour "<span className="font-medium">{searchQuery}</span>"
                  </span>
                )}
              </p>
            </div>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="shrink-0"
              >
                <X className="h-3 w-3 mr-1" />
                Effacer les filtres
              </Button>
            )}
          </div>

          {sortedTalents.length === 0 ? (
            <div className="text-center py-16 bg-muted/20 rounded-lg border border-dashed">
              <p className="text-muted-foreground mb-2">
                Aucun talent trouvé pour cette recherche
              </p>
              {(searchQuery || hasActiveFilters) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSearchQuery("");
                    clearFilters();
                  }}
                  className="mt-2"
                >
                  Réinitialiser la recherche
                </Button>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedTalents.map((talent) => (
                <TalentCard
                  key={talent.id}
                  talent={talent}
                  onEdit={handleEditTalent}
                  onDelete={handleDeleteTalent}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal pour créer/éditer un talent */}
      <TalentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingTalent ? "Modifier le talent" : "Créer un nouveau talent"}
      >
        <TalentForm
          talent={editingTalent}
          onSubmit={handleSubmitTalent}
          onCancel={handleCloseModal}
        />
      </TalentModal>

      {/* Menu d'actions pour gérer les talents */}
      <TalentActionsMenu onUpdate={handleDataUpdate} />
    </div>
  );
}
