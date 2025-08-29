"use client";

import React from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import {
  ArrowRight,
  Code,
  Coins,
  Megaphone,
  Monitor,
  Palette,
  Shield,
  CheckCircle2,
} from "lucide-react";
import { Button } from "./ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

/**
 * Tiny particle carry-over: subtle, blurred, slow-moving dots that echo the hero.
 * No extra libs. Colors piggyback on your design tokens.
 */
const CarryOverParticles = () => {
  const particles = [
    { size: 140, x: "10%", y: "10%", duration: 10, delay: 0 },
    { size: 90, x: "80%", y: "15%", duration: 12, delay: 1.2 },
    { size: 110, x: "65%", y: "40%", duration: 14, delay: 0.8 },
    { size: 70, x: "25%", y: "35%", duration: 11, delay: 0.4 },
    { size: 120, x: "5%", y: "55%", duration: 16, delay: 1.6 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          initial={{ y: 0, opacity: 0.25 }}
          animate={{ y: [0, -20, 0], opacity: [0.25, 0.4, 0.25] }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
          }}
          className="absolute rounded-full blur-3xl"
        >
          {/* layered soft glows: primary + secondary */}
          <span className="absolute inset-0 rounded-full bg-primary/10" />
          <span className="absolute inset-0 rounded-full bg-secondary/10 mix-blend-screen" />
        </motion.span>
      ))}
    </div>
  );
};

const ServicesCards = () => {
  const pathname = usePathname()

  const buttonConfig = (() => {
    if (pathname === "/services") {
      return { text: "Get in Touch", href: "/contact" }
    } else {
      return { text: "Learn More", href: "/services" }
    }
  })()

  const services = [
    {
      icon: Code,
      title: "Software Development",
      description:
        "Custom software solutions built with cutting-edge technologies and best practices.",
      features: ["Web Applications", "Desktop Software", "API Development", "System Integration"],
    },
    {
      icon: Monitor,
      title: "Website & Mobile Apps",
      description:
        "Responsive websites and mobile applications that engage users and drive results.",
      features: ["Responsive Design", "Mobile Apps", "E-commerce", "CMS Solutions"],
    },
    {
      icon: Megaphone,
      title: "Digital Marketing",
      description:
        "Strategic digital marketing campaigns that boost your online presence and ROI.",
      features: ["SEO Optimization", "Social Media", "PPC Campaigns", "Content Strategy"],
    },
    {
      icon: Palette,
      title: "Graphics Design",
      description:
        "Creative visual solutions that communicate your brand message effectively.",
      features: ["Brand Identity", "UI/UX Design", "Print Design", "Digital Assets"],
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description:
        "Comprehensive security solutions to protect your digital assets and data.",
      features: ["Security Audits", "Threat Assessment", "Data Protection", "Compliance"],
    },
    {
      icon: Coins,
      title: "Digital Asset Engineering",
      description:
        "Blockchain and cryptocurrency solutions for the future of finance.",
      features: ["Smart Contracts", "DeFi Solutions", "NFT Platforms", "Tokenization"],
    },
  ];

  /** Scroll-triggered gradient animation for the section background overlay */
  const sectionRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"], // animates while section is in viewport
  });
  // Animate overlay opacity and gradient shift based on scroll
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.25, 0.6]);
  const overlayTranslate = useTransform(scrollYProgress, [0, 1], [0, -80]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  return (
    <section
      ref={sectionRef}
      className="relative z-10 overflow-hidden py-20 px-4 sm:px-6 lg:px-8
                 bg-gradient-to-b from-background via-background/95 to-background shadow-[6px_0_12px_0_#6A0DAD99]"
    >
      {/* Top Divider Transition from Hero */}
      <div className="absolute -top-16 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-16 text-background"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,128L1440,0L1440,320L0,320Z"></path>
        </svg>
      </div>

      {/* Subtle particle carry-over */}
      <CarryOverParticles />

      {/* Scroll-reactive gradient overlay (brand tint) */}
      <motion.div
        aria-hidden
        style={{ opacity: overlayOpacity, y: overlayTranslate }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-secondary/10 to-transparent" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading + Subtitle (Heading Treatment) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Driving Innovation, Security & Growth through comprehensive digital solutions.
          </p>
        </motion.div>

        {/* Cards (Staggered Animations + Card Visual Contrast + Hover Depth) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.04,
                boxShadow: "0px 12px 40px rgba(106, 13, 173, 0.28)", // purple glow
              }}
              className="group relative rounded-2xl"
            >
              {/* Subtle animated gradient border for better contrast */}
              <div className="absolute inset-0 rounded-2xl p-[1.5px] bg-gradient-to-br from-primary/30 via-primary/0 to-secondary/30 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative h-full rounded-[14px] p-8 bg-gradient-glass border border-border backdrop-blur-md
                              group-hover:border-primary/40 transition-all duration-300">
                <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mb-6
                                group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-4 text-foreground">{service.title}</h3>

                <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                {/* Feature List with Icons */}
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary mr-2 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant="ghost"
                  className="w-full group-hover:bg-primary/10 group-hover:text-primary transition-colors"
                >
                  <Link href={buttonConfig.href}>
                    {buttonConfig.text}
                  </Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA (Enhanced) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative bg-gradient-glass border border-border rounded-3xl p-8 md:p-12 backdrop-blur-md text-center mt-20 overflow-hidden"
        >
          {/* animated gradient sweep under the CTA */}
          <motion.div
            aria-hidden
            initial={{ x: "-40%" }}
            whileInView={{ x: "40%" }}
            transition={{ duration: 5, ease: "linear", repeat: Infinity, repeatType: "mirror" }}
            className="pointer-events-none absolute -inset-x-1/3 -top-1/2 h-[200%] rotate-12 opacity-20"
          >
            <div className="w-full h-full bg-gradient-to-r from-primary/20 via-secondary/10 to-transparent" />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Ready to Transform Your Business?
            </span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Don&apos;t let your competition get ahead. Partner with us to leverage cutting-edge
            technology and innovative solutions that will propel your business to new heights. Our
            expert team is ready to turn your vision into reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            {/* CTA with gradient overlay + focus ring */}
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden focus-visible:ring-2 focus-visible:ring-primary/60"
            >
              <Link href="/projects">
                <span className="relative z-10 flex items-center">
                  View our Projects
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            </Button>

            {/* Ghost -> Outline on hover */}
            <Button
              asChild
              variant="ghost"
              size="lg"
              className="border border-primary/40 hover:border-primary hover:text-primary transition-colors"
            >
              <Link href="/contact">
                Talk to us
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-border">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">Free</div>
              <div className="text-muted-foreground">Initial Consultation</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Satisfaction Guarantee</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesCards;
