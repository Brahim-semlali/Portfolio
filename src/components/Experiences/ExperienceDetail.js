import React from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { BsArrowLeft, BsCalendar3, BsGeoAlt, BsGithub } from "react-icons/bs";
import { CgWebsite } from "react-icons/cg";
import { useLanguage } from "../../i18n/LanguageContext";
import experienceData from "./experienceData";
import TechLogos from "../Projects/TechLogos";
import "./ExperienceSection.css";

export default function ExperienceDetail() {
    const { id } = useParams();
    const { t } = useLanguage();
    const experience = experienceData.find((item) => item.id === id);

    if (!experience) {
        return <Navigate to="/experience" replace />;
    }

    const {
        company,
        role,
        period,
        location,
        logo,
        fullDescription,
        tasks,
        stack,
        ghLink,
        demoLink,
        images,
    } = experience;

    return (
        <main className="experience-detail-page">
            <div className="experience-detail-orbit experience-detail-orbit-one" />
            <div className="experience-detail-orbit experience-detail-orbit-two" />
            <div className="container experience-detail-container">
                <Link to="/experience" className="experience-back-link">
                    <BsArrowLeft /> {t("experience.back")}
                </Link>

                <header className="experience-detail-hero">
                    <div className="experience-detail-kicker">{period}</div>
                    <div className="experience-detail-heading">
                        <div className="experience-detail-logo-wrap">
                            <span className="experience-logo-fallback" aria-hidden="true">
                                {company.slice(0, 2).toUpperCase()}
                            </span>
                            {logo && (
                                <img
                                    src={logo}
                                    alt={company}
                                    className="experience-detail-logo"
                                    onError={(event) => {
                                        event.currentTarget.style.display = "none";
                                    }}
                                />
                            )}
                        </div>
                        <div>
                            <p className="experience-detail-eyebrow">{company}</p>
                            <h1>{role}</h1>
                        </div>
                    </div>
                    <div className="experience-detail-meta">
                        <span><BsCalendar3 /> {period}</span>
                        <span><BsGeoAlt /> {location}</span>
                    </div>
                </header>

                <div className="experience-detail-layout">
                    <section className="experience-detail-main">
                        <p className="experience-detail-description">{fullDescription}</p>

                        <div className="experience-detail-section">
                            <p className="experience-detail-label">{t("experience.tasksTitle")}</p>
                            <ul className="experience-detail-tasks">
                                {tasks.map((task, index) => (
                                    <li key={index}>{task}</li>
                                ))}
                            </ul>
                        </div>

                        {images && images.length > 0 && (
                            <div className="experience-detail-section">
                                <p className="experience-detail-label">{t("experience.previewTitle")}</p>
                                <div className="experience-images-grid">
                                    {images.map((src, index) => (
                                        <img key={index} src={src} alt={`${company} - ${index + 1}`} className="experience-preview-img" />
                                    ))}
                                </div>
                            </div>
                        )}
                    </section>

                    <aside className="experience-detail-sidebar">
                        <div className="experience-detail-panel">
                            <p className="experience-detail-label">{t("experience.stackTitle")}</p>
                            <TechLogos stack={stack} />
                        </div>

                        {(ghLink || demoLink) && (
                            <div className="experience-detail-actions">
                                {ghLink && (
                                    <Button variant="primary" href={ghLink} target="_blank" rel="noreferrer">
                                        <BsGithub /> GitHub
                                    </Button>
                                )}
                                {demoLink && (
                                    <Button className="btn-outline-glass" href={demoLink} target="_blank" rel="noreferrer">
                                        <CgWebsite /> {t("projects.demo")}
                                    </Button>
                                )}
                            </div>
                        )}
                    </aside>
                </div>
            </div>
        </main>
    );
}
