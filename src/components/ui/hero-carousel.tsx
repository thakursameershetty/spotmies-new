"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";
import { Project } from "@/types/types";

// --- Constants ---
// DESKTOP: Original Dimensions
const BASE_WIDTH = 320;
const BASE_HEIGHT = 200;

// MOBILE: Updated Dimensions (Larger, aspect ratio tuned)
const MOBILE_WIDTH = 260; 
const MOBILE_HEIGHT = 160;

// --- Card Component ---
interface FlipCardProps {
    project: Project;
    index: number;
    rotation: MotionValue<number>;
    dimensions: { width: number; height: number };
    totalCount: number;
}

function FlipCard({ project, index, rotation, dimensions, totalCount }: FlipCardProps) {
    const angleStep = 360 / totalCount;
    const baseAngle = index * angleStep;

    // Media Query Flags
    const isMobile = dimensions.width < 640;
    const isTablet = dimensions.width < 1100;

    // 1. DIMENSIONS: Use New Mobile size, but Original Desktop size
    const currentCardWidth = isMobile ? MOBILE_WIDTH : BASE_WIDTH;
    const currentCardHeight = isMobile ? MOBILE_HEIGHT : BASE_HEIGHT;

    // 2. MAX SCALE: Reduced on mobile for smoothness, Original (2.2) on Desktop
    const MAX_SCALE = isMobile ? 1.3 : 2.2; 

    // --- TRANSFORMS ---

    // X Position (Orbital movement)
    const x = useTransform(rotation, (latestRot) => {
        const carouselRadius = isMobile ? 180 : (isTablet ? 450 : 800);
        let effectiveAngle = (baseAngle + latestRot) % 360;
        if (effectiveAngle > 180) effectiveAngle -= 360;
        if (effectiveAngle < -180) effectiveAngle += 360;
        
        const rad = (effectiveAngle * Math.PI) / 180;
        return Math.sin(rad) * carouselRadius;
    });

    const y = useTransform(rotation, () => 0);

    // Z Position (Depth)
    const z = useTransform(rotation, (latestRot) => {
        const carouselRadius = isMobile ? 180 : (isTablet ? 450 : 800);
        let effectiveAngle = (baseAngle + latestRot) % 360;
        if (effectiveAngle > 180) effectiveAngle -= 360;
        if (effectiveAngle < -180) effectiveAngle += 360;
        
        const rad = (effectiveAngle * Math.PI) / 180;
        return Math.cos(rad) * carouselRadius - carouselRadius;
    });

    // Rotation Y (Face the center)
    const rotateY = useTransform(rotation, (latestRot) => {
        let effectiveAngle = (baseAngle + latestRot) % 360;
        if (effectiveAngle > 180) effectiveAngle -= 360;
        if (effectiveAngle < -180) effectiveAngle += 360;
        return effectiveAngle;
    });

    // Scale Logic
    const scale = useTransform(rotation, (latestRot) => {
        let effectiveAngle = (baseAngle + latestRot) % 360;
        if (effectiveAngle > 180) effectiveAngle -= 360;
        if (effectiveAngle < -180) effectiveAngle += 360;
        
        const dist = Math.abs(effectiveAngle);
        const scaleDropOff = isMobile ? 45 : 40;
        
        return Math.max(0.6, MAX_SCALE - (dist / scaleDropOff));
    });

    // OPACITY LOGIC
    const opacity = useTransform(rotation, (latestRot) => {
        const carouselRadius = isMobile ? 180 : (isTablet ? 450 : 800);
        let effectiveAngle = (baseAngle + latestRot) % 360;
        if (effectiveAngle > 180) effectiveAngle -= 360;
        if (effectiveAngle < -180) effectiveAngle += 360;
        
        const rad = (effectiveAngle * Math.PI) / 180;
        const zPos = Math.cos(rad) * carouselRadius - carouselRadius;

        if (isMobile) {
            const normalizedDepth = (zPos + (2 * carouselRadius)) / (2 * carouselRadius);
            return Math.pow(normalizedDepth, 4); 
        } else {
            const fadeThreshold = -500;
            return zPos < fadeThreshold ? 0 : 1;
        }
    });

    const zIndex = useTransform(rotation, (latestRot) => {
        let effectiveAngle = (baseAngle + latestRot) % 360;
        if (effectiveAngle > 180) effectiveAngle -= 360;
        if (effectiveAngle < -180) effectiveAngle += 360;
        return Math.round(100 - Math.abs(effectiveAngle));
    });

    const handleCardClick = () => {
        const portfolioSection = document.getElementById("portfolio");
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <motion.div
            onClick={handleCardClick}
            style={{
                width: currentCardWidth,
                height: currentCardHeight,
                position: "absolute",
                transformStyle: "preserve-3d",
                x, y, z, rotateY, scale, opacity, zIndex,
            }}
            className="group cursor-pointer will-change-transform"
        >
            <div
                className="relative h-full w-full rounded-xl overflow-hidden bg-[#111] border border-white/10 shadow-2xl"
                style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
                <div className="relative h-full w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={project.image || "https://placehold.co/600x400/1a1a1a/FFF?text=No+Image"}
                        onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/600x400/1a1a1a/FFF?text=Error";
                        }}
                        alt={project.title}
                        className="h-full w-full object-cover opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                </div>
            </div>
        </motion.div>
    );
}

export default function ScrollMorphHero({ projects }: { projects: Project[] }) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMounted, setIsMounted] = useState(false); // Fix for hydration mismatch

    const validProjects = useMemo(() => {
        const list = (projects && projects.length > 0) ? projects : [];
        if (list.length > 0 && list.length < 10) {
            return [...list, ...list, ...list];
        }
        return list;
    }, [projects]);

    const count = validProjects.length || 1;
    const angleStep = 360 / count;
    const targetRotation = -activeIndex * angleStep;
    
    const rotation = useSpring(targetRotation, { stiffness: 80, damping: 20 });
    const DURATION_MS = 3000;

    useEffect(() => {
        setIsMounted(true); // Signal that client-side rendering is ready
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setDimensions({ width: window.innerWidth, height: window.innerHeight });
            };
            handleResize();
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, []);

    useEffect(() => {
        rotation.set(targetRotation);
    }, [targetRotation, rotation]);

    useEffect(() => {
        if (validProjects.length === 0) return;
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1));
        }, DURATION_MS);
        return () => clearInterval(timer);
    }, [validProjects.length]);

    // Return null on the server and during the first client pass to avoid mismatch
    if (!isMounted || validProjects.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-full flex items-center justify-center perspective-[600px] md:perspective-[1200px] overflow-visible"
        >
            <motion.div
                className="relative w-full flex-1 flex items-center justify-center transform-style-3d overflow-visible"
            >
                {validProjects.map((project, i) => (
                    <FlipCard
                        key={`${project.id}-${i}`}
                        project={project}
                        index={i}
                        rotation={rotation}
                        dimensions={dimensions}
                        totalCount={count}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}