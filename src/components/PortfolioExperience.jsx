import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  AiFillGithub,
  AiFillInstagram,
  AiFillLinkedin,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineCode,
  AiOutlineDatabase,
  AiOutlineDown,
  AiOutlineMail,
  AiOutlineMenu,
  AiOutlineMessage,
  AiOutlineSend,
  AiOutlineTool,
  AiOutlineUser,
  AiOutlineWifi,
  AiOutlineClose,
  AiOutlineGlobal,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { BsBriefcase, BsCloud, BsCpu, BsShieldCheck, BsTerminal } from "react-icons/bs";
import { FaFacebookF, FaReact } from "react-icons/fa";
import profilePhoto from "../Assets/profile.jpeg";
import blogImage from "../Assets/Projects/blog.png";
import chatifyImage from "../Assets/Projects/chatify.png";
import leafImage from "../Assets/Projects/leaf.png";
import JavaLogo from "../Assets/TechIcons/Java.svg";
import JavascriptLogo from "../Assets/TechIcons/Javascript.svg";
import PythonLogo from "../Assets/TechIcons/Python.svg";
import CppLogo from "../Assets/TechIcons/C++.svg";
import TypescriptLogo from "../Assets/TechIcons/Typescript.svg";
import SqlLogo from "../Assets/TechIcons/SQL.svg";
import experienceData from "./Experiences/experienceData";
import Github from "./About/Github";
import Leetcode from "./About/Leetcode";
import certifications from "../data/certifications";
import { EXCLUDED_REPOS, PROJECT_PRIORITY, PROJECT_OVERRIDES, localizedText } from "../data/projectPriority";
import { backgrounds, sectionToIndex } from "./AnimatedHeroBackground";
import { ICONS as techIconDefinitions } from "./Projects/TechLogos";
import { useLanguage } from "../i18n/LanguageContext";
import "./PortfolioExperience.css";

const expertise = [
  { number: "01", icon: <FaReact />, title: "Développement Full Stack", description: "Applications web fiables, de l'interface utilisateur jusqu'à l'API.", tags: "React · Spring Boot · Django" },
  { number: "02", icon: <AiOutlineDatabase />, title: "Bases de données", description: "Conception, gestion et exploitation de bases de données adaptées aux besoins métier.", tags: "PostgreSQL · MySQL · SQL" },
  { number: "03", icon: <AiOutlineCode />, title: "Développement Web", description: "Interfaces modernes, responsives et accessibles pour des expériences claires.", tags: "JavaScript · TypeScript · React" },
  { number: "04", icon: <BsCpu />, title: "IA & Machine Learning", description: "Exploration de l'intelligence artificielle et intégration de fonctionnalités ML.", tags: "Python · FastAPI · LangChain" },
  { number: "05", icon: <BsCloud />, title: "Outils & DevOps", description: "Conteneurisation, automatisation et bonnes pratiques pour livrer efficacement.", tags: "Docker · GitHub · CI/CD" },
];

const techGroups = {
  Languages: ["Java", "JavaScript", "Python", "C / C++", "TypeScript", "SQL"],
  Frameworks: ["React.js", "Next.js", "Django REST", "Spring Boot", "FastAPI", "Bootstrap"],
  Databases: ["PostgreSQL", "MySQL", "MongoDB", "PostGIS"],
  "Data & AI": ["Machine Learning", "LangChain", "RAG", "Pandas", "Data Analysis"],
  DevOps: ["Docker", "Git / GitHub", "CI/CD", "Postman", "REST API"],
  "Tech & Other": ["VS Code", "IntelliJ IDEA", "Google Chrome", "JWT", "Swagger"],
};

const projects = [
  { image: blogImage, title: "S7aFit", description: "Plateforme HealthTech avec coach IA, reconnaissance de repas, plans personnalisés et dashboard analytique.", tags: ["React", "TypeScript", "FastAPI"] },
  { image: chatifyImage, title: "Life Cycle Token", description: "Portail de gestion du cycle de vie des tokens de paiement bancaire réalisé chez Titrit Technologies.", tags: ["React", "Django REST", "PostgreSQL"] },
  { image: leafImage, title: "Gestion des stages PFE", description: "Application de gestion du cycle de vie des stages : étudiants, entreprises, encadrants et validations.", tags: ["React", "Spring Boot", "Java"] },
];

