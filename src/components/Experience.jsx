import { useLanguage } from "../i18n/LanguageContext.jsx";
import { certifications, education, experience } from "../data/experience.js";
import ScrollRow from "./ScrollRow.jsx";
import Icon from "./Icon.jsx";
import CvCard from "./CvCard.jsx";

export default function Experience() {
  const { lang, t } = useLanguage();

  return (
    <section id="experience" className="section section--tinted">
      <div className="container">
        <h2 className="section__title">{t.experience.title}</h2>

        <div className="resume">
          <div>
            <h3 className="resume__heading">{t.experience.work}</h3>
            <ScrollRow label={t.experience.work}>
            <ol className="timeline">
              {experience.map((item) => (
                <li key={item.id} className="timeline__item">
                  {item.image ? (
                    <img
                      className="timeline__img"
                      src={item.image}
                      alt={item.org}
                      loading="lazy"
                    />
                  ) : (
                    <div className="timeline__img timeline__img--empty" aria-hidden="true">
                      {item.initials}
                    </div>
                  )}
                  <span className="timeline__period">{item.period}</span>
                  {item.role && (
                    <strong className="timeline__title">{item.role[lang]}</strong>
                  )}
                  <span className="timeline__meta">{item.org}</span>
                </li>
              ))}
            </ol>
            </ScrollRow>
          </div>

          <div>
            <h3 className="resume__heading">{t.experience.education}</h3>
            <ScrollRow label={t.experience.education}>
            <ol className="timeline">
              {education.map((item) => (
                <li key={item.id} className="timeline__item">
                  {item.image ? (
                    <img
                      className="timeline__img"
                      src={item.image}
                      alt={item.school}
                      loading="lazy"
                    />
                  ) : (
                    <div className="timeline__img timeline__img--empty" aria-hidden="true">
                      {item.initials}
                    </div>
                  )}
                  <span className="timeline__period">{item.period}</span>
                  <strong className="timeline__title">{item.title[lang]}</strong>
                  <span className="timeline__meta">{item.school}</span>
                </li>
              ))}
            </ol>
            </ScrollRow>
          </div>

          <div>
            <h3 className="resume__heading">{t.experience.certifications}</h3>
            <ul className="certs">
              {certifications.map((c) => (
                <li key={c.id} className="cert">
                  <span className="cert__icon">
                    <Icon name="award" size={22} />
                  </span>
                  <span className="cert__body">
                    <span className="cert__label">{t.experience.certification}</span>
                    <strong className="cert__title">{c.title[lang]}</strong>
                    {(c.issuer || c.year) && (
                      <span className="cert__meta">
                        {[c.issuer, c.year].filter(Boolean).join(" · ")}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <CvCard />
      </div>
    </section>
  );
}
