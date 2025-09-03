"use client"

import { motion } from 'framer-motion'
import { Mail, MapPin, Phone } from 'lucide-react'
import React from 'react'
import { FaGithub, FaInstagram, FaXTwitter } from 'react-icons/fa6'
import { BsLinkedin } from 'react-icons/bs'
import Link from 'next/link'
import Image from "next/image"

// ✅ Constants extracted for cleaner code
const socialLinks = [
    { icon: FaGithub, href: "#", label: "GitHub" },
    { icon: BsLinkedin, href: "#", label: "LinkedIn" },
    { icon: FaXTwitter, href: "#", label: "Twitter" },
    { icon: FaInstagram, href: "#", label: "Instagram" },
]

const quickLinks = [
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/projects" },
    { name: "Contact", href: "/contact" },
]

const services = [
    { name: "Software Development", href: "/services" },
    { name: "Mobile App Development", href: "/services" },
    { name: "Digital Marketing", href: "/services" },
    { name: "Cybersecurity", href: "/services" },
]

// ✅ Reusable motion variant
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
                    transition={{ staggerChildren: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    {/* Company Info */}
                    <motion.div variants={fadeInUp} className="col-span-1 lg:col-span-2">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 mb-6 group"
                        >
                            {/* ✅ Animated Logo */}
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
                        <p className="text-muted-foreground mb-6 leading-relaxed max-w-md md:text-balance">
                            We craft cutting-edge digital solutions that transform your vision into reality.
                            From software development to digital marketing, we&apos;re your technology partners.
                        </p>

                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-muted-foreground">
                                <Mail className="w-5 h-5 text-primary" />
                                <a href="mailto:hello@digimaticmarketers.com" className="hover:text-primary transition-colors">
                                    digimaticmarketers@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center space-x-3 text-muted-foreground">
                                <Phone className="w-5 h-5 text-primary" />
                                <a href="tel:+15551234567" className="hover:text-primary transition-colors">
                                    +254 798 040353
                                </a>
                            </div>
                            <div className="flex items-center space-x-3 text-muted-foreground">
                                <MapPin className="w-5 h-5 text-primary" />
                                <a
                                    href="https://maps.google.com/?q=123 Tech Street, Digital City"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary transition-colors"
                                >
                                    Westlands Commercial Center, Nairobi Kenya
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div variants={fadeInUp}>
                        <h3 className="text-lg font-bold text-foreground mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                                    >
                                        {link.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-br from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Services */}
                    <motion.div variants={fadeInUp}>
                        <h3 className="text-lg font-bold text-foreground mb-6">Services</h3>
                        <ul className="space-y-3">
                            {services.map((service) => (
                                <li key={service.name}>
                                    <Link
                                        href={service.href}
                                        className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                                    >
                                        {service.name}
                                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-br from-primary to-secondary group-hover:w-full transition-all duration-300"></span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Social Links & Copyright */}
                <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="border-t border-border pt-8 mt-12"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex space-x-6">
                            {socialLinks.map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    whileHover={{ scale: 1.15, rotate: 2 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="w-10 h-10 bg-gradient-to-br from-card via-primary/40 to-secondary/20 border border-border rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 hover:shadow-[0_0_12px_#6A0DAD80] transition-all duration-300"
                                    aria-label={social.label}
                                    title={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </div>

                        <div className="text-center md:text-right">
                            <p className="text-muted-foreground text-sm">
                                © {new Date().getFullYear()} Digimatic Marketers. All rights reserved.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}

export default Footer
