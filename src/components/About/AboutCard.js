import React from "react";
import { Link } from "react-router-dom";
import { BsArrowRight, BsBriefcase } from "react-icons/bs";
import { useLanguage } from "../../i18n/LanguageContext";

function AboutCard() {
  const { t } = useLanguage();

  return (
    <div className="about-bio">
      <p>
        {t("about.hello")} <span className="purple">Brahim Semlali</span>,{" "}
        {t("about.based")}{" "}
        <span className="purple">{t("about.location")}</span>.
        <br />
        {t("about.iAm")} <span className="purple">{t("about.role")}</span>{" "}
        {t("about.student")}{" "}
        <span className="purple">{t("about.master")}</span> {t("about.school")}
      </p>

      <h3 className="about-block-title">{t("about.experience")}</h3>
      <Link to="/experience" className="about-experience-link">
        <span><BsBriefcase /> {t("about.viewExperiences")}</span>
        <BsArrowRight />
      </Link>

      <h3 className="about-block-title">{t("about.education")}</h3>
      <div className="education-list">
        <div className="timeline-item">
          <span className="timeline-dot" />
          <div>
            <strong>{t("about.edu1Title")}</strong>
            <span>{t("about.edu1Meta")}</span>
          </div>
        </div>
        <div className="timeline-item">
          <span className="timeline-dot" />
          <div>
            <strong>{t("about.edu2Title")}</strong>
            <span>{t("about.edu2Meta")}</span>
          </div>
        </div>
        <div className="timeline-item">
          <span className="timeline-dot" />
          <div>
            <strong>{t("about.edu3Title")}</strong>
            <span>{t("about.edu3Meta")}</span>
          </div>
        </div>
      </div>

      <p>
        <strong className="purple">{t("about.languages")}</strong>{" "}
        {t("about.languagesText")}
      </p>

      <blockquote className="about-quote">“{t("about.quote")}”</blockquote>
    </div>
  );
}

export default AboutCard;
