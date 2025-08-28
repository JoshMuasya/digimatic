"use client"

import { motion, Variants } from "framer-motion"
import React from "react"
import { AnimatedCounter } from "../CounterComponent"
import { itemVariants } from "@/lib/Animation/Animation"

const Story = () => {

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2 },
        },
    }

    const item: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={container}
            className="bg-gradient-to-br from-card via-secondary/20 to-primary/40 rounded-3xl p-8 md:p-12 backdrop-blur-md px-4 shadow-[0_-6px_12px_0_#6A0DAD99]"
        >
            <div className="max-w-4xl mx-auto text-center">
                {/* Heading */}
                <motion.h2
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-3xl md:text-4xl font-bold mb-6"
                >
                    <span className="bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                        Our Story
                    </span>
                </motion.h2>

                {/* Paragraphs */}
                <motion.p
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-lg text-muted-foreground leading-relaxed mb-6"
                >
                    Founded with a passion for technology and innovation, Digimatic
                    Marketers has grown from a small team of dedicated developers to a
                    comprehensive digital solutions provider. We believe in the power of
                    technology to solve complex problems and create meaningful experiences
                    that matter.
                </motion.p>

                <motion.p
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-lg text-muted-foreground leading-relaxed mb-10"
                >
                    Our journey has been driven by a commitment to excellence, continuous
                    learning, and building lasting partnerships with our clients. We stay
                    at the forefront of technology trends to ensure our solutions are not
                    just current, but future-ready.
                </motion.p>

                {/* Divider */}
                <motion.div
                    variants={item}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="h-[2px] w-24 bg-gradient-to-r from-primary to-secondary mx-auto my-3 rounded-full"
                />

                {/* Stats */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    className="grid grid-cols-3 gap-8 pt-16"
                >
                    {[
                        { number: 500, label: "Projects Delivered" },
                        { number: 50, label: "Happy Clients" },
                        { number: 5, label: "Years Experience" },
                    ].map((stat, index) => (
                        <motion.div
                            key={index}
                            variants={item}
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
            </div>
        </motion.div>
    )
}

export default Story
