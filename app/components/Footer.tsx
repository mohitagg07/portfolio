"use client";

import { navigateToSection, scrollToSection } from "../utils/scroll";

const EMAIL = "mohitaggarwal2003@gmail.com";

const NAV = [
  ["About", "about"],
  ["Work", "work"],
  ["Videos", "youtube"],
  ["Contact", "contact"],
] as const;

const ELSEWHERE = [
  ["GitHub", "https://github.com/mohitagg07"],
  ["YouTube", "https://youtube.com/@MohitAgg07"],
  ["LinkedIn", "https://linkedin.com/in/mohitagg07"],
] as const;

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="section-wrap">
        <div className="site-footer__top">
          <div className="site-footer__identity">
            <p className="site-footer__name">Mohit Aggarwal</p>
            <p className="site-footer__role">AI &amp; software engineer</p>
            <p className="site-footer__blurb">
              Building practical AI tools and automations that make repetitive work easier to get done.
            </p>
          </div>

          <nav className="site-footer__col" aria-label="Footer">
            <p className="site-footer__label">Navigate</p>
            <ul>
              {NAV.map(([label, id]) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={(event) => navigateToSection(event, id)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__col">
            <p className="site-footer__label">Elsewhere</p>
            <ul>
              {ELSEWHERE.map(([label, href]) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${EMAIL}`}>Email</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} Mohit Aggarwal · Made with intention.</p>
          <button type="button" className="site-footer__top-link" onClick={() => scrollToSection("home")}>
            Back to top <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
