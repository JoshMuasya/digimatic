"use client"

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { usePathname } from "next/navigation"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    project: z.string().min(10, "Tell us more about your project"),
})

type FormValues = z.infer<typeof formSchema>

type Category = "All" | "Web" | "App" | "NGO" | "E-commerce"

const CATEGORIES: Category[] = ["All", "Web", "App", "E-commerce", "NGO"]

const ProjectsSection = () => {
    const [open, setOpen] = useState(false)
    const [activeCategory, setActiveCategory] = useState<Category>("All")
    const pathname = usePathname()
    const isProjectsPage = pathname.startsWith("/projects")

    const projects = [
        {
            title: "Joshua Muasya – Portfolio",
            shortDescription:
                "A sleek and professional portfolio showcasing my skills and projects.",
            longDescription:
                "A modern and responsive developer portfolio built with Next.js and Tailwind CSS. Highlights my skills in full-stack development, animations, and optimized performance across devices.",
            image: "/portfolio.png",
            link: "https://josh-portfolio-eight.vercel.app/",
            tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
            category: "Web" as Category,
        },
        {
            title: "Nyiha-Mathenge Advocates",
            shortDescription:
                "A professional law firm website with modern design and clear service presentation.",
            longDescription:
                "A full-service law firm website built to establish trust and credibility. Features service breakdowns, lawyer profiles, a blog section, and client contact options with a clean, modern design.",
            image: "/nma.png",
            link: "https://nyihamathengelaw.com/",
            tags: ["Next.js", "TypeScript", "Tailwind CSS"],
            category: "Web" as Category,
        },
        {
            title: "Gatherly",
            shortDescription:
                "A modern event management platform currently in development, designed to simplify planning and coordination.",
            longDescription:
                "Gatherly is an innovative event management platform built to streamline event planning, coordination, and guest engagement. It will feature RSVP management, role-based access (admins, organizers, and staff), real-time updates, and an intuitive dashboard for seamless control.",
            image: "/gatherly.png",
            link: "https://gatherly-three-rho.vercel.app/",
            tags: ["Next.js", "PostgreSQL", "Prisma"],
            category: "App" as Category,
        },
        {
            title: "Wilhide Bakers – Website",
            shortDescription:
                "A modern bakery website showcasing delightful products and ordering features. (Under Development)",
            longDescription:
                "A clean, elegant, and mobile-friendly website for Wilhide Bakers, designed with Next.js and Tailwind CSS. The platform highlights bakery products, custom cake options, and smooth browsing experiences.",
            image: "/wilhide.png",
            link: "https://wilhade-bakers.vercel.app/",
            tags: ["Next.js", "Tailwind CSS", "E-commerce"],
            category: "E-commerce" as Category,
        },
        {
            title: "NEFEA – Network on Forest Enterprises in Africa",
            shortDescription:
                "A non-profit organization site promoting African gums and resins.",
            longDescription:
                "An international NGO website dedicated to promoting African gums and resins as key non-timber forest products. Includes organizational history, mission, resources, and initiatives across Africa.",
            image: "/nefea.png",
            link: "https://www.nefea.org/",
            tags: ["WordPress", "Custom Theme", "SEO"],
            category: "NGO" as Category,
        },
        {
            title: "Twilight Luxe Creations",
            shortDescription:
                "An elegant event planning and management company website.",
            longDescription:
                "A premium event management website showcasing services such as planning, styling, catering, photography, entertainment, rentals, invitations, logistics, and corporate event solutions.",
            image: "/luxe.png",
            link: "https://twilight-luxe-creations.vercel.app/",
            tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
            category: "Web" as Category,
        },
        {
            title: "Kirie Scripts",
            shortDescription:
                "A minimal project website currently under development.",
            longDescription:
                "Kirie Scripts is a work-in-progress project with future potential for automation tools and custom scripts. The site is currently in its early stages of development.",
            image: "/kirie.png",
            link: "https://kirie-scripts.vercel.app/",
            tags: ["Next.js", "TypeScript"],
            category: "App" as Category,
        },
    ]

    const filtered =
        activeCategory === "All"
            ? projects
            : projects.filter((p) => p.category === activeCategory)

    const visibleProjects = isProjectsPage ? filtered : filtered.slice(0, 3)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            project: "",
        },
    })

    async function onSubmit(values: FormValues) {
        try {
            await fetch("/api/project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            toast.success("✅ Request sent! We'll get back to you soon.")
            setOpen(false)
            form.reset()
        } catch {
            toast.error("❌ Something went wrong. Please try again.")
        }
    }

    return (
        <section className="relative py-20 px-6 sm:px-12 bg-card/60 backdrop-blur-sm border-t border-border">
            <div className="max-w-7xl mx-auto text-center">
                {/* Heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-foreground mb-6"
                >
                    {isProjectsPage ? "All Projects" : "Our Recent Projects"}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-muted-foreground max-w-2xl mx-auto mb-10"
                >
                    {isProjectsPage
                        ? "Browse through all our works and see how we help businesses succeed."
                        : "Here are some of our latest works. Each project highlights our dedication to innovation and user experience."}
                </motion.p>

                {/* Category filter — only shown on projects page */}
                {isProjectsPage && (
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-wrap justify-center gap-2 mb-12"
                    >
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
                                    activeCategory === cat
                                        ? "bg-gradient-to-br from-primary to-secondary text-white border-transparent shadow-[var(--shadow-elegant)]"
                                        : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </motion.div>
                )}

                {/* Project Grid */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="grid gap-8 md:grid-cols-3"
                    >
                        {visibleProjects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                    delay: index * 0.1,
                                }}
                                viewport={{ once: true }}
                                className="group relative rounded-2xl overflow-hidden shadow-[var(--shadow-elegant)] bg-card border border-border backdrop-blur-md hover:shadow-[var(--shadow-glow)] hover:border-primary/40 transition-all duration-300"
                            >
                                <div className="relative w-full h-56">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                                    />
                                    {/* Category badge on image */}
                                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/80 text-white backdrop-blur-sm">
                                        {project.category}
                                    </span>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                        {project.title}
                                    </h3>
                                    <p className="text-muted-foreground mt-2 text-sm">
                                        {isProjectsPage ? project.longDescription : project.shortDescription}
                                    </p>

                                    {/* Tech stack badges */}
                                    <div className="flex flex-wrap gap-1.5 mt-4">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-2 py-0.5 rounded-md text-xs border border-border/80 text-muted-foreground bg-card/80"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <Link
                                        href={project.link}
                                        className="inline-block mt-4 text-primary text-sm font-medium hover:underline"
                                        target="_blank" rel="noopener noreferrer"
                                    >
                                        View Project →
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* CTA Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="mt-16 bg-gradient-to-r from-primary/90 to-secondary/90 rounded-2xl p-10 shadow-lg"
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        {isProjectsPage ? "Ready to start your project?" : "Want to work with us?"}
                    </h3>
                    <p className="text-white/80 mb-6 max-w-2xl mx-auto">
                        {isProjectsPage
                            ? "Tell us more about your project or reach out directly."
                            : "Let's bring your ideas to life with our expertise in design and development."}
                    </p>

                    <div className="flex flex-wrap gap-4 justify-center">
                        {!isProjectsPage ? (
                            <>
                                <Link href="/projects">
                                    <Button variant="secondary" className="rounded-xl">
                                        View All Projects
                                    </Button>
                                </Link>
                                <Link href="/contact">
                                    <Button className="rounded-xl bg-white text-primary hover:bg-gray-100">
                                        Contact Us
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <Dialog open={open} onOpenChange={setOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="secondary" className="rounded-xl">
                                            Tell Us About Your Project
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-lg">
                                        <motion.div
                                            initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                        >
                                            <DialogHeader>
                                                <DialogTitle>Tell Us About Your Project</DialogTitle>
                                            </DialogHeader>

                                            <Form {...form}>
                                                <motion.form
                                                    onSubmit={form.handleSubmit(onSubmit)}
                                                    className="space-y-4"
                                                    initial="hidden"
                                                    animate="show"
                                                    variants={{
                                                        hidden: {},
                                                        show: { transition: { staggerChildren: 0.1 } },
                                                    }}
                                                >
                                                    {["name", "email", "project"].map((field) => (
                                                        <motion.div
                                                            key={field}
                                                            variants={{
                                                                hidden: { opacity: 0, y: 10 },
                                                                show: { opacity: 1, y: 0 },
                                                            }}
                                                        >
                                                            <FormField
                                                                control={form.control}
                                                                name={field as "name" | "email" | "project"}
                                                                render={({ field: f }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="capitalize my-3">{field}</FormLabel>
                                                                        <FormControl>
                                                                            {field === "project" ? (
                                                                                <Textarea
                                                                                    placeholder="Describe your project..."
                                                                                    className="resize-none"
                                                                                    {...f}
                                                                                />
                                                                            ) : (
                                                                                <Input
                                                                                    placeholder={
                                                                                        field === "email"
                                                                                            ? "you@example.com"
                                                                                            : "Your name"
                                                                                    }
                                                                                    {...f}
                                                                                />
                                                                            )}
                                                                        </FormControl>
                                                                        <FormMessage />
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </motion.div>
                                                    ))}
                                                    <motion.div
                                                        variants={{
                                                            hidden: { opacity: 0, y: 10 },
                                                            show: { opacity: 1, y: 0 },
                                                        }}
                                                    >
                                                        <Button type="submit" className="w-full">
                                                            Submit
                                                        </Button>
                                                    </motion.div>
                                                </motion.form>
                                            </Form>
                                        </motion.div>
                                    </DialogContent>
                                </Dialog>

                                <Link href="/contact">
                                    <Button className="rounded-xl bg-white text-primary hover:bg-gray-100">
                                        Contact Us
                                    </Button>
                                </Link>
                            </>
                        )}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default ProjectsSection
