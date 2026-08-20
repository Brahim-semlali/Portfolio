// src/components/Experience/ExperienceCard.jsx
import React, { useState } from "react";
import Card from "react-bootstrap/esm/Card";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import Badge from "react-bootstrap/esm/Badge";
import { BsGithub, BsCalendar3, BsGeoAlt } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { useLanguage } from "../../i18n/LanguageContext";

export default function ExperienceCard({ experience }) {
    const [showModal, setShowModal] = useState(false);
    const { t } = useLanguage();

    const {
        company,
        role,
        period,
        location,
        logo,
        shortDescription,
        fullDescription,
        tasks,
        stack,
        ghLink,
        demoLink,
        images,
    } = experience;

    return (
        <>
            {/* ---- CARTE ---- */}
            <Card
                className="experience-card"
                onClick={() => setShowModal(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setShowModal(true)}
            >
                <Card.Body>
                    <div className="experience-card-header">
                        {logo && (
                            <img src={logo} alt={company} className="experience-logo" />
                        )}
                        <div>
                            <Card.Title className="experience-company">{company}</Card.Title>
                            <Card.Subtitle className="experience-role">{role}</Card.Subtitle>
                        </div>
                    </div>

                    <div className="experience-meta">
                        <span><BsCalendar3 /> {period}</span>
                        <span><BsGeoAlt /> {location}</span>
                    </div>

                    <Card.Text className="experience-short-desc">
                        {shortDescription}
                    </Card.Text>

                    <div className="experience-stack-preview">
                        {stack.slice(0, 4).map((tech) => (
                            <Badge key={tech} className="experience-badge">
                                {tech}
                            </Badge>
                        ))}
                        {stack.length > 4 && (
                            <Badge className="experience-badge experience-badge-more">
                                +{stack.length - 4}
                            </Badge>
                        )}
                    </div>

                    <p className="experience-see-more">{t("experience.seeMore")}</p>
                </Card.Body>
            </Card>

            {/* ---- MODAL DÉTAIL ---- */}
            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                centered
                size="lg"
                className="experience-modal"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {role} — {company}
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <div className="experience-meta experience-modal-meta">
                        <span><BsCalendar3 /> {period}</span>
                        <span><BsGeoAlt /> {location}</span>
                    </div>

                    <p className="experience-full-desc">{fullDescription}</p>

                    <h6 className="experience-section-title">{t("experience.tasksTitle")}</h6>
                    <ul className="experience-tasks-list">
                        {tasks.map((task, i) => (
                            <li key={i}>{task}</li>
                        ))}
                    </ul>

                    <h6 className="experience-section-title">{t("experience.stackTitle")}</h6>
                    <div className="experience-stack-full">
                        {stack.map((tech) => (
                            <Badge key={tech} className="experience-badge">
                                {tech}
                            </Badge>
                        ))}
                    </div>

                    {images && images.length > 0 && (
                        <>
                            <h6 className="experience-section-title">{t("experience.previewTitle")}</h6>
                            <div className="experience-images-grid">
                                {images.map((src, i) => (
                                    <img
                                        key={i}
                                        src={src}
                                        alt={`${company} - ${i + 1}`}
                                        className="experience-preview-img"
                                    />
                                ))}
                            </div>
                        </>
                    )}

                    <div className="experience-modal-actions">
                        {ghLink && (
                            <Button variant="primary" href={ghLink} target="_blank" rel="noreferrer">
                                <BsGithub /> GitHub
                            </Button>
                        )}
                        {demoLink && (
                            <Button
                                className="btn-outline-glass"
                                href={demoLink}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <CgWebsite /> {t("projects.demo")}
                            </Button>
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}