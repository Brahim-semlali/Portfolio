// src/data/experienceData.js
// Données des expériences professionnelles — à personnaliser (images, dates si besoin)

const experienceData = [
    {
        id: "titrit",
        company: "Titrit Technologies",
        role: "Développeur Full Stack (Stage PFE)",
        period: "04/2025 – 06/2025",
        location: "Casablanca, Maroc",
        logo: "/Images/experience/titrit-logo.png",
        shortDescription:
            "Portail web de gestion du cycle de vie des tokens de paiement bancaire.",
        fullDescription:
            "Développement d'un portail permettant de gérer l'intégralité du cycle de vie des tokens de paiement bancaire, de leur création à leur révocation, en lien avec un fournisseur TSP (Token Service Provider). Le projet couvrait l'authentification sécurisée, la gestion fine des rôles et un système complet de traçabilité des actions.",
        tasks: [
            "Développement de l'interface React.js responsive avec authentification JWT",
            "Mise en place de la gestion des rôles et permissions utilisateurs",
            "Développement du backend avec Django REST Framework connecté à PostgreSQL",
            "Intégration avec le TSP via une API REST sécurisée",
            "Conception d'un moteur de journalisation (logs) de toutes les actions sensibles",
            "Simulation HTTPS en environnement local avec mkcert pour tester la sécurité",
        ],
        stack: ["React.js", "Django REST Framework", "PostgreSQL", "JWT", "mkcert", "GitHub", "Postman"],
        ghLink: "https://github.com/Brahim-semlali/life-cycle-token",
        demoLink: "",
        images: [
            "/Images/experience/titrit-1.png",
            "/Images/experience/titrit-2.png",
        ],
    },
    {
        id: "orchid-island",
        company: "Orchid Island",
        role: "Développeur Full Stack (Stage)",
        period: "2025",
        location: "Maroc",
        logo: "/Images/experience/orchid-logo.png",
        shortDescription:
            "Plateforme PropTech de cartographie foncière (OrchidIsland.immo / GateOne.immo).",
        fullDescription:
            "Contribution au développement d'une plateforme PropTech dédiée à l'intelligence foncière : migration et exploitation de données géospatiales, puis développement d'une application cartographique interactive pour visualiser et interroger le foncier par zone et par secteur.",
        tasks: [
            "Migration des données géospatiales de MapInfo vers PostGIS (Phase A)",
            "Automatisation de l'import des couches de données avec ogr2ogr (zones, bornes, voiries...)",
            "Développement du frontend React connecté à un backend Spring Boot (Phase B)",
            "Construction de l'application cartographique \"Orchid Island Land Intelligence\" avec filtre par secteur et panneau d'information par zone",
            "Rédaction de scripts d'import PostgreSQL/PostGIS (création de tables, conversion de géométries)",
            "Conception d'un assistant RAG (FastAPI + LangChain + pgvector) pour interroger 60 documents fonciers scannés",
        ],
        stack: ["React", "Spring Boot", "PostGIS", "PostgreSQL", "FastAPI", "LangChain"],
        ghLink: "",
        demoLink: "",
        images: [
            "/Images/experience/orchid-1.png",
            "/Images/experience/orchid-2.png",
        ],
    },
    {
        id: "vactis",
        company: "Vactis",
        role: "Développeur Full Stack (Stage)",
        period: "06/2026 – 08/2026",
        location: "Marrakech, Maroc",
        logo: "/Images/experience/vactis-logo.png",
        shortDescription:
            "Système de suivi de la relation médecins–laboratoire pour un laboratoire d'analyses.",
        fullDescription:
            "Développement d'une application permettant à un laboratoire d'analyses médicales de gérer son portefeuille de médecins prescripteurs : suivi de l'historique des envois de patients, calcul d'indicateurs d'activité par médecin, détection automatique des périodes d'inactivité et système de segmentation pour prioriser les relances.",
        tasks: [
            "Développement backend Spring Boot / frontend React avec authentification JWT",
            "Conception et itération du Modèle Conceptuel de Données (MCD) de v6 à v7 sur draw.io",
            "Mise en place de menus dynamiques avec contrôle d'accès basé sur les rôles",
            "Documentation de l'API avec Swagger / SpringDoc",
            "Développement du moteur de scoring : calcul du score de valeur (potentiel, performance, poids économique) et segmentation automatique des médecins (A/B/C/D)",
            "Implémentation de l'historisation des retours terrain et des notifications de relance",
        ],
        stack: ["Spring Boot", "React", "PostgreSQL", "JWT", "API REST", "Swagger"],
        ghLink: "",
        demoLink: "",
        images: [
            "/Images/experience/vactis-1.png",
            "/Images/experience/vactis-2.png",
        ],
    },
];

export default experienceData;