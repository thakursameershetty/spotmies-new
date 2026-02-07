"use client";

import React, { useRef } from "react";
import { MessageSquareQuote } from "lucide-react";
import { motion, useSpring, useMotionTemplate, useMotionValue } from "framer-motion";
import HeroCarousel from "@/components/ui/hero-carousel";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { cn } from "@/lib/utils";
import { Project } from "@/types/types";

const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) => {
    const ref = useRef<HTMLButtonElement>(null);
    const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
    const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { clientX, clientY } = e;
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        x.set((clientX - centerX) * 0.1);
        y.set((clientY - centerY) * 0.1);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.button
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x, y }}
            onClick={onClick}
            className={cn("relative group", className)}
        >
            {children}
        </motion.button>
    );
};

export function HeroSection({ projects }: { projects: Project[] }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const scheduleMeeting = () => {
        const calendlyLink = "https://calendly.com/spotmies/30min";
        window.open(calendlyLink, "_blank");
    };

    const handleGetQuote = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="hero" onMouseMove={handleMouseMove} className="relative w-full min-h-[100vh] flex flex-col justify-start items-center overflow-hidden bg-[#030014] text-white selection:bg-cyan-500/30 pt-32 md:pt-52 pb-20 md:pb-0">
            {/* LAYER 0: Ambient Color Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-cyan/20 rounded-full blur-[80px] md:blur-[100px] animate-blob-bounce mix-blend-screen" />
                <div className="absolute top-[20%] right-[-10%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-brand-blue/20 rounded-full blur-[100px] md:blur-[120px] animate-blob-bounce animation-delay-2000 mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[20%] w-[400px] md:w-[600px] h-[300px] md:h-[500px] bg-brand-teal/15 rounded-full blur-[100px] md:blur-[120px] animate-blob-bounce animation-delay-4000 mix-blend-screen" />
            </div>

            {/* LAYER 1: Spotlight */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-10 opacity-50 transition duration-300"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            600px circle at ${mouseX}px ${mouseY}px,
                            rgba(34, 211, 238, 0.1),
                            transparent 80%
                        )
                    `,
                }}
            />

            {/* LAYER 2: Text Content */}
            <div className="relative z-30 w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col items-center justify-center text-center mb-8">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-cyan-100 mb-6 md:mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(34,211,238,0.15)] font-outfit"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    Next Generation Digital Solutions
                </motion.div>

                {/* Headline Group */}
                <h1 className="text-2xl sm:text-4xl lg:text-6xl font-outfit font-medium tracking-tight flex flex-col items-center justify-center">
                    <motion.span
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="block bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 font-light text-lg sm:text-3xl lg:text-4xl mb-3 md:mb-5"
                    >
                        We architect
                    </motion.span>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0 }}
                        className="flex flex-col items-center md:flex-row md:items-baseline md:justify-center gap-x-2 gap-y-1 md:gap-x-3 max-w-5xl mx-auto px-2"
                    >
                        <div className="flex items-baseline gap-2">
                            <span className="relative inline-block">
                                <PointerHighlight
                                    rectangleClassName="bg-cyan-950/50 border-cyan-500/30 backdrop-blur-[2px]"
                                    pointerClassName="text-cyan-400"
                                    initialColor="#ffffff"
                                    highlightColor="#22d3ee"
                                    containerClassName="pt-1"
                                >
                                    <span className="relative z-10 italic px-2 bg-clip-text text-transparent bg-gradient-to-b from-cyan-200 to-cyan-500 text-2xl sm:text-4xl lg:text-6xl">
                                        digital solutions
                                    </span>
                                </PointerHighlight>
                            </span>
                            <span className="bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 text-2xl sm:text-4xl lg:text-6xl">
                                that are
                            </span>
                        </div>

                        <div className="flex items-center justify-center md:justify-start min-w-[140px] md:min-w-auto">
                            <GooeyText
                                texts={["Intelligent", "Scalable", "Immersive", "Secure", "Future-Proof"]}
                                morphTime={0.7}
                                cooldownTime={0.7}
                                className="font-bold"
                                textClassName="text-2xl sm:text-4xl lg:text-6xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                            />
                        </div>
                    </motion.div>
                </h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="text-sm sm:text-lg text-neutral-400 mb-8 md:mb-10 leading-relaxed max-w-xl font-light tracking-wide mx-auto mt-6 md:mt-8 font-outfit px-4"
                >
                    Professional services that deliver exceptional quality, reliability, and customer service to exceed your expectations.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="flex flex-row gap-3 w-full sm:w-auto items-center justify-center px-4"
                >
                    <MagneticButton
                        onClick={scheduleMeeting}
                        className="flex-1 sm:flex-none w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-2.5 bg-white text-black rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-[0_0_50px_-10px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_-5px_rgba(255,255,255,0.6)] overflow-hidden transition-shadow"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                            Schedule a call
                        </span>
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/80 to-transparent z-0" />
                    </MagneticButton>

                    <MagneticButton
                        onClick={handleGetQuote}
                        className="flex-1 sm:flex-none w-full sm:w-auto px-4 py-3 sm:px-6 sm:py-2.5 text-white/90 rounded-full font-medium text-xs sm:text-sm tracking-wide border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30 backdrop-blur-sm transition-all flex items-center justify-center gap-2 sm:gap-3"
                    >
                        <span className="whitespace-nowrap">Get Quote</span>
                        <div className="flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/10 group-hover:bg-white group-hover:text-black transition-colors">
                            <MessageSquareQuote className="w-3 h-3" />
                        </div>
                    </MagneticButton>
                </motion.div>
            </div>

            {/* LAYER 3: Carousel */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
                // UPDATED: Removed hardcoded height [280px] to allow responsive sizing
                className="relative z-20 w-full h-[320px] md:h-[450px] overflow-visible mt-6 md:mt-8"
            >
                <div className="w-full h-full flex flex-col items-center justify-center">
                    {/* UPDATED: Removed scale-[0.6] hacks. The carousel now sizes itself correctly on mobile. */}
                    <div className="relative w-full h-full flex items-center justify-center origin-center">
                        <HeroCarousel projects={projects} />
                    </div>
                </div>
            </motion.div>
        </section>
    );
}