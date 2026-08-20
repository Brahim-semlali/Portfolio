import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { BsAward, BsBoxArrowUpRight } from "react-icons/bs";
import { useLanguage } from "../../i18n/LanguageContext";

function CertificationCard({ cert }) {
  const { t } = useLanguage();
  const raw = t(`certifications.items.${cert.id}`);
  const localized = raw && typeof raw === "object" ? raw : {};

  return (
    <Card className="cert-card">
      <Card.Body>
        <div className="cert-card-header">
          <span className="cert-icon" aria-hidden="true">
            <BsAward />
          </span>
          <span className="cert-year">{cert.year}</span>
        </div>
        <Card.Title className="cert-title">{cert.title}</Card.Title>
        <p className="cert-issuer">{cert.issuer}</p>
        <Card.Text className="cert-description">
          {localized.description || cert.description}
        </Card.Text>
        <div className="cert-skills">
          {(localized.skills || cert.skills).map((skill) => (
            <span key={skill} className="cert-skill-tag">
              {skill}
            </span>
          ))}
        </div>
        <Button
          variant="primary"
          href={cert.verifyUrl}
          target="_blank"
          rel="noreferrer"
          className="cert-verify-btn"
        >
          <BsBoxArrowUpRight /> {t("certifications.verify")}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CertificationCard;
