import { useLanguage } from "../i18n/LanguageContext.jsx";
import ScrollRow from "./ScrollRow.jsx";
import { skills } from "../data/skills.js";

export default function Skills() {
  const { lang, t } = useLanguage();

  return (
    <section id="skills" className="section">
      <div className="container">
        <h2 className="section__title">{t.skills.title}</h2>

        <ScrollRow label={t.skills.title}>
        <div className="skills">
          {Object.entries(skills).map(([group, items]) => (
            <div key={group} className="skills__group">
              <h3>{t.skills.groups[group]}</h3>
              <ul className="tags">
                {items.map((item) => {
                  const label = typeof item === "string" ? item : item[lang];
                  return <li key={label}>{label}</li>;
                })}
              </ul>
            </div>
          ))}
        </div>
        </ScrollRow>
      </div>
    </section>
  );
}
