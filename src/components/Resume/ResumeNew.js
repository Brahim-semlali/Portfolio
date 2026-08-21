import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
import pdfFile from "../../Assets/Brahim_Semlali_CV.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { useLanguage } from "../../i18n/LanguageContext";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const publicPdf = `${process.env.PUBLIC_URL || ""}/Brahim_Semlali_CV.pdf`;

function ResumeNew() {
  const { t } = useLanguage();
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  const [numPages, setNumPages] = useState(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    const updateWidth = () => setWidth(window.innerWidth);
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const pageWidth = Math.min(width - 48, 820);

  return (
    <div>
      <Container fluid className="resume-section" id="resume">
        <Particle />
        <Container>
          <span className="section-tag">{t("resume.tag")}</span>
          <h1 className="project-heading">
            {t("resume.title")}{" "}
            <span className="gradient-text">{t("resume.titleHighlight")}</span>
          </h1>
          <p className="section-subtitle">{t("resume.subtitle")}</p>
        </Container>

        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={publicPdf}
            target="_blank"
            rel="noreferrer"
            style={{ maxWidth: "260px", marginTop: "20px" }}
          >
            <AiOutlineDownload />
            &nbsp;{t("resume.download")}
          </Button>
        </Row>

        <div className="resume-viewer-wrap">
          {loadError ? (
            <div className="resume-fallback">
              <p>
                {t("resume.subtitle")}
              </p>
              <Button variant="primary" href={publicPdf} target="_blank" rel="noreferrer">
                <AiOutlineDownload />
                &nbsp;{t("resume.download")}
              </Button>
            </div>
          ) : (
            <Document
              file={pdfFile}
              onLoadSuccess={({ numPages: next }) => setNumPages(next)}
              onLoadError={() => setLoadError(true)}
              className="resume-document"
            >
              {Array.from(new Array(numPages || 1), (_, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={pageWidth}
                  renderTextLayer={false}
                  renderAnnotationLayer
                />
              ))}
            </Document>
          )}
        </div>

        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button
            variant="primary"
            href={publicPdf}
            target="_blank"
            rel="noreferrer"
            style={{ maxWidth: "260px", marginBottom: "20px" }}
          >
            <AiOutlineDownload />
            &nbsp;{t("resume.download")}
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;
