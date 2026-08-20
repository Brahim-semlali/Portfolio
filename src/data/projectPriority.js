/** Ordre de priorité d'affichage (du plus important au moins important) */
export const PROJECT_PRIORITY = [
  "Calorie_Mate_App_FrontEnd",
  "life-cycle-token",
  "Learn_Strategies",
  "Vactis-Backend",
  "Vactis-Frontend",
  "Gestion_stage_pfe_FontEnd",
  "Gestion_stage_pfe_BackEnd",
  "StoreSemlali",
  "Calorie_Mate_App_Backend",
  "ML-project",
  "orchid-island",
  "fdarnaCuisine",
  "puzzle-duo-backend",
  "website-",
];

/** Dépôts exclus (README profil, portfolio, forks, etc.) */
export const EXCLUDED_REPOS = ["Brahim-Semlali", "Portfolio"];

/** Titres, descriptions et liens demo personnalisés */
export const PROJECT_OVERRIDES = {
  Calorie_Mate_App_FrontEnd: {
    title: { fr: "S7aFit", en: "S7aFit" },
    description: {
      fr: "Plateforme SaaS HealthTech : coach IA 24h/24, reconnaissance de repas par photo (ML), plans nutrition et entraînement personnalisés, prédictions d'évolution du poids et dashboard analytique.",
      en: "HealthTech SaaS platform: 24/7 AI coach, photo-based meal recognition (ML), personalized nutrition and training plans, weight predictions and analytics dashboard.",
    },
    demoLink: "https://s7afit-web.fly.dev",
    stack: ["React", "TypeScript", "JavaScript"],
  },
  "life-cycle-token": {
    title: { fr: "Life Cycle Token", en: "Life Cycle Token" },
    description: {
      fr: "Portail web de gestion du cycle de vie des tokens de paiement bancaire (Stage PFE — Titrit Technologies). React.js, Django REST, PostgreSQL, JWT et API REST sécurisée.",
      en: "Web portal for bank payment token lifecycle management (graduation internship — Titrit Technologies). React.js, Django REST, PostgreSQL, JWT and a secured REST API.",
    },
    stack: ["React", "JavaScript", "Django", "PostgreSQL", "JWT"],
  },
  Learn_Strategies: {
    title: { fr: "StratQuest", en: "StratQuest" },
    description: {
      fr: "Application web gamifiée pour l'apprentissage des stratégies d'entreprise (VRIO, SWOT) avec points, badges, quiz interactifs et authentification JWT.",
      en: "Gamified web app to learn business strategy (VRIO, SWOT) with points, badges, interactive quizzes and JWT authentication.",
    },
    demoLink: "https://learn-strategies.vercel.app",
    stack: ["React", "Next.js", "TypeScript", "MongoDB"],
  },
  "Vactis-Backend": {
    title: { fr: "Vactis — Backend", en: "Vactis — Backend" },
    description: {
      fr: "API REST Spring Boot pour le suivi de la relation médecins-laboratoire : portefeuille de prescripteurs, indicateurs d'activité et détection d'inactivité.",
      en: "Spring Boot REST API for physician–lab relationship tracking: prescriber portfolio, activity metrics and inactivity detection.",
    },
    stack: ["Java", "Spring Boot", "PostgreSQL", "JWT"],
  },
  "Vactis-Frontend": {
    title: { fr: "Vactis — Frontend", en: "Vactis — Frontend" },
    description: {
      fr: "Interface React pour la gestion du portefeuille de médecins prescripteurs et le suivi des envois de patients.",
      en: "React interface to manage the portfolio of prescribing physicians and track patient referrals.",
    },
    stack: ["React", "JavaScript"],
  },
  Gestion_stage_pfe_FontEnd: {
    title: {
      fr: "Gestion Stages PFE — Frontend",
      en: "Internship Management — Frontend",
    },
    description: {
      fr: "Application React.js pour gérer le cycle de vie des stages PFE : étudiants, filières, entreprises, encadrants et validation des stages.",
      en: "React.js app to manage the full internship lifecycle: students, programs, companies, supervisors and validation.",
    },
    stack: ["React", "TypeScript"],
  },
  Gestion_stage_pfe_BackEnd: {
    title: {
      fr: "Gestion Stages PFE — Backend",
      en: "Internship Management — Backend",
    },
    description: {
      fr: "Backend Spring Boot pour la gestion complète des stages PFE : étudiants, entreprises, encadrants académiques et suivi des validations.",
      en: "Spring Boot backend for internship management: students, companies, academic supervisors and validation tracking.",
    },
    stack: ["Java", "Spring Boot"],
  },
  StoreSemlali: {
    title: { fr: "Store Semlali", en: "Store Semlali" },
    description: {
      fr: "Application e-commerce de gestion de boutique développée en Java.",
      en: "Java e-commerce application for store management.",
    },
    stack: ["Java"],
  },
  Calorie_Mate_App_Backend: {
    title: { fr: "S7aFit — Backend", en: "S7aFit — Backend" },
    description: {
      fr: "Backend FastAPI du projet S7aFit : microservices, PostgreSQL, JWT, OAuth 2.0 et intégration IA/ML.",
      en: "FastAPI backend for S7aFit: microservices, PostgreSQL, JWT, OAuth 2.0 and AI/ML integration.",
    },
    stack: ["Python", "FastAPI", "PostgreSQL", "JWT"],
  },
  "ML-project": {
    title: { fr: "ML — Wine Quality", en: "ML — Wine Quality" },
    description: {
      fr: "Projet de machine learning pour prédire la qualité du vin à partir de données analytiques.",
      en: "Machine learning project to predict wine quality from analytical data.",
    },
    stack: ["Python", "Jupyter Notebook"],
  },
  "orchid-island": {
    title: { fr: "Orchid Island", en: "Orchid Island" },
    description: {
      fr: "Projet Java — application de gestion.",
      en: "Java project — management application.",
    },
    stack: ["Java"],
  },
  fdarnaCuisine: {
    title: { fr: "Fdarna Cuisine", en: "Fdarna Cuisine" },
    description: {
      fr: "Application Java de gestion pour une cuisine / restauration.",
      en: "Java management app for a kitchen / restaurant.",
    },
    stack: ["Java"],
  },
  "puzzle-duo-backend": {
    title: { fr: "Puzzle Duo — Backend", en: "Puzzle Duo — Backend" },
    description: {
      fr: "Backend Java pour une application de puzzle en duo.",
      en: "Java backend for a duo puzzle application.",
    },
    stack: ["Java"],
  },
  "website-": {
    title: { fr: "Site Web Personnel", en: "Personal Website" },
    description: {
      fr: "Site web développé avec JavaScript.",
      en: "Website built with JavaScript.",
    },
    stack: ["JavaScript", "HTML", "CSS"],
  },
};

