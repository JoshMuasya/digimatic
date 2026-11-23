"use client";

import { ArrowUpRight, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Promotion } from "@/lib/site";
import { cn } from "@/lib/utils";

const storageKey = (id: string) => `promo-dismissed:${id}`;

export default function PromoBanner({ promotion }: { promotion: Promotion }) {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey(promotion.id))) setDismissed(true);
    } catch {
      // Storage unavailable (private mode etc.) — just show the banner.
    }
  }, [promotion.id]);

  if (dismissed) return null;

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(storageKey(promotion.id), "1");
    } catch {}
  };

  const dark = promotion.tone !== "brand";

  return (
    <aside
      aria-label={`${promotion.name} promotion`}
      className={cn(
        "relative overflow-hidden border-b",
        dark ? "border-secondary/30 bg-[#07050b] text-white" : "border-primary/30 bg-primary/15 text-foreground",
      )}
    >
      {dark && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-40%,color-mix(in_oklab,var(--secondary)_35%,transparent),transparent_65%)]"
        />
      )}
      <div className="site-container relative flex items-center justify-center gap-x-4 gap-y-1 py-2.5 pr-8 text-center text-sm sm:pr-0">
        <p className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[0.7rem] font-bold tracking-[0.12em] uppercase",
              dark ? "bg-secondary text-[#07050b]" : "bg-primary text-primary-foreground",
            )}
          >
            {promotion.name}
          </span>
          <span className="font-medium">{promotion.message}</span>
          {promotion.endLabel && (
            <span className={cn("hidden sm:inline", dark ? "text-white/60" : "text-muted-foreground")}>
              · Ends {promotion.endLabel}
            </span>
          )}
          <Link
            href={promotion.href}
            className={cn(
              "inline-flex items-center gap-1 rounded-sm font-semibold underline underline-offset-4",
              dark ? "text-secondary decoration-secondary/50 hover:decoration-current" : "decoration-primary/50 hover:decoration-current",
            )}
          >
            {promotion.ctaLabel} <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </p>
        <button
          type="button"
          onClick={dismiss}
          aria-label={`Dismiss ${promotion.name} banner`}
          className={cn(
            "absolute right-0 grid size-7 place-items-center rounded-full transition-colors",
            dark ? "text-white/60 hover:bg-white/10 hover:text-white" : "text-muted-foreground hover:bg-background/50 hover:text-foreground",
          )}
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </aside>
  );
}
