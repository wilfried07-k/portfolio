import { useLanguage } from "../i18n/LanguageContext.jsx";
import { profile } from "../data/profile.js";
import Icon from "./Icon.jsx";

// Dernier morceau d'une adresse : https://github.com/nom -> nom
const handle = (url) => url.split("/").filter(Boolean).pop();

export default function Contact() {
  const { t } = useLanguage();
  const c = t.contact;

  const cards = [
    {
      key: "email",
      icon: "mail",
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    profile.whatsapp && {
      key: "whatsapp",
      icon: "whatsapp",
      value: profile.whatsappHandle,
      href: profile.whatsapp,
      external: true,
    },
    profile.location && { key: "location", icon: "pin", value: profile.location },
    profile.linkedin && {
      key: "linkedin",
      icon: "linkedin",
      value: c.viewProfile,
      href: profile.linkedin,
      external: true,
    },
    profile.github && {
      key: "github",
      icon: "github",
      value: handle(profile.github),
      href: profile.github,
      external: true,
    },
    profile.youtube && {
      key: "youtube",
      icon: "youtube",
      value: handle(profile.youtube),
      href: profile.youtube,
      external: true,
    },
  ].filter(Boolean);

  return (
    <section id="contact" className="section section--tinted">
      <div className="container">
        <h2 className="section__title">{c.title}</h2>

        <div className="contact">
          <div>
            <p className="contact__intro">{c.text}</p>
            <p className="status">
              <span className="status__dot" aria-hidden="true" />
              {c.status}
            </p>
            <div className="contact__actions">
              <a className="btn btn--primary" href={`mailto:${profile.email}`}>
                {c.email}
              </a>
              {profile.whatsapp && (
                <a
                  className="btn btn--ghost"
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  {c.whatsappCta}
                </a>
              )}
            </div>
          </div>

          <ul className="contact__cards">
            {cards.map(({ key, icon, value, href, external }) => {
              const body = (
                <>
                  <span className="contact-card__icon">
                    <Icon name={icon} size={20} />
                  </span>
                  <span className="contact-card__body">
                    <span className="contact-card__label">{c.labels[key]}</span>
                    <span className="contact-card__value">{value}</span>
                  </span>
                  {href && (
                    <span className="contact-card__arrow">
                      <Icon name="arrow" size={18} />
                    </span>
                  )}
                </>
              );
              return (
                <li key={key}>
                  {href ? (
                    <a
                      className="contact-card"
                      href={href}
                      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                    >
                      {body}
                    </a>
                  ) : (
                    <div className="contact-card">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
