import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLanguage } from "../../i18n/LanguageContext";

function Home2() {
  const { t } = useLanguage();

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row className="g-4 align-items-stretch">
          <Col lg={7} className="home-about-description">
            <div className="glass-panel">
              <span className="section-tag">{t("home.aboutTag")}</span>
              <h1 className="intro-title">
                {t("home.introTitle")}{" "}
                <span className="gradient-text">{t("home.introHighlight")}</span>
              </h1>
              <p className="home-about-body">
                {t("home.intro1")}
                <br />
                <br />
                {t("home.intro2")}
                <br />
                <br />
                {t("home.intro3a")}
                <b className="purple">{t("home.intro3b")}</b>
                {t("home.intro3c")}
              </p>
            </div>
          </Col>
          <Col lg={5}>
            <div className="bento-side">
              <article className="stat-card">
                <span className="stat-label">{t("home.statFocus")}</span>
                <strong>{t("home.statFocusValue")}</strong>
              </article>
              <article className="stat-card">
                <span className="stat-label">{t("home.statStack")}</span>
                <strong>{t("home.statStackValue")}</strong>
              </article>
              <article className="stat-card">
                <span className="stat-label">{t("home.statLocation")}</span>
                <strong>{t("home.statLocationValue")}</strong>
              </article>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
