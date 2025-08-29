"use client"

import React, { useMemo, useEffect, useState } from "react"
import ParticleBackground from "../ParticleBackground"
import { motion } from "framer-motion"
import { Button } from "../ui/button"
import { ArrowRight, Code, Shield, Sparkles, Zap } from "lucide-react"
import { containerVariants, itemVariants } from "@/lib/Animation/Animation"
import { AnimatedCounter } from "../CounterComponent"

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
                            <div className="absolute inset-0 w-10 h-10 bg-primary/20 blur-2xl rounded-full -z-10" />
                            <item.icon className="w-6 h-6 text-primary/70" />
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
                        className="text-[clamp(2rem,6vw,4.5rem)] font-bold leading-tight"
                        whileHover={{ scale: 1.02 }}
                    >
                        <span className="bg-[linear-gradient(135deg,var(--color-primary),var(--color-secondary))] bg-clip-text text-transparent">
                            Digital Innovation
                        </span>
                        <br />
                        <span className="text-foreground">Meets Excellence</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                    >
                        We craft cutting-edge digital solutions that transform your vision into reality.
                        From software development to digital marketing, we&apos;re your technology partners.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        variants={itemVariants}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button size="lg" className="group">
                                Start Your Project
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button variant="ghost" size="lg">
                                View Our Work
                            </Button>
                        </motion.div>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        variants={itemVariants}
                        className="grid grid-cols-3 gap-8 pt-16 border-t border-border"
                    >
                        {[
                            { number: 500, label: "Projects Delivered" },
                            { number: 50, label: "Happy Clients" },
                            { number: 5, label: "Years Experience" },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="text-center"
                            >
                                <div className="text-2xl md:text-3xl font-bold bg-[linear-gradient(135deg,var(--color-primary),var(--color-secondary))] bg-clip-text text-transparent">
                                    <AnimatedCounter value={stat.number} />
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
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
