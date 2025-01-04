import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const NewParticlesBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine); // Ensures tsparticles engine is loaded
  }, []);

  const particlesOptions = {
    fullScreen: { enable: true, zIndex: -1 }, // Particles cover the full background
    background: {
      color: { value: "#111" }, // Match desired background color
    },
    particles: {
      number: {
        value: 250, // Increase particle count
        density: { enable: true, value_area: 800 },
      },
      color: { value: ["#FFFFFF"] },
      shape: { type: "circle" }, // Keep one definition of "shape"
      opacity: {
        value: 0.5, // Set default opacity for circles
        random: true, // Allow random opacity values
        animation: {
          enable: true, // Enable opacity animation
          speed: 2, // Speed of opacity animation
          minimumValue: 0.1, // Minimum opacity value during animation
          sync: false, // Animate independently for each circle
        },
      },
      size: {
        value: 7,
        random: true,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "bottom",
        random: false,
        straight: false,
        outModes: { default: "out" },
        trail: {
          enable: true,
          length: 10, // Length of the trail
          fillColor: "#000000", // Background color for the trail
        },
      },
      links: {
        enable: true, // Enable links between particles
        distance: 150, // Maximum link distance
        color: "#ffffff",
        opacity: 0.1,
      },
    },
    interactivity: {
      detectsOn: "window", // Ensure interaction across the entire window
      events: {
        onHover: {
          enable: true, // Enable hover interactions
          mode: "grab", // Use "grab" mode
        },
        onClick: {
          enable: true, // Enable click interactions
          mode: "push", // Add particles on click
        },
      },
      modes: {
        grab: {
          distance: 200, // Interaction distance
          links: {
            opacity: 0.5, // Opacity of the grab effect
          },
        },
        push: {
          quantity: 4, // Number of particles added on click
        },
      },
    },
    detectRetina: true,
  };

  return <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />;
};

export default NewParticlesBackground;
