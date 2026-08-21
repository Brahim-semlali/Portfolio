import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import profilePhoto from "../../Assets/profile.jpeg";
import Particle from "../Particle";
import Home2 from "./Home2";
import Type from "./Type";
import { AiFillGithub, AiOutlineArrowRight } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { CgFileDocument } from "react-icons/cg";
import { useLanguage } from "../../i18n/LanguageContext";

function Home() {
  const { t } = useLanguage();

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row className="align-items-center gy-5">
            <Col lg={7} className="home-header">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                {t("home.badge")}
              </div>

              <p className="hero-kicker">{t("home.hello")}</p>

              <h1 className="heading-name">
                {t("home.iAm")}
                <strong className="main-name">Brahim Semlali</strong>
              </h1>

              <div className="typewriter-wrap">
                <Type />
              </div>

              <p className="hero-lead">{t("home.lead")}</p>

              <p className="hero-proof">{t("home.proof")}</p>

              <div className="hero-actions">
                <Link to="/project" className="btn btn-primary hero-btn">
                  {t("home.ctaProjects")} <AiOutlineArrowRight />
                </Link>
                <Link to="/resume" className="btn btn-outline-glass hero-btn">
                  <CgFileDocument /> {t("home.ctaResume")}
                </Link>
                <a href="mailto:semlalibrahim34@gmail.com" className="btn btn-quiet hero-btn">
                  <MdEmail /> {t("home.ctaContact")}
                </a>
              </div>

              <ul className="hero-social">
                <li>
                  <a
                    href="https://github.com/Brahim-semlali"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  >
                    <AiFillGithub />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/brahim-semlali/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>
                </li>
                <li>
                  <a href="mailto:semlalibrahim34@gmail.com" aria-label="Email">
                    <MdEmail />
                  </a>
                </li>
              </ul>
            </Col>

            <Col lg={5} className="hero-visual">
              <div className="hero-frame">
                <div className="hero-frame-ring" />
                <div className="hero-photo">
                  <img src={profilePhoto} alt="Brahim Semlali" />
                </div>
                <span className="float-chip chip-1">React.js</span>
                <span className="float-chip chip-2">Spring Boot</span>
                <span className="float-chip chip-3">Django</span>
              </div>
            </Col>
          </Row>
        </Container>
      </Container>

      <Home2 />

      <Container>
        <Row>
          <Col md={12} className="home-about-social">
            <span className="section-tag">{t("home.contactTag")}</span>
            <h1 id="contact">
              {t("home.workTogether")}{" "}
              <span className="gradient-text">{t("home.together")}</span>
            </h1>
            <p>
              {t("home.contactText")}{" "}
              <span className="purple">{t("home.contactHighlight")}</span>{" "}
              {t("home.contactWithMe")}
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/Brahim-semlali"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="GitHub"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/brahim-semlali/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                  aria-label="LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="mailto:semlalibrahim34@gmail.com"
                  className="icon-colour home-social-icons"
                  aria-label="Email"
                >
                  <MdEmail />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Home;
