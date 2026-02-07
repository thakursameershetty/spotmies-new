"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";
import { Project } from "@/types/types"; // Import shared type

// --- Constants ---
const BASE_WIDTH = 320;
const BASE_HEIGHT = 200;

const MOBILE_WIDTH = 180;
const MOBILE_HEIGHT = 120;

// --- Card Component ---
interface FlipCardProps {
    project: Project;
    index: number;
    rotation: MotionValue<number>;
    dimensions: { width: number; height: number };
    totalCount: number; // Added to calculate angle step dynamically
}

function FlipCard({ project, index, rotation, dimensions, totalCount }: FlipCardProps) {
    const angleStep = 360 / totalCount;
    const baseAngle = index * angleStep;

    const isMobile = dimensions.width < 640;
    const isTablet = dimensions.width < 1100;

    const currentCardWidth = isMobile ? MOBILE_WIDTH : BASE_WIDTH;
    const currentCardHeight = isMobile ? MOBILE_HEIGHT : BASE_HEIGHT;

    const MAX_SCALE = isMobile ? 2.8 : 2.2;

    const x = useTransform(rotation, (latestRot) => {
        const carouselRadius = isMobile ? 160 : (isTablet ? 450 : 800);
        let effectiveAngle = (baseAngle + latestRot) % 360;
        if (effectiveAngle > 180) effectiveAngle -= 360;
        if (effectiveAngle < -180) effectiveAngle += 360;
        const rad = (effectiveAngle * Math.PI) / 180;
        return Math.sin(rad) * carouselRadius;
    });

    const y = useTransform(rotation, (latestRot) => 0);

    const z = useTransform(rotation, (latestRot) => {
        const carouselRadius = isMobile ? 160 : (isTablet ? 450 : 800);
        let effectiveAngle = (baseAngle + latestRot) % 360;
        if (effectiveAngle > 180) effectiveAngle -= 360;
        if (effectiveAngle < -180) effectiveAngle += 360;
        const rad = (effectiveAngle * Math.PI) / 180;
        return Math.cos(rad) * carouselRadius - carouselRadius;
    });

    const rotateY = useTransform(rotation, (latestRot) => {
        let effectiveAngle = (baseAngle + latestRot) % 360;
        if (effectiveAngle > 180) effectiveAngle -= 360;
        if (effectiveAngle < -180) effectiveAngle += 360;
        return effectiveAngle;
    });

    const scale = useTransform(rotation, (latestRot) => {
        let effectiveAngle = (baseAngle + latestRot) % 360;
        if (effectiveAngle > 180) effectiveAngle -= 360;
        if (effectiveAngle < -180) effectiveAngle += 360;
        const dist = Math.abs(effectiveAngle);
        const scaleDropOff = isMobile ? 35 : 40;

        return Math.max(0.6, MAX_SCALE - (dist / scaleDropOff));
    });

    const opacity = useTransform(rotation, (latestRot) => {
        const carouselRadius = isMobile ? 160 : (isTablet ? 450 : 800);
        let effectiveAngle = (baseAngle + latestRot) % 360;
        if (effectiveAngle > 180) effectiveAngle -= 360;
        if (effectiveAngle < -180) effectiveAngle += 360;
        const rad = (effectiveAngle * Math.PI) / 180;
        const zPos = Math.cos(rad) * carouselRadius - carouselRadius;
        const fadeThreshold = isMobile ? -160 : -500;
        return zPos < fadeThreshold ? 0 : 1;
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
            className="group cursor-pointer"
        >
            <div
                className="relative h-full w-full rounded-xl overflow-hidden bg-[#111] border border-white/10 shadow-2xl"
                style={{ backfaceVisibility: "hidden" }}
            >
                <div className="relative h-full w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        // USE THE API IMAGE
                        src={project.image || "https://placehold.co/600x400/1a1a1a/FFF?text=No+Image"}
                        onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/600x400/1a1a1a/FFF?text=Error";
                        }}
                        alt={project.title}
                        // FIX: Changed opacity-90 to opacity-100 for true vibrant colors
                        className="h-full w-full object-cover opacity-100 transition-opacity duration-300"
                    />
                    {/* FIX: Changed bg-black/20 to bg-black/[0.02] (2% opacity) */}
                    <div className="absolute inset-0 bg-black/[0.02] group-hover:bg-transparent transition-colors duration-300" />
                </div>
            </div>
        </motion.div>
    );
}

export default function ScrollMorphHero({ projects }: { projects: Project[] }) {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [activeIndex, setActiveIndex] = useState(0);

    // Filter valid projects
    const validProjects = useMemo(() => {
        const list = (projects && projects.length > 0) ? projects : [];
        // If list is too short, duplicate it to fill carousel visually
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

    if (validProjects.length === 0) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-full flex items-center justify-center perspective-[800px] md:perspective-[1200px] overflow-visible"
        >
            <motion.div
                className="relative w-full flex-1 flex items-center justify-center transform-style-3d overflow-visible"
            >
                {validProjects.map((project, i) => (
                    <FlipCard
                        // Use index as key if projects are duplicated, or composite key
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