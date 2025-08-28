"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";

const testimonials = [
    {
        name: "Sarah Johnson",
        role: "CEO, BrightTech",
        feedback:
            "Working with Digimatic Marketers was a game changer. Their creativity, professionalism, and technical expertise elevated our brand beyond expectations.",
        image: "/images/testimonial1.jpg",
    },
    {
        name: "David Kim",
        role: "Founder, Nova Labs",
        feedback:
            "They delivered on time and with precision. The attention to detail and seamless communication made the entire process smooth.",
        image: "/images/testimonial2.jpg",
    },
    {
        name: "Emily Rodriguez",
        role: "Marketing Head, Zenith Corp",
        feedback:
            "Our website and app are not only visually stunning but also highly performant. I highly recommend Digimatic Marketers for any digital project.",
        image: "/images/testimonial3.jpg",
    },
];

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
};

export default function Testimonials() {
    return (
        <section className="relative py-20 bg-gradient-to-b from-[#0e0e1a] to-[#1a1a2e]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-3xl sm:text-4xl font-bold text-white mb-6"
                >
                    What Our Clients Say
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12"
                >
                    Hear from some of our amazing clients who trusted us to bring their
                    vision to life.
                </motion.p>

                {/* Testimonials Grid */}
                <div className="grid gap-8 md:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            variants={cardVariants}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                            custom={i}
                            className="bg-card/40 border border-white/10 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                        >
                            <Image
                                src={t.image}
                                alt={t.name}
                                width={80}
                                height={80}
                                className="rounded-full mb-4 object-cover"
                            />
                            <p className="text-muted-foreground mb-4 italic">&quot;{t.feedback}&quot;</p>
                            <h4 className="text-white font-semibold">{t.name}</h4>
                            <span className="text-sm text-muted-foreground">{t.role}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
