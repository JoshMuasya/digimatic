import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { campaign } from "@/lib/site";

export default function CampaignFeature() {
  return (
    <section aria-labelledby="home-campaign-heading" className="site-container pb-14 sm:pb-20">
      <div className="grid items-center gap-6 rounded-3xl border border-secondary/35 bg-gradient-to-br from-card to-muted p-6 sm:p-10 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-sm font-semibold text-secondary">{campaign.name} · Year-End Special</p>
          <h2 id="home-campaign-heading" className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Get your business online for {campaign.price}
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            A responsive starter website with basic SEO and a direct way for customers to reach you. Available through {campaign.endLabel}.
          </p>
        </div>
        <Button asChild variant="secondary" size="lg" className="w-fit">
          <Link href={campaign.href}>Explore Black November <ArrowUpRight aria-hidden="true" /></Link>
        </Button>
      </div>
    </section>
  );
}
