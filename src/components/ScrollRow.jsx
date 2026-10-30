import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";

// Rangée à défilement horizontal, avec flèches précédent / suivant.
export default function ScrollRow({ label, children }) {
  const { t } = useLanguage();
  const ref = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    window.addEventListener("resize", update);
    const ro = "ResizeObserver" in window ? new ResizeObserver(update) : null;
    if (ro && el) ro.observe(el);
    return () => {
      window.removeEventListener("resize", update);
      ro?.disconnect();
    };
  }, [update]);

  function scrollByPage(dir) {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="scroller">
      <button
        type="button"
        className="scroller__btn scroller__btn--prev"
        onClick={() => scrollByPage(-1)}
        aria-label={t.nav.prev}
        hidden={!canPrev}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>

      <div
        className="scroll-box"
        ref={ref}
        onScroll={update}
        tabIndex={0}
        role="region"
        aria-label={label}
      >
        {children}
      </div>

      <button
        type="button"
        className="scroller__btn scroller__btn--next"
        onClick={() => scrollByPage(1)}
        aria-label={t.nav.next}
        hidden={!canNext}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
          <path d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
