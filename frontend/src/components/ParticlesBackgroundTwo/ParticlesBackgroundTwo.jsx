import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const NewParticlesBackground = () => {
    const particlesInit = async (main) => {
        // Load tsparticles engine
        await loadFull(main);
    };

    const particlesOptions = {
        fullScreen: { enable: true, zIndex: -1 }, // Full-screen background
        background: {
            color: {
                value: "#222", // Background color
            },
        },
        particles: {
            number: {
                value: 100, // Number of particles
                density: {
                    enable: true,
                    area: 800, // Density area for particles
                },
            },
            color: {
                value: "#ffffff", // Particle color
            },
            shape: {
                type: "circle", // Circle-shaped particles
            },
            opacity: {
                value: { min: 0.1, max: 0.5 }, // Random opacity
                animation: {
                    enable: true,
                    speed: 1,
                    minimumValue: 0.1,
                },
            },
            size: {
                value: { min: 1, max: 10 }, // Random size
                animation: {
                    enable: true,
                    speed: 10,
                    minimumValue: 1,
                },
            },
            move: {
                enable: true,
                speed: 2,
                direction: "none", // No predefined direction
                outModes: {
                    default: "out",
                },
                random: false, // Disable random movement for controlled behavior
                straight: false, // Smooth movement
            },
        },
        interactivity: {
            detectsOn: "canvas", // Detects interaction within the canvas
            events: {
                onHover: {
                    enable: true,
                    mode: "repulse", // Repulse effect on hover
                },
                onClick: {
                    enable: true,
                    mode: "push", // Add particles on click
                },
            },
            modes: {
                repulse: {
                    distance: 100, // Distance for repulsion
                    duration: 0.4, // Duration of the effect
                },
                push: {
                    quantity: 4, // Number of particles added on click
                },
                grab: {
                    distance: 200, // Grab effect radius
                    links: {
                        opacity: 0.5, // Opacity of link lines (set to 0 to hide)
                    },
                },
            },
        },
        detectRetina: true, // Adjust for high-DPI screens
    };

    return <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />;
};

export default NewParticlesBackground;
