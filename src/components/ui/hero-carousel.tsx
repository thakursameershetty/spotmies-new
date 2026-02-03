"use client";

import React, { useState, useEffect } from "react";
import { motion, useSpring, useTransform, MotionValue } from "framer-motion";

// --- Types & Data ---
export interface Project {
    id: number;
    title: string;
    thumbnail: string;
}

const PROJECTS: Project[] = Array.from({ length: 25 }, (_, i) => {
    const id = i + 1;
    return {
        id: i,
        title: `Web Project ${id}`,
        thumbnail: `/projects/${id}/main.png`,
    };
});

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
}

function FlipCard({ project, index, rotation, dimensions }: FlipCardProps) {
    const angleStep = 360 / PROJECTS.length;
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

    // --- NEW: Handle Click Scroll ---
    const handleCardClick = () => {
        const portfolioSection = document.getElementById("portfolio");
        if (portfolioSection) {
            portfolioSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <motion.div
            onClick={handleCardClick} // Trigger Scroll
            style={{
                width: currentCardWidth,
                height: currentCardHeight,
                position: "absolute",
                transformStyle: "preserve-3d",
                x, y, z, rotateY, scale, opacity, zIndex,
            }}
            // Added 'cursor-pointer' so user knows it's clickable
            className="group cursor-pointer"
        >
            <div
                className="relative h-full w-full rounded-xl overflow-hidden bg-[#111] border border-white/10 shadow-2xl"
                style={{ backfaceVisibility: "hidden" }}
            >
                <div className="relative h-full w-full overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={project.thumbnail}
                        onError={(e) => {
                            e.currentTarget.src = "https://placehold.co/600x400/1a1a1a/FFF?text=Image";
                        }}
                        alt={project.title}
                        className="h-full w-full object-cover opacity-90 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>
            </div>
        </motion.div>
    );
}

export default function ScrollMorphHero() {
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [activeIndex, setActiveIndex] = useState(0);

    const angleStep = 360 / PROJECTS.length;
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
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1));
        }, DURATION_MS);
        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative w-full h-full flex items-center justify-center perspective-[800px] md:perspective-[1200px] overflow-visible"
        >
            <motion.div
                className="relative w-full flex-1 flex items-center justify-center transform-style-3d overflow-visible"
            >
                {PROJECTS.map((project, i) => (
                    <FlipCard
                        key={project.id}
                        project={project}
                        index={i}
                        rotation={rotation}
                        dimensions={dimensions}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
}