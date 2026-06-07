"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
            {/* Ambient glow blobs */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="relative z-10 text-center max-w-lg mx-auto"
            >
                {/* 404 number */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-[8rem] sm:text-[10rem] font-bold leading-none bg-[linear-gradient(135deg,var(--color-primary),var(--color-secondary))] bg-clip-text text-transparent select-none"
                >
                    404
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="text-2xl sm:text-3xl font-bold text-foreground mt-2 mb-4"
                >
                    Page Not Found
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="text-muted-foreground mb-10 leading-relaxed"
                >
                    Looks like this page took a wrong turn. Let&apos;s get you back on track.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.45 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                    <Button asChild size="lg" className="bg-gradient-to-br from-primary to-secondary text-white group">
                        <Link href="/">
                            <Home className="mr-2 w-4 h-4" />
                            Go Home
                        </Link>
                    </Button>
                    <Button asChild variant="ghost" size="lg" className="border border-border hover:border-primary/50">
                        <Link href="/contact">
                            <ArrowLeft className="mr-2 w-4 h-4" />
                            Contact Us
                        </Link>
                    </Button>
                </motion.div>

                {/* Quick nav links */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="mt-12 pt-8 border-t border-border flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
                >
                    {[
                        { label: "Services", href: "/services" },
                        { label: "Portfolio", href: "/projects" },
                        { label: "About", href: "/about" },
                    ].map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="hover:text-primary transition-colors duration-200"
                        >
                            {link.label}
                        </Link>
                    ))}
                </motion.div>
            </motion.div>
        </div>
    )
}
