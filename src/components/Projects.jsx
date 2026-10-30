import { useLanguage } from "../i18n/LanguageContext.jsx";
import ScrollRow from "./ScrollRow.jsx";
import { projects } from "../data/projects.js";

export default function Projects() {
  const { lang, t } = useLanguage();

  return (
    <section id="projects" className="section">
      <div className="container">
        <h2 className="section__title">{t.projects.title}</h2>
        <p className="section__intro">{t.projects.intro}</p>

        <ScrollRow label={t.projects.title}>
        <ul className="projects">
          {projects.map((project) => {
            const title =
              typeof project.title === "string" ? project.title : project.title[lang];
            const [c1, c2] = project.colors || ["#0b6e5c", "#1f9fb5"];

            return (
              <li key={project.id} className="project">
                <div
                  className="project__thumb"
                  style={{ "--c1": c1, "--c2": c2 }}
                >
                  {project.image ? (
                    <img src={project.image} alt={title} loading="lazy" />
                  ) : (
                    <span className="project__monogram" aria-hidden="true">
                      {project.initials || title.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  {project.status && (
                    <span className="project__status">{project.status[lang]}</span>
                  )}
                </div>

                <h3 className="project__title">{title}</h3>
                <p className="project__text">{project.description[lang]}</p>

                <ul className="tags" aria-label="Stack">
                  {project.stack.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>

                {(project.apk || project.demo || project.code) && (
                  <div className="project__links">
                    {project.apk && (
                      <a href={project.apk} target="_blank" rel="noreferrer">
                        {t.projects.downloadApk}
                      </a>
                    )}
                    {project.demo && (
                      <a href={project.demo} target="_blank" rel="noreferrer">
                        {t.projects.viewDemo}
                      </a>
                    )}
                    {project.code && (
                      <a href={project.code} target="_blank" rel="noreferrer">
                        {t.projects.viewCode}
                      </a>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        </ScrollRow>
      </div>
    </section>
  );
}
