import type { Talent, Skill } from "./mock-talents";
import { normalizeSkillToKey } from "./skill-normalizer";

/**
 * Script de migration pour convertir les anciennes données de talents
 * où skills était string[] vers le nouveau format Skill[]
 */

interface LegacyTalent extends Omit<Talent, "skills"> {
  skills: string[] | Skill[];
}

/**
 * Vérifie si un skill est au nouveau format (objet) ou ancien format (string)
 */
function isSkillObject(skill: string | Skill): skill is Skill {
  return (
    typeof skill === "object" &&
    skill !== null &&
    "name" in skill &&
    "key" in skill
  );
}

/**
 * Vérifie si un tableau de skills contient des strings (ancien format)
 */
function hasLegacySkills(skills: string[] | Skill[]): skills is string[] {
  if (skills.length === 0) return false;
  return typeof skills[0] === "string";
}

/**
 * Convertit un skill string en objet Skill
 */
function stringToSkill(skillName: string): Skill {
  return {
    name: skillName.trim(),
    key: normalizeSkillToKey(skillName),
  };
}

/**
 * Migre un talent du format legacy vers le nouveau format
 */
export function migrateTalent(talent: LegacyTalent): Talent {
  // Si les skills sont déjà au bon format, retourner tel quel
  if (talent.skills.length > 0 && isSkillObject(talent.skills[0])) {
    return talent as Talent;
  }

  // Sinon, convertir les skills strings en objets
  if (hasLegacySkills(talent.skills)) {
    return {
      ...talent,
      skills: talent.skills.map(stringToSkill),
    };
  }

  return talent as Talent;
}

/**
 * Migre un tableau de talents
 */
export function migrateTalents(talents: LegacyTalent[]): Talent[] {
  return talents.map(migrateTalent);
}

/**
 * Migre les données du localStorage si nécessaire
 */
export function migrateLocalStorageData(storageKey: string = "talents_local_storage"): void {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
      console.log("Aucune donnée à migrer dans localStorage");
      return;
    }

    const data = JSON.parse(stored);
    if (!data.talents || !Array.isArray(data.talents)) {
      console.warn("Format de données invalide dans localStorage");
      return;
    }

    // Vérifier si migration nécessaire
    const needsMigration = data.talents.some((talent: LegacyTalent) => {
      return talent.skills && talent.skills.length > 0 && typeof talent.skills[0] === "string";
    });

    if (!needsMigration) {
      console.log("Données déjà au bon format, aucune migration nécessaire");
      return;
    }

    // Effectuer la migration
    console.log("Migration des données en cours...");
    const migratedTalents = migrateTalents(data.talents);

    // Sauvegarder les données migrées
    const migratedData = {
      talents: migratedTalents,
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(storageKey, JSON.stringify(migratedData));
    console.log(`✓ Migration réussie : ${migratedTalents.length} talents migrés`);
  } catch (error) {
    console.error("Erreur lors de la migration des données:", error);
    throw error;
  }
}

/**
 * Exporte des talents au format JSON (pour backup avant migration)
 */
export function backupTalentsToJSON(storageKey: string = "talents_local_storage"): string | null {
  try {
    const stored = localStorage.getItem(storageKey);
    if (!stored) return null;

    const data = JSON.parse(stored);
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backup = {
      backupDate: timestamp,
      originalData: data,
    };

    return JSON.stringify(backup, null, 2);
  } catch (error) {
    console.error("Erreur lors du backup:", error);
    return null;
  }
}

/**
 * Fonction utilitaire pour afficher un rapport de migration
 */
export function getMigrationReport(talents: LegacyTalent[]): {
  total: number;
  needsMigration: number;
  alreadyMigrated: number;
  details: Array<{
    id: number;
    name: string;
    skillsCount: number;
    needsMigration: boolean;
  }>;
} {
  const report = {
    total: talents.length,
    needsMigration: 0,
    alreadyMigrated: 0,
    details: [] as Array<{
      id: number;
      name: string;
      skillsCount: number;
      needsMigration: boolean;
    }>,
  };

  talents.forEach((talent) => {
    const needsMigration = hasLegacySkills(talent.skills);
    if (needsMigration) {
      report.needsMigration++;
    } else {
      report.alreadyMigrated++;
    }

    report.details.push({
      id: talent.id,
      name: talent.name,
      skillsCount: talent.skills.length,
      needsMigration,
    });
  });

  return report;
}
