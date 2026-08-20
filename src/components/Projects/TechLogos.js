import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiDjango,
  SiFastapi,
  SiSpringboot,
  SiPostgresql,
  SiMongodb,
  SiMysql,
  SiDocker,
  SiGit,
  SiBootstrap,
  SiHtml5,
  SiCss3,
  SiJupyter,
} from "react-icons/si";
import { FaJava, FaLock } from "react-icons/fa";
import { DiDatabase } from "react-icons/di";

const ICONS = {
  React: { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#E2E8F0" },
  TypeScript: { icon: SiTypescript, color: "#3178C6" },
  JavaScript: { icon: SiJavascript, color: "#F7DF1E" },
  Python: { icon: SiPython, color: "#3776AB" },
  Java: { icon: FaJava, color: "#E76F00" },
  Django: { icon: SiDjango, color: "#44B78B" },
  FastAPI: { icon: SiFastapi, color: "#009688" },
  "Spring Boot": { icon: SiSpringboot, color: "#6DB33F" },
  PostgreSQL: { icon: SiPostgresql, color: "#4169E1" },
  MongoDB: { icon: SiMongodb, color: "#47A248" },
  MySQL: { icon: SiMysql, color: "#4479A1" },
  Docker: { icon: SiDocker, color: "#2496ED" },
  Git: { icon: SiGit, color: "#F05032" },
  Bootstrap: { icon: SiBootstrap, color: "#7952B3" },
  HTML: { icon: SiHtml5, color: "#E34F26" },
  CSS: { icon: SiCss3, color: "#1572B6" },
  JWT: { icon: FaLock, color: "#A5B4FC" },
  SQL: { icon: DiDatabase, color: "#818CF8" },
  "Jupyter Notebook": { icon: SiJupyter, color: "#F37626" },
};

const LANGUAGE_TO_STACK = {
  TypeScript: ["TypeScript"],
  JavaScript: ["JavaScript"],
  Python: ["Python"],
  Java: ["Java"],
  HTML: ["HTML"],
  CSS: ["CSS"],
  "Jupyter Notebook": ["Jupyter Notebook"],
};

export function stackFromLanguage(language) {
  if (!language) return [];
  return LANGUAGE_TO_STACK[language] || [language];
}

function TechLogos({ stack = [] }) {
  if (!stack.length) {
    return <span className="project-lang-badge">Code</span>;
  }

  return (
    <div className="project-tech-logos" aria-label="Technologies utilisées">
      {stack.map((name) => {
        const item = ICONS[name];
        if (!item) {
          return (
            <span key={name} className="project-tech-fallback" title={name}>
              {name}
            </span>
          );
        }
        const Icon = item.icon;
        return (
          <span key={name} className="project-tech-icon" title={name}>
            <Icon style={{ color: item.color }} />
          </span>
        );
      })}
    </div>
  );
}

export default TechLogos;
