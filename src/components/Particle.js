import React from "react";
import Particles from "react-tsparticles";

function Particle() {
  return (
    <Particles
      id="tsparticles"
      params={{
        background: { color: { value: "transparent" } },
        fpsLimit: 45,
        particles: {
          number: { value: 28, density: { enable: true, value_area: 1200 } },
          color: { value: ["#38bdf8", "#818cf8"] },
          shape: { type: "circle" },
          opacity: {
            value: 0.18,
            random: true,
            anim: { enable: false },
          },
          size: {
            value: 2,
            random: true,
            anim: { enable: false },
          },
          line_linked: {
            enable: true,
            distance: 120,
            color: "#64748b",
            opacity: 0.06,
            width: 1,
          },
          move: {
            enable: true,
            speed: 0.3,
            direction: "none",
            random: true,
            out_mode: "out",
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: false },
            onclick: { enable: false },
            resize: true,
          },
        },
        retina_detect: true,
      }}
    />
  );
}

export default Particle;
