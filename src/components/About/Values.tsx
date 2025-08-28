"use client"

import { motion, Variants } from "framer-motion"
import { Eye, Target, Users } from "lucide-react"
import React from "react"

const Values = () => {
    const values = [
        {
            icon: Target,
            title: "Our Mission",
            description:
                "To empower businesses with innovative digital solutions that drive growth and transform industries.",
        },
        {
            icon: Eye,
            title: "Our Vision",
            description:
                "To be the leading technology partner that shapes the future of digital innovation worldwide.",
        },
        {
            icon: Users,
            title: "Our Values",
            description:
                "Innovation, excellence, collaboration, and customer-centric solutions guide everything we do.",
        },
    ]

    // Animation Variants
    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.25,
            },
        },
    }

    const item: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    }

    return (
        <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 px-4"
        >
            {values.map((value) => (
                <motion.div
                    key={value.title}
                    variants={item}
                    className="text-center p-6 rounded-2xl bg-gradient-to-br from-card to-primary/40 shadow-md hover:shadow-xl transition-all duration-300"
                >
                    {/* Animated Gradient Ring */}
                    <div className="relative w-24 h-24 mx-auto mb-6">
                        <motion.div
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 8,
                                ease: "linear",
                            }}
                            className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-secondary to-primary animate-spin-slow"
                        />
                        <div className="absolute inset-[4px] rounded-full bg-card flex items-center justify-center shadow-inner">
                            <value.icon
                                aria-hidden="true"
                                className="w-10 h-10 text-primary"
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <h3 className="text-2xl font-bold mb-3 text-foreground tracking-wide">
                        {value.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                        {value.description}
                    </p>
                </motion.div>
            ))}
        </motion.div>
    )
}

export default Values
