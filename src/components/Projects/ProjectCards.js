import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub, BsStar } from "react-icons/bs";
import TechLogos, { stackFromLanguage } from "./TechLogos";
import { useLanguage } from "../../i18n/LanguageContext";
import { animated, useSpring } from "@react-spring/web";

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
  const [cardAnimation, cardApi] = useSpring(() => ({
    transform: "translateY(0px)",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
    config: { tension: 260, friction: 20 },
  }));

  return (
    <animated.div
      style={cardAnimation}
      onMouseEnter={() => cardApi.start({ transform: "translateY(-8px)", boxShadow: "0 22px 46px rgba(0, 0, 0, 0.28)" })}
      onMouseLeave={() => cardApi.start({ transform: "translateY(0px)", boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)" })}
    >
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
    </animated.div>
  );
}

export default ProjectCards;
