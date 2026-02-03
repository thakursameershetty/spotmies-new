"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { Menu, X, ChevronLeft, ChevronRight, Globe, ArrowRight } from "lucide-react";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { cn } from "@/lib/utils";

// --- Types & Data ---
export interface Project {
    id: number;
    title: string;
    thumbnail: string;
    gallery: string[];
    techStack: string[];
    description: {
        introduction: string;
        importance: string;
        conclusion: string;
    };
}

const PROJECTS: Project[] = Array.from({ length: 25 }, (_, i) => {
    const id = i + 1;
    const ext = id === 5 ? "jpg" : "png";
    return {
        id: i,
        title: `Web Project ${i + 1}`,
        thumbnail: `/proj/p${id}.${ext}`,
        gallery: [
            `/proj/p${id}.${ext}`,
            `https://picsum.photos/seed/${i + 600}/800/450`,
            `https://picsum.photos/seed/${i + 700}/800/450`,
        ],
        techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
        description: {
            introduction: "Designed to provide a seamless and immersive web experience for users worldwide. We focused on creating an intuitive interface that simplifies complex workflows while maintaining visual fidelity.",
            importance: "Breaking usage barriers with high-performance rendering and accessible UI components. The challenge was to ensure the application remained performant even with heavy data loads.",
            conclusion: "A robust, scalable solution that increased conversion rates by over 35%. The final product not only met client expectations but set a new standard for their digital presence."
        }
    };
});

const CATEGORIES = ["By Industry", "By Size", "By Use Case"];

// --- Helper used previously, now adapted for filter logic ---
// Indices:
// 0-7: By Industry (8 items)
// 8-15: By Size (8 items)
// 16-24: By Use Case (9 items)
const getProjectsByCategory = (categoryIndex: number) => {
    if (categoryIndex === 0) return PROJECTS.slice(0, 8);
    if (categoryIndex === 1) return PROJECTS.slice(8, 16);
    return PROJECTS.slice(16, 25);
};


// --- UPDATED: Modal Component with TracingBeam ---
interface ProjectDetailModalProps {
    project: Project;
    onClose: () => void;
}

