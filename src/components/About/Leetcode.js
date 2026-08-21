import React, { useEffect, useState } from "react";
import { SiLeetcode } from "react-icons/si";
import { useLanguage } from "../../i18n/LanguageContext";

const LEETCODE_USERNAME = "N6bOSvgeHe";
const LEETCODE_PROFILE = "https://leetcode.com/u/N6bOSvgeHe/";
const LEETCODE_QUERY = `
  query userStats($username: String!) {
    matchedUser(username: $username) {
      profile { ranking }
      languageProblemCount { languageName problemsSolved }
      submitStatsGlobal {
        acSubmissionNum { difficulty count submissions }
      }
    }
  }
`;

function Leetcode() {
  const { t } = useLanguage();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/leetcode-graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: LEETCODE_QUERY,
        variables: { username: LEETCODE_USERNAME },
      }),
    })
      .then((response) => (response.ok ? response.json() : null))
      .then((result) => {
        const user = result?.data?.matchedUser;
        if (!cancelled && user) {
          const submissions = user.submitStatsGlobal?.acSubmissionNum || [];
          const allSubmissions = submissions.find((item) => item.difficulty === "All");
          setStats({
            totalSolved: allSubmissions?.count || 0,
            acceptanceRate: allSubmissions?.submissions
              ? ((allSubmissions.count / allSubmissions.submissions) * 100).toFixed(1)
              : "0.0",
            ranking: user.profile?.ranking || "-",
            languageProblemCount: user.languageProblemCount || [],
            difficultyStats: submissions.filter((item) => item.difficulty !== "All"),
          });
        } else if (!cancelled) {
          setError(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const statItems = stats ? [
    { label: t("about.leetcodeSolved"), value: stats.totalSolved },
    ...stats.difficultyStats.map((item) => ({
      label: item.difficulty,
      value: item.count,
      className: `leetcode-${item.difficulty.toLowerCase()}`,
    })),
    { label: t("about.leetcodeAcceptance"), value: `${stats.acceptanceRate}%` },
    { label: t("about.leetcodeRanking"), value: `#${stats.ranking}` },
  ] : [];

  return (
    <section id="leetcode" className="leetcode-section" aria-labelledby="leetcode-title">
      <div className="leetcode-heading">
        <div>
          <span className="section-tag">{t("about.leetcodeTag")}</span>
          <h2 id="leetcode-title">{t("about.leetcodeTitle")}</h2>
          <p>{t("about.leetcodeSubtitle")}</p>
        </div>
        <SiLeetcode className="leetcode-brand-icon" aria-hidden="true" />
      </div>

      {stats && (
        <>
          <div className="leetcode-grid">
            {statItems.map((item) => (
              <article className={`leetcode-stat ${item.className || ""}`} key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
          <div className="leetcode-language-stats">
            <span className="leetcode-language-label">{t("about.leetcodeByLanguage")}</span>
            <div className="leetcode-language-list">
              {stats.languageProblemCount.map((item) => (
                <span key={item.languageName}>
                  <b>{item.problemsSolved}</b> {t("about.leetcodeProblems")} · {item.languageName}
                </span>
              ))}
            </div>
          </div>
        </>
      )}

      {!stats && !error && <p className="leetcode-status">{t("about.leetcodeLoading")}</p>}
      {error && <p className="leetcode-status">{t("about.leetcodeError")}</p>}

      <a className="leetcode-link" href={LEETCODE_PROFILE} target="_blank" rel="noreferrer">
        <SiLeetcode /> {t("about.leetcodeProfile")}
      </a>
    </section>
  );
}

export default Leetcode;
