"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { X, Star, ChevronLeft, ChevronRight, ExternalLink, Quote, Calendar, User, Briefcase } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Project } from "@/types/types";

// --- CUSTOM CAROUSEL COMPONENT ---
const ProjectGalleryCarousel = ({ images, title }: { images: string[], title: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const paginate = useCallback((newDirection: number) => {
        setDirection(newDirection);
        setCurrentIndex((prevIndex) => {
            let nextIndex = prevIndex + newDirection;
            if (nextIndex < 0) nextIndex = images.length - 1;
            if (nextIndex >= images.length) nextIndex = 0;
            return nextIndex;
        });
    }, [images.length]);

    useEffect(() => {
        timerRef.current = setInterval(() => {
            paginate(1);
        }, 5000);

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [paginate]);

    const handleManualControl = (newDirection: number) => {
        if (timerRef.current) clearInterval(timerRef.current);
        paginate(newDirection);
        timerRef.current = setInterval(() => {
            paginate(1);
        }, 5000);
    };

    if (images.length === 0) return null;

    return (
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-black border border-white/10 group mb-12">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={currentIndex}
                    custom={direction}
                    variants={{
                        enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
                        center: { zIndex: 1, x: 0, opacity: 1 },
                        exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 })
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center bg-neutral-900"
                >
                    {/* Blurred Background for "Fill" effect */}
                    <div className="absolute inset-0 overflow-hidden opacity-30 blur-xl scale-110">
                        <Image
                            src={images[currentIndex]}
                            alt="Background blur"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Main Image - Fitted */}
                    <div className="relative w-full h-full z-10 p-2 md:p-4">
                        <Image
                            src={images[currentIndex]}
                            alt={`${title} screenshot ${currentIndex + 1}`}
                            fill
                            className="object-contain" // Changed to contain as requested
                            priority
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            {images.length > 1 && (
                <>
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-white/10 text-white backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 z-20"
                        onClick={(e) => { e.stopPropagation(); handleManualControl(-1); }}
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-white/10 text-white backdrop-blur-md border border-white/10 transition-all opacity-0 group-hover:opacity-100 z-20"
                        onClick={(e) => { e.stopPropagation(); handleManualControl(1); }}
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </>
            )}

            {/* Dots Indicator */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {images.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={(e) => {
                                e.stopPropagation();
                                if (timerRef.current) clearInterval(timerRef.current);
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all duration-300",
                                idx === currentIndex ? "w-8 bg-[#00eef9]" : "bg-white/50 hover:bg-white"
                            )}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

// --- TRACING BEAM COMPONENT (Adapted for Modal) ---
const ModalTracingBeam = ({
    children,
    containerRef,
    className
}: {
    children: React.ReactNode;
    containerRef: React.RefObject<HTMLDivElement | null>;
    className?: string;
}) => {
    // We use the containerRef for scroll tracking instead of the window
    const { scrollYProgress } = useScroll({
        container: containerRef,
        // Adjust offsets to trigger animation smoothly within the modal height
        offset: ["start start", "end end"],
    });

    const contentRef = useRef<HTMLDivElement>(null);
    const [svgHeight, setSvgHeight] = useState(0);

    useEffect(() => {
        if (contentRef.current) {
            setSvgHeight(contentRef.current.offsetHeight);
        }

        // Resize observer to update SVG height if content changes
        if (!contentRef.current) return;
        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setSvgHeight(entry.contentRect.height);
            }
        });
        resizeObserver.observe(contentRef.current);
        return () => resizeObserver.disconnect();
    }, []);

    const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
        stiffness: 500,
        damping: 90,
    });
    const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), {
        stiffness: 500,
        damping: 90,
    });

    return (
        <motion.div
            className={cn("relative w-full max-w-4xl mx-auto h-full", className)}
        >
            <div className="absolute -left-6 md:-left-20 top-3 hidden md:block">
                <motion.div
                    transition={{ duration: 0.2, delay: 0.5 }}
                    animate={{
                        boxShadow: scrollYProgress.get() > 0 ? "none" : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                    }}
                    className="ml-[27px] h-4 w-4 rounded-full border border-neutral-200 shadow-sm flex items-center justify-center"
                >
                    <motion.div
                        transition={{ duration: 0.2, delay: 0.5 }}
                        animate={{
                            backgroundColor: scrollYProgress.get() > 0 ? "white" : "#00d3f3", // Spotmies Cyan
                            borderColor: scrollYProgress.get() > 0 ? "white" : "#00d3f3",
                        }}
                        className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
                    />
                </motion.div>
                <svg
                    viewBox={`0 0 20 ${svgHeight}`}
                    width="20"
                    height={svgHeight}
                    className="ml-4 block"
                    aria-hidden="true"
                >
                    <motion.path
                        d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
                        fill="none"
                        stroke="#9091A0"
                        strokeOpacity="0.16"
                        transition={{ duration: 10 }}
                    ></motion.path>
                    <motion.path
                        d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="1.25"
                        className="motion-reduce:hidden"
                        transition={{ duration: 10 }}
                    ></motion.path>
                    <defs>
                        <motion.linearGradient
                            id="gradient"
                            gradientUnits="userSpaceOnUse"
                            x1="0"
                            x2="0"
                            y1={y1}
                            y2={y2}
                        >
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

    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
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
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-0 md:p-6"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-6xl h-full md:h-[95vh] bg-[#0a0a0a] border border-white/10 md:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 p-2.5 bg-black/50 hover:bg-white/10 rounded-full border border-white/10 text-white transition-colors backdrop-blur-md group"
                        >
                            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        {/* --- SCROLLABLE CONTENT --- */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto relative scrollbar-hide">
                            <div className="max-w-5xl mx-auto pt-20 pb-24 px-6 md:px-12">

                                {/* 1. HEADER & META */}
                                <div className="mb-10 border-b border-white/10 pb-10">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                                        <div>
                                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00eef9]/10 border border-[#00eef9]/20 text-[#00eef9] text-xs font-bold uppercase tracking-wider mb-4">
                                                {project.category}
                                            </div>
                                            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-2">
                                                {project.title}
                                            </h1>
                                            <div className="text-xl text-neutral-400 font-light">
                                                {project.client !== project.title ? project.client : ""}
                                            </div>
                                        </div>

                                        {/* VISIT BUTTON */}
                                        {project.link && project.link.trim() !== "" && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex-shrink-0 flex items-center gap-2 px-6 py-3 bg-[#00eef9] text-black rounded-full font-bold hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,238,249,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                                            >
                                                Visit Live Site
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <MetaItem icon={<User className="w-4 h-4" />} label="Role" value={project.role || "Design & Dev"} />
                                        <MetaItem icon={<Calendar className="w-4 h-4" />} label="Timeline" value={project.timeline || "Ongoing"} />
                                        <MetaItem icon={<Briefcase className="w-4 h-4" />} label="Client" value={project.client} />
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider mb-1">
                                                <Star className="w-3 h-3" /> Rating
                                            </div>
                                            <div className="flex items-center gap-1 text-[#00eef9]">
                                                <span className="font-bold text-white text-lg">{formattedRating}</span>
                                                <span className="text-neutral-500 text-sm">/ 5.0</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. CAROUSEL */}
                                <ProjectGalleryCarousel images={carouselImages} title={project.title} />

                                {/* 3. CASE STUDY CONTENT (Wrapped in Tracing Beam) */}
                                <ModalTracingBeam containerRef={scrollRef}>
                                    <div className="space-y-16 py-10">

                                        {/* Introduction */}
                                        {project.introduction && (
                                            <section>
                                                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                                    Overview
                                                </h3>
                                                <p className="text-xl text-neutral-300 leading-relaxed font-light">
                                                    {project.introduction}
                                                </p>
                                            </section>
                                        )}

                                        {/* Challenge */}
                                        {project.challenge && (
                                            <section>
                                                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                                    The Challenge
                                                </h3>
                                                <p className="text-lg text-neutral-400 leading-relaxed">
                                                    {project.challenge}
                                                </p>
                                            </section>
                                        )}

                                        {/* Solution / Approach */}
                                        {project.approach && (
                                            <section>
                                                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                                    The Solution
                                                </h3>
                                                <p className="text-lg text-neutral-400 leading-relaxed whitespace-pre-line">
                                                    {project.approach}
                                                </p>
                                            </section>
                                        )}

                                        {/* Result */}
                                        {project.result && (
                                            <section className="bg-white/5 border border-white/5 rounded-3xl p-8 md:p-10">
                                                <h3 className="text-2xl font-bold text-emerald-400 mb-6 flex items-center gap-3">
                                                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                                    The Outcome
                                                </h3>
                                                <p className="text-xl text-neutral-200 leading-relaxed font-light">
                                                    {project.result}
                                                </p>
                                            </section>
                                        )}

                                        {/* 4. TESTIMONIAL */}
                                        {project.testimonial && project.testimonial.text && (
                                            <div className="mt-10 pt-10 border-t border-white/10">
                                                <div className="relative max-w-3xl mx-auto text-center">
                                                    <Quote className="w-12 h-12 text-[#00eef9] opacity-20 mx-auto mb-6" />
                                                    <p className="text-2xl md:text-3xl font-light italic text-white/90 leading-relaxed mb-8">
                                                        &quot;{project.testimonial.text}&quot;
                                                    </p>
                                                    <div className="flex flex-col items-center">
                                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00eef9] to-blue-600 flex items-center justify-center text-black font-bold text-2xl mb-4 shadow-lg shadow-cyan-500/20">
                                                            {project.testimonial.author ? project.testimonial.author.charAt(0) : "?"}
                                                        </div>
                                                        <div className="text-lg font-bold text-white">
                                                            {project.testimonial.author}
                                                        </div>
                                                        <div className="text-[#00eef9]">
                                                            {project.testimonial.position}
                                                        </div>
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
    <div>
        <div className="flex items-center gap-2 text-xs text-neutral-500 uppercase tracking-wider mb-1">
            {icon} {label}
        </div>
        <div className="text-white font-medium truncate" title={value}>{value}</div>
    </div>
);