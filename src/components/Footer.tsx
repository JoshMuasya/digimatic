"use client"

import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import { FaGithub, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { BsLinkedin } from 'react-icons/bs'
import Link from 'next/link'
import Image from "next/image"

const socialLinks = [
    { icon: FaGithub, href: "https://github.com/digimaticmarketers", label: "GitHub" },
    { icon: BsLinkedin, href: "https://linkedin.com/company/digimaticmarketers", label: "LinkedIn" },
    { icon: FaXTwitter, href: "https://twitter.com/digimaticmkt", label: "Twitter" },
    { icon: FaInstagram, href: "https://instagram.com/digimaticmarketers", label: "Instagram" },
]

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

const Footer = () => {
    return (
        <footer className="bg-gradient-to-br from-card via-primary/40 to-secondary/20 border-t rounded-2xl shadow-[0_-6px_12px_0_#6A0DAD99] backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.15 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
                >
                    {/* Brand column — spans 2 on large screens */}
                    <motion.div variants={fadeInUp} className="col-span-1 lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-4 group">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Image
                                    src="/logo.png"
                                    alt="Digimatic Marketers Logo"
                                    width={50}
                                    height={50}
                                    className="mx-3"
                                />
                            </motion.div>
                            <span className="text-xl md:text-2xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                                Digimatic Marketers
                            </span>
                        </Link>

                        {/* Tagline */}
                        <p className="text-sm font-medium text-primary/80 mb-4 tracking-wide">
                            Software • Marketing • Design • Cybersecurity • Blockchain
                        </p>

                        <p className="text-muted-foreground mb-6 leading-relaxed max-w-md md:text-balance">
                            Your full-service digital partner — from bespoke software to growth-driven
                            marketing campaigns. We help African businesses compete on a global stage.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-muted-foreground">
                                <Mail className="w-4 h-4 text-primary shrink-0" />
                                <a href="mailto:hello@digimaticmarketers.com" className="hover:text-primary transition-colors text-sm">
                                    hello@digimaticmarketers.com
                                </a>
                            </div>
                            <div className="flex items-center space-x-3 text-muted-foreground">
                                <Phone className="w-4 h-4 text-primary shrink-0" />
                                <a href="tel:+254798040353" className="hover:text-primary transition-colors text-sm">
                                    +254 798 040353
                                </a>
                            </div>
                            <div className="flex items-center space-x-3 text-muted-foreground">
                                <MapPin className="w-4 h-4 text-primary shrink-0" />
                                <span className="text-sm">Westlands Commercial Center, Nairobi, Kenya</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Navigation column */}
                    <motion.div variants={fadeInUp}>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6">
                            Navigation
                        </h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Home", href: "/" },
                                { name: "About Us", href: "/about" },
                                { name: "Services", href: "/services" },
                                { name: "Portfolio", href: "/projects" },
                                { name: "Contact", href: "/contact" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services column */}
                    <motion.div variants={fadeInUp}>
                        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground mb-6">
                            What We Do
                        </h3>
                        <ul className="space-y-3">
                            {[
                                "Software Development",
                                "Website & Mobile Apps",
                                "Digital Marketing",
                                "Graphics Design",
                                "Cybersecurity",
                                "Digital Asset Engineering",
                            ].map((service) => (
                                <li key={service}>
                                    <Link
                                        href="/services"
                                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                                    >
                                        {service}
                                        <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Bottom bar */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="border-t border-border pt-8 mt-12"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Social links */}
                        <div className="flex space-x-3">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.15, rotate: 2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-9 h-9 bg-gradient-to-br from-card via-primary/40 to-secondary/20 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-[0_0_12px_#6A0DAD80] transition-all duration-300"
                                    aria-label={social.label}
                                    title={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>

                        <p className="text-muted-foreground text-sm text-center md:text-right">
                            © {new Date().getFullYear()} Digimatic Marketers. All rights reserved.
                        </p>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer
