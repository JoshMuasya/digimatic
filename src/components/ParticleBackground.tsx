"use client";

import { useEffect, useRef } from "react";

interface ParticleBackgroundProps {
    particleCount?: number; // Optional prop to set number of particles
    enableShadows?: boolean; // Optional prop to toggle shadows
    connectionFrequency?: number; // How often to update connections (1 = every frame, 2 = every other, etc.)
}

const ParticleBackground = ({
    particleCount = 100,
    enableShadows = false, // Disabled by default for performance
    connectionFrequency = 2, // Update connections every 2 frames
}: ParticleBackgroundProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number | null>(null);
    const frameCountRef = useRef<number>(0); // Track frames for connection throttling

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const midnightPurple = "#2A2A57";
        const lightBlue = "#A3BFFA";

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            color: string;
            baseSpeed: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.vx = (Math.random() - 0.5) * 2;
                this.vy = (Math.random() - 0.5) * 2;
                this.radius = Math.random() * 3 + 1;
                this.color = Math.random() > 0.5 ? midnightPurple : lightBlue;
                this.baseSpeed = 1;
            }

            draw() {
                if (!ctx) return;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;
                if (enableShadows) {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = this.color;
                }
                ctx.fill();
                ctx.closePath();
            }

            update(mouseX: number, mouseY: number) {
                const dx = this.x - mouseX;
                const dy = this.y - mouseY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 100;
                let speedMultiplier = this.baseSpeed;

                if (distance < maxDistance) {
                    const force = (maxDistance - distance) / maxDistance;
                    speedMultiplier = this.baseSpeed * (1 - force * 0.8);
                    this.vx += (dx / distance) * force * 2;
                    this.vy += (dy / distance) * force * 2;
                }

                this.vx *= speedMultiplier;
                this.vy *= speedMultiplier;

                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;

                this.draw();
            }
        }

        // Dynamic particle count based on canvas size (optional tweak)
        const adjustedParticleCount = Math.min(
            particleCount,
            Math.floor((canvas.width * canvas.height) / 10000) // ~1 particle per 10,000 pixels
        );
        const particles: Particle[] = Array.from(
            { length: adjustedParticleCount },
            () => new Particle()
        );

        let mouseX = 0;
        let mouseY = 0;

        canvas.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Optimized particle connection with spatial partitioning
        const connectParticles = () => {
            const gridSize = 100;
            const grid: { [key: string]: Particle[] } = {};

            // Assign particles to grid cells
            particles.forEach((p) => {
                const gridX = Math.floor(p.x / gridSize);
                const gridY = Math.floor(p.y / gridSize);
                const key = `${gridX},${gridY}`;
                if (!grid[key]) grid[key] = [];
                grid[key].push(p);
            });

            // Batch drawing by color to minimize state changes
            const drawConnections = (color: string, alphaBase: string) => {
                ctx!.strokeStyle = color;
                ctx!.lineWidth = 1;
                ctx!.beginPath();
                particles.forEach((p1) => {
                    const gridX = Math.floor(p1.x / gridSize);
                    const gridY = Math.floor(p1.y / gridSize);
                    for (let dx = -1; dx <= 1; dx++) {
                        for (let dy = -1; dy <= 1; dy++) {
                            const key = `${gridX + dx},${gridY + dy}`;
                            const neighbors = grid[key];
                            if (!neighbors) continue;

                            neighbors.forEach((p2) => {
                                if (p1 === p2 || p1.color !== p2.color) return;
                                const dx = p1.x - p2.x;
                                const dy = p1.y - p2.y;
                                const distance = Math.sqrt(dx * dx + dy * dy);

                                if (distance < 100) {
                                    const alpha = 1 - distance / 100;
                                    ctx!.strokeStyle = `${alphaBase}, ${alpha})`;
                                    ctx!.moveTo(p1.x, p1.y);
                                    ctx!.lineTo(p2.x, p2.y);
                                }
                            });
                        }
                    }
                });
                ctx!.stroke();
                ctx!.closePath();
            };

            drawConnections("rgba(42,42,87", "rgba(42,42,87"); // Midnight purple
            drawConnections("rgba(163,191,250", "rgba(163,191,250"); // Light blue
        };

        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles every frame
            particles.forEach((particle) => particle.update(mouseX, mouseY));

            // Throttle connection updates
            frameCountRef.current = (frameCountRef.current + 1) % connectionFrequency;
            if (frameCountRef.current === 0) {
                connectParticles();
            }

            rafRef.current = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles.forEach((p) => {
                p.x = Math.random() * canvas.width;
                p.y = Math.random() * canvas.height;
            });
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [particleCount, enableShadows, connectionFrequency]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full z-10"
        />
    );
};

export default ParticleBackground;