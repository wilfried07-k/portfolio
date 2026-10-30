// Formation et expériences, issues du CV. Les périodes ne sont pas traduites.
// Un élément de "experience" peut n'avoir ni rôle, ni organisation traduite.

// "image" : fichier dans public/images/, de préférence au format 4:3 (ex. 640 x 480).
// "initials" : affichées dans un cadre neutre quand il n'y a pas encore d'image.
const IAI = "/images/iai.jpg";

export const education = [
  {
    id: "iai-3",
    period: "2025-2026",
    title: {
      fr: "3e année, ingénieur des travaux informatiques",
      en: "Third year, IT project engineer programme",
    },
    school: "IAI-Cameroun",
    image: IAI,
  },
  {
    id: "iai-2",
    period: "2024-2025",
    title: {
      fr: "2e année, DTS",
      en: "Second year, technical degree (DTS)",
    },
    school: "IAI-Cameroun",
    image: IAI,
  },
  {
    id: "iai-1",
    period: "2023-2024",
    title: { fr: "1re année", en: "First year" },
    school: "IAI-Cameroun",
    image: IAI,
  },
];

export const experience = [
  {
    id: "gcd4f",
    period: "2026",
    org: "Global Competition on Design for the Future (GCD4F 2026)",
    image: "/images/gcd4f.jpg",
  },
  {
    id: "cnps",
    period: "2025-2026",
    role: { fr: "Stage", en: "Internship" },
    org: "CNPS, Caisse Nationale de Prévoyance Sociale",
    image: "/images/cnps.jpg",
  },
  {
    id: "huawei-2",
    period: "2025-2026",
    role: { fr: "Participant", en: "Participant" },
    org: "Huawei ICT Competition",
    image: "/images/huawei-2026.jpg",
  },
  {
    id: "oic",
    period: "2024-2025",
    role: { fr: "Stage", en: "Internship" },
    org: "Ocean Innovation Center (OIC), Cameroun",
    image: "/images/oic.jpg",
  },
  {
    id: "huawei-1",
    period: "2024-2025",
    role: { fr: "Participant", en: "Participant" },
    org: "Huawei ICT Competition",
    image: "/images/huawei.jpg",
  },
  {
    id: "state-computing",
    period: "2023-2024",
    role: { fr: "Stage académique", en: "Academic internship" },
    org: "State Computing",
    image: "/images/state-computing.jpg",
  },
];

// Certifications. "issuer" (organisme) et "year" sont facultatifs : renseignez-les
// pour qu'ils s'affichent sous le titre.
export const certifications = [
  {
    id: "ai-ml-fundamentals",
    title: {
      fr: "Fondamentaux de l'IA et du machine learning",
      en: "AI and machine learning fundamentals",
    },
    issuer: "",
    year: "",
  },
];
