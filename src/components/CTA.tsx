"use client"

import { motion } from "framer-motion"
import React, { useState } from "react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.email("Invalid email"),
    project: z.string().min(10, "Tell us more about your project"),
})

type FormValues = z.infer<typeof formSchema>

const CTA = () => {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            project: "",
        },
    })

    async function onSubmit(values: FormValues) {
        setLoading(true)
        try {
            // Example: send to API
            await fetch("/api/project", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            })

            toast.success("✅ Request sent! We'll get back to you soon.")
            setOpen(false)
            form.reset()
        } catch (error) {
            toast.error("❌ Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="text-center my-20 px-5">
            {/* Headline */}
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-bold mb-4 text-foreground"
            >
                Ready to Work Together?
            </motion.h2>

            {/* Subtext */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-muted-foreground mb-10 max-w-2xl mx-auto"
            >
                Let&apos;s discuss how we can help transform your business with
                innovative digital solutions.
            </motion.p>

            {/* Buttons */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
            >
                {/* Popup Form Trigger */}
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
            </motion.div>
        </section>
    )
}

export default CTA
