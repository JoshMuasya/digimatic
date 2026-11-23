import type { Metadata } from "next";
import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Button } from "@/components/ui/button";
import { campaign, isCampaignActive, packageContactHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Pricing",
  description: "Compare business website and e-commerce packages from Digimatic Marketers.",
};

export const dynamic = "force-dynamic";

const packages = [
  {
    name: "Business Website",
    price: "From KSh 30,000",
    features: ["Custom page design", "Responsive layout", "Content management options", "SEO foundations"],
    href: packageContactHref("business-website"),
    label: "Request a Quote",
  },
  {
    name: "E-commerce",
    price: "Custom quote",
    features: ["Online catalogue", "Checkout and payment integration", "Order management", "Store handover"],
    href: packageContactHref("online-store"),
    label: "Request a Quote",
  },
];

const campaignPackage = {
  name: "Starter Website",
  price: campaign.price,
  features: campaign.includes,
  href: campaign.href,
  label: "View Campaign Offer",
};

export default function PricingPage() {
  const active = isCampaignActive();
  const availablePackages = active ? [campaignPackage, ...packages] : packages;

  return (
    <>
      <PageHero
        title="Website packages for your next stage"
        description="Compare the options and tell us what you need. We’ll confirm the scope and pricing before work starts."
      />
      <section aria-label="Website packages" className="site-container py-14 sm:py-20">
        <div className={active ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-5 sm:grid-cols-2"}>
          {availablePackages.map((plan) => {
            const featured = plan === campaignPackage;

            return (
              <article key={plan.name} className={`flex flex-col rounded-3xl border bg-gradient-glass p-6 sm:p-7 ${featured ? "border-secondary/55" : "border-border"}`}>
                <h2 className="text-2xl font-bold">{plan.name}</h2>
                <p className="mt-3 text-3xl font-semibold tracking-tight text-secondary">{plan.price}</p>
                {featured && <p className="mt-2 text-sm text-muted-foreground">Available through {campaign.endLabel}</p>}
                <ul className="mt-6 mb-8 space-y-3 border-t border-border pt-5 text-sm text-muted-foreground">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild variant={featured ? "secondary" : "outline"} className="mt-auto w-fit">
                  <Link href={plan.href}>{plan.label} <ArrowUpRight aria-hidden="true" /></Link>
                </Button>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
