"use client"

import { motion } from "framer-motion"
import React from "react"
import { AnimatedCounter } from "../CounterComponent"
import { itemVariants } from "@/lib/Animation/Animation"

const clients = [
    { name: "Nyiha-Mathenge Advocates", abbr: "NMA", logo: "/Logo.webp" },
    { name: "NEFEA", abbr: "NEFEA", logo: "/nefealogo.png" },
    { name: "Twilight Luxe Creations", abbr: "TLC", logo: null },
    { name: "Wilhide Bakers", abbr: "WB", logo: "/TopLogo.webp" },
    { name: "Gatherly", abbr: "G", logo: null },
    { name: "Kirie Scripts", abbr: "KS", logo: null },
]

// One half of the loop. Repeated so a half is wider than even very wide screens (~2600px);
// otherwise the strip runs out and leaves a gap before it wraps.
const loopGroup = [...clients, ...clients]

const ClientLogos = () => {
    return (
        <section className="pt-14 border-y border-border bg-card/30 backdrop-blur-sm overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-10"
            >
                <p className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
                    Trusted by businesses across Kenya &amp; Africa
                </p>
            </motion.div>

            {/* Stats */}
            <motion.div
                variants={itemVariants}
                className="grid grid-cols-3 gap-8 pt-16 border-t border-border mb-8"
            >
                {[
                    { number: 100, suffix: "", label: "Deliverables Completed" },
                    { number: 50, suffix: "", label: "Clients Served" },
                    { number: 5, suffix: " yrs", label: "Industry Experience" },
                ].map((stat, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="text-center"
                    >
                        <div className="text-2xl md:text-3xl font-bold bg-[linear-gradient(135deg,var(--color-primary),var(--color-secondary))] bg-clip-text text-transparent flex items-baseline justify-center gap-0.5">
                            <AnimatedCounter value={stat.number} />
                            <span>{stat.suffix}</span>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                            {stat.label}
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Logo loop. Edges fade out via a mask, so it blends with whatever background is behind it. */}
            <div className="group/marquee mb-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6rem,black_calc(100%-6rem),transparent)]">
                <div className="flex w-max animate-[marquee_48s_linear_infinite] group-hover/marquee:[animation-play-state:paused] motion-reduce:animate-none">
                  {[0, 1].map((copy) => (
                    <ul
                        key={copy}
                        aria-hidden={copy === 1}
                        aria-label={copy === 0 ? "Clients" : undefined}
                        className="flex shrink-0 items-center gap-10 pr-10"
                    >
                    {loopGroup.map((client, index) => (
                        <li
                            key={index}
                            aria-hidden={copy === 0 && index >= clients.length ? true : undefined}
                            className="flex-shrink-0 flex items-center justify-center w-44 h-16 rounded-xl
                                       border border-border/60 bg-card/50 backdrop-blur-sm
                                       hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
                        >
                            {/* Monogram / wordmark placeholder — replace with <Image> when logos are available */}
                            {client.logo ? (
                                <img
                                    src={client.logo}
                                    alt={client.name}
                                    className="h-8 w-auto object-contain"
                                />
                            ) : (
                                <div className="flex flex-col items-center gap-0.5">
                                    <span className="text-base font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent tracking-wide">
                                        {client.abbr}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground leading-tight text-center max-w-[9rem] px-1">
                                        {client.name}
                                    </span>
                                </div>
                            )}
                        </li>
                    ))}
                    </ul>
                  ))}
                </div>
            </div>
        </section>
    )
}

export default ClientLogos
