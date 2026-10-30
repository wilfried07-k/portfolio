import { useEffect } from "react";

// Éléments qui apparaissent en douceur quand on arrive dessus.
const SELECTOR = [
  ".section__title",
  ".section__intro",
  ".prose",
  ".skills__group",
  ".timeline__item",
  ".resume__heading",
  ".cv-card",
  ".project",
  ".focus__card",
  ".stat",
  ".contact-card",
].join(",");

export default function useReveal() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    const items = document.querySelectorAll(SELECTOR);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add("is-visible");
          observer.unobserve(el);
          // Une fois affiché, on retire les classes pour rendre la main au CSS normal.
          setTimeout(() => {
            el.classList.remove("reveal", "is-visible");
            el.style.removeProperty("--d");
          }, 1000);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );

    items.forEach((el, i) => {
      el.classList.add("reveal");
      el.style.setProperty("--d", `${(i % 4) * 80}ms`);
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
}
