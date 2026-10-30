import { useLanguage } from "../i18n/LanguageContext.jsx";
import { profile } from "../data/profile.js";
import { projects } from "../data/projects.js";
import { education, experience } from "../data/experience.js";
import Icon from "./Icon.jsx";

export default function About() {
  const { t } = useLanguage();
  const a = t.about;

  const stats = [
    { n: projects.length, label: a.stats.projects },
    { n: experience.length, label: a.stats.experience },
    { n: education.length, label: a.stats.education },
  ];

  const facts = [
    { label: a.facts.location, value: profile.location },
    { label: a.facts.school, value: a.facts.schoolValue },
    { label: a.facts.languages, value: a.facts.languagesValue },
    { label: a.facts.interests, value: a.facts.interestsValue },
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <h2 className="section__title">{a.title}</h2>

        <div className="about">
          <div className="prose">
            {a.text.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className="about__side">
            <ul className="stats">
              {stats.map(({ n, label }) => (
                <li key={label} className="stat">
                  <span className="stat__n">{n}</span>
                  <span className="stat__l">{label}</span>
                </li>
              ))}
            </ul>

            <dl className="facts">
              {facts.map(({ label, value }) => (
                <div key={label} className="facts__row">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <h3 className="about__sub">{a.focusTitle}</h3>
        <ul className="focus">
          {a.focus.map(({ icon, title, text }) => (
            <li key={title} className="focus__card">
              <span className="focus__icon">
                <Icon name={icon} size={22} />
              </span>
              <h4 className="focus__title">{title}</h4>
              <p className="focus__text">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
