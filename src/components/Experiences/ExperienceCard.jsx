// src/components/Experience/ExperienceCard.jsx
import React from "react";
import Card from "react-bootstrap/esm/Card";
import { BsCalendar3, BsGeoAlt } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import TechLogos from "../Projects/TechLogos";
import { animated, useSpring } from "@react-spring/web";

export default function ExperienceCard({ experience }) {
    const { t } = useLanguage();

    const {
        company,
        role,
        period,
        location,
        logo,
        shortDescription,
        stack,
    } = experience;
    const [cardAnimation, cardApi] = useSpring(() => ({
        transform: "translateY(0px)",
        config: { tension: 260, friction: 20 },
    }));

    return (
        <animated.div
            style={cardAnimation}
            onMouseEnter={() => cardApi.start({ transform: "translateY(-8px)" })}
            onMouseLeave={() => cardApi.start({ transform: "translateY(0px)" })}
        >
        <Card className="experience-card">
            <Link to={`/experience/${experience.id}`} className="experience-card-link">
                <Card.Body>
                    <div className="experience-card-header">
                        <div className="experience-logo-wrap">
                            <span className="experience-logo-fallback" aria-hidden="true">
                                {company.slice(0, 2).toUpperCase()}
                            </span>
                            {logo && (
                                <img
                                    src={logo}
                                    alt={company}
                                    className="experience-logo"
                                    onError={(event) => {
                                        event.currentTarget.style.display = "none";
                                    }}
                                />
                            )}
                        </div>
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

                    <TechLogos stack={stack.slice(0, 5)} className="experience-stack-preview" />

                    <p className="experience-see-more">{t("experience.seeMore")}</p>
                </Card.Body>
            </Link>
        </Card>
        </animated.div>
    );
}