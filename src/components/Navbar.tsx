"use client"

import { AnimatePresence, motion } from "framer-motion"
import React, { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"

const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/projects" },
    { name: "Contact", href: "/contact" },
]

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    return (
        <motion.nav
            role="navigation"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-[var(--glass-border)] shadow-[0_6px_12px_0_#6A0DAD99] transition-all duration-300 ${scrolled ? "bg-[var(--glass)]/80 h-16" : "bg-[var(--glass)]/90 h-24"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    {/* Logo */}
                    <motion.a
                        href="/"
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2"
                    >
                        <motion.div
                            animate={{ scale: scrolled ? 1 : 1.3 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Image
                                src="/logo.png"
                                alt="Digimatic Marketers Logo"
                                width={32}
                                height={32}
                                className="mx-3"
                            />
                        </motion.div>
                        <span className="text-xl font-bold bg-gradient-to-br from-primary to-secondary bg-clip-text text-transparent">
                            Digimatic Marketers
                        </span>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item, index) => (
                            <motion.a
                                key={item.name}
                                href={item.href}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 + 0.5 }}
                                whileHover={{ y: -2 }}
                                className={`text-foreground relative group transition-colors duration-300 ${pathname === item.href
                                        ? "text-primary font-semibold"
                                        : "hover:text-primary"
                                    }`}
                            >
                                {item.name}
                                <span
                                    className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary transition-all duration-300 ${pathname === item.href ? "w-full" : "w-0 group-hover:w-full"}`}
                                />
                            </motion.a>

                        ))}
                        <Button
                            size="sm"
                            className="bg-gradient-to-br from-primary to-secondary text-white shadow-lg hover:scale-105 transition-transform"
                        >
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isOpen}
                        className="md:hidden p-2 text-foreground"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        exit={{ opacity: 0, scaleY: 0 }}
                        transition={{ duration: 0.3 }}
                        className="origin-top md:hidden bg-glass/95 backdrop-blur-xl border-t border-glass-border"
                    >
                        <div className="px-4 py-6 space-y-4">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.name}
                                    href={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => setIsOpen(false)}
                                    className={`block text-foreground transition-colors duration-300 ${pathname === item.href
                                        ? "text-primary font-semibold"
                                        : "hover:text-primary"
                                        }`}
                                >
                                    {item.name}
                                </motion.a>
                            ))}
                            <Button className="w-full mt-4 bg-gradient-primary text-white shadow-lg hover:scale-105 transition-transform">
                                Get Started
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

export default Navbar
