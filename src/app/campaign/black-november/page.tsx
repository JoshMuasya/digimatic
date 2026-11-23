import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { campaign, isCampaignActive, packageContactHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Black November",
  description: "Digimatic Marketers’ Black November starter website campaign for small businesses.",
};

export const dynamic = "force-dynamic";

export default function BlackNovemberPage() {
  const active = isCampaignActive();

  return (
    <section className="site-hero border-b border-border py-12 sm:py-20">
      <div className="site-container">
        <nav aria-label="Breadcrumb" className="mb-9 flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="rounded-sm hover:text-foreground">Home</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{campaign.name}</span>
        </nav>
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <p className="mb-4 text-sm font-semibold text-secondary">{campaign.name} · Year-End Special</p>
            <h1 className="text-4xl leading-[1.05] font-bold tracking-[-0.045em] sm:text-6xl">
              Make your business
              <span className="block text-secondary">impossible to overlook.</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              A starter website for small businesses, consultants, shops, creatives and service providers ready to get online.
            </p>
            <p className="mt-4 text-sm font-medium text-primary">
              {active ? `Offer available through ${campaign.endLabel}.` : `This offer ended on ${campaign.endLabel}.`}
            </p>
          </div>

          <article className="rounded-3xl border border-secondary/40 bg-gradient-to-br from-card to-muted p-6 shadow-[var(--shadow-glow)] sm:p-9">
            <h2 className="text-xl font-semibold">Starter website package</h2>
            {active && <p className="mt-2 text-5xl font-bold tracking-tight text-secondary sm:text-6xl">{campaign.price}</p>}
            <ul className="my-6 space-y-3 border-y border-border py-5 text-sm text-muted-foreground">
              {campaign.includes.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />{item}
                </li>
              ))}
            </ul>
            <Button asChild variant="secondary" size="lg" className="w-full sm:w-auto">
              {active ? (
                <Link href={packageContactHref(campaign.packageId)}>
                  Claim the Campaign Offer <ArrowUpRight aria-hidden="true" />
                </Link>
              ) : (
                <Link href="/pricing">View Current Packages <ArrowUpRight aria-hidden="true" /></Link>
              )}
            </Button>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Domain, hosting, paid integrations, copywriting and extra features may be priced separately.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
