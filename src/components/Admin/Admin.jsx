import React, { useEffect, useState } from "react";
import axios from "axios";
import { defaultPortfolioData, getPortfolioData, savePortfolioData } from "../../data/portfolioStore";
import "./Admin.css";

const ADMIN_KEY = process.env.REACT_APP_ADMIN_KEY;

function AdminLogin({ onAuthenticated }) {
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const submit = (event) => {
    event.preventDefault();
    if (ADMIN_KEY && key === ADMIN_KEY) {
      sessionStorage.setItem("portfolio-admin-auth", "true");
      onAuthenticated();
    } else {
      setError(ADMIN_KEY ? "Clé incorrecte." : "Configurez REACT_APP_ADMIN_KEY dans .env.local avant de vous connecter.");
    }
  };
  return <form className="admin-card admin-login" onSubmit={submit}><h1>Espace privé</h1><p>Accès administrateur du portfolio.</p><div className="admin-field"><label htmlFor="admin-key">Clé d'accès</label><input id="admin-key" type="password" value={key} onChange={(event) => setKey(event.target.value)} autoFocus /></div>{error && <p className="admin-message">{error}</p>}<button type="submit">Ouvrir l'administration</button></form>;
}

function Admin() {
  const [authenticated, setAuthenticated] = useState(() => sessionStorage.getItem("portfolio-admin-auth") === "true");
  const [data, setData] = useState(getPortfolioData);
  const [githubProjects, setGithubProjects] = useState([]);
  const [githubError, setGithubError] = useState("");
  const [message, setMessage] = useState("");
  const updateProfile = (field, value) => setData((current) => ({ ...current, profile: { ...current.profile, [field]: value } }));
  const updateGroup = (group, index, value) => setData((current) => ({ ...current, skills: { ...current.skills, groups: { ...current.skills.groups, [group]: current.skills.groups[group].map((item, itemIndex) => itemIndex === index ? value : item) } } }));
  const addSkill = (group) => setData((current) => ({ ...current, skills: { ...current.skills, groups: { ...current.skills.groups, [group]: [...current.skills.groups[group], "Nouvelle compétence"] } } }));
  const removeSkill = (group, index) => setData((current) => ({ ...current, skills: { ...current.skills, groups: { ...current.skills.groups, [group]: current.skills.groups[group].filter((_, itemIndex) => itemIndex !== index) } } }));
  const addSkillLogo = (skill, event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setData((current) => ({ ...current, skills: { ...current.skills, logos: { ...current.skills.logos, [skill]: reader.result } } }));
    reader.readAsDataURL(file);
  };
  const updateProject = (index, field, value) => setData((current) => ({ ...current, projects: { ...current.projects, custom: current.projects.custom.map((project, itemIndex) => itemIndex === index ? { ...project, [field]: value } : project) } }));
  const updateGithubProject = (name, field, value) => setData((current) => ({ ...current, projects: { ...current.projects, overrides: { ...current.projects.overrides, [name]: { ...(current.projects.overrides?.[name] || {}), [field]: value } } } }));
  const addFileToGithubProject = (name, field, event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateGithubProject(name, field, reader.result);
    reader.readAsDataURL(file);
  };
  const addFileToCustomProject = (index, field, event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateProject(index, field, reader.result);
    reader.readAsDataURL(file);
  };
  const save = () => { savePortfolioData(data); setMessage("Modifications enregistrées dans ce navigateur."); window.setTimeout(() => setMessage(""), 3000); };
  const addProject = () => setData((current) => ({ ...current, projects: { ...current.projects, custom: [...current.projects.custom, { title: "Nouveau projet", description: "", repoUrl: "", demoUrl: "", imageUrl: "", videoUrl: "", tags: "React, JavaScript" }] } }));
  const reset = () => setData(defaultPortfolioData);
  useEffect(() => {
    if (!authenticated || !data.projects.githubUser) return undefined;
    axios.get(`https://api.github.com/users/${data.projects.githubUser}/repos`, { params: { per_page: 100, sort: "updated" } })
      .then(({ data: repositories }) => {
        const selected = data.projects.featuredRepositories || repositories.map((repository) => repository.name);
        setGithubProjects(repositories.filter((repository) => selected.includes(repository.name)));
        setGithubError("");
      })
      .catch(() => { setGithubProjects([]); setGithubError("Impossible de récupérer les dépôts GitHub. Vérifiez le nom d'utilisateur."); });
    return undefined;
  }, [authenticated, data.projects.githubUser, data.projects.featuredRepositories]);
  if (!authenticated) return <div className="admin-page"><AdminLogin onAuthenticated={() => setAuthenticated(true)} /></div>;
  return <div className="admin-page"><div className="admin-shell"><header className="admin-header"><div><p className="orange-label">BS // ADMIN</p><h1>Portfolio control room</h1><p>Modifiez le contenu puis enregistrez. Les données sont utilisées par la page publique immédiatement.</p></div><div><button className="admin-button" onClick={save}>Enregistrer</button> <button className="admin-button secondary" onClick={() => { sessionStorage.removeItem("portfolio-admin-auth"); setAuthenticated(false); }}>Quitter</button></div></header>
    <section className="admin-card"><h2>Profil et contact</h2><div className="admin-grid">{["name", "role", "email", "github", "linkedin", "heroDescription"].map((field) => <div className={`admin-field ${field === "heroDescription" ? "full" : ""}`} key={field}><label htmlFor={`profile-${field}`}>{field}</label><input id={`profile-${field}`} value={data.profile[field] || ""} onChange={(event) => updateProfile(field, event.target.value)} /></div>)}<div className="admin-field"><label htmlFor="about-fr">À propos (français)</label><textarea id="about-fr" value={data.profile.aboutFr} onChange={(event) => updateProfile("aboutFr", event.target.value)} /></div><div className="admin-field"><label htmlFor="about-en">About (English)</label><textarea id="about-en" value={data.profile.aboutEn} onChange={(event) => updateProfile("aboutEn", event.target.value)} /></div></div></section>
    <section className="admin-card"><h2>Compétences et logos</h2>{Object.entries(data.skills.groups).map(([group, skills]) => <div className="admin-skill-group" key={group}><h3>{group}</h3>{skills.map((skill, index) => <div className="admin-row" key={`${group}-${index}`}><input value={skill} onChange={(event) => updateGroup(group, index, event.target.value)} aria-label={`Nom ${skill}`} /><input placeholder="URL du logo (optionnel)" value={data.skills.logos[skill] || ""} onChange={(event) => setData((current) => ({ ...current, skills: { ...current.skills, logos: { ...current.skills.logos, [skill]: event.target.value } } }))} /><input type="file" accept="image/*" aria-label={`Image du logo ${skill}`} onChange={(event) => addSkillLogo(skill, event)} /><button onClick={() => removeSkill(group, index)} type="button">Supprimer</button></div>)}<button type="button" onClick={() => addSkill(group)}>+ Ajouter une compétence</button></div>)}</section>
    <section className="admin-card"><h2>Projets GitHub</h2><p>Les dépôts existants sont chargés depuis GitHub. Personnalisez chaque projet avec une image, un logo, une vidéo et une démo.</p><div className="admin-field"><label htmlFor="github-user">Utilisateur GitHub</label><input id="github-user" value={data.projects.githubUser} onChange={(event) => setData((current) => ({ ...current, projects: { ...current.projects, githubUser: event.target.value } }))} /></div>{githubError && <p className="admin-message">{githubError}</p>}{githubProjects.length === 0 && !githubError && <p className="admin-message">Chargement des dépôts GitHub...</p>}{githubProjects.map((repository) => { const project = data.projects.overrides?.[repository.name] || {}; return <div className="admin-project" key={repository.id}><h3>{repository.name}</h3><p>{repository.description || "Aucune description GitHub."}</p><div className="admin-grid"><div className="admin-field"><label htmlFor={`demo-${repository.id}`}>URL de démo</label><input id={`demo-${repository.id}`} value={project.demoUrl || ""} onChange={(event) => updateGithubProject(repository.name, "demoUrl", event.target.value)} /></div><div className="admin-field"><label htmlFor={`image-${repository.id}`}>URL image ou logo</label><input id={`image-${repository.id}`} value={project.imageUrl || project.logoUrl || ""} onChange={(event) => updateGithubProject(repository.name, "imageUrl", event.target.value)} /></div><div className="admin-field"><label htmlFor={`image-file-${repository.id}`}>Image depuis le PC</label><input id={`image-file-${repository.id}`} type="file" accept="image/*" onChange={(event) => addFileToGithubProject(repository.name, "imageUrl", event)} /></div><div className="admin-field"><label htmlFor={`video-file-${repository.id}`}>Vidéo depuis le PC</label><input id={`video-file-${repository.id}`} type="file" accept="video/*" onChange={(event) => addFileToGithubProject(repository.name, "videoUrl", event)} /></div><div className="admin-field"><label htmlFor={`video-${repository.id}`}>URL vidéo</label><input id={`video-${repository.id}`} value={project.videoUrl || ""} onChange={(event) => updateGithubProject(repository.name, "videoUrl", event.target.value)} /></div><div className="admin-field"><label htmlFor={`tags-${repository.id}`}>Technologies</label><input id={`tags-${repository.id}`} value={project.stack || repository.language || ""} onChange={(event) => updateGithubProject(repository.name, "stack", event.target.value)} /></div></div></div>; })}</section>
    <section className="admin-card"><h2>Projets ajoutés manuellement</h2>{data.projects.custom.map((project, index) => <div className="admin-project" key={index}><div className="admin-grid">{["title", "repoUrl", "demoUrl", "imageUrl", "videoUrl", "tags"].map((field) => <div className="admin-field" key={field}><label>{field}</label><input value={project[field] || ""} onChange={(event) => updateProject(index, field, event.target.value)} /></div>)}<div className="admin-field"><label>Image depuis le PC</label><input type="file" accept="image/*" onChange={(event) => addFileToCustomProject(index, "imageUrl", event)} /></div><div className="admin-field"><label>Vidéo depuis le PC</label><input type="file" accept="video/*" onChange={(event) => addFileToCustomProject(index, "videoUrl", event)} /></div><div className="admin-field full"><label>description</label><textarea value={project.description || ""} onChange={(event) => updateProject(index, "description", event.target.value)} /></div></div><div className="admin-project-actions"><button type="button" onClick={() => setData((current) => ({ ...current, projects: { ...current.projects, custom: current.projects.custom.filter((_, itemIndex) => itemIndex !== index) } }))}>Supprimer le projet</button></div></div>)}<button type="button" onClick={addProject}>+ Ajouter un projet</button></section>
    <section className="admin-card"><h2>Maintenance</h2><button className="admin-button secondary" onClick={reset}>Réinitialiser les données non enregistrées</button></section>
    {message && <div className="admin-message">{message}</div>}</div></div>;
}

export default Admin;