import { useLanguage } from "../i18n/LanguageContext.jsx";
import { profile } from "../data/profile.js";
import Icon from "./Icon.jsx";

const NAV = ["about", "skills", "experience", "projects", "contact"];

export default function Footer() {
  const { t } = useLanguage();

  const social = [
    { label: "E-mail", icon: "mail", href: `mailto:${profile.email}` },
    profile.linkedin && { label: "LinkedIn", icon: "linkedin", href: profile.linkedin },
    profile.github && { label: "GitHub", icon: "github", href: profile.github },
    profile.youtube && { label: "YouTube", icon: "youtube", href: profile.youtube },
  ].filter(Boolean);

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__main">
          <a href="#top" className="footer__logo">
            {profile.name}
            <span className="header__dot">.</span>
          </a>
          <p className="footer__tagline">{t.footer.tagline}</p>

          <nav className="footer__nav" aria-label="Navigation">
            {NAV.map((id) => (
              <a key={id} href={`#${id}`}>
                {t.nav[id]}
              </a>
            ))}
          </nav>

          <ul className="footer__social">
            {social.map(({ label, icon, href }) => (
              <li key={label}>
                <a
                  href={href}
                  aria-label={label}
                  title={label}
                  {...(href.startsWith("mailto:") ? {} : { target: "_blank", rel: "noreferrer" })}
                >
                  <Icon name={icon} size={18} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} {profile.fullName.replace(/\.$/, "")}. {t.footer.rights}
          </span>
          <span className="footer__loc">{profile.location}</span>
          <a href="#top" className="footer__top-link">
            {t.footer.top} <Icon name="up" size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}
