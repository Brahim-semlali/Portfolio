import React, { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./AnimatedHeroBackground.css";

export const backgrounds = [
  { id: 0, src: "/images/image1.png", section: "about" },
  { id: 1, src: "/images/image2.png", section: "education" },
  { id: 2, src: "/images/image3.png", section: "experience" },
  { id: 3, src: "/images/image4.png", section: "projects" },
  { id: 4, src: "/images/image5.png", section: "certifications" },
];

const SECTION_ALIASES = {
  home: "about",
  dossier: "education",
  contact: "certifications",
};

export function sectionToIndex(sectionId) {
  const resolved = SECTION_ALIASES[sectionId] || sectionId;
  const index = backgrounds.findIndex((item) => item.section === resolved);
  return index < 0 ? 0 : index;
}

function getMostVisibleSectionId() {
  const sections = document.querySelectorAll("main section[id]");
  if (!sections.length) return null;

  const viewportHeight = window.innerHeight;
  let bestId = null;
  let bestVisible = 0;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const visible = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
    if (visible > bestVisible) {
      bestVisible = visible;
      bestId = section.id;
    }
  });

  if (!bestId || bestVisible / viewportHeight < 0.4) return null;
  return bestId;
}

function AnimatedHeroBackground({ activeIndex, setActiveIndex, lockRef }) {
  const internalLock = useRef(false);
  const lock = lockRef || internalLock;
  const ratiosRef = useRef({});
  const active = backgrounds[activeIndex] || backgrounds[0];

  useEffect(() => {
    backgrounds.forEach((item) => {
      const image = new Image();
      image.src = item.src;
    });
  }, []);

  useEffect(() => {
    let frame = 0;

    const syncFromViewport = () => {
      frame = 0;
      const sectionId = getMostVisibleSectionId();
      if (sectionId) setActiveIndex(sectionToIndex(sectionId));
    };

    const onScroll = () => {
      lock.current = false;
      if (!frame) frame = requestAnimationFrame(syncFromViewport);
    };

    const ratios = ratiosRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          ratios[entry.target.id] = entry.intersectionRatio;
        });
        if (lock.current) return;

        const ranked = Object.entries(ratios).sort((a, b) => b[1] - a[1]);
        const [bestId, bestRatio] = ranked[0] || [];
        if (bestId && bestRatio >= 0.4) {
          setActiveIndex(sectionToIndex(bestId));
          return;
        }

        const sectionId = getMostVisibleSectionId();
        if (sectionId) setActiveIndex(sectionToIndex(sectionId));
      },
      {
        threshold: [0, 0.25, 0.4, 0.5, 0.75, 1],
        rootMargin: "0px",
      }
    );

    const observeSections = () => {
      const nodes = document.querySelectorAll("main section[id]");
      nodes.forEach((node) => observer.observe(node));
      return nodes.length > 0;
    };

    const setupTimer = window.setTimeout(() => {
      observeSections();
      syncFromViewport();
    }, 0);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.clearTimeout(setupTimer);
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [lock, setActiveIndex]);

  return (
    <div className="hero-bg" aria-hidden="true">
      <div className="hero-bg__preload">
        {backgrounds.map((item) => (
          <img
            key={item.id}
            src={item.src}
            alt=""
            loading={item.id === activeIndex ? "eager" : "lazy"}
          />
        ))}
      </div>

      <div className="hero-bg__wash" />
      <div className="hero-bg__stage">
        <div className="hero-bg__frame">
          <AnimatePresence exitBeforeEnter initial={false}>
            <motion.div
              key={activeIndex}
              className="hero-bg__layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <motion.img
                key={activeIndex}
                className="hero-bg__image"
                src={active.src}
                alt=""
                loading="eager"
                decoding="async"
                draggable="false"
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <div className="hero-bg__blend" />
    </div>
  );
}

export default AnimatedHeroBackground;
