"use client";

import { motion } from "framer-motion";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { BsLinkedin, BsGithub, BsTwitterX } from "react-icons/bs";

export default function ContactSection() {
    return (
        <section className="relative py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
                {/* Left: Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-8"
                >
                    <h2 className="text-4xl font-bold">Let’s Connect</h2>
                    <p className="text-gray-300">
                        Have a project in mind? We&apos;d love to hear from you. Fill out the form or reach us directly through the details below.
                    </p>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <FaEnvelope className="text-purple-400 w-6 h-6" />
                            <span>hello@digimatic.com</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FaPhoneAlt className="text-purple-400 w-6 h-6" />
                            <span>+254 700 123 456</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <FaMapMarkerAlt className="text-purple-400 w-6 h-6" />
                            <span>Nairobi, Kenya</span>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex space-x-6 pt-4">
                        <a href="#" className="hover:text-purple-400 transition-colors">
                            <BsLinkedin size={24} />
                        </a>
                        <a href="#" className="hover:text-purple-400 transition-colors">
                            <BsGithub size={24} />
                        </a>
                        <a href="#" className="hover:text-purple-400 transition-colors">
                            <BsTwitterX size={24} />
                        </a>
                    </div>
                </motion.div>

                {/* Right: Contact Form */}
                <motion.form
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-gray-950 p-8 rounded-2xl shadow-lg space-y-6"
                >
                    <div>
                        <label className="block mb-2 text-sm">Name</label>
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm">Message</label>
                        <textarea
                            rows={4}
                            placeholder="Your message..."
                            className="w-full px-4 py-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors font-medium shadow-md"
                    >
                        Send Message
                    </button>
                </motion.form>
            </div>
        </section>
    );
}
