import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import CertificationCard from "./CertificationCard";
import certifications from "../../data/certifications";
import { useLanguage } from "../../i18n/LanguageContext";

function Certifications() {
  const { t } = useLanguage();

  return (
    <Container fluid className="cert-section">
      <Particle />
      <Container>
        <span className="section-tag">{t("certifications.tag")}</span>
        <h1 className="project-heading">
          {t("certifications.title")}{" "}
          <span className="gradient-text">
            {t("certifications.titleHighlight")}
          </span>
        </h1>
        <p className="section-subtitle">{t("certifications.subtitle")}</p>

        <Row style={{ justifyContent: "center", paddingTop: "12px" }}>
          {certifications.map((cert) => (
            <Col key={cert.id} md={6} lg={5} xs={12} className="cert-col">
              <CertificationCard cert={cert} />
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Certifications;
