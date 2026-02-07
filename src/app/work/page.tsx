"use client";

import React, { useState, useMemo, useEffect } from "react";
// UPDATED: Added useSearchParams import
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { PROJECT_DATA } from "@/data/projects";
import { AmbientBackground } from "@/components/ui/ambient-background";
import Image from "next/image";
import { ArrowUpRight, Search, X, SlidersHorizontal, ChevronDown } from "lucide-react";
import { GlowDivider } from "@/components/ui/glow-divider";
import { CaseStudyModal } from "@/components/ui/case-study-modal";
import { Project } from "@/types/types";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import BackButton from "@/components/ui/back-button";

// --- HELPER: Extract Categories (Smart Detection) ---
const getProjectCategories = (project: Project): string[] => {
    const categories = new Set<string>();
    const baseCat = project.category.split(",")[0].trim();
    categories.add(baseCat);

    const textToScan = (project.description + " " + project.introduction + " " + project.title).toLowerCase();
    if (textToScan.includes("ai ") || textToScan.includes("artificial intelligence") || textToScan.includes("chatbot") || textToScan.includes("machine learning")) {
        categories.add("AI");
    }

    if (textToScan.includes("blockchain") || textToScan.includes("web3") || textToScan.includes("nft") || textToScan.includes("crypto") || project.category.includes("NFT")) {
        categories.add("Blockchain");
    }

    return Array.from(categories);
};

// --- HELPER: Extract Tech Stack ---
const getProjectTech = (project: Project): string[] => {
    const parts = project.category.split(",");
    if (parts.length > 1) {
        return parts.slice(1).map(t => t.trim());
    }
    return [];
};

