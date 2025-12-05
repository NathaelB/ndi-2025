/**
 * Utilitaire pour normaliser les noms de skills en keys
 */

/**
 * Normalise un nom de skill en key (lowercase, underscore, sans accents)
 */
export function normalizeSkillToKey(skillName: string): string {
  return skillName
    .toLowerCase()
    .trim()
    // Remplacer les accents
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    // Remplacer les espaces et caractères spéciaux par des underscores
    .replace(/[^a-z0-9]+/g, "_")
    // Supprimer les underscores au début et à la fin
    .replace(/^_+|_+$/g, "");
}

/**
 * Convertit un tableau de strings en tableau de Skill objects
 */
export function stringsToSkills(skillNames: string[]): Array<{ name: string; key: string }> {
  return skillNames.map((name) => ({
    name: name.trim(),
    key: normalizeSkillToKey(name),
  }));
}

/**
 * Convertit un tableau de Skill objects en tableau de strings (pour compatibilité)
 */
export function skillsToStrings(skills: Array<{ name: string; key: string }>): string[] {
  return skills.map((skill) => skill.name);
}
