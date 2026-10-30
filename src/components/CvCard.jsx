import { useLanguage } from "../i18n/LanguageContext.jsx";
import { profile } from "../data/profile.js";

const versions = [
  { code: "fr", label: "Français" },
  { code: "en", label: "English" },
];

export default function CvCard() {
  const { t } = useLanguage();

  return (
    <div className="cv-card" id="cv">
      <div>
        <h3 className="cv-card__title">{t.cv.title}</h3>
        <p className="cv-card__text">{t.cv.text}</p>
      </div>

      <div className="cv-card__versions">
        {versions.map(({ code, label }) => (
          <div key={code} className="cv-card__version">
            <span className="cv-card__lang">{label}</span>
            <div className="cv-card__actions">
              <a
                className="btn btn--primary btn--small"
                href={profile.cv[code]}
                target="_blank"
                rel="noreferrer"
              >
                {t.cv.view}
              </a>
              <a
                className="btn btn--ghost btn--small"
                href={profile.cv[code]}
                download={`CV-Kana-Ulrich-${code.toUpperCase()}.pdf`}
              >
                {t.cv.download}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
