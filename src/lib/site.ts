export const campaign = {
  href: "/campaign/black-november",
  name: "Black November",
  price: "KSh 9,999",
  endLabel: "30 November 2026",
  endsAt: "2026-12-01T00:00:00+03:00",
  packageId: "black-november",
  includes: [
    "Up to five agreed pages or sections",
    "Responsive, mobile-first design",
    "Contact form or WhatsApp enquiry link",
    "Basic on-page SEO setup",
    "One round of revisions and launch support",
  ],
} as const;

export function isCampaignActive(now = Date.now()) {
  return now < Date.parse(campaign.endsAt);
}

/**
 * Promotional banners. To run a new promotion, add an entry here — it shows
 * automatically between `startsAt` and `endsAt` (top banner + hero badge).
 * If several overlap, the first active one in the list wins.
 */
export type Promotion = {
  /** Unique per run; changing it re-shows the banner to visitors who dismissed an earlier one. */
  id: string;
  /** Short name, e.g. "Black November". */
  name: string;
  /** One-line offer, e.g. "Starter website for KSh 9,999". */
  message: string;
  ctaLabel: string;
  href: string;
  /** ISO date with timezone. Omit to start immediately. */
  startsAt?: string;
  /** ISO date with timezone; the promotion disappears at this moment. */
  endsAt: string;
  /** Human-readable end date shown to visitors. */
  endLabel?: string;
  /** Visual style. "dark" suits sales like Black Friday/November; "brand" uses site colours. */
  tone?: "dark" | "brand";
  /**
   * Campaign poster shown as the first slide of the homepage hero showcase.
   * Put the image in /public (e.g. /public/promos/black-november.jpg). Any shape
   * works — portrait/square posters are letterboxed over a blurred copy of themselves.
   */
  poster?: {
    src: string;
    alt: string;
  };
};

export const promotions: Promotion[] = [
  {
    id: "black-november-2026",
    name: campaign.name,
    message: `Starter website for ${campaign.price}`,
    ctaLabel: "Claim the offer",
    href: campaign.href,
    endsAt: campaign.endsAt,
    endLabel: campaign.endLabel,
    tone: "dark",
    poster: {
      src: "/promos/black-november1.png",
      alt: "Black November + Year-End Special poster: get your business online with a KSh 9,999 starter website — up to 5 pages, mobile-friendly design, WhatsApp integration and basic SEO setup.",
    },
  },
];

export function getActivePromotion(now = Date.now()): Promotion | undefined {
  return promotions.find(
    (p) => (!p.startsAt || now >= Date.parse(p.startsAt)) && now < Date.parse(p.endsAt),
  );
}

export const siteNavigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Work", href: "/projects" },
  { name: "Pricing", href: "/pricing" },
  { name: "Campaign", href: campaign.href },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
] as const;

export const projectPackages = {
  [campaign.packageId]: "Black November website starter",
  "business-website": "Business website",
  "online-store": "E-commerce website",
} as const;

export function packageContactHref(id: keyof typeof projectPackages) {
  return `/contact?package=${id}#enquiry`;
}
