import React, { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../Assets/profile.jpeg";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import { CgGitFork } from "react-icons/cg";
import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineFundProjectionScreen,
  AiOutlineUser,
} from "react-icons/ai";
import { CgFileDocument } from "react-icons/cg";
import { BsAward, BsBriefcase } from "react-icons/bs";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import { useLanguage } from "../i18n/LanguageContext";

function NavBar() {
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);
  const [dismissedPreview, setDismissedPreview] = useState(null);
  const { t } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const scrollHandler = () => {
      updateNavbar(window.scrollY >= 16);
    };
    scrollHandler();
    window.addEventListener("scroll", scrollHandler, { passive: true });
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  const navPreviews = {
    home: t("nav.previewHome").map((label, index) => ({ label, hash: ["#home", "#about", "#contact"][index] })),
    about: t("nav.previewAbout").map((label, index) => ({ label, hash: ["#profile", "#skills", "#tools", "#github", "#leetcode"][index] })),
    projects: t("nav.previewProjects").map((label) => ({ label, hash: "#projects" })),
    experience: t("nav.previewExperience").map((label) => ({ label, hash: "#experience" })),
    certifications: t("nav.previewCertifications").map((label) => ({ label, hash: "#certifications" })),
    resume: t("nav.previewResume").map((label) => ({ label, hash: "#resume" })),
  };

  const renderNavLink = (key, to, Icon) => (
    <>
      <Nav.Link
        as={Link}
        to={to}
        onClick={() => {
          updateExpanded(false);
          setDismissedPreview(key);
        }}
        onMouseEnter={() => setDismissedPreview(null)}
        className={`nav-link-with-preview ${location.pathname === to ? "active" : ""}`}
      >
        <span className="nav-link-label"><Icon /> {t(`nav.${key}`)}</span>
      </Nav.Link>
      {navPreviews[key].length > 0 && (
        <span className={`nav-preview ${dismissedPreview === key ? "nav-preview-dismissed" : ""}`}>
          {navPreviews[key].map((item) => (
            <Link
              key={item.label}
              to={`${to}${item.hash}`}
              onClick={() => {
                updateExpanded(false);
                setDismissedPreview(key);
              }}
            >
              # {item.label}
            </Link>
          ))}
        </span>
      )}
    </>
  );

  return (
      <Navbar
          expanded={expand}
          fixed="top"
          expand="lg"
          className={navColour ? "sticky" : "navbar"}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex">
            <img src={logo} className="img-fluid logo" alt="Brahim Semlali" />
            <span className="brand-name">
            Brahim<span className="purple">.</span>
          </span>
          </Navbar.Brand>

          <div className="navbar-tools">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Navbar.Toggle
                aria-controls="responsive-navbar-nav"
                onClick={() => {
                  updateExpanded(expand ? false : "expanded");
                }}
            >
              <span></span>
              <span></span>
              <span></span>
            </Navbar.Toggle>
          </div>

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto" defaultActiveKey="#home">
              <Nav.Item>
                {renderNavLink("home", "/", AiOutlineHome)}
              </Nav.Item>

              <Nav.Item>
                {renderNavLink("about", "/about", AiOutlineUser)}
              </Nav.Item>

              <Nav.Item>
                {renderNavLink("projects", "/project", AiOutlineFundProjectionScreen)}
              </Nav.Item>

              <Nav.Item>
                {renderNavLink("experience", "/experience", BsBriefcase)}
              </Nav.Item>

              <Nav.Item>
                {renderNavLink("certifications", "/certifications", BsAward)}
              </Nav.Item>

              <Nav.Item>
                {renderNavLink("resume", "/resume", CgFileDocument)}
              </Nav.Item>

              <Nav.Item className="fork-btn">
                <Button
                    href="https://github.com/Brahim-semlali"
                    target="_blank"
                    className="fork-btn-inner"
                >
                  <CgGitFork /> <AiFillStar />
                </Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
  );
}

export default NavBar;