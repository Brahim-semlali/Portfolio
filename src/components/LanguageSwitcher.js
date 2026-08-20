import React from "react";
import { useLanguage } from "../i18n/LanguageContext";

function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();

  return (
    <div className="lang-switcher" role="group" aria-label={t("lang.label")}>
      <button
        type="button"
        className={`lang-btn ${lang === "fr" ? "active" : ""}`}
        onClick={() => setLang("fr")}
        aria-pressed={lang === "fr"}
      >
        FR
      </button>
      <button
        type="button"
        className={`lang-btn ${lang === "en" ? "active" : ""}`}
        onClick={() => setLang("en")}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageSwitcher;
