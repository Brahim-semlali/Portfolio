const STORAGE_KEY = "brahim-portfolio-content";

export const defaultPortfolioData = {
  profile: {
    name: "Brahim Semlali",
    role: "Développeur Full Stack & étudiant M2",
    email: "semlalibrahim34@gmail.com",
    github: "https://github.com/Brahim-semlali",
    linkedin: "https://www.linkedin.com/in/brahim-semlali/",
    heroDescription: "Je conçois des applications web fiables, de l'interface jusqu'à l'API. Passionné par le développement, les bases de données, l'IA et les nouvelles technologies.",
    aboutFr: "Bonjour ! Je suis Brahim Semlali, basé à Marrakech, Maroc. Je suis développeur Full Stack et étudiant en M2 Ingénierie des Systèmes d'Information.",
    aboutEn: "Hello! I am Brahim Semlali, based in Marrakech, Morocco. I am a Full Stack developer and an Information Systems Engineering student.",
  },
  skills: {
    groups: {
      Languages: ["Java", "JavaScript", "Python", "C / C++", "TypeScript", "SQL"],
      Frameworks: ["React.js", "Django REST", "Spring Boot", "FastAPI", "Bootstrap"],
      Databases: ["PostgreSQL", "MySQL", "MongoDB", "PostGIS"],
      "Data & AI": ["Machine Learning", "LangChain", "RAG", "Pandas", "Data Analysis"],
      DevOps: ["Docker", "Git / GitHub", "CI/CD", "Postman", "REST API"],
      "Tech & Other": ["VS Code", "IntelliJ IDEA", "Google Chrome", "JWT", "OAuth", "Spring Security", "Jira", "POO", "Conception"],
    },
    logos: {},
  },
  projects: {
    githubUser: "Brahim-semlali",
    featuredRepositories: ["life-cycle-token", "Calorie_Mate_App_FrontEnd", "Vactis-Backend", "Gestion_stage_pfe_BackEnd", "Learn_Strategies", "Gestion_stage_pfe_FontEnd"],
    overrides: {},
    custom: [],
  },
};

function mergeData(saved) {
  return {
    ...defaultPortfolioData,
    ...saved,
    profile: { ...defaultPortfolioData.profile, ...(saved?.profile || {}) },
    skills: { ...defaultPortfolioData.skills, ...(saved?.skills || {}), groups: { ...defaultPortfolioData.skills.groups, ...(saved?.skills?.groups || {}) } },
    projects: { ...defaultPortfolioData.projects, ...(saved?.projects || {}) },
  };
}

export function getPortfolioData() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return saved ? mergeData(JSON.parse(saved)) : defaultPortfolioData;
  } catch (error) {
    return defaultPortfolioData;
  }
}

export function savePortfolioData(data) {
  const nextData = mergeData(data);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData));
  window.dispatchEvent(new CustomEvent("portfolio-content-updated"));
  return nextData;
}

export function subscribeToPortfolioData(callback) {
  const handleUpdate = () => callback(getPortfolioData());
  window.addEventListener("portfolio-content-updated", handleUpdate);
  window.addEventListener("storage", handleUpdate);
  return () => {
    window.removeEventListener("portfolio-content-updated", handleUpdate);
    window.removeEventListener("storage", handleUpdate);
  };
}
