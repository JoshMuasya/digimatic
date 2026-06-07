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

// Duplicate for seamless infinite scroll
const allClients = [...clients, ...clients]

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

            {/* Carousel track */}
            <div className="relative mb-8">
                {/* Fade masks on edges */}
                <div className="pointer-events-none absolute left-0 top-0 h-full w-24 z-10 bg-gradient-to-r from-background to-transparent" />
                <div className="pointer-events-none absolute right-0 top-0 h-full w-24 z-10 bg-gradient-to-l from-background to-transparent" />

                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        duration: 28,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    className="flex items-center gap-10 w-max"
                >
                    {allClients.map((client, index) => (
                        <div
                            key={index}
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
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default ClientLogos
