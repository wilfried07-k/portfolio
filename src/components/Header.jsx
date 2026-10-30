import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { profile } from "../data/profile.js";
import useActiveSection from "../hooks/useActiveSection.js";

const SECTIONS = ["about", "skills", "experience", "projects", "contact"];
const THEME_KEY = "portfolio-theme";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light"
  );
  const active = useActiveSection(SECTIONS);

  // Ombre sous l'en-tête dès qu'on défile
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile avec la touche Échap
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* ignoré */
    }
  }

  const close = () => setOpen(false);
  const link = (id, label) => (
    <a
      href={`#${id}`}
      onClick={close}
      className={active === id ? "is-active" : undefined}
      aria-current={active === id ? "true" : undefined}
    >
      {label}
    </a>
  );

  return (
    <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
      <div className="container header__inner">
        <a href="#top" className="header__brand" onClick={close}>
          {profile.name}
          <span className="header__dot">.</span>
        </a>

        <nav
          id="main-nav"
          className={`header__nav ${open ? "is-open" : ""}`}
          aria-label="Navigation"
        >
          {link("about", t.nav.about)}
          {link("skills", t.nav.skills)}
          {link("experience", t.nav.experience)}
          {link("projects", t.nav.projects)}
          {link("contact", t.nav.contact)}
        </nav>

        <div className="lang" role="group" aria-label={t.nav.langLabel}>
          {["fr", "en"].map((code) => (
            <button
              key={code}
              type="button"
              className={`lang__btn ${lang === code ? "is-active" : ""}`}
              aria-pressed={lang === code}
              onClick={() => setLang(code)}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="icon-btn"
          onClick={toggleTheme}
          aria-label={t.nav.theme}
          title={t.nav.theme}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
            {theme === "dark" ? (
              <g>
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </g>
            ) : (
              <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
            )}
          </svg>
        </button>

        <button
          type="button"
          className="icon-btn burger"
          aria-expanded={open}
          aria-controls="main-nav"
          aria-label={t.nav.menu}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>
    </header>
  );
}
