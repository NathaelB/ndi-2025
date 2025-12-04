import {
  type DiagnosticAnswers,
  type DiagnosticResult,
  DIAGNOSTIC_QUESTIONS,
} from "./types";

/**
 * Calcule le score du diagnostic basé sur les réponses
 */
export function computeDiagnosticScore(
  answers: DiagnosticAnswers,
): DiagnosticResult {
  let totalScore = 0;
  let maxScore = 0;

  const categoryScores = {
    souverainete: 0,
    durabilite: 0,
    inclusion: 0,
  };

  const categoryMaxScores = {
    souverainete: 0,
    durabilite: 0,
    inclusion: 0,
  };

  // Calculer les scores par catégorie
  DIAGNOSTIC_QUESTIONS.forEach((question) => {
    const answer = answers[question.id];
    if (!answer) return;

    const selectedOption = question.options.find((opt) => opt.value === answer);
    if (!selectedOption) return;

    const score = selectedOption.score;
    totalScore += score;
    categoryScores[question.category] += score;

    // Calculer le score maximum possible
    const maxOptionScore = Math.max(
      ...question.options.map((opt) => opt.score),
    );
    maxScore += maxOptionScore;
    categoryMaxScores[question.category] += maxOptionScore;
  });

  // Normaliser les scores sur 100
  const normalizedScore =
    maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  const normalizedCategoryScores = {
    souverainete:
      categoryMaxScores.souverainete > 0
        ? Math.round(
            (categoryScores.souverainete / categoryMaxScores.souverainete) *
              100,
          )
        : 0,
    durabilite:
      categoryMaxScores.durabilite > 0
        ? Math.round(
            (categoryScores.durabilite / categoryMaxScores.durabilite) * 100,
          )
        : 0,
    inclusion:
      categoryMaxScores.inclusion > 0
        ? Math.round(
            (categoryScores.inclusion / categoryMaxScores.inclusion) * 100,
          )
        : 0,
  };

  // Déterminer le niveau
  const level = getLevel(normalizedScore);

  // Déterminer le nombre de huttes allumées (0-5)
  const villageLevel = Math.min(5, Math.floor((normalizedScore / 100) * 6));

  // Générer les recommandations
  const recommendations = generateRecommendations(
    normalizedScore,
    normalizedCategoryScores,
    answers,
  );

  return {
    totalScore: normalizedScore,
    categoryScores: normalizedCategoryScores,
    level,
    villageLevel,
    recommendations,
  };
}

/**
 * Détermine le niveau en fonction du score
 */
function getLevel(
  score: number,
): "débutant" | "intermédiaire" | "avancé" | "expert" {
  if (score < 25) return "débutant";
  if (score < 50) return "intermédiaire";
  if (score < 75) return "avancé";
  return "expert";
}

/**
 * Génère des recommandations personnalisées
 */
function generateRecommendations(
  totalScore: number,
  categoryScores: {
    souverainete: number;
    durabilite: number;
    inclusion: number;
  },
  answers: DiagnosticAnswers,
): string[] {
  const recommendations: string[] = [];

  // Recommandations générales selon le score total
  if (totalScore < 25) {
    recommendations.push(
      "🚀 Vous débutez votre transition numérique souveraine. C'est le moment idéal pour établir une stratégie !",
      "📚 Commencez par vous former aux enjeux de la souveraineté numérique et du RGPD.",
    );
  } else if (totalScore < 50) {
    recommendations.push(
      "👏 Vous avez déjà initié votre transition, continuez sur cette voie !",
      "🎯 Identifiez les services les plus critiques à migrer vers des solutions souveraines.",
    );
  } else if (totalScore < 75) {
    recommendations.push(
      "🌟 Excellent travail ! Votre établissement est bien engagé dans la souveraineté numérique.",
      "💪 Partagez vos bonnes pratiques avec d'autres établissements pour créer un écosystème.",
    );
  } else {
    recommendations.push(
      "🏆 Félicitations ! Vous êtes un modèle de souveraineté numérique !",
      "🤝 Devenez ambassadeur et aidez d'autres établissements dans leur transition.",
    );
  }

  // Recommandations par catégorie
  if (categoryScores.souverainete < 50) {
    recommendations.push(
      "🔐 Souveraineté : Migrez vers des solutions open-source (Linux, Keycloak, Nextcloud).",
      "🇪🇺 Privilégiez l'hébergement de vos données en Europe ou sur vos propres serveurs.",
    );

    if (answers.os !== "linux") {
      recommendations.push(
        "💻 Envisagez une migration progressive vers Linux (Ubuntu, Debian...).",
      );
    }

    if (answers["data-location"] === "gafam") {
      recommendations.push(
        "☁️ Remplacez les services GAFAM par des alternatives européennes (OVH, Scaleway, Infomaniak).",
      );
    }
  }

  if (categoryScores.durabilite < 50) {
    recommendations.push(
      "♻️ Durabilité : Mettez en place une politique de réemploi et d'achat de matériel reconditionné.",
      "🌱 Formalisez une charte numérique responsable pour votre établissement.",
    );

    if (answers["hardware-reuse"] === "none") {
      recommendations.push(
        "🔄 Installez Linux sur les anciens ordinateurs pour prolonger leur durée de vie.",
      );
    }
  }

  if (categoryScores.inclusion < 50) {
    recommendations.push(
      "🤝 Inclusion : Développez des partenariats avec d'autres établissements.",
      "📖 Contribuez à la documentation de logiciels libres utilisés en éducation.",
    );

    if (answers.training === "none") {
      recommendations.push(
        "👩‍🏫 Organisez des formations internes sur le numérique responsable.",
      );
    }

    if (
      answers.accessibility !== "certified" &&
      answers.accessibility !== "advanced"
    ) {
      recommendations.push(
        "♿ Améliorez l'accessibilité de vos outils numériques (norme RGAA).",
      );
    }
  }

  // Recommandations spécifiques selon les réponses
  if (
    answers.software === "office365" ||
    answers.software === "google-workspace"
  ) {
    recommendations.push(
      "📝 Testez LibreOffice ou OnlyOffice comme alternative à Microsoft 365 / Google Workspace.",
    );
  }

  if (answers["resource-sharing"] === "no") {
    recommendations.push(
      "🌐 Rejoignez des réseaux d'établissements partageant des ressources libres (Apps.education.fr, Framasoft...).",
    );
  }

  if (answers.authentication === "google-sso") {
    recommendations.push(
      "🔑 Déployez Keycloak pour reprendre le contrôle de l'authentification de vos utilisateurs.",
    );
  }

  // Limiter à 8 recommandations max
  return recommendations.slice(0, 8);
}

/**
 * Valide que toutes les questions ont une réponse
 */
export function validateAnswers(answers: DiagnosticAnswers): boolean {
  return DIAGNOSTIC_QUESTIONS.every((question) => {
    const answer = answers[question.id];
    return answer !== undefined && answer !== null && answer !== "";
  });
}

/**
 * Compte le nombre de questions répondues
 */
export function countAnsweredQuestions(answers: DiagnosticAnswers): number {
  return Object.keys(answers).filter((key) => {
    const value = answers[key];
    return value !== undefined && value !== null && value !== "";
  }).length;
}
