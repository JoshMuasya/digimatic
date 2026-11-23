import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ConsultationDialog } from "@/components/ConsultationDialog";
import HeroShowcase from "@/components/Home/HeroShowcase";
import { featuredProjects } from "@/lib/projects";
import type { Promotion } from "@/lib/site";

export default function Hero({ promotion }: { promotion?: Promotion }) {
  return (
    <section className="site-hero border-b border-border py-14 sm:py-20 lg:py-24">
      <div className="site-container grid items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-14">
        <div>
          {promotion ? (
            <Link
              href={promotion.href}
              className="group mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-secondary/40 bg-secondary/10 py-1 pr-3 pl-1 text-sm transition-colors hover:border-secondary/70 hover:bg-secondary/15"
            >
              <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-xs font-bold text-secondary-foreground">
                {promotion.name}
              </span>
              <span className="truncate text-foreground">{promotion.message}</span>
              <ArrowUpRight className="size-4 shrink-0 text-secondary transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
            </Link>
          ) : (
            <p className="mb-5 text-sm font-medium text-primary">A digital partner for African businesses</p>
          )}
          <h1 className="text-[clamp(2.6rem,6.4vw,5.1rem)] leading-[1.04] font-bold tracking-[-0.055em]">
            Open the future.
            <span className="mt-1 block text-secondary">Build what comes next.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            We design and build business websites, custom software and mobile apps.
            We also help businesses in Kenya and across Africa reach customers through digital marketing.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/services">Explore Our Services <ArrowUpRight aria-hidden="true" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/projects">View Our Work</Link>
            </Button>
          </div>
          <ConsultationDialog />
        </div>

        <HeroShowcase projects={featuredProjects} promotion={promotion} />
      </div>
    </section>
  );
}
