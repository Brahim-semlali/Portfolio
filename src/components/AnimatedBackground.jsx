import React, { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import "./AnimatedBackground.css";

const DEFAULT_ALIASES = {
  home: "about",
  contact: "certifications",
};

function resolveIndex(images, sectionId, aliases) {
  if (!images.length) return 0;
  const resolved = aliases[sectionId] || sectionId;
  const index = images.findIndex((image) => image.sectionId === resolved);
  return index < 0 ? 0 : index;
}

function AnimatedBackground({
  images = [],
  activeSectionId,
  onActiveChange,
  scrollLockRef,
  aliases = DEFAULT_ALIASES,
  threshold = 0.55,
}) {
  const prefersReducedMotion = useReducedMotion();
  const [internalIndex, setInternalIndex] = useState(0);
  const latestCallback = useRef(onActiveChange);
  latestCallback.current = onActiveChange;

  const isControlled = activeSectionId !== undefined;
  const activeIndex = isControlled
    ? resolveIndex(images, activeSectionId, aliases)
    : internalIndex;

  const kenBurnsOffset = (activeIndex % 4) * 0.025;
  const kenBurnsOrigin = `${35 + (activeIndex % 3) * 15}% ${40 + (activeIndex % 2) * 20}%`;
  const activeImage = images[activeIndex];

  useEffect(() => {
    images.forEach((image) => {
      if (!image?.src) return;
      const preload = new Image();
      preload.src = image.src;
    });
  }, [images]);

  useEffect(() => {
    const nodes = images
      .flatMap((image) => {
        const ids = [image.sectionId];
        Object.entries(aliases).forEach(([aliasId, targetId]) => {
          if (targetId === image.sectionId) ids.push(aliasId);
        });
        return ids;
      })
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!nodes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (scrollLockRef?.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const nextIndex = resolveIndex(images, visible.target.id, aliases);
        setInternalIndex(nextIndex);
        latestCallback.current?.(visible.target.id, nextIndex);
      },
      {
        threshold: [0.5, threshold, 0.6],
        rootMargin: "-20% 0px -20%",
      }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [aliases, images, scrollLockRef, threshold]);

  const fadeTransition = useMemo(
    () => ({
      duration: prefersReducedMotion ? 0.35 : 1.2,
      ease: "easeInOut",
    }),
    [prefersReducedMotion]
  );

  if (!activeImage) return null;

  return (
    <div className="animated-background" aria-hidden="true">
      <div className="animated-background__stage">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeImage.src + activeIndex}
            className="animated-background__layer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={fadeTransition}
          >
            <motion.img
              className="animated-background__media"
              src={activeImage.src}
              alt=""
              loading="eager"
              decoding="async"
              draggable="false"
              style={{ transformOrigin: kenBurnsOrigin }}
              initial={{ scale: 1 + kenBurnsOffset }}
              animate={
                prefersReducedMotion
                  ? { scale: 1 }
                  : { scale: [1 + kenBurnsOffset, 1.1] }
              }
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : {
                      duration: 16 + (activeIndex % 3) * 1.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "reverse",
                    }
              }
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="animated-background__wash" />
      <div className="animated-background__vignette" />
    </div>
  );
}

export default AnimatedBackground;
