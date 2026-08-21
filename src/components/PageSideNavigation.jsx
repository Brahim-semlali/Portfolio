import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useLanguage } from "../i18n/LanguageContext";

const PAGE_ORDER = ["/", "/about", "/project", "/experience", "/certifications", "/resume"];

export default function PageSideNavigation() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = Math.max(
    0,
    PAGE_ORDER.findIndex((path) => location.pathname === path || location.pathname.startsWith(`${path}/`))
  );

  const goToPage = (direction) => {
    const nextIndex = Math.min(PAGE_ORDER.length - 1, Math.max(0, currentIndex + direction));
    navigate(PAGE_ORDER[nextIndex]);
  };

  return (
    <nav className="page-side-navigation" aria-label={t("nav.pageNavigation")}>
      <button
        type="button"
        className="page-side-arrow page-side-arrow-left"
        onClick={() => goToPage(-1)}
        disabled={currentIndex === 0}
        aria-label={t("nav.previousPage")}
        title={t("nav.previousPage")}
      >
        <BsChevronLeft />
      </button>
      <button
        type="button"
        className="page-side-arrow page-side-arrow-right"
        onClick={() => goToPage(1)}
        disabled={currentIndex === PAGE_ORDER.length - 1}
        aria-label={t("nav.nextPage")}
        title={t("nav.nextPage")}
      >
        <BsChevronRight />
      </button>
    </nav>
  );
}
