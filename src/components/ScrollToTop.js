import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return undefined;
    }

    const targetId = decodeURIComponent(hash.slice(1));
    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    const frame = window.requestAnimationFrame(scrollToTarget);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

export default ScrollToTop;
