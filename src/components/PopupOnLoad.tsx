"use client"

import { useEffect, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"

// ✅ Validation schema
const FormSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email("Invalid email"),
    message: z.string().min(10, "Message must be at least 10 characters"),
})

export function PopupOnLoad() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    // Auto open popup when page loads
    useEffect(() => {
        setOpen(true)
    }, [])

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    })

    async function onSubmit(values: z.infer<typeof FormSchema>) {
        setLoading(true)
        try {
            // Example: send to API
            await fetch("/api/contact", {
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
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg border border-[var(--border)] shadow-[var(--shadow-elegant),var(--shadow-glow)] overflow-hidden">
                {/* Animate popup content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="bg-gradient-to-br from-primary via-secondary/60 to-primary text-foreground p-6 rounded-lg"
                >
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold">
                            🎁 Free 30-Minute Consultation
                        </DialogTitle>
                        <DialogDescription className="text-[var(--muted-foreground)]">
                            Fill out the form below and our team will reach out to schedule your consultation.
                        </DialogDescription>
                    </DialogHeader>

                    {/* ✅ Shadcn Form */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]"
                                                placeholder="John Doe"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                type="email"
                                                className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]"
                                                placeholder="you@example.com"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Message</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                rows={4}
                                                className="bg-[var(--input)] border-[var(--border)] text-[var(--foreground)]"
                                                placeholder="Tell us briefly about your project..."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex justify-end gap-2 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setOpen(false)}
                                    className="border-[var(--border)]"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:opacity-90"
                                >
                                    {loading ? "Sending..." : "Submit"}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </motion.div>
            </DialogContent>
        </Dialog>
    )
}
