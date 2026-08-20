import React from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";
import { useLanguage } from "../../i18n/LanguageContext";

function Github() {
  const { t } = useLanguage();

  return (
    <Row
      style={{
        justifyContent: "center",
        paddingBottom: "40px",
        paddingTop: "40px",
        color: "white",
      }}
    >
      <span className="section-tag">{t("about.activityTag")}</span>
      <h1
        className="project-heading pb-4"
        style={{ paddingBottom: "20px", textAlign: "center", width: "100%" }}
      >
        {t("about.days")} <span className="gradient-text">Code</span>
      </h1>
      <div
        className="glass-panel github-calendar-wrap"
        style={{ padding: "2rem", overflowX: "auto", maxWidth: "100%" }}
      >
        <GitHubCalendar
          username="Brahim-semlali"
          blockSize={14}
          blockMargin={4}
          color="#38bdf8"
          fontSize={14}
        />
      </div>
    </Row>
  );
}

export default Github;
