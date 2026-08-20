// src/components/Experiences/ExperienceSection.jsx
import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import ExperienceCard from "./ExperienceCard";
import experienceData from "./experienceData";
import { useLanguage } from "../../i18n/LanguageContext";
import "./ExperienceSection.css";

export default function ExperienceSection() {
    const { t } = useLanguage();

    return (
        <Container fluid className="experience-section" id="experience">
            <Container>
                <p className="section-tag">{t("experience.tag")}</p>
                <h1 className="experience-heading">
                    {t("experience.title")}{" "}
                    <strong className="purple">{t("experience.titleHighlight")}</strong>
                </h1>
                <p className="experience-subheading">{t("experience.subtitle")}</p>

                <Row className="justify-content-center">
                    {experienceData.map((exp) => (
                        <Col md={6} lg={4} className="experience-col" key={exp.id}>
                            <ExperienceCard experience={exp} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
}