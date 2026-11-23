export type ProjectCategory = "Web" | "App" | "NGO" | "E-commerce";

export type Project = {
  title: string;
  /** Short client name shown in the hero caption. */
  client: string;
  /** Short label shown in the hero caption, e.g. "Website project". */
  kind: string;
  shortDescription: string;
  longDescription: string;
  image: string;
  link: string;
  tags: string[];
  category: ProjectCategory;
  /** Include this project in the homepage hero carousel. */
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Joshua Muasya – Portfolio",
    client: "Joshua Muasya",
    kind: "Portfolio website",
    shortDescription: "A sleek and professional portfolio showcasing my skills and projects.",
    longDescription:
      "A modern and responsive developer portfolio built with Next.js and Tailwind CSS. Highlights my skills in full-stack development, animations, and optimized performance across devices.",
    image: "/portfolio.png",
    link: "https://josh-portfolio-eight.vercel.app/",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Web",
  },
  {
    title: "Nyiha-Mathenge Advocates",
    client: "Nyiha Mathenge Advocates",
    kind: "Website project",
    shortDescription: "A professional law firm website with modern design and clear service presentation.",
    longDescription:
      "A full-service law firm website built to establish trust and credibility. Features service breakdowns, lawyer profiles, a blog section, and client contact options with a clean, modern design.",
    image: "/nma.png",
    link: "https://nyihamathengelaw.com/",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Web",
    featured: true,
  },
  {
    title: "Gatherly",
    client: "Gatherly",
    kind: "Event platform",
    shortDescription:
      "A modern event management platform currently in development, designed to simplify planning and coordination.",
    longDescription:
      "Gatherly is an innovative event management platform built to streamline event planning, coordination, and guest engagement. It will feature RSVP management, role-based access (admins, organizers, and staff), real-time updates, and an intuitive dashboard for seamless control.",
    image: "/gatherly.png",
    link: "https://gatherly-three-rho.vercel.app/",
    tags: ["Next.js", "PostgreSQL", "Prisma"],
    category: "App",
    featured: true,
  },
  {
    title: "Wilhide Bakers – Website",
    client: "Wilhide Bakers",
    kind: "E-commerce website",
    shortDescription: "A modern bakery website showcasing delightful products and ordering features. (Under Development)",
    longDescription:
      "A clean, elegant, and mobile-friendly website for Wilhide Bakers, designed with Next.js and Tailwind CSS. The platform highlights bakery products, custom cake options, and smooth browsing experiences.",
    image: "/wilhide.png",
    link: "https://wilhade-bakers.vercel.app/",
    tags: ["Next.js", "Tailwind CSS", "E-commerce"],
    category: "E-commerce",
    featured: true,
  },
  {
    title: "NEFEA – Network on Forest Enterprises in Africa",
    client: "NEFEA",
    kind: "NGO website",
    shortDescription: "A non-profit organization site promoting African gums and resins.",
    longDescription:
      "An international NGO website dedicated to promoting African gums and resins as key non-timber forest products. Includes organizational history, mission, resources, and initiatives across Africa.",
    image: "/nefea.png",
    link: "https://www.nefea.org/",
    tags: ["WordPress", "Custom Theme", "SEO"],
    category: "NGO",
    featured: true,
  },
  {
    title: "Twilight Luxe Creations",
    client: "Twilight Luxe Creations",
    kind: "Website project",
    shortDescription: "An elegant event planning and management company website.",
    longDescription:
      "A premium event management website showcasing services such as planning, styling, catering, photography, entertainment, rentals, invitations, logistics, and corporate event solutions.",
    image: "/luxe.png",
    link: "https://twilight-luxe-creations.vercel.app/",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
    category: "Web",
    featured: true,
  },
  {
    title: "Kirie Scripts",
    client: "Kirie Scripts",
    kind: "Web app",
    shortDescription: "A minimal project website currently under development.",
    longDescription:
      "Kirie Scripts is a work-in-progress project with future potential for automation tools and custom scripts. The site is currently in its early stages of development.",
    image: "/kirie.png",
    link: "https://kirie-scripts.vercel.app/",
    tags: ["Next.js", "TypeScript"],
    category: "App",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function displayDomain(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
