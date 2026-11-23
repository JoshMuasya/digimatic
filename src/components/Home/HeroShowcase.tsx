"use client";

import { ArrowUpRight, ExternalLink, MonitorSmartphone, Pause, Play, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { displayDomain, type Project } from "@/lib/projects";
import type { Promotion } from "@/lib/site";
import { cn } from "@/lib/utils";

const SLIDE_MS = 5500;
/** Posters carry text people need to read, so they stay up longer. */
const POSTER_MS = 8000;

type Slide = {
  key: string;
  kind: "poster" | "project";
  image: string;
  alt: string;
  barLabel: string;
  title: string;
  detail: string;
  href: string;
  duration: number;
};

function buildSlides(projects: Project[], promotion?: Promotion): Slide[] {
  const slides: Slide[] = projects.map((p) => ({
    key: p.link,
    kind: "project",
    image: p.image,
    alt: `Homepage of the ${p.client} website`,
    barLabel: displayDomain(p.link),
    title: p.client,
    detail: p.kind,
    href: p.link,
    duration: SLIDE_MS,
  }));

  if (promotion?.poster) {
    slides.unshift({
      key: `promo-${promotion.id}`,
      kind: "poster",
      image: promotion.poster.src,
      alt: promotion.poster.alt,
      barLabel: `${promotion.name} offer`,
      title: promotion.name,
      detail: promotion.endLabel ? `Ends ${promotion.endLabel}` : promotion.message,
      href: promotion.href,
      duration: POSTER_MS,
    });
  }

  return slides;
}

export default function HeroShowcase({ projects, promotion }: { projects: Project[]; promotion?: Promotion }) {
  const slides = buildSlides(projects, promotion);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  // Don't autoplay for visitors who prefer reduced motion; they can still press play.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  if (slides.length === 0) return null;

  const current = slides[index];
  const isPoster = current.kind === "poster";
  const running = playing && !hovered && !focused && slides.length > 1;
  const next = () => setIndex((i) => (i + 1) % slides.length);

  return (
    <figure
      className="min-w-0"
      aria-roledescription="carousel"
      aria-label={promotion?.poster ? "Current offer and recent projects" : "Recent projects"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
    >
      <div className="relative pb-6">
        <div
          className={cn(
            "overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-glow)] transition-colors duration-700 sm:rounded-3xl",
            isPoster ? "border-secondary/50" : "border-primary/30",
          )}
        >
          <div className="flex items-center gap-1.5 border-b border-border bg-muted px-4 py-3 sm:px-5">
            <span className="size-2 rounded-full bg-secondary" aria-hidden="true" />
            <span className="size-2 rounded-full bg-primary/70" aria-hidden="true" />
            <span className="size-2 rounded-full bg-primary/25" aria-hidden="true" />
            <span
              className={cn("ml-2 truncate font-mono text-xs", isPoster ? "text-secondary" : "text-muted-foreground")}
              aria-hidden="true"
            >
              {current.barLabel}
            </span>
            {slides.length > 1 && (
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                className="ml-auto grid size-6 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-background/60 hover:text-foreground"
              >
                {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
              </button>
            )}
          </div>

          {/* All slides are stacked so images are already loaded when they fade in. */}
          <div className="relative aspect-[2.1] w-full bg-[#07050b]" aria-live={running ? "off" : "polite"}>
            {slides.map((slide, i) => {
              const active = i === index;
              return (
                <div
                  key={slide.key}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${slides.length}: ${slide.title}`}
                  aria-hidden={!active}
                  className={cn(
                    "absolute inset-0 transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
                    active ? "scale-100 opacity-100" : "pointer-events-none scale-[1.02] opacity-0",
                  )}
                >
                  {slide.kind === "poster" ? (
                    <Link href={slide.href} tabIndex={active ? 0 : -1} className="group absolute inset-0 block">
                      {/* Blurred fill so posters of any shape fill the frame. */}
                      <Image
                        src={slide.image}
                        alt=""
                        fill
                        sizes="200px"
                        className="scale-110 object-cover opacity-60 blur-2xl"
                        aria-hidden="true"
                      />
                      <Image
                        src={slide.image}
                        alt={slide.alt}
                        fill
                        sizes="(min-width: 1024px) 570px, 95vw"
                        priority={i === 0}
                        className="object-contain drop-shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </Link>
                  ) : (
                    <Image
                      src={slide.image}
                      alt={slide.alt}
                      fill
                      sizes="(min-width: 1024px) 570px, 95vw"
                      priority={i === 0}
                      className="object-cover object-top"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div
          className={cn(
            "absolute right-2 bottom-0 flex max-w-[calc(100%-1rem)] items-center gap-3 rounded-xl border bg-card px-3 py-2 shadow-[var(--shadow-elegant)] sm:right-4 sm:px-4",
            isPoster ? "border-secondary/50" : "border-primary/30",
          )}
        >
          {isPoster ? (
            <Tag className="size-5 shrink-0 text-secondary" aria-hidden="true" />
          ) : (
            <MonitorSmartphone className="size-5 shrink-0 text-secondary" aria-hidden="true" />
          )}
          {isPoster ? (
            <Link
              href={current.href}
              className="inline-flex min-w-0 items-center gap-1.5 text-xs font-medium text-foreground hover:text-secondary sm:text-sm"
            >
              <span className="truncate">
                {current.title} <span className="text-muted-foreground">· {current.detail}</span>
              </span>
              <ArrowUpRight className="size-3.5 shrink-0 text-secondary" aria-hidden="true" />
            </Link>
          ) : (
            <a
              href={current.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-w-0 items-center gap-1.5 text-xs font-medium text-foreground hover:text-secondary sm:text-sm"
            >
              <span className="truncate">
                {current.title} <span className="text-muted-foreground">· {current.detail}</span>
              </span>
              <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="mt-1 flex items-center gap-1.5 pl-1" role="group" aria-label="Choose a slide">
          {slides.map((slide, i) => (
            <button
              key={slide.key}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={slide.kind === "poster" ? `Show ${slide.title} offer` : `Show ${slide.title}`}
              aria-current={i === index}
              className={cn(
                "relative h-1.5 overflow-hidden rounded-full transition-[width] duration-300",
                slide.kind === "poster" ? "bg-secondary/30 hover:bg-secondary/45" : "bg-primary/20 hover:bg-primary/35",
                i === index ? "w-10" : "w-4",
              )}
            >
              {i === index && (
                <span
                  key={`${index}-${playing}`}
                  onAnimationEnd={next}
                  className="absolute inset-0 origin-left rounded-full bg-secondary"
                  style={{
                    animation: playing ? `hero-progress ${slide.duration}ms linear forwards` : undefined,
                    animationPlayState: running ? "running" : "paused",
                    transform: playing ? undefined : "scaleX(1)",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </figure>
  );
}
