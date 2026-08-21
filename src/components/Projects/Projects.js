import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import axios from "axios";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import {
  EXCLUDED_REPOS,
  sortReposByPriority,
  enrichRepo,
  localizedText,
} from "../../data/projectPriority";
import { useLanguage } from "../../i18n/LanguageContext";

const GITHUB_USER = "Brahim-semlali";

function Projects() {
  const { lang, t } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await axios.get(
          `https://api.github.com/users/${GITHUB_USER}/repos`,
          { params: { per_page: 100, sort: "updated" } }
        );

        const filtered = data.filter(
          (repo) => !repo.fork && !EXCLUDED_REPOS.includes(repo.name)
        );

        const sorted = sortReposByPriority(filtered).map(enrichRepo);
        setProjects(sorted);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <Container fluid className="project-section" id="projects">
      <Particle />
      <Container>
        <span className="section-tag">{t("projects.tag")}</span>
        <h1 className="project-heading">
          {t("projects.title")}{" "}
          <span className="gradient-text">{t("projects.titleHighlight")}</span>
        </h1>
        <p className="section-subtitle">{t("projects.subtitle")}</p>

        {loading && (
          <div className="projects-loading">
            <Spinner animation="border" variant="primary" />
            <p>{t("projects.loading")}</p>
          </div>
        )}

        {error && <p className="projects-error">{t("projects.error")}</p>}

        {!loading && !error && (
          <Row style={{ justifyContent: "center", paddingTop: "12px" }}>
            {projects.map((project, index) => (
              <Col md={4} sm={6} xs={12} className="project-card" key={project.name}>
                <ProjectCard
                  title={localizedText(project.title, lang, project.name)}
                  description={localizedText(
                    project.description,
                    lang,
                    ""
                  )}
                  ghLink={project.ghLink}
                  demoLink={project.demoLink}
                  language={project.language}
                  stack={project.stack}
                  stars={project.stars}
                  priority={index + 1}
                />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </Container>
  );
}

export default Projects;