const techLogos = {
  Java: JavaLogo,
  JavaScript: JavascriptLogo,
  Python: PythonLogo,
  "C / C++": CppLogo,
  TypeScript: TypescriptLogo,
  SQL: SqlLogo,
  "React.js": techIconDefinitions["React.js"],
  "Next.js": techIconDefinitions["Next.js"],
  "Django REST": techIconDefinitions["Django REST Framework"],
  "Spring Boot": techIconDefinitions["Spring Boot"],
  FastAPI: techIconDefinitions.FastAPI,
  Bootstrap: techIconDefinitions.Bootstrap,
  PostgreSQL: techIconDefinitions.PostgreSQL,
  MySQL: techIconDefinitions.MySQL,
  MongoDB: techIconDefinitions.MongoDB,
  PostGIS: techIconDefinitions.PostGIS,
  "Machine Learning": techIconDefinitions.Python,
  LangChain: techIconDefinitions.LangChain,
  Pandas: techIconDefinitions.Python,
  "Data Analysis": techIconDefinitions.SQL,
  Docker: techIconDefinitions.Docker,
  "Git / GitHub": techIconDefinitions.GitHub,
  "CI/CD": techIconDefinitions.Git,
  Postman: techIconDefinitions.Postman,
  "REST API": techIconDefinitions["API REST"],
  "VS Code": techIconDefinitions.Git,
  "IntelliJ IDEA": techIconDefinitions.Java,
  "Google Chrome": techIconDefinitions.Git,
  JWT: techIconDefinitions.JWT,
  Swagger: techIconDefinitions.Swagger,
};