export function sortReposByPriority(repos) {
  return [...repos].sort((a, b) => {
    const indexA = PROJECT_PRIORITY.indexOf(a.name);
    const indexB = PROJECT_PRIORITY.indexOf(b.name);
    const rankA = indexA === -1 ? PROJECT_PRIORITY.length + 1 : indexA;
    const rankB = indexB === -1 ? PROJECT_PRIORITY.length + 1 : indexB;

    if (rankA !== rankB) return rankA - rankB;
    return (b.stargazers_count || 0) - (a.stargazers_count || 0);
  });
}

export function localizedText(value, lang, fallback) {
  if (!value) return fallback;
  if (typeof value === "string") return value;
  return value[lang] || value.fr || value.en || fallback;
}

export function enrichRepo(repo) {
  const override = PROJECT_OVERRIDES[repo.name] || {};
  const fallbackName = formatRepoName(repo.name);
  return {
    name: repo.name,
    title: override.title || fallbackName,
    description: override.description || repo.description || {
      fr: "Projet disponible sur mon profil GitHub.",
      en: "Project available on my GitHub profile.",
    },
    ghLink: repo.html_url,
    demoLink: override.demoLink || repo.homepage || null,
    language: repo.language,
    stack: override.stack || null,
    stars: repo.stargazers_count,
    updatedAt: repo.updated_at,
  };
}

function formatRepoName(name) {
  return name.replace(/_/g, " ").replace(/-/g, " ");
}
