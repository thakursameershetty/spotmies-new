"use client";

import React, { useState } from "react";
import {
    motion,
    useTransform,
    AnimatePresence,
    useMotionValue,
    useSpring,
} from "framer-motion";
import Link from "next/link";
import { Linkedin } from "lucide-react";

export const AnimatedTooltip = ({
    items,
}: {
    items: {
        id: number;
        name: string;
        designation: string;
        image: string;
        link?: string;
    }[];
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const springConfig = { stiffness: 100, damping: 15 };
    const x = useMotionValue(0);

    const rotate = useSpring(
        useTransform(x, [-100, 100], [-45, 45]),
        springConfig
    );
    const translateX = useSpring(
        useTransform(x, [-100, 100], [-50, 50]),
        springConfig
    );

    const handleMouseMove = (event: any) => {
        const halfWidth = event.target.offsetWidth / 2;
        x.set(event.nativeEvent.offsetX - halfWidth);
    };

    return (
        <>
            {items.map((item, idx) => (
                <div
                    className="group relative -mr-4 md:-mr-8 last:mr-0 transition-all duration-300 ease-in-out"
                    style={{ zIndex: hoveredIndex === item.id ? 100 : items.length - idx }}
                    key={item.name}
                    onMouseEnter={() => setHoveredIndex(item.id)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === item.id && (
                            <motion.div
                                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 10,
                                    },
                                }}
                                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                                style={{
                                    translateX: translateX,
                                    rotate: rotate,
                                    whiteSpace: "nowrap",
                                }}
                                className="absolute -top-24 md:-top-32 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center rounded-xl bg-black px-6 py-3 text-sm shadow-2xl border border-white/10"
                            >
                                <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-[#00eef9] to-transparent" />
                                <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                                <div className="relative z-30 text-lg font-bold text-white flex items-center gap-2">
                                    {item.name}
                                </div>
                                <div className="text-sm font-medium text-zinc-400">{item.designation}</div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <Link
                        href={item.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block relative cursor-pointer group"
                    >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            onMouseMove={handleMouseMove}
                            src={item.image}
                            alt={item.name}
                            className="relative !m-0 w-28 h-28 md:w-40 md:h-40 rounded-full border-[6px] border-[#050505] object-cover object-top !p-0 transition duration-500 group-hover:scale-105 group-hover:border-[#00eef9] shadow-[0_15px_35px_rgba(0,0,0,0.8)]"
                        />

                        {/* --- LINKEDIN ICON OVERLAY (ANIMATED) --- */}
                        {/* Default: Opacity 0, Scaled down, Pushed down */}
                        {/* Hover: Opacity 1, Scale 1, Normal position */}
                        <div className="absolute bottom-1 right-1 md:bottom-2 md:right-2 p-2.5 rounded-full bg-[#00eef9] border border-white/20 shadow-lg z-20 
              opacity-0 scale-75 translate-y-2 
              group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 
              transition-all duration-300 ease-out">
                            <Linkedin className="w-5 h-5 text-black" />
                        </div>
                    </Link>
                </div>
            ))}
        </>
    );
};