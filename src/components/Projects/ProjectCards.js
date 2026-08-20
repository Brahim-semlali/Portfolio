import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub, BsStar } from "react-icons/bs";
import TechLogos, { stackFromLanguage } from "./TechLogos";
import { useLanguage } from "../../i18n/LanguageContext";

function ProjectCards({
  title,
  description,
  ghLink,
  demoLink,
  language,
  stack,
  stars,
  priority,
}) {
  const logos = stack && stack.length ? stack : stackFromLanguage(language);
  const { t } = useLanguage();

  return (
    <Card className="project-card-view">
      <div className="project-card-img-wrap project-card-lang-wrap">
        {priority && <span className="project-priority">#{priority}</span>}
        <TechLogos stack={logos} />
      </div>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        {stars > 0 && (
          <p className="project-stars">
            <BsStar /> {stars}
          </p>
        )}
        <div className="project-card-actions">
          {ghLink && (
            <Button
              variant="primary"
              href={ghLink}
              target="_blank"
              rel="noreferrer"
            >
              <BsGithub /> GitHub
            </Button>
          )}
          {demoLink && (
            <Button
              className="btn-outline-glass"
              href={demoLink}
              target="_blank"
              rel="noreferrer"
            >
              <CgWebsite /> {t("projects.demo")}
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