function PortfolioExperience({ activeIndex = 0, setActiveIndex, selectPortrait }) {
  const { lang, setLang, t } = useLanguage();
  const content = lang === "en" ? {
    activityNav: "Days I Code",
    heroEyebrow: "HELLO, I AM",
    heroRole: "Information Systems Engineering",
    heroDescription: "I build reliable web applications, from interface to API. Passionate about development, databases, AI and new technologies.",
    viewProjects: "VIEW MY PROJECTS",
    downloadCv: "DOWNLOAD CV",
    quote: <>Rigorous, autonomous<br />and solution-oriented.</>,
    quoteCopy: "Looking for an internship opportunity to contribute to innovative projects.",
    scroll: "SCROLL TO EXPLORE",
    aboutTag: "ABOUT",
    aboutTitle: <>Develop with method,<br /><em>learn with curiosity.</em></>,
    expertiseTag: "WHAT I DO",
    expertiseTitle: "Skills & Expertise",
    expertiseCopy: "Solutions built around technology and business needs.",
    educationTag: "EDUCATION",
    dossierTag: "TECHNICAL DOSSIER",
    dossierTitle: <>Core Technologies &amp;<br /><em>Engineering Stack</em></>,
    dossierCopy: "Mastering modern frameworks, languages, and tools to build robust, scalable applications.",
    experienceTag: "EXPERIENCE",
    experienceTitle: <>My internships and<br /><em>professional experience.</em></>,
    projectsTag: "MY PROJECTS",
    projectsTitle: "Featured Projects",
    projectsCopy: "All my GitHub repositories, ranked from professional projects to academic work.",
    certificationsTag: "CERTIFICATIONS",
    certificationsTitle: <>Verified knowledge,<br /><em>ready to ship.</em></>,
  } : {
    activityNav: "Mes journées de Code",
    heroEyebrow: "BONJOUR, JE SUIS",
    heroRole: "Ingénierie des Systèmes d'Information",
    heroDescription: "Je conçois des applications web fiables, de l'interface jusqu'à l'API. Passionné par le développement, les bases de données, l'IA et les nouvelles technologies.",
    viewProjects: "VOIR MES PROJETS",
    downloadCv: "TÉLÉCHARGER LE CV",
    quote: <>Rigoureux, autonome<br />et orienté résolution.</>,
    quoteCopy: "À la recherche d'une opportunité de stage pour contribuer à des projets innovants.",
    scroll: "SCROLL TO EXPLORE",
    aboutTag: "À PROPOS",
    aboutTitle: <>Développer avec méthode,<br /><em>apprendre avec curiosité.</em></>,
    expertiseTag: "CE QUE JE FAIS",
    expertiseTitle: "Compétences & Expertise",
    expertiseCopy: "Des solutions construites autour de la technique et des besoins métier.",
    educationTag: "FORMATION",
    dossierTag: "DOSSIER TECHNIQUE",
    dossierTitle: <>Technologies clés &amp;<br /><em>stack d&apos;ingénierie</em></>,
    dossierCopy: "Maîtrise de frameworks, langages et outils modernes pour construire des applications robustes et évolutives.",
    experienceTag: "EXPÉRIENCE",
    experienceTitle: <>Mes stages et<br /><em>expériences professionnelles.</em></>,
    projectsTag: "MES PROJETS",
    projectsTitle: "Projets présentés",
    projectsCopy: "Tous mes dépôts GitHub, classés des projets professionnels aux réalisations académiques.",
    certificationsTag: "CERTIFICATIONS",
    certificationsTitle: <>Connaissances validées,<br /><em>prêtes à être mises en œuvre.</em></>,
  };
  const aboutCopy = lang === "en" ? [
    "Hello! I am Brahim Semlali, based in Marrakech, Morocco. I am a Full Stack developer and an M2 Information Systems Engineering student at the Faculty of Sciences Semlalia.",
    "I have strong skills in web, mobile and desktop development, information systems design and database management. I work with Java, JavaScript, Python, React.js, Django, Spring Boot and FastAPI.",
    "Rigorous, autonomous and solution-oriented, I am currently looking for an internship opportunity to contribute to innovative projects.",
  ] : [
    "Bonjour ! Je suis Brahim Semlali, basé à Marrakech, Maroc. Je suis développeur Full Stack et étudiant en M2 Ingénierie des Systèmes d'Information à la Faculté des Sciences Semlalia.",
    "Je possède des compétences solides en développement web, mobile et desktop, en conception de systèmes d'information et en gestion de bases de données. Je maîtrise notamment Java, JavaScript, Python, React.js, Django, Spring Boot et FastAPI.",
    "Rigoureux, autonome et orienté résolution de problèmes, je suis actuellement à la recherche d'une opportunité de stage pour contribuer à des projets innovants.",
  ];
  const localizedExpertise = lang === "en" ? [
    { title: "Full Stack Development", description: "Reliable applications from user interface to API.", tags: "React · Spring Boot · Django" },
    { title: "Databases", description: "Designing, managing and using databases for business needs.", tags: "PostgreSQL · MySQL · SQL" },
    { title: "Web Development", description: "Modern, responsive and accessible interfaces.", tags: "JavaScript · TypeScript · React" },
    { title: "AI & Machine Learning", description: "Exploring AI and integrating machine learning features.", tags: "Python · FastAPI · LangChain" },
    { title: "Tools & DevOps", description: "Containerization, automation and delivery best practices.", tags: "Docker · GitHub · CI/CD" },
  ] : expertise;
  const localizedProjects = lang === "en" ? [
    { ...projects[0], title: "S7aFit", description: "HealthTech platform with AI coach, meal recognition, personalized plans and analytics dashboard." },
    { ...projects[1], title: "Life Cycle Token", description: "Portal for managing the lifecycle of bank payment tokens, built at Titrit Technologies." },
    { ...projects[2], title: "PFE Internship Management", description: "Application managing the lifecycle of internships: students, companies, supervisors and approvals." },
  ] : projects;
  const techGroupLabels = lang === "en" ? {} : { Languages: "Langages", Frameworks: "Frameworks", Databases: "Bases de données", "Data & AI": "Data & IA", DevOps: "DevOps", "Tech & Other": "Tech & autres" };
  const navItems = [
    ["about", t("nav.about")], ["expertise", t("about.skills")], ["education", t("about.education")], ["experience", t("nav.experience")], ["projects", t("nav.projects")], ["github", content.activityNav], ["certifications", t("nav.certifications")],
  ];
  const [activeTech, setActiveTech] = useState("Frameworks");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [githubProjects, setGithubProjects] = useState([]);
  const [terminalLines, setTerminalLines] = useState([
    ["$ whoami", "brahim_semlali"], ["$ role", "Développeur Full Stack"], ["$ expertise", "React.js\nSpring Boot\nDjango REST\nPostgreSQL\nIA & Machine Learning"], ["$ status", "DISPONIBLE POUR UN STAGE"],
  ]);

  useEffect(() => {
    axios.get("https://api.github.com/users/Brahim-semlali/repos", { params: { per_page: 100, sort: "updated" } })
      .then(({ data }) => {
        const repos = data.filter((repo) => !repo.fork && !EXCLUDED_REPOS.includes(repo.name));
        repos.sort((a, b) => PROJECT_PRIORITY.indexOf(a.name) - PROJECT_PRIORITY.indexOf(b.name));
        setGithubProjects(repos);
      })
      .catch(() => setGithubProjects([]));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { threshold: 0.5 });
    document.querySelectorAll("main section[id]").forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    setActiveIndex(sectionToIndex(id));
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const terminalCommands = useMemo(() => lang === "en" ? ({
    home: "Returning home...", about: "Opening profile...", education: "Opening education...", dossier: "Opening technical skills...", experience: "Loading experience...", projects: "Opening GitHub projects...", certifications: "Opening certifications...", clear: "__clear__", help: "Commands: home, about, education, experience, projects, certifications, clear",
  }) : ({
    home: "Retour à l'accueil...", about: "Ouverture du profil...", education: "Ouverture de la formation...", dossier: "Ouverture des compétences techniques...", experience: "Chargement des expériences...", projects: "Ouverture des projets GitHub...", certifications: "Ouverture des certifications...", clear: "__clear__", help: "Commandes : home, about, education, experience, projects, certifications, clear",
  }), [lang]);
  const runCommand = (event) => {
    if (event.key !== "Enter") return;
    const command = event.currentTarget.value.trim().toLowerCase();
    const response = terminalCommands[command] || `command not found: ${command}`;
    if (response === "__clear__") setTerminalLines([]);
    else {
      setTerminalLines((lines) => [...lines, [`$ ${command}`, response]]);
      if (terminalCommands[command] && command !== "help") { setTerminalOpen(false); scrollTo(command); }
    }
    event.currentTarget.value = "";
  };
  const displayProjects = githubProjects.length
    ? githubProjects.map((repo, index) => {
      const override = PROJECT_OVERRIDES[repo.name] || {};
      return {
        image: [blogImage, chatifyImage, leafImage][index % 3],
        title: localizedText(override.title, lang, repo.name.replace(/[_-]/g, " ")),
        description: localizedText(override.description, lang, repo.description || (lang === "en" ? "Project available on my GitHub profile." : "Projet disponible sur mon profil GitHub.")),
        tags: override.stack || [repo.language].filter(Boolean),
        link: repo.html_url,
      };
    })
    : localizedProjects.map((project) => ({ ...project, link: "https://github.com/Brahim-semlali" }));

  return (
    <div className="portfolio-shell">
      <header className="portfolio-header">
        <button className="brand-mark" onClick={() => scrollTo("home")} aria-label={t("nav.home")}><span>BS</span><small>BRAHIM<br />SEMLALI</small></button>
        <nav className="main-nav" aria-label={t("nav.pageNavigation")}>
          {navItems.map(([id, label]) => <button key={id} className={activeSection === id ? "active" : ""} onClick={() => scrollTo(id)}>{label}</button>)}
        </nav>
        <button className="header-cta" onClick={() => scrollTo("contact")}>LET&apos;S BUILD SOMETHING <AiOutlineArrowDown /></button>
      </header>
      <div className="side-tools">
        <button aria-label="Toggle sound"><AiOutlineWifi /></button>
        <button aria-label="Change language" onClick={() => setLang(lang === "fr" ? "en" : "fr")}><AiOutlineGlobal /><span className="language-toggle-label">{lang.toUpperCase()}</span></button>
      </div>
      <button className="terminal-launcher" onClick={() => setTerminalOpen(true)} aria-label="Open system directory"><BsTerminal /></button>
      <button className="chat-launcher" onClick={() => setChatOpen(!chatOpen)} aria-label="Open assistant"><AiOutlineMessage /></button>
      <nav className="portrait-navigation" aria-label="Navigation des portraits">
        <span className="portrait-navigation-label">PORTRAITS</span>
        <div className="portrait-navigation-controls">
          {backgrounds.map((image, index) => (
            <button
              className={index === activeIndex ? "active" : ""}
              key={image.id}
              onClick={() => selectPortrait(index)}
              aria-label={`Afficher le portrait ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <span>0{index + 1}</span>
            </button>
          ))}
        </div>
      </nav>
      {chatOpen && <div className="chat-bubble"><span>ASSISTANT / ONLINE</span><strong>{activeSection === "experience" ? "Let me show you where I worked." : activeSection === "projects" ? "Want to see what I can build?" : "Tell me what you want to explore."}</strong><button onClick={() => { setChatOpen(false); scrollTo(activeSection === "experience" ? "experience" : "projects"); }}>Explore section <AiOutlineArrowDown /></button></div>}

      <main>
        <section id="home" className="hero-section page-section">
          <div className="hero-copy reveal"><p className="eyebrow">{content.heroEyebrow} <i /></p><h1><span>BRAHIM</span><br />SEMLALI</h1><h2>{lang === "en" ? "Full Stack Developer & M2 student" : "Développeur Full Stack & étudiant M2"}</h2><p className="hero-role">{content.heroRole} <span>|</span></p><p className="hero-description">{content.heroDescription}</p><div className="hero-actions"><button className="primary-button" onClick={() => scrollTo("projects")}>{content.viewProjects} <AiOutlineArrowDown /></button><a href="/Brahim_Semlali_CV.pdf" className="text-button" download="Brahim_Semlali_CV.pdf">{content.downloadCv} <AiOutlineArrowDown /></a></div><div className="social-row"><a href="https://www.linkedin.com/in/brahim-semlali/" aria-label="LinkedIn"><AiFillLinkedin /></a><a href="https://github.com/Brahim-semlali" aria-label="GitHub"><AiFillGithub /></a><a href="https://instagram.com" aria-label="Instagram"><AiFillInstagram /></a><a href="https://facebook.com" aria-label="Facebook"><FaFacebookF /></a><a href="mailto:semlalibrahim34@gmail.com" aria-label="Email"><AiOutlineMail /></a></div></div>
          <div className="hero-quote reveal"><span>“</span><blockquote>{content.quote}</blockquote><i /><p>{content.quoteCopy}</p></div>
          <button className="scroll-cue" onClick={() => scrollTo("about")}><span>{content.scroll}</span><AiOutlineArrowDown /></button>
        </section>

        <section id="about" className="page-section about-section"><div className="section-heading reveal"><p className="eyebrow">{content.aboutTag} <i /></p><h2>{content.aboutTitle}</h2>{aboutCopy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div><div className="section-label"><span>{content.expertiseTag}</span><i /></div><h2 id="expertise" className="display-title">{content.expertiseTitle}</h2><p className="muted-copy">{content.expertiseCopy}</p><div className="expertise-grid">{localizedExpertise.map((item, index) => <article className="expertise-card" key={item.title}><div className="card-top"><span className="card-icon">{expertise[index].icon}</span><b>0{index + 1}</b></div><h3>{item.title}</h3><p>{item.description}</p><span className="card-tags">{item.tags}</span></article>)}</div></section>

        <section id="education" className="page-section education-section"><div className="education-panel"><div className="section-label"><span>{content.educationTag}</span><i /></div><h2 className="display-title education-title">{lang === "en" ? "Education" : "Formation"}</h2><div className="education-list-new"><article><b>2025 – 2027</b><h3>Master {lang === "en" ? "Information Systems Engineering" : "Ingénierie des Systèmes d&apos;Information"}</h3><p>Faculté des Sciences Semlalia</p></article><article><b>2024 – 2025</b><h3>{lang === "en" ? "Professional Bachelor in Computer Engineering" : "Licence Professionnelle en Génie Informatique"}</h3><p>FPT Taroudant · {lang === "en" ? "Good honours" : "Mention Bien"}</p></article><article><b>2022 – 2024</b><h3>{lang === "en" ? "University Diploma in Computer Engineering" : "DEUP en Génie Informatique"}</h3><p>FPT Taroudant · {lang === "en" ? "Good standing" : "Mention Assez Bien"}</p></article></div><p className="language-line"><strong>{lang === "en" ? "Languages:" : "Langues :"}</strong> {lang === "en" ? "Arabic (native), French (good), English (intermediate)." : "Arabe (langue maternelle), Français (bon niveau), Anglais (intermédiaire)."}</p></div></section>

        <section id="dossier" className="page-section dossier-section"><div className="section-label"><span>{content.dossierTag}</span><i /></div><h2 className="display-title">{content.dossierTitle}</h2><p className="muted-copy">{content.dossierCopy}</p><div className="tech-tabs">{Object.keys(techGroups).map((group, index) => <button className={activeTech === group ? "active" : ""} key={group} onClick={() => setActiveTech(group)}><span>0{index + 1}</span>{techGroupLabels[group] || group}</button>)}</div><div className="tech-grid">{techGroups[activeTech].map((tech, index) => { const logo = techLogos[tech]; const Logo = logo?.icon; return <article className="tech-card" key={tech} style={{ "--card-index": index }}><div className="tech-symbol">{typeof logo === "string" ? <img src={logo} alt={`${tech} logo`} /> : Logo ? <Logo style={{ color: logo.color }} aria-label={`${tech} logo`} /> : tech.slice(0, 2).toUpperCase()}</div><h3>{tech}</h3><p>{techGroupLabels[activeTech] || activeTech}</p><span>0{index + 1}</span></article>; })}</div></section>

        <section id="experience" className="page-section experience-section"><div className="section-label"><span>{content.experienceTag}</span><i /></div><h2 className="display-title">{content.experienceTitle}</h2><div className="timeline">{[...experienceData].reverse().map((item, index) => <article className={`timeline-item ${index % 2 ? "right" : "left"}`} key={item.id}><div className="timeline-dot"><BsBriefcase /></div><div className="timeline-date">{item.period}</div><div className="experience-card"><span className="card-number">0{index + 1}</span><p className="orange-label">{item.location}</p><h3>{item.role}</h3><h4>{item.company}</h4><p>{item.shortDescription}</p><p>{item.fullDescription}</p><ul>{item.tasks.map((task) => <li key={task}>{task}</li>)}</ul><div className="tag-list">{item.stack.map((tag) => <span key={tag}>{tag}</span>)}</div></div></article>)}</div></section>

        <section id="projects" className="page-section projects-section"><div className="center-heading"><p className="eyebrow">{content.projectsTag} <i /></p><h2 className="display-title">{content.projectsTitle}</h2><p className="muted-copy">{content.projectsCopy}</p></div><div className="projects-grid">{displayProjects.map((project, index) => <article className="project-card" key={project.title}><div className="project-image"><img src={project.image} alt="" /><span>0{index + 1}</span></div><div className="project-content"><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="project-link" href={project.link} target="_blank" rel="noreferrer">{lang === "en" ? "VIEW ON GITHUB" : "VOIR SUR GITHUB"} <AiOutlineArrowDown /></a></div></article>)}</div></section>

        <section id="certifications" className="page-section certifications-section"><div className="section-label"><span>{content.certificationsTag}</span><i /></div><h2 className="display-title">{content.certificationsTitle}</h2><div className="cert-grid">{certifications.map((cert, index) => <article className="cert-card" key={cert.id}><div className="cert-icon"><AiOutlineCheckCircle /></div><span className="card-number">0{index + 1}</span><p className="orange-label">{cert.year} · {cert.issuer}</p><h3>{cert.title}</h3><p>{cert.description}</p><div className="tag-list">{cert.skills.map((skill) => <span key={skill}>{skill}</span>)}</div><a href={cert.verifyUrl} target="_blank" rel="noreferrer">{lang === "en" ? "VERIFY CREDENTIAL" : "VÉRIFIER LE CERTIFICAT"} <AiOutlineArrowDown /></a></article>)}</div></section>

        <Github />
        <Leetcode />

        <section id="contact" className="contact-section page-section"><div><p className="eyebrow">HAVE A PROJECT IN MIND? <i /></p><h2>Let&apos;s make something<br /><em>meaningful.</em></h2><a className="primary-button" href="mailto:semlalibrahim34@gmail.com">START A CONVERSATION <AiOutlineSend /></a></div><div className="contact-meta"><span>AO // SYSTEM READY</span><strong>Available for meaningful collaborations</strong><a href="mailto:semlalibrahim34@gmail.com">semlalibrahim34@gmail.com</a><small>© 2026 Abderrahmane Ourdi. Built with intention.</small></div></section>
      </main>

      {terminalOpen && (
        <div className="terminal-backdrop" onClick={(event) => event.target === event.currentTarget && setTerminalOpen(false)}>
          <div className="terminal-window">
            <div className="terminal-bar"><span><i /><i /><i /></span><strong>BS // BRAHIM SEMLALI</strong><button onClick={() => setTerminalOpen(false)}><AiOutlineClose /> {lang === "en" ? "CLOSE" : "FERMER"}</button></div>
            <div className="terminal-body">
              {terminalLines.map(([command, response], index) => (
                <div className="terminal-line" key={command + index}><strong>{command}</strong><p className={response === "ONLINE" ? "online" : ""}>{response}</p></div>
              ))}
              <div className="terminal-input"><strong>$</strong><input autoFocus onKeyDown={runCommand} placeholder={lang === "en" ? "type a command or 'help'..." : "entrez une commande ou 'help'..."} aria-label={lang === "en" ? "Terminal command" : "Commande terminal"} /></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioExperience;