function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
    const [currentImage, setCurrentImage] = useState(0);
    const nextImage = () => setCurrentImage((prev) => (prev + 1) % project.gallery.length);
    const prevImage = () => setCurrentImage((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);

    const scrollContainerRef = useRef<HTMLDivElement>(null);

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[6000] flex items-center justify-center p-0 md:p-8 bg-black/90 backdrop-blur-xl"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 30 }}
                className="bg-[#0f0f0f] border border-white/10 md:rounded-2xl w-full max-w-5xl h-full md:max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-6 right-6 z-50 p-2 bg-black/50 hover:bg-white/10 text-white rounded-full transition-colors border border-white/10 backdrop-blur-md"><X size={20} /></button>

                {/* Single Scrollable Container */}
                <div
                    ref={scrollContainerRef}
                    className="flex-1 overflow-y-auto custom-scrollbar relative w-full"
                >
                    {/* Hero Section (Gallery) */}
                    <div className="w-full relative h-[40vh] md:h-[60vh] bg-black">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImage}
                                src={project.gallery[currentImage]}
                                alt="Gallery"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="absolute inset-0 w-full h-full object-cover opacity-70"
                            />
                        </AnimatePresence>

                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />

                        <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 flex items-center justify-between px-4 md:px-6 z-20 pointer-events-none">
                            <button onClick={prevImage} className="pointer-events-auto p-3 bg-black/40 hover:bg-white/20 text-white rounded-full backdrop-blur-md border border-white/10 transition-colors shadow-lg"><ChevronLeft size={24} /></button>
                            <button onClick={nextImage} className="pointer-events-auto p-3 bg-black/40 hover:bg-white/20 text-white rounded-full backdrop-blur-md border border-white/10 transition-colors shadow-lg"><ChevronRight size={24} /></button>
                        </div>

                        <div className="absolute bottom-24 md:bottom-28 left-6 hidden md:flex items-center gap-2 z-20">
                            {project.gallery.map((img, idx) => (
                                <button key={idx} onClick={() => setCurrentImage(idx)} className={`relative w-16 aspect-video rounded-md overflow-hidden border-2 transition-all ${currentImage === idx ? 'border-white opacity-100 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}><img src={img} alt="thumb" className="w-full h-full object-cover" /></button>
                            ))}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="relative z-10 -mt-20 px-4 md:px-8 pb-20">
                        <div className="max-w-4xl mx-auto">
                            <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 mb-12 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10">
                                    <Globe size={120} className="text-white" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="p-1.5 rounded-md bg-white/10">
                                            <Globe size={16} className="text-white" />
                                        </div>
                                        <span className="text-neutral-400 text-xs font-bold uppercase tracking-wider">Web Application</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{project.title}</h2>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-neutral-300 text-sm font-medium hover:bg-white/10 transition-colors cursor-default">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <TracingBeam className="px-0 md:px-6" containerRef={scrollContainerRef}>
                                <div className="relative pt-4 text-neutral-300 space-y-16 lg:space-y-24">
                                    <div className="relative group">
                                        <h3 className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-bold w-fit px-4 py-1 mb-6 shadow-lg shadow-blue-500/20">The Challenge</h3>
                                        <h4 className="text-2xl md:text-3xl font-semibold text-white mb-6 group-hover:text-blue-200 transition-colors">Identifying the Core Problem</h4>
                                        <div className="prose prose-invert prose-lg text-neutral-400">
                                            <p className="leading-loose">{project.description.introduction}</p>
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <h3 className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-full text-sm font-bold w-fit px-4 py-1 mb-6 shadow-lg shadow-emerald-500/20">The Process</h3>
                                        <h4 className="text-2xl md:text-3xl font-semibold text-white mb-6 group-hover:text-emerald-200 transition-colors">Strategic Implementation</h4>
                                        <div className="prose prose-invert prose-lg text-neutral-400">
                                            <p className="leading-loose mb-6">{project.description.importance}</p>
                                        </div>
                                        <div className="mt-8 p-6 bg-white/5 rounded-xl border border-white/5 relative overflow-hidden">
                                            <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500" />
                                            <p className="text-lg text-white/90 italic font-light">"The team delivered beyond our expectations, solving critical bottlenecks in our workflow with elegant code."</p>
                                        </div>
                                    </div>

                                    <div className="relative group">
                                        <h3 className="bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full text-sm font-bold w-fit px-4 py-1 mb-6 shadow-lg shadow-orange-500/20">The Result</h3>
                                        <h4 className="text-2xl md:text-3xl font-semibold text-white mb-6 group-hover:text-orange-200 transition-colors">Impact & Performance</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                            <div className="p-6 bg-neutral-900 rounded-xl border border-white/5">
                                                <div className="text-4xl font-bold text-white mb-2">35%</div>
                                                <div className="text-sm text-neutral-500 uppercase tracking-wider font-semibold">Conversion Increase</div>
                                            </div>
                                            <div className="p-6 bg-neutral-900 rounded-xl border border-white/5">
                                                <div className="text-4xl font-bold text-white mb-2">0.2s</div>
                                                <div className="text-sm text-neutral-500 uppercase tracking-wider font-semibold">Load Time</div>
                                            </div>
                                        </div>
                                        <div className="p-8 bg-gradient-to-br from-white/5 to-white/10 rounded-2xl border border-white/10">
                                            <p className="leading-loose text-lg text-white/90">{project.description.conclusion}</p>
                                        </div>
                                    </div>
                                </div>
                            </TracingBeam>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>,
        document.body
    );
}

// --- Main Component with New List Layout ---
export default function ScrollMorphHero() {
    const [activeProject, setActiveProject] = useState<Project | null>(null);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

    const filteredProjects = getProjectsByCategory(currentCategoryIndex);

    return (
        <div className="relative w-full flex flex-col items-center justify-center bg-black overflow-hidden py-24">
            <AnimatePresence>
                {activeProject && <ProjectDetailModal project={activeProject} onClose={() => setActiveProject(null)} />}
            </AnimatePresence>

            {/* Header + Switcher */}
            <div className="w-full flex flex-col items-center justify-center text-center px-4 mb-16 relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 pb-4">
                    Featured Case Studies
                </h2>
                <p className="mt-2 text-neutral-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10">
                    Our expertise across various industries will help you to bridge the gaps with our innovative solutions.
                </p>

                <div className="inline-flex items-center justify-center p-1 border rounded-full border-white/20 bg-transparent backdrop-blur-sm relative z-20">
                    {CATEGORIES.map((cat, idx) => {
                        const isActive = idx === currentCategoryIndex;
                        return (
                            <button
                                key={cat}
                                onClick={() => setCurrentCategoryIndex(idx)}
                                className={`
                                  relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200
                                  ${isActive ? 'text-black' : 'text-white hover:text-white/80'}
                                `}
                            >
                                <span className="relative z-10">{cat}</span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeCategoryTab"
                                        className="absolute inset-0 rounded-full bg-white z-0"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* --- CARDS GRID (Replacing Carousel) --- */}
            <div className="w-full max-w-[80rem] px-4 md:px-6 relative z-10">
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout="position"
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                onClick={() => setActiveProject(project)}
                                className={cn(
                                    "group relative aspect-[4/5] flex flex-col p-8",
                                    "bg-neutral-900/50 border border-white/10 rounded-3xl",
                                    "hover:z-10 hover:border-white/30",
                                    "transition-all duration-500 overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl"
                                )}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0 z-0">
                                    <img
                                        src={project.thumbnail}
                                        alt={project.title}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 ease-in-out transform group-hover:scale-105 filter grayscale group-hover:grayscale-0"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-700" />
                                </div>

                                {/* Content */}
                                <div className="relative z-10 flex flex-col h-full w-full justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                                            <Globe size={24} className="text-white" />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-3">
                                            <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/10 text-xs font-semibold text-white/80 backdrop-blur-md uppercase tracking-wider">
                                                Web Application
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <div className={cn(
                                            "transform transition-all duration-500 ease-out",
                                            "opacity-70 translate-y-2",
                                            "group-hover:opacity-100 group-hover:translate-y-0"
                                        )}>
                                            <span className="inline-flex items-center text-sm font-bold text-white">
                                                View Case Study
                                                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}