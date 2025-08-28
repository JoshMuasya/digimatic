"use client"

import { motion } from "framer-motion"
import { Mail, MapPin, Phone, Send } from "lucide-react"
import React, { useState } from "react"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import { Input } from "../ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Enter a valid email address." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
})

const Contact = () => {
  const [loading, setLoading] = useState(false)

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      detail: "hello@digimaticmarketers.com",
      description: "Send us an email anytime",
    },
    {
      icon: Phone,
      title: "Call Us",
      detail: "+254 798 040353",
      description: "Mon-Fri from 8am to 5pm",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      detail: "Westlands Commercial Center, Nairobi",
      description: "Come say hello at our office",
    },
  ]

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    try {
      // Example: send to API
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })

      toast.success("✅ Request sent! We'll get back to you soon.")
      form.reset()
    } catch (error) {
      toast.error("❌ Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-gradient-to-br from-card via-secondary/20 to-primary/40 border border-glass-border rounded-2xl backdrop-blur-md hover:border-primary/30 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                <info.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-foreground">
                {info.title}
              </h3>
              <p className="text-foreground font-medium mb-2">{info.detail}</p>
              <p className="text-muted-foreground text-sm">{info.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Form + Office Location */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-card via-secondary/20 to-primary/40 border border-glass-border rounded-3xl p-8 backdrop-blur-md"
          >
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Send us a message
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your name"
                            className="bg-glass/50 border-glass-border"
                            {...field}
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
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="your@email.com"
                            className="bg-glass/50 border-glass-border"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message *</FormLabel>
                      <FormControl>
                        <Textarea
                          rows={6}
                          placeholder="Tell us about your project..."
                          className="bg-glass/50 border-glass-border resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full group">
                  Send Message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Office Location */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-card via-secondary/20 to-primary/40 border border-glass-border rounded-3xl p-8 backdrop-blur-md"
          >
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Office Location
            </h2>
            <div className="aspect-video bg-muted rounded-2xl mb-6 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.8524569715973!2d36.80117737372744!3d-1.2607462355961419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173f254ef62f%3A0xeb15618740b6ee3f!2sWestlands%20commercial%20center!5e0!3m2!1sen!2ske!4v1756331100244!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-foreground">
                Digimatic Marketers HQ
              </h3>
              <p className="text-muted-foreground">
                Ring Road
                <br />
                Westlands Commercial Center
                <br />
                Nairobi, Kenya
              </p>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>Business Hours:</strong>
                </p>
                <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p>Saturday: 9:00 AM - 5:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
