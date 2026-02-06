"use client";

import React, { useState, useCallback, useRef, useMemo } from "react";
import { motion, useAnimation, PanInfo, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CaseStudyModal } from "@/components/ui/case-study-modal";
import { Project } from "@/types/types";

const AUTO_DELAY = 5000;

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};
const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

export function ProjectsSection({ data }: { data: Project[] }) {
    // Filter logic
    const validData = useMemo(() => {
        const raw = data || [];
        return raw.filter(project => project && project.title);
    }, [data]);
    const START_INDEX = validData.length;
    const PROJECTS = useMemo(() => {
        if (validData.length === 0) return [];
        return [...validData, ...validData, ...validData];
    }, [validData]);

    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { amount: 0.2, once: false });
    const [currentIndex, setCurrentIndex] = useState(START_INDEX > 0 ? START_INDEX : 0);
    const [isDragging, setIsDragging] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const controls = useAnimation();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const handleAnimationComplete = () => {
        if (START_INDEX === 0) return;
        if (currentIndex >= START_INDEX * 2) {
            controls.set({ x: `calc(-${START_INDEX} * (var(--card-width) + var(--card-gap)))` });
            setCurrentIndex(START_INDEX);
        } else if (currentIndex < START_INDEX) {
            const newIndex = currentIndex + START_INDEX;
            controls.set({ x: `calc(-${newIndex} * (var(--card-width) + var(--card-gap)))` });
            setCurrentIndex(newIndex);
        }
    };

    const slideTo = useCallback((index: number) => {
        setCurrentIndex(index);
        controls.start({
            x: `calc(-${index} * (var(--card-width) + var(--card-gap)))`,
            transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] as const },
        });
    }, [controls]);

    const handleNext = useCallback(() => slideTo(currentIndex + 1), [currentIndex, slideTo]);
    const handlePrev = useCallback(() => slideTo(currentIndex - 1), [currentIndex, slideTo]);

    const onDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        setIsDragging(false);
        const threshold = 50;
        if (info.offset.x < -threshold) handleNext();
        else if (info.offset.x > threshold) handlePrev();
        else slideTo(currentIndex);
    };

    const isPaused = !isInView || isHovered || isDragging || selectedProject !== null;

    if (validData.length === 0) {
        return null;
    }

    return (
        <>
            <section
                ref={sectionRef}
                id="portfolio"
                // UPDATED: Removed 'border-t border-white/10'
                className="w-full bg-[#050505] text-white py-16 md:py-24 overflow-hidden relative"
                style={{
                    "--card-width": "85%",
                    "--card-gap": "20px",
                } as React.CSSProperties}
            >
                <style jsx>{`
                    @media (min-width: 768px) {
                        section#portfolio {
                            --card-width: 50vw !important;
                            --card-gap: 40px !important;
                        }
                    }
                    @keyframes fillProgress {
                        from { width: 0%; }
                        to { width: 100%; }
                    }
                `}</style>

                <motion.div
                    className="max-w-[1400px] mx-auto px-6 md:px-10 h-full flex flex-col"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div variants={itemVariants} className="flex flex-row items-end justify-between mb-8 md:mb-12 gap-4 relative z-20">
                        <div>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                                Featured <br className="md:hidden" /> <span className="text-neutral-500">Works</span>
                            </h2>
                        </div>
                        <div className="flex items-center gap-3 md:gap-4 shrink-0 mb-1">
                            <button onClick={handlePrev} className="p-2 md:p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all active:scale-95 group">
                                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:-translate-x-0.5" />
                            </button>
                            <button onClick={handleNext} className="p-2 md:p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all active:scale-95 group">
                                <ChevronRight className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-x-0.5" />
                            </button>
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="relative w-full overflow-visible py-4 md:py-10 z-10">
                        <motion.div
                            className="flex items-start gap-[var(--card-gap)] cursor-grab active:cursor-grabbing"
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={0.05}
                            onDragStart={() => setIsDragging(true)}
                            onDragEnd={onDragEnd}
                            animate={controls}
                            initial={{ x: `calc(-${START_INDEX} * (var(--card-width) + var(--card-gap)))` }}
                            onAnimationComplete={handleAnimationComplete}
                        >
                            {PROJECTS.map((project, idx) => {
                                const isPrev = idx < currentIndex;
                                const isActive = idx === currentIndex;
                                const imageSrc = (project.image && project.image.trim() !== "") ? project.image : "https://placehold.co/600x400/1a1a1a/FFF?text=No+Image";

                                return (
                                    <motion.div
                                        key={`${project.id}-${idx}`}
                                        className="relative shrink-0 w-[var(--card-width)]"
                                        animate={{
                                            opacity: isPrev ? 0 : 1,
                                            scale: isPrev ? 0.9 : 1,
                                            x: isPrev ? -20 : 0,
                                            filter: isPrev ? "blur(4px)" : "blur(0px)",
                                        }}
                                        transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] as const }}
                                    >
                                        <div
                                            onClick={() => setSelectedProject(project)}
                                            className="block group select-none cursor-pointer"
                                            onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}
                                        >
                                            <div className="relative w-full aspect-[16/10] rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6 bg-neutral-900 border border-white/10 shadow-2xl">
                                                <Image
                                                    src={imageSrc}
                                                    alt={project.title || "Project"}
                                                    fill
                                                    draggable={false}
                                                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                                                    sizes="(max-width: 768px) 85vw, 60vw"
                                                    priority={isActive}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1 pl-1">
                                                <h3 className="text-xl md:text-3xl font-bold text-white group-hover:text-[#00eef9] transition-colors truncate">
                                                    {project.title}
                                                </h3>
                                                <p className="text-neutral-500 text-xs md:text-base font-medium tracking-wide line-clamp-2">
                                                    {project.description || project.category}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </motion.div>

                    {/* PAGINATION DOTS */}
                    <motion.div
                        variants={itemVariants}
                        className="flex items-center justify-center gap-1 md:gap-2 mt-8 md:mt-12 px-1 flex-nowrap w-full overflow-hidden"
                    >
                        {validData.map((_, idx) => {
                            const isActive = (currentIndex % validData.length) === idx;
                            return (
                                <div
                                    key={idx}
                                    className="relative flex items-center justify-center cursor-pointer py-2 shrink-0"
                                    onClick={() => slideTo(START_INDEX + idx)}
                                >
                                    <div className={cn(
                                        "relative h-1.5 rounded-full overflow-hidden transition-all duration-500 ease-out bg-white/20 hover:bg-white/40",
                                        isActive ? "w-10 md:w-20" : "w-1.5 md:w-3"
                                    )}>
                                        {isActive && (
                                            <div
                                                className="h-full bg-[#00eef9]"
                                                style={{
                                                    width: '0%',
                                                    animation: `fillProgress ${AUTO_DELAY}ms linear forwards`,
                                                    animationPlayState: isPaused ? 'paused' : 'running'
                                                }}
                                                onAnimationEnd={() => { if (!isPaused) handleNext(); }}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>

                </motion.div>
            </section>
            <CaseStudyModal
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </>
    );
}