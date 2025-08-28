"use client"

import { motion } from 'framer-motion'
import React, { useEffect, useMemo, useState } from 'react'
import ParticleBackground from '../ParticleBackground'
import { Code, Shield, Sparkles, Zap } from 'lucide-react'
import { containerVariants, itemVariants } from '@/lib/Animation/Animation'

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
                            Our Services
                        </span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                    >
                        We provide comprehensive digital solutions to help your business thrive in the modern world.
                    </motion.p>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default Hero
