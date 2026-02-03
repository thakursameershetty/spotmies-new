"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { X, Star, AlertCircle, Lightbulb, Trophy, LayoutGrid, Quote } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Project } from "@/types/types"; // Use the shared type from your project

export const CaseStudyModal = ({ project, isOpen, onClose }: { project: Project | null, isOpen: boolean, onClose: () => void }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isOpen]);

    if (!isOpen || !project) return null;

    // Helper to format rating as float (e.g. 5.0)
    const formattedRating = typeof project.rating === 'number' ? project.rating.toFixed(1) : "5.0";

    // Filter valid gallery images (remove empty strings)
    const validGallery = project.gallery ? project.gallery.filter(url => url && url.trim() !== "") : [];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-xl p-0 md:p-6"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 20, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-6xl h-full md:h-[90vh] bg-[#0a0a0a] border border-white/10 md:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-white/10 rounded-full border border-white/10 text-white transition-colors backdrop-blur-md"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* --- SCROLLABLE CONTENT --- */}
                        <div ref={scrollRef} className="flex-1 overflow-y-auto relative scrollbar-hide">
                            <ModalTracingBeam containerRef={scrollRef}>
                                <div className="max-w-4xl mx-auto pt-20 pb-24 px-6 md:px-12">

                                    {/* 1. HEADER */}
                                    <div className="mb-16">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00eef9]/10 border border-[#00eef9]/20 text-[#00eef9] text-xs font-bold uppercase tracking-wider mb-6">
                                            Case Study
                                        </div>
                                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
                                            {project.title}
                                        </h1>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 border-y border-white/10 py-8">
                                            <MetaItem label="Client" value={project.client || project.title} />
                                            <MetaItem label="Role" value={project.role || "Design & Dev"} />
                                            <MetaItem label="Timeline" value={project.timeline || "Ongoing"} />
                                            <div className="flex flex-col">
                                                <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Rating</div>
                                                <div className="flex items-center gap-1 text-[#00eef9]">
                                                    <Star className="w-4 h-4 fill-current" />
                                                    <span className="font-bold text-white">{formattedRating}</span>
                                                    <span className="text-neutral-500 text-xs">/ 5.0</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2. INTRODUCTION */}
                                    {project.introduction && (
                                        <div className="mb-20">
                                            <h3 className="text-2xl font-bold text-white mb-4">Overview</h3>
                                            <p className="text-xl text-neutral-300 leading-relaxed font-light">
                                                {project.introduction}
                                            </p>
                                        </div>
                                    )}

                                    {/* 3. CHALLENGE & APPROACH GRID */}
                                    {(project.challenge || project.approach) && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                                            {project.challenge && (
                                                <div className="bg-white/5 p-8 rounded-3xl border border-white/5 h-full relative overflow-hidden group hover:border-white/10 transition-colors">
                                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                                        <AlertCircle className="w-24 h-24 text-rose-500" />
                                                    </div>
                                                    <div className="flex items-center gap-2 text-rose-400 font-bold mb-6 text-lg relative z-10">
                                                        <AlertCircle className="w-5 h-5" />
                                                        The Challenge
                                                    </div>
                                                    <p className="text-neutral-400 leading-relaxed text-lg relative z-10">
                                                        {project.challenge}
                                                    </p>
                                                </div>
                                            )}

                                            {project.approach && (
                                                <div className="bg-white/5 p-8 rounded-3xl border border-white/5 h-full relative overflow-hidden group hover:border-white/10 transition-colors">
                                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                                        <Lightbulb className="w-24 h-24 text-[#00eef9]" />
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[#00eef9] font-bold mb-6 text-lg relative z-10">
                                                        <Lightbulb className="w-5 h-5" />
                                                        Our Approach
                                                    </div>
                                                    <p className="text-neutral-400 leading-relaxed text-lg relative z-10">
                                                        {project.approach}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* 4. GALLERY (Dynamically from Google Sheets) */}
                                    {validGallery.length > 0 && (
                                        <div className="mb-20">
                                            <div className="flex items-center gap-2 text-white font-bold mb-8 text-xl">
                                                <LayoutGrid className="w-6 h-6 text-[#00eef9]" />
                                                Visual Gallery
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                                {validGallery.map((img, idx) => (
                                                    <div
                                                        key={idx}
                                                        className={cn(
                                                            "relative rounded-2xl overflow-hidden border border-white/10 group bg-neutral-900",
                                                            // Make every 3rd image span full width for variety
                                                            idx % 3 === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                                                        )}
                                                    >
                                                        <Image
                                                            src={img}
                                                            alt={`${project.title} Gallery Image ${idx + 1}`}
                                                            fill
                                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                            sizes="(max-width: 768px) 100vw, 50vw"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* 5. OUTCOME & TESTIMONIAL */}
                                    {project.result && (
                                        <div className="mb-10">
                                            <div className="flex items-center gap-2 text-emerald-400 font-bold mb-6 text-xl">
                                                <Trophy className="w-6 h-6" />
                                                The Outcome
                                            </div>
                                            <p className="text-neutral-300 leading-relaxed mb-10 text-xl border-l-2 border-emerald-500/30 pl-6">
                                                {project.result}
                                            </p>

                                            {project.testimonial && project.testimonial.text && (
                                                <div className="relative mt-16 group">
                                                    <div className="absolute -top-6 -left-2 text-[#00eef9] opacity-20">
                                                        <Quote className="w-16 h-16 fill-current" />
                                                    </div>

                                                    <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-3xl overflow-hidden hover:bg-white/10 transition-colors duration-500">
                                                        <p className="relative z-10 text-white/90 text-xl md:text-2xl font-light italic leading-relaxed mb-8">
                                                            &quot;{project.testimonial.text}&quot;
                                                        </p>

                                                        <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00eef9] to-blue-500 flex items-center justify-center text-black font-bold text-lg shadow-lg">
                                                                {project.testimonial.author ? project.testimonial.author.charAt(0) : "?"}
                                                            </div>
                                                            <div>
                                                                <div className="text-base font-bold text-white">{project.testimonial.author}</div>
                                                                <div className="text-sm text-[#00eef9]">{project.testimonial.position}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                </div>
                            </ModalTracingBeam>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- HELPER COMPONENTS ---

const MetaItem = ({ label, value }: { label: string, value: string }) => (
    <div>
        <div className="text-xs text-neutral-500 uppercase tracking-wider mb-1">{label}</div>
        <div className="text-white font-medium">{value}</div>
    </div>
);

const ModalTracingBeam = ({ children, containerRef }: { children: React.ReactNode; containerRef: React.RefObject<HTMLDivElement | null> }) => {
    const { scrollYProgress } = useScroll({ container: containerRef });
    const [svgHeight, setSvgHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!contentRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                setSvgHeight(entry.contentRect.height);
            }
        });

        resizeObserver.observe(contentRef.current);

        return () => {
            if (contentRef.current) resizeObserver.unobserve(contentRef.current);
            resizeObserver.disconnect();
        };
    }, [children]);

    const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [0, svgHeight * 0.8]), { stiffness: 500, damping: 90 });
    const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [0, svgHeight]), { stiffness: 500, damping: 90 });

    return (
        <div className="relative w-full h-full">
            <div className="absolute left-0 top-0 h-full hidden xl:block z-50">
                <div className="ml-[24px] w-full h-full pointer-events-none overflow-hidden">
                    <svg viewBox={`0 0 20 ${svgHeight}`} width="20" height={svgHeight} className="block" aria-hidden="true">
                        <motion.path
                            d={`M 1 0V -36 l 18 24 V ${svgHeight} l -18 24V ${svgHeight}`}
                            fill="none"
                            stroke="#333"
                            strokeOpacity="0.5"
                        />
                        <motion.path
                            d={`M 1 0V -36 l 18 24 V ${svgHeight} l -18 24V ${svgHeight}`}
                            fill="none"
                            stroke="url(#gradient-modal)"
                            strokeWidth="1.25"
                            className="motion-reduce:hidden"
                        />
                        <defs>
                            <motion.linearGradient id="gradient-modal" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1={y1} y2={y2}>
                                <stop stopColor="#18CCFC" stopOpacity="0"></stop>
                                <stop stopColor="#18CCFC"></stop>
                                <stop offset="0.325" stopColor="#6344F5"></stop>
                                <stop offset="1" stopColor="#AE48FF" stopOpacity="0"></stop>
                            </motion.linearGradient>
                        </defs>
                    </svg>
                </div>
                <motion.div style={{ y: y1, top: 0 }} className="absolute left-[21px] top-0 w-2 h-2 rounded-full bg-[#00eef9] shadow-[0_0_10px_#00eef9] z-20" />
            </div>
            <div ref={contentRef}>{children}</div>
        </div>
    );
};