import React, { useState, useEffect, useRef, useCallback } from "react";
import Preloader from "./components/Pre";
import AnimatedHeroBackground from "./components/AnimatedHeroBackground";
import PortfolioExperience from "./components/PortfolioExperience";
import "./App.css";
import Admin from "./components/Admin/Admin";

function App() {
  const [load, upadateLoad] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const lockRef = useRef(false);

  const selectPortrait = useCallback((index) => {
    lockRef.current = true;
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (window.location.pathname.startsWith("/admin")) return <Admin />;

  return (
      <>
        <Preloader load={load} />
        <AnimatedHeroBackground
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          lockRef={lockRef}
        />
        <div className="App" id={load ? "no-scroll" : "scroll"}>
          <PortfolioExperience
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
            selectPortrait={selectPortrait}
          />
        </div>
      </>
  );
}

export default App;