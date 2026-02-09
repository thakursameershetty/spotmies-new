"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { X, Star, ChevronLeft, ChevronRight, ExternalLink, Quote, Calendar, User, Briefcase } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Project } from "@/types/types";

// --- NEW MODERN GALLERY COMPONENT ---
const ModernGallery = ({ images, title }: { images: string[], title: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const nextImage = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Auto-play only when not hovered
    useEffect(() => {
        if (!isHovered) {
            timerRef.current = setInterval(nextImage, 6000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [nextImage, isHovered]);

    if (!images || images.length === 0) return null;

    return (
        <div 
            className="flex flex-col gap-4 mb-12 select-none"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* MAIN STAGE */}
            <div className="relative w-full aspect-video md:aspect-[16/9] rounded-2xl overflow-hidden bg-[#050505] border border-white/10 shadow-2xl group">
                
                {/* 1. The Image Display (Crossfade + Scale Effect) */}
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            src={images[currentIndex]}
                            alt={`${title} view ${currentIndex + 1}`}
                            fill
                            className="object-contain p-1 md:p-2"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>

                {/* 2. Controls */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                        className="pointer-events-auto p-3 rounded-full bg-black/50 hover:bg-white/10 text-white backdrop-blur-md border border-white/10 transition-transform active:scale-95"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                        className="pointer-events-auto p-3 rounded-full bg-black/50 hover:bg-white/10 text-white backdrop-blur-md border border-white/10 transition-transform active:scale-95"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>

                {/* 3. Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5">
                    <motion.div 
                        key={currentIndex}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "linear" }}
                        className="h-full bg-[#00eef9]"
                    />
                </div>
            </div>

            {/* THUMBNAIL STRIP */}
            {images.length > 1 && (
                <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
                    <div className="flex items-center justify-center gap-3 px-2">
                        {images.map((img, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={cn(
                                    "relative w-16 h-12 md:w-24 md:h-16 rounded-lg overflow-hidden border transition-all duration-300 flex-shrink-0",
                                    idx === currentIndex 
                                        ? "border-[#00eef9] opacity-100 ring-2 ring-[#00eef9]/20 scale-105" 
                                        : "border-white/10 opacity-50 hover:opacity-80 hover:border-white/30"
                                )}
                            >
                                <Image 
                                    src={img} 
                                    alt="thumbnail" 
                                    fill 
                                    className="object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

// --- TRACING BEAM COMPONENT ---
const ModalTracingBeam = ({
    children,
    containerRef,
    className
}: {
    children: React.ReactNode;
    containerRef: React.RefObject<HTMLDivElement | null>;
    className?: string;
}) => {
    const { scrollYProgress } = useScroll({
        container: containerRef,
        offset: ["start start", "end end"],
    });

    const contentRef = useRef<HTMLDivElement>(null);
    const [svgHeight, setSvgHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setSvgHeight(contentRef.current.offsetHeight);
        }
        if (!contentRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) setSvgHeight(entry.contentRect.height);
        });
        resizeObserver.observe(contentRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), { stiffness: 500, damping: 90 });
    const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), { stiffness: 500, damping: 90 });

    return (
        <motion.div className={cn("relative w-full max-w-4xl mx-auto h-full", className)}>
            <div className="absolute -left-6 md:-left-20 top-3 hidden md:block">
                <motion.div
                    transition={{ duration: 0.2, delay: 0.5 }}
                    animate={{ boxShadow: scrollYProgress.get() > 0 ? "none" : "rgba(0, 0, 0, 0.24) 0px 3px 8px" }}
                    className="ml-[27px] h-4 w-4 rounded-full border border-neutral-200 shadow-sm flex items-center justify-center"
                >
                    <motion.div
                        transition={{ duration: 0.2, delay: 0.5 }}
                        animate={{ backgroundColor: scrollYProgress.get() > 0 ? "white" : "#00d3f3", borderColor: scrollYProgress.get() > 0 ? "white" : "#00d3f3" }}
                        className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
                    />
                </motion.div>
                <svg viewBox={`0 0 20 ${svgHeight}`} width="20" height={svgHeight} className="ml-4 block" aria-hidden="true">
                    <motion.path d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`} fill="none" stroke="#9091A0" strokeOpacity="0.16" transition={{ duration: 10 }}></motion.path>
                    <motion.path d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`} fill="none" stroke="url(#gradient)" strokeWidth="1.25" className="motion-reduce:hidden" transition={{ duration: 10 }}></motion.path>
                    <defs>
                        <motion.linearGradient id="gradient" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
                            <stop stopColor="#18CCFC" stopOpacity="0"></stop>
                            <stop stopColor="#18CCFC"></stop>
                            <stop offset="0.325" stopColor="#6344F5"></stop>
                            <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
                        </motion.linearGradient>
                    </defs>
                </svg>
            </div>
            <div ref={contentRef}>{children}</div>
        </motion.div>
    );
};


// --- MAIN MODAL COMPONENT ---
export const CaseStudyModal = ({ project, isOpen, onClose }: { project: Project | null, isOpen: boolean, onClose: () => void }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "auto";
        return () => { document.body.style.overflow = "auto"; };
    }, [isOpen]);

    if (!isOpen || !project) return null;

    const formattedRating = typeof project.rating === 'number' ? project.rating.toFixed(1) : "5.0";
    const validGallery = project.gallery ? project.gallery.filter(url => url && url.trim() !== "") : [];
    const carouselImages = validGallery.length > 0 ? validGallery : [project.image];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-0 md:p-6"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 30, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.9, y: 30, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 350, damping: 35 }}
                        className="relative w-full max-w-7xl h-full md:h-[95vh] bg-[#0a0a0a] border border-white/10 md:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button - Sticky/Floating */}
                        <div className="absolute top-0 right-0 z-50 p-6 pointer-events-none">
                            <button
                                onClick={onClose}
                                className="pointer-events-auto p-3 bg-black/50 hover:bg-white text-white hover:text-black rounded-full border border-white/10 transition-all duration-300 backdrop-blur-md group shadow-xl"
                            >
                                <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* --- SCROLLABLE CONTENT --- */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto relative scrollbar-hide">
                            <div className="max-w-6xl mx-auto pt-16 md:pt-24 pb-24 px-6 md:px-12">

                                {/* 1. HEADER SECTION (Split Layout) */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 mb-16 items-start">
                                    {/* Left: Title & Description */}
                                    <div className="space-y-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00eef9]/10 border border-[#00eef9]/20 text-[#00eef9] text-xs font-bold uppercase tracking-wider">
                                            {project.category}
                                        </div>
                                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                                            {project.title}
                                        </h1>
                                        {project.link && project.link.trim() !== "" && (
                                            <div className="pt-4">
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black rounded-full font-bold hover:bg-[#00eef9] transition-colors shadow-lg shadow-white/10 hover:shadow-[#00eef9]/30"
                                                >
                                                    Visit
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    {/* Right: Meta Grid */}
                                    <div className="grid grid-cols-2 gap-6 bg-white/5 border border-white/5 p-6 rounded-2xl">
                                        <MetaItem icon={<User className="w-4 h-4 text-[#00eef9]" />} label="Client" value={project.client} />
                                        <MetaItem icon={<Briefcase className="w-4 h-4 text-[#00eef9]" />} label="Role" value={project.role || "Design & Dev"} />
                                        <MetaItem icon={<Calendar className="w-4 h-4 text-[#00eef9]" />} label="Timeline" value={project.timeline || "Ongoing"} />
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider mb-1">
                                                <Star className="w-3 h-3 text-[#00eef9]" /> Rating
                                            </div>
                                            <div className="text-white font-medium text-lg">{formattedRating} / 5.0</div>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. MODERN CAROUSEL */}
                                <ModernGallery images={carouselImages} title={project.title} />

                                {/* 3. CASE STUDY CONTENT (Tracing Beam) */}
                                <ModalTracingBeam containerRef={scrollRef}>
                                    <div className="space-y-20 py-10 max-w-4xl mx-auto">
                                        
                                        {/* Introduction */}
                                        {project.introduction && (
                                            <section className="prose prose-invert max-w-none">
                                                {/* Soft Lavender Gradient for Overview */}
                                                <h3 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent inline-block">
                                                    Overview
                                                </h3>
                                                <p className="text-xl text-neutral-300 leading-relaxed font-light">
                                                    {project.introduction}
                                                </p>
                                            </section>
                                        )}

                                        {/* Stacked Challenge & Solution */}
                                        <div className="flex flex-col gap-16">
                                            {project.challenge && (
                                                <section>
                                                    {/* Warm Sunset/Peach Gradient for Challenge */}
                                                    <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-amber-200 via-orange-200 to-rose-200 bg-clip-text text-transparent inline-block">
                                                        The Challenge
                                                    </h3>
                                                    <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light">
                                                        {project.challenge}
                                                    </p>
                                                </section>
                                            )}
                                            {project.approach && (
                                                <section>
                                                    {/* Cool Mint/Aqua Gradient for Solution */}
                                                    <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent inline-block">
                                                        Our Solution
                                                    </h3>
                                                    <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light">
                                                        {project.approach}
                                                    </p>
                                                </section>
                                            )}
                                        </div>

                                        {/* Result - Highlight Box */}
                                        {project.result && (
                                            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 to-black border border-white/10 p-10">
                                                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00eef9]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                                                <h3 className="relative z-10 text-2xl font-bold text-[#00eef9] mb-6 flex items-center gap-3">
                                                    The Outcome
                                                </h3>
                                                <p className="relative z-10 text-xl text-neutral-200 leading-relaxed font-light">
                                                    {project.result}
                                                </p>
                                            </section>
                                        )}

                                        {/* Testimonial */}
                                        {project.testimonial && project.testimonial.text && (
                                            <div className="pt-10">
                                                <div className="relative text-center p-10 md:p-14 bg-white/[0.02] border border-white/5 rounded-[2rem]">
                                                    <Quote className="w-10 h-10 text-[#00eef9] mx-auto mb-8 opacity-50" />
                                                    <p className="text-2xl md:text-3xl font-light italic text-white/90 leading-relaxed mb-8">
                                                        &quot;{project.testimonial.text}&quot;
                                                    </p>
                                                    <div className="flex flex-col items-center gap-2">
                                                        <div className="text-lg font-bold text-white">{project.testimonial.author}</div>
                                                        <div className="text-sm text-[#00eef9] uppercase tracking-widest">{project.testimonial.position}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </ModalTracingBeam>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const MetaItem = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex flex-col">
        <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider mb-1">
            {icon} {label}
        </div>
        <div className="text-white font-medium text-lg truncate" title={value}>{value}</div>
    </div>
);