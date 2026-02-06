"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        setScrolled(latest > 20);
    });

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const targetId = href.substring(1);
            const elem = document.getElementById(targetId);
            if (elem) {
                elem.scrollIntoView({ behavior: "smooth", block: "start" });
                window.history.pushState(null, "", href);
                setMobileMenuOpen(false); // Close menu on click
            }
        }
    };

    const scheduleMeeting = (e: React.MouseEvent) => {
        e.preventDefault();
        const calendlyLink = "https://calendly.com/spotmies/30min";
        window.open(calendlyLink, "_blank");
        setMobileMenuOpen(false);
    };

    const navItems = [
        { name: "Services", href: "/#services" },
        { name: "Portfolio", href: "/#portfolio" },
        { name: "Process", href: "#process" },
        { name: "Careers", href: "/careers" },
        { name: "About Us", href: "/about" },
        { name: "Blogs", href: "/blogs" },
    ];

    return (
        <div className="fixed top-0 w-full flex justify-center z-[100] p-4 md:p-6 pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "relative flex items-center justify-between w-full max-w-[1320px] rounded-full px-6 py-3 transition-all duration-300 z-[101] pointer-events-auto",
                    scrolled || mobileMenuOpen
                        ? "bg-black/80 backdrop-blur-md border border-white/10 shadow-lg"
                        : "bg-black/50 backdrop-blur-sm border border-white/5"
                )}
            >
                {/* 1. Logo Section */}
                <Link
                    href="/"
                    className="flex items-center gap-2 cursor-pointer z-[102]"
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        setMobileMenuOpen(false);
                    }}
                >
                    <div className="relative w-32 h-8 md:w-40 md:h-8">
                        <Image
                            src="/spotmies_banner.png"
                            alt="Spotmies"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </Link>

                {/* 2. Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={(e) => item.href.startsWith("#") ? handleScroll(e, item.href) : null}
                            className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                        >
                            {item.name}
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00d3f3] transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* 3. Desktop CTA */}
                <button
                    onClick={scheduleMeeting}
                    className="hidden md:flex group relative items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white text-xs md:text-sm font-medium transition-all cursor-pointer"
                >
                    <span>Schedule a Call</span>
                    <svg
                        className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </button>

                {/* 4. Mobile Menu Toggle (Hamburger) */}
                <button
                    className="md:hidden text-white p-2 z-[102] relative outline-none"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </motion.nav>

            {/* 5. FULL SCREEN MOBILE MENU OVERLAY */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
                        exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
                        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                        className="fixed inset-0 bg-[#050505] z-[90] flex flex-col pt-32 px-6 pb-6 md:hidden pointer-events-auto"
                    >
                        {/* Background Ambient Effect */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d3f3]/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

                        {/* NAV ITEMS CONTAINER (Left Aligned) */}
                        <div className="flex flex-col w-full max-w-lg mx-auto h-full justify-between">

                            {/* Menu Links */}
                            <div className="flex flex-col gap-2">
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -30 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.1, duration: 0.4 }}
                                        className="border-b border-white/5 last:border-none"
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={(e) => item.href.startsWith("#") ? handleScroll(e, item.href) : setMobileMenuOpen(false)}
                                            className="group flex items-center justify-between py-5 w-full active:opacity-70"
                                        >
                                            <span className="text-3xl font-outfit font-bold text-white/90 group-hover:text-[#00d3f3] group-active:text-[#00d3f3] transition-colors">
                                                {item.name}
                                            </span>

                                            {/* Interaction Arrow */}
                                            <ArrowRight
                                                className="w-6 h-6 text-white/30 group-hover:text-[#00d3f3] group-active:text-[#00d3f3] transform group-hover:translate-x-2 group-active:translate-x-2 transition-all duration-300"
                                            />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Schedule Call Button (Filled White) */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.4 }}
                                className="w-full pb-8"
                            >
                                <button
                                    onClick={scheduleMeeting}
                                    className="w-full py-4 rounded-full bg-white text-black font-bold text-lg hover:bg-neutral-200 active:scale-95 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2"
                                >
                                    Schedule a Call
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}