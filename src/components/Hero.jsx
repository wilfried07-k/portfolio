import { useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { profile } from "../data/profile.js";

const STORAGE_KEY = "portfolio-photo";
const SIZE = 800;

// Le bouton d'envoi n'apparaît qu'en développement (npm run dev)
// ou si l'adresse contient ?edit — jamais pour les visiteurs.
const canEdit =
  import.meta.env.DEV ||
  new URLSearchParams(window.location.search).has("edit");

function loadSavedPhoto() {
  try {
    return localStorage.getItem(STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

// Recadre au carré et réduit l'image pour rester léger.
function prepareImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const side = Math.min(img.width, img.height);
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = Math.min(SIZE, side);
        canvas.getContext("2d").drawImage(
          img,
          (img.width - side) / 2,
          (img.height - side) / 2,
          side,
          side,
          0,
          0,
          canvas.width,
          canvas.height
        );
        resolve(canvas.toDataURL("image/jpeg", 0.88));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function Hero() {
  const { lang, t } = useLanguage();
  const fileInput = useRef(null);
  const [uploaded, setUploaded] = useState(loadSavedPhoto);
  const [photoFailed, setPhotoFailed] = useState(false);

  const photoSrc = uploaded || profile.photo;


  async function handleFile(event) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file || !file.type.startsWith("image/")) return;
    try {
      const dataUrl = await prepareImage(file);
      setUploaded(dataUrl);
      setPhotoFailed(false);
      localStorage.setItem(STORAGE_KEY, dataUrl);
    } catch {
      /* image illisible ou stockage plein : on garde l'état actuel */
    }
  }

  return (
    <section id="top" className="hero">
      <div className="container">
        <div className="hero__grid">
          <div className="hero__photo-wrap">
            <div className="hero__photo-frame">
              <div className="hero__photo-ring">
                {photoSrc && !photoFailed ? (
                  <img
                    className="hero__photo"
                    src={photoSrc}
                    alt={profile.name}
                    onError={() => setPhotoFailed(true)}
                  />
                ) : (
                  <div className="hero__photo hero__photo--empty" aria-hidden="true">
                    {profile.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>

            {canEdit && (
              <div className="photo-tools">
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  hidden
                />
                <button
                  type="button"
                  className="photo-tools__btn"
                  onClick={() => fileInput.current?.click()}
                >
                  {t.hero.upload}
                </button>
              </div>
            )}
          </div>

          <div className="hero__text">
            <h1 className="hero__name">{profile.fullName}</h1>
            <p className="hero__title">{t.hero.title}</p>
            <p className="hero__option">{t.hero.option}</p>
            <p className="status hero__status">
              <span className="status__dot" aria-hidden="true" />
              {t.contact.status}
            </p>
            <p className="hero__intro">{t.hero.intro}</p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#projects">
                {t.hero.ctaProjects}
              </a>
              <a className="btn btn--ghost" href="#contact">
                {t.hero.ctaContact}
              </a>
              <a
                className="btn btn--ghost"
                href={profile.cv[lang]}
                target="_blank"
                rel="noreferrer"
              >
                {t.hero.viewCv}
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
