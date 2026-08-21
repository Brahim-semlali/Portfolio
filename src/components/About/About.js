import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Particle from "../Particle";
import Github from "./Github";
import Leetcode from "./Leetcode";
import Techstack from "./Techstack";
import Aboutcard from "./AboutCard";
import profilePhoto from "../../Assets/profile.jpeg";
import Toolstack from "./Toolstack";
import { useLanguage } from "../../i18n/LanguageContext";

function About() {
  const { t } = useLanguage();

  return (
    <>
      <Particle />
      <Container fluid className="about-section">
        <Container>
          <Row className="about-profile-row" style={{ justifyContent: "center", padding: "10px" }}>
            <Col
              md={7}
              className="about-profile-copy"
              style={{
                justifyContent: "center",
                paddingTop: "30px",
                paddingBottom: "50px",
              }}
            >
              <span className="section-tag">{t("about.tag")}</span>
              <h1
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                  paddingBottom: "20px",
                }}
              >
                {t("about.title")}
                <span className="gradient-text">{t("about.titleEnd")}</span>
              </h1>
              <div className="glass-panel about-profile-panel" style={{ padding: "2rem" }}>
                <Aboutcard />
              </div>
            </Col>
            <Col
              md={5}
              style={{ paddingTop: "40px", paddingBottom: "50px" }}
              className="about-img about-profile-photo-col d-flex align-items-center"
            >
              <div className="hero-frame about-photo">
                <div className="hero-frame-ring" />
                <div className="hero-photo">
                  <img src={profilePhoto} alt="Brahim Semlali" />
                </div>
              </div>
            </Col>
          </Row>

          <span className="section-tag">{t("about.stackTag")}</span>
          <h1 className="project-heading">
            {t("about.skills")}{" "}
            <span className="gradient-text">{t("about.skillsHighlight")}</span>
          </h1>
          <Techstack />

          <span className="section-tag">{t("about.toolsTag")}</span>
          <h1 className="project-heading">
            {t("about.tools")}{" "}
            <span className="gradient-text">{t("about.toolsHighlight")}</span>
          </h1>
          <Toolstack />

          <Github />
          <Leetcode />
        </Container>
      </Container>
    </>
  );
}

export default About;