export default function WorkPage() {
    const router = useRouter();
    const searchParams = useSearchParams(); // UPDATED: Get params
    
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // --- SEARCH & FILTER STATES ---
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeTech, setActiveTech] = useState("All");
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    // --- DYNAMIC DATA EXTRACTION ---
    const allCategories = useMemo(() => {
        const cats = new Set<string>(["All"]);
        PROJECT_DATA.forEach(p => {
            getProjectCategories(p).forEach(c => cats.add(c));
        });
        return Array.from(cats).sort();
    }, []);

    const allTechnologies = useMemo(() => {
        const techs = new Set<string>(["All"]);
        PROJECT_DATA.forEach(p => {
            getProjectTech(p).forEach(t => techs.add(t));
        });
        return Array.from(techs).sort();
    }, []);

    // UPDATED: Effect to handle incoming URL parameters from Brand Mastery
    useEffect(() => {
        const categoryParam = searchParams.get("category");
        if (categoryParam) {
            // Check if exact match exists, otherwise try partial match logic
            if (allCategories.includes(categoryParam)) {
                setActiveCategory(categoryParam);
                setIsFiltersVisible(true); // Open filters to show the selection
            } else {
                // If the parameter is "Mobile Apps" but category is "Mobile App", try to find a match
                const match = allCategories.find(c => c.toLowerCase().includes(categoryParam.toLowerCase()) || categoryParam.toLowerCase().includes(c.toLowerCase()));
                if (match) {
                    setActiveCategory(match);
                    setIsFiltersVisible(true);
                }
            }
        }
    }, [searchParams, allCategories]);

    // --- FILTERING LOGIC ---
    const filteredProjects = useMemo(() => {
        return PROJECT_DATA.filter((project) => {
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                project.title.toLowerCase().includes(searchLower) ||
                project.client.toLowerCase().includes(searchLower) ||
                (project.description && project.description.toLowerCase().includes(searchLower));

            const projectCats = getProjectCategories(project);
            const matchesCategory = activeCategory === "All" || projectCats.includes(activeCategory);

            const projectTechs = getProjectTech(project);
            const matchesTech = activeTech === "All" || projectTechs.includes(activeTech);

            return matchesSearch && matchesCategory && matchesTech;
        });
    }, [searchQuery, activeCategory, activeTech]);

    const handleProjectClick = (project: Project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const clearFilters = () => {
        setSearchQuery("");
        setActiveCategory("All");
        setActiveTech("All");
        // UPDATED: Clear URL param as well
        router.push("/work", { scroll: false });
    };

    return (
        <main className="bg-[#050505] min-h-screen w-full selection:bg-cyan-500/30">
            <Navbar />

            <div className="relative pt-32 pb-20 px-6 md:px-10 max-w-[1400px] mx-auto min-h-screen">
                <AmbientBackground intensity="medium" />

                {/* --- HEADER --- */}
                <div className="relative z-10 mb-10">
                    <div className="mb-8">
                        <BackButton />
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6 tracking-tight">
                        Selected Works
                    </h1>
                </div>

                {/* --- SEARCH & FILTER BAR --- */}
                <div className="relative z-20 mb-12 space-y-6">

                    {/* Top Row: Search + Filter Toggle */}
                    <div className="flex items-center gap-3 w-full">
                        {/* Search Input */}
                        <div className="relative flex-1 group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-neutral-500 group-focus-within:text-[#00eef9] transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-14 pl-11 pr-10 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-neutral-500 focus:outline-none focus:border-[#00eef9]/50 focus:bg-white/10 transition-all shadow-lg"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute inset-y-0 right-3 flex items-center text-neutral-500 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Filter Visibility Toggle */}
                        <button
                            onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                            className={cn(
                                "h-14 flex items-center gap-2 px-5 rounded-2xl border transition-all font-medium text-sm whitespace-nowrap shrink-0",
                                isFiltersVisible
                                    ? "bg-[#00eef9]/10 border-[#00eef9]/30 text-[#00eef9]"
                                    : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                            )}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            <span className="hidden sm:inline">Filters</span>
                            <ChevronDown className={cn("w-4 h-4 transition-transform", isFiltersVisible ? "rotate-180" : "")} />
                        </button>
                    </div>

                    {/* Collapsible Filter Section */}
                    <AnimatePresence>
                        {isFiltersVisible && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6 mt-2">

                                    {/* Categories Filter */}
                                    <div>
                                        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 ml-1">
                                            Categories & Industries
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {allCategories.map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setActiveCategory(cat)}
                                                    className={cn(
                                                        "px-4 py-2 rounded-full text-sm transition-all duration-300 border",
                                                        activeCategory === cat
                                                            ? "bg-white text-black border-white font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                                            : "bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10 hover:border-white/20 hover:text-white"
                                                    )}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="h-px w-full bg-white/5" />

                                    {/* Technologies Filter */}
                                    <div>
                                        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 ml-1">
                                            Technology Stack
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {allTechnologies.map((tech) => (
                                                <button
                                                    key={tech}
                                                    onClick={() => setActiveTech(tech)}
                                                    className={cn(
                                                        "px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border",
                                                        activeTech === tech
                                                            ? "bg-[#00eef9]/10 text-[#00eef9] border-[#00eef9]/30"
                                                            : "bg-white/5 text-neutral-500 border-white/5 hover:bg-white/10 hover:text-neutral-300"
                                                    )}
                                                >
                                                    {tech}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Active Filters Summary */}
                                    <div className="pt-2 flex items-center justify-between border-t border-white/5 mt-4">
                                        <div className="text-xs text-neutral-500 mt-4">
                                            Found <span className="text-white font-bold">{filteredProjects.length}</span> projects matching criteria
                                        </div>
                                        {(activeCategory !== "All" || activeTech !== "All" || searchQuery) && (
                                            <button
                                                onClick={clearFilters}
                                                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 mt-4 hover:underline"
                                            >
                                                <X className="w-3 h-3" /> Clear all filters
                                            </button>
                                        )}
                                    </div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- PROJECTS GRID --- */}
                <motion.div
                    layout
                    className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                                className="group flex flex-col gap-6 cursor-pointer"
                                onClick={() => handleProjectClick(project)}
                            >
                                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,238,249,0.15)] group-hover:border-[#00eef9]/30">
                                    <Image
                                        src={project.image || "https://placehold.co/800x600/1a1a1a/FFF?text=Project"}
                                        alt={project.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />

                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                        <div className="px-6 py-3 bg-white text-black rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                                            View Case Study <ArrowUpRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex items-start justify-between gap-4">
                                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#00eef9] transition-colors">
                                            {project.title}
                                        </h3>
                                        {/* Display Tech Stack Pills */}
                                        <div className="hidden md:flex flex-wrap gap-2 justify-end max-w-[40%]">
                                            {getProjectTech(project).slice(0, 2).map(t => (
                                                <span key={t} className="px-3 py-1 rounded-full border border-white/10 text-xs text-neutral-400 bg-white/5 whitespace-nowrap">
                                                    {t}
                                                </span>
                                            ))}
                                            {getProjectCategories(project).includes("AI") && (
                                                <span className="px-3 py-1 rounded-full border border-[#00eef9]/30 text-xs text-[#00eef9] bg-[#00eef9]/10 whitespace-nowrap">
                                                    AI
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <p className="text-neutral-400 text-base leading-relaxed line-clamp-2">
                                        {project.description || project.introduction}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* --- EMPTY STATE --- */}
                {filteredProjects.length === 0 && (
                    <div className="py-32 flex flex-col items-center justify-center text-center opacity-0 animate-[fadeIn_0.5s_forwards]">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                            <Search className="w-8 h-8 text-neutral-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
                        <p className="text-neutral-400 max-w-md mx-auto mb-8">
                            We couldn&apos;t find any projects matching your filters. Try adjusting your search terms or clearing the filters.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-3 bg-[#00eef9] text-black rounded-full font-bold hover:bg-white transition-colors"
                        >
                            Clear All Filters
                        </button>
                    </div>
                )}
            </div>

            <div className="my-16"><GlowDivider /></div>
            <Footer />

            {/* --- MODAL --- */}
            <CaseStudyModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </main>
    );
}