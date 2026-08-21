import React, { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";
import { Row } from "react-bootstrap";
import { SiAzuredevops, SiDocker, SiGithubactions, SiGitlab, SiJenkins, SiKubernetes } from "react-icons/si";
import { useLanguage } from "../../i18n/LanguageContext";

const GITHUB_USER = "Brahim-semlali";
const CONTRIBUTIONS_API = "https://github-contributions-api.jogruber.de/v4";

function getContributionStats(contributions = []) {
  const today = new Date().toISOString().slice(0, 10);
  const orderedContributions = [...contributions]
    .filter((day) => day.date <= today)
    .sort((first, second) => first.date.localeCompare(second.date));
  const total = orderedContributions.reduce((sum, day) => sum + day.count, 0);
  const streaks = [];
  let currentStreak = 0;

  orderedContributions.forEach((day) => {
    if (day.count > 0) {
      currentStreak += 1;
      return;
    }

    if (currentStreak > 0) {
      streaks.push(currentStreak);
      currentStreak = 0;
    }
  });

  if (currentStreak > 0) {
    streaks.push(currentStreak);
  }

  const lastDay = orderedContributions[orderedContributions.length - 1];
  let latestContributionIndex = -1;
  for (let index = orderedContributions.length - 1; index >= 0; index -= 1) {
    if (orderedContributions[index].count > 0) {
      latestContributionIndex = index;
      break;
    }
  }
  const latestContributionStreak = latestContributionIndex >= 0
    ? (() => {
      let streak = 0;
      for (let index = latestContributionIndex; index >= 0 && orderedContributions[index].count > 0; index -= 1) {
        streak += 1;
      }
      return streak;
    })()
    : 0;
  const current = lastDay?.count > 0 ? currentStreak : latestContributionStreak;
  const sortedStreaks = [...streaks].sort((first, second) => second - first);

  return {
    total,
    current,
    topStreaks: sortedStreaks.slice(0, 3),
  };
}

function Github() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState("last");
  const [activeYears, setActiveYears] = useState([]);
  const [stats, setStats] = useState({ total: 0, current: 0, topStreaks: [] });

  useEffect(() => {
    let cancelled = false;
    const candidateYears = Array.from({ length: currentYear - 2013 }, (_, index) => currentYear - index);

    Promise.all(
      candidateYears.map((year) =>
        fetch(`${CONTRIBUTIONS_API}/${GITHUB_USER}?y=${year}`)
          .then((response) => (response.ok ? response.json() : null))
          .then((result) => ({ year, contributions: result?.contributions || [] }))
          .catch(() => ({ year, contributions: [] }))
      )
    ).then((results) => {
      if (!cancelled) {
        const allContributions = results.flatMap((result) => result.contributions);
        const uniqueContributions = Array.from(
          new Map(allContributions.map((day) => [day.date, day])).values()
        );
        setStats(getContributionStats(uniqueContributions));
        setActiveYears(
          results
            .filter((result) => result.contributions.some((day) => day.count > 0))
            .map((result) => result.year)
        );
      }
    });

    return () => {
      cancelled = true;
    };
  }, [currentYear]);

  const engineeringTools = [
    { name: "GitHub Actions", icon: SiGithubactions, color: "#2088FF" },
    { name: "Docker", icon: SiDocker, color: "#2496ED" },
    { name: "Kubernetes", icon: SiKubernetes, color: "#326CE5" },
    { name: "Jenkins", icon: SiJenkins, color: "#D24939" },
    { name: "GitLab CI/CD", icon: SiGitlab, color: "#FC6D26" },
    { name: "Azure DevOps", icon: SiAzuredevops, color: "#0078D7" },
  ];

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
      <div className="glass-panel github-calendar-wrap">
        <div className="github-calendar-toolbar">
          <div>
            <p className="github-calendar-overline">GitHub activity</p>
            <h2>{selectedYear === "last" ? t("about.recentActivity") : selectedYear}</h2>
          </div>
          <label className="github-year-control">
            <span>{t("about.year")}</span>
            <select
              value={selectedYear}
              onChange={(event) => setSelectedYear(event.target.value === "last" ? "last" : Number(event.target.value))}
              aria-label={t("about.year")}
            >
              <option value="last">{t("about.untilToday")}</option>
              {activeYears.map((year) => (
                <option value={year} key={year}>
                  {year}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="github-stats" aria-label={t("about.contributionStats")}>
          <div className="github-stat-card github-stat-primary">
            <strong>{stats.total}</strong>
            <span>{t("about.totalContributionsAllTime")}</span>
          </div>
          <div className="github-stat-card">
            <strong>{stats.current}</strong>
            <span>{t("about.latestStreak")}</span>
          </div>
          <div className="github-stat-card github-streaks-card">
            <span className="github-stat-label">{t("about.bestStreaks")}</span>
            <div className="github-streak-list">
              {stats.topStreaks.length > 0 ? stats.topStreaks.map((streak, index) => (
                <span key={`${streak}-${index}`}>
                  <b>#{index + 1}</b> {streak} {t("about.daysShort")}
                </span>
              )) : <span>{t("about.noStreak")}</span>}
            </div>
          </div>
        </div>
        <div className="github-calendar-scroll">
          <GitHubCalendar
            username="Brahim-semlali"
            year={selectedYear}
            blockSize={14}
            blockMargin={4}
            color="#45e0d0"
            fontSize={14}
          />
        </div>
        <div className="engineering-tools">
          <div>
            <p className="github-calendar-overline">{t("about.engineeringTitle")}</p>
            <p className="engineering-tools-subtitle">{t("about.engineeringSubtitle")}</p>
          </div>
          <div className="engineering-tools-list">
            {engineeringTools.map(({ name, icon: Icon, color }) => (
              <span className="engineering-tool" key={name} title={name}>
                <Icon style={{ color }} />
                <span>{name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Row>
  );
}

export default Github;
