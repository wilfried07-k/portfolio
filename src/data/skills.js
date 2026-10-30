// Un élément peut être un texte simple, ou { fr, en } quand il doit être traduit.
// Chaque clé correspond à un groupe dont le titre est dans i18n/translations.js.
export const skills = {
  mobile: ["Flutter", "Dart", "React Native", "Android"],
  web: ["React", "Next.js", "JavaScript", "HTML / CSS", "Tailwind", "WordPress", "Webflow"],
  backend: ["Node.js", "Python", "Java", "FastAPI", "Supabase", "MySQL", { fr: "IA", en: "AI" }],
  security: [
    { fr: "Réseaux IP et routage (OSPF)", en: "IP networks and routing (OSPF)" },
    { fr: "Sécurité des bases de données", en: "Database security" },
    "OWASP ZAP",
  ],
  cloud: ["Docker", "Azure", "Google Cloud", "Render", "Vercel", "Netlify"],
  tools: ["Git / GitHub", "VS Code", "Figma", "Postman", "Chrome DevTools"],
  languages: [
    { fr: "Français", en: "French" },
    { fr: "Anglais", en: "English" },
  ],
};
