import React from "react";
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
      <div className="timeline">
        <div className="timeline-item">
          <span className="timeline-dot" />
          <p>{t("about.exp1")}</p>
        </div>
        <div className="timeline-item">
          <span className="timeline-dot" />
          <p>{t("about.exp2")}</p>
        </div>
      </div>

      <h3 className="about-block-title">{t("about.education")}</h3>
      <div className="timeline">
        <div className="timeline-item">
          <span className="timeline-dot" />
          <p>{t("about.edu1")}</p>
        </div>
        <div className="timeline-item">
          <span className="timeline-dot" />
          <p>{t("about.edu2")}</p>
        </div>
        <div className="timeline-item">
          <span className="timeline-dot" />
          <p>{t("about.edu3")}</p>
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
