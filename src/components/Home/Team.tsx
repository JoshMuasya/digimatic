"use client"

import { motion, Variants } from 'framer-motion'
import React, { useState } from 'react'
import Image from "next/image";
import { FaGithub, FaXTwitter } from 'react-icons/fa6'
import { BsLinkedin } from 'react-icons/bs'

// shadcn/ui components
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.email({ message: "Enter a valid email address" }),
    message: z.string().min(10, { message: "Message must be at least 10 characters" }),
})

type FormValues = z.infer<typeof formSchema>

const Team = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    })

    async function onSubmit(values: FormValues) {
        setLoading(true)
        try {
            // Example: send to API
            await fetch("/api/career", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            toast.success("✅ Request sent! We'll get back to you soon.")
            setIsOpen(false)
            form.reset()
        } catch (error) {
            toast.error("❌ Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const teamMembers = [
        {
            name: "Joshua Muasya",
            role: "CEO & Founder",
            image: "/josh.png",
            socials: {
                linkedin: "#",
                twitter: "#",
            },
        },
        {
            name: "Cox Musyoki",
            role: "Lead Developer",
            image: "/man.png",
            socials: {
                github: "#",
                linkedin: "#",
            },
        },
        {
            name: "Ruth Lee",
            role: "UI/UX Designer",
            image: "/lady.png",
            socials: {
                twitter: "#",
                linkedin: "#",
            },
        },
    ];

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.2, ease: "easeInOut" },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    };

    return (
        <section className="relative py-20 bg-gradient-to-tl from-primary via-secondary/20 to-background text-foreground">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className='z-10'
                >
                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Meet Our Team
                    </h2>

                    <p className="text-lg text-foreground/80 mb-12 drop-shadow-md">
                        The passionate minds behind our success.
                    </p>
                </motion.div>

                {/* Team Members */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ y: -8, scale: 1.03 }}
                            className="bg-card border border-border rounded-2xl 
                                       shadow-[var(--shadow-elegant)] 
                                       hover:shadow-[var(--shadow-glow)] 
                                       hover:border-primary 
                                       transition-all duration-300 p-6"
                        >
                            {/* Avatar with gradient ring */}
                            <div className="w-32 h-32 mx-auto relative rounded-full overflow-hidden mb-6 
                                            p-[3px] bg-gradient-to-r from-primary to-secondary">
                                <div className="rounded-full overflow-hidden w-full h-full">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </div>

                            <h3 className="text-xl font-semibold hover:text-primary transition">
                                {member.name}
                            </h3>
                            <p className="text-muted-foreground">{member.role}</p>

                            {/* Social Links */}
                            <div className="flex justify-center gap-4 mt-4">
                                {member.socials.github && (
                                    <a href={member.socials.github} target="_blank" rel="noreferrer">
                                        <FaGithub className="w-6 h-6 hover:text-primary-glow transition" />
                                    </a>
                                )}
                                {member.socials.linkedin && (
                                    <a href={member.socials.linkedin} target="_blank" rel="noreferrer">
                                        <BsLinkedin className="w-6 h-6 hover:text-primary-glow transition" />
                                    </a>
                                )}
                                {member.socials.twitter && (
                                    <a href={member.socials.twitter} target="_blank" rel="noreferrer">
                                        <FaXTwitter className="w-6 h-6 hover:text-secondary-glow transition" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    <button
                        onClick={() => setIsOpen(true)}
                        className="inline-block px-8 py-4 rounded-full 
                           bg-gradient-to-r from-primary to-secondary 
                           text-white font-semibold 
                           shadow-[var(--shadow-elegant)] 
                           hover:shadow-[var(--shadow-glow)] 
                           transition"
                    >
                        Join Our Team
                    </button>
                </motion.div>
            </div>

            {/* Popup Form */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className="bg-card text-foreground rounded-2xl shadow-[var(--shadow-elegant)] 
                                   w-full max-w-lg p-8 relative"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
                        >
                            ✕
                        </button>

                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Join Our Team
                        </h3>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                {/* Full Name */}
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input type="email" placeholder="you@example.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Message */}
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Why do you want to join?</FormLabel>
                                            <FormControl>
                                                <Textarea rows={4} placeholder="Tell us a little about yourself..." {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-primary to-secondary text-white shadow-[var(--shadow-elegant)] hover:shadow-[var(--shadow-glow)]"
                                >
                                    Submit Application
                                </Button>
                            </form>
                        </Form>
                    </motion.div>
                </div>
            )}
        </section>
    )
}

export default Team
