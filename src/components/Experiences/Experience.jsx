// src/components/Experiences/Experience.jsx
import React from "react";
import Container from "react-bootstrap/Container";
import Particle from "../Particle";
import ExperienceSection from "./ExperienceSection";

function Experience() {
    return (
        <Container fluid className="project-section">
            <Particle />
            <Container>
                <ExperienceSection />
            </Container>
        </Container>
    );
}

export default Experience;