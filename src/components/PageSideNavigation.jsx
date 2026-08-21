import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useLanguage } from "../i18n/LanguageContext";

const PAGE_ORDER = ["/", "/about", "/project", "/experience", "/certifications", "/resume"];
const PAGE_LABEL_KEYS = ["home", "about", "projects", "experience", "certifications", "resume"];

export default function PageSideNavigation() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = Math.max(
    0,
    PAGE_ORDER.findIndex((path) => location.pathname === path || location.pathname.startsWith(`${path}/`))
  );
  const nextIndex = currentIndex + 1;
  const touchStart = useRef(null);

  const goToPage = (direction) => {
    const nextIndex = Math.min(PAGE_ORDER.length - 1, Math.max(0, currentIndex + direction));
    navigate(PAGE_ORDER[nextIndex]);
  };

  useEffect(() => {
    const handleTouchStart = (event) => {
      touchStart.current = event.changedTouches[0];
    };

    const handleTouchEnd = (event) => {
      if (!touchStart.current) return;

      const touchEnd = event.changedTouches[0];
      const deltaX = touchEnd.clientX - touchStart.current.clientX;
      const deltaY = touchEnd.clientY - touchStart.current.clientY;
      touchStart.current = null;

      if (Math.abs(deltaX) < 70 || Math.abs(deltaX) <= Math.abs(deltaY)) return;
      goToPage(deltaX < 0 ? 1 : -1);
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  });

  return (
    <nav className="page-side-navigation" aria-label={t("nav.pageNavigation")}>
      {currentIndex > 0 && (
        <button
          type="button"
          className="page-swipe-hint page-swipe-hint-previous"
          onClick={() => goToPage(-1)}
          aria-label={`${t("nav.previousPage")}: ${t(`nav.${PAGE_LABEL_KEYS[currentIndex - 1]}`)}`}
        >
          <BsChevronLeft aria-hidden="true" />
          <strong>{t(`nav.${PAGE_LABEL_KEYS[currentIndex - 1]}`)}</strong>
        </button>
      )}
      {nextIndex < PAGE_ORDER.length && (
        <button
          type="button"
          className="page-swipe-hint"
          onClick={() => goToPage(1)}
          aria-label={`${t("nav.nextPage")}: ${t(`nav.${PAGE_LABEL_KEYS[nextIndex]}`)}`}
        >
          <strong>{t(`nav.${PAGE_LABEL_KEYS[nextIndex]}`)}</strong>
          <BsChevronRight aria-hidden="true" />
        </button>
      )}
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
