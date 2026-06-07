"use client"

import React, { useMemo, useEffect, useState } from "react"
import ParticleBackground from "../ParticleBackground"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { ArrowRight, Code, Shield, Sparkles, Zap } from "lucide-react"
import { containerVariants, itemVariants } from "@/lib/Animation/Animation"
import Link from "next/link"

const Hero = () => {
    const [particleCount, setParticleCount] = useState(250)
    useEffect(() => {
        if (window.innerWidth < 768) setParticleCount(120)
        if (window.innerWidth < 480) setParticleCount(60)
    }, [])

    const floatingIcons = useMemo(
        () => [
            { icon: Code, delay: 0, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` },
            { icon: Zap, delay: 0.5, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` },
            { icon: Shield, delay: 1, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` },
            { icon: Sparkles, delay: 1.5, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` },
        ],
        []
    )

    return (
        <section className="relative min-h-screen bg-background w-full overflow-hidden flex items-center justify-center pt-20">
            {/* Particle Background */}
            <ParticleBackground
                particleCount={particleCount}
                enableShadows={false}
                connectionFrequency={3}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />

            {/* Floating Icons */}
            <div className="absolute inset-0">
                {floatingIcons.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1, 0],
                            x: [0, Math.random() * 100 - 50],
                            y: [0, Math.random() * 100 - 50],
                        }}
                        transition={{
                            duration: 4,
                            delay: item.delay,
                            repeat: Infinity,
                            repeatDelay: 2,
                        }}
                        className="absolute"
                        style={{ left: item.left, top: item.top }}
                        aria-hidden="true"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 w-8 h-8 bg-primary/10 blur-xl rounded-full -z-10" />
                            <item.icon className="w-6 h-6 text-primary/35" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Hero Content */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8"
            >
                <motion.div variants={itemVariants} className="space-y-6">
                    <motion.h1
                        className="text-[clamp(1.9rem,3.9vw,3.4rem)] font-bold leading-tight"
                        whileHover={{ scale: 1.02 }}
                    >
                        <span className="bg-[linear-gradient(135deg,var(--color-primary),var(--color-secondary))] bg-clip-text text-transparent">
                            We Build Digital Products
                        </span>
                        <br />
                        <span className="text-foreground">for African Businesses</span>
                    </motion.h1>

                    {/* Service categories tag line */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-wrap justify-center gap-2 text-sm font-medium"
                    >
                        {["Software", "Marketing", "Design", "Cybersecurity", "Blockchain"].map((tag) => (
                            <span
                                key={tag}
                                className="px-3 py-1 rounded-full bg-primary/15 border border-primary/30 text-primary-foreground/80 backdrop-blur-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </motion.div>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                    >
                        From custom software to digital marketing campaigns — we&apos;re the technology partner
                        that grows with your business.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button asChild size="lg" className="group bg-gradient-to-br from-primary to-secondary">
                                <Link href="/contact">
                                    Start Your Project
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button asChild variant="ghost" size="lg">
                                <Link href="/projects">
                                    View Our Work
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2"
            >
                <div
                    className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
                >
                    <motion.div
                        initial={{ y: 2, opacity: 1 }}
                        animate={{ y: [2, 24, 2], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 3, repeat: Infinity }}
                        className="w-1 h-3 bg-primary rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    )
}

export default Hero
