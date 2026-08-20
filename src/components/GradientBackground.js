import React from "react";

function GradientBackground() {
  return (
    <div className="gradient-bg" aria-hidden="true">
      <div className="bg-grid" />
      <div className="bg-noise" />
      <div className="gradient-orb gradient-orb-1" />
      <div className="gradient-orb gradient-orb-2" />
      <div className="gradient-orb gradient-orb-3" />
    </div>
  );
}

export default GradientBackground;
