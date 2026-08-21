import React, { useEffect, useState } from "react";
import { BsMoonStars, BsSun } from "react-icons/bs";
import { useLanguage } from "../i18n/LanguageContext";

const STORAGE_KEY = "portfolio-theme";

export default function ThemeSwitcher() {
  const { t } = useLanguage();
  const [isLight, setIsLight] = useState(() => localStorage.getItem(STORAGE_KEY) === "light");

  useEffect(() => {
    document.documentElement.dataset.theme = isLight ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, isLight ? "light" : "dark");
  }, [isLight]);

  return (
    <button
      type="button"
      className="theme-switcher"
      onClick={() => setIsLight((value) => !value)}
      aria-label={isLight ? t("theme.dark") : t("theme.light")}
      title={isLight ? t("theme.dark") : t("theme.light")}
      aria-pressed={isLight}
    >
      {isLight ? <BsMoonStars /> : <BsSun />}
    </button>
  );
}
