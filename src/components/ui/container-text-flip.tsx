"use client";

import React, { useState, useEffect, useId, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ContainerTextFlipProps {
    words?: string[];
    interval?: number;
    className?: string;
    textClassName?: string;
    animationDuration?: number;
}

export function ContainerTextFlip({
    words = ["better", "modern", "beautiful", "awesome"],
    interval = 3000,
    className,
    textClassName,
    animationDuration = 700,
}: ContainerTextFlipProps) {
    const id = useId();
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [width, setWidth] = useState(100);
    const textRef = useRef<HTMLDivElement>(null);

    const updateWidthForWord = () => {
        if (textRef.current) {
            // Slightly increased padding for the glow effect
            const textWidth = textRef.current.scrollWidth + 40;
            setWidth(textWidth);
        }
    };

    useEffect(() => {
        updateWidthForWord();
    }, [currentWordIndex]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        }, interval);

        return () => clearInterval(intervalId);
    }, [words, interval]);

    return (
        <motion.div
            layout
            layoutId={`words-here-${id}`}
            animate={{ width }}
            transition={{ duration: animationDuration / 2000, type: "spring", stiffness: 100, damping: 20 }}
            className={cn(
                "relative inline-block rounded-lg px-2 py-2 text-center text-4xl font-bold align-bottom",
                // --- UPDATED STYLES FOR SPOTMIES THEME ---
                // 1. Background: Deep black/charcoal gradient
                "bg-gradient-to-b from-neutral-900 to-black",
                // 2. Text: White
                "text-white",
                // 3. Border/Shadow: Cyan "Backlit" Glow + 3D depth
                "border border-white/10",
                "shadow-[inset_0_-2px_rgba(6,182,212,0.6),_0_4px_15px_rgba(0,0,0,0.8)]", // Cyan bottom highlight
                className
            )}
        >
            <motion.div
                key={words[currentWordIndex]}
                transition={{
                    duration: animationDuration / 1000,
                    ease: "easeInOut",
                }}
                className={cn("inline-block whitespace-nowrap align-middle", textClassName)}
                ref={textRef}
                layoutId={`word-div-${words[currentWordIndex]}-${id}`}
            >
                <motion.div className="inline-block">
                    {words[currentWordIndex].split("").map((letter, index) => (
                        <motion.span
                            key={index}
                            initial={{
                                opacity: 0,
                                filter: "blur(10px)",
                                y: 5
                            }}
                            animate={{
                                opacity: 1,
                                filter: "blur(0px)",
                                y: 0
                            }}
                            transition={{
                                delay: index * 0.05,
                                duration: 0.2
                            }}
                            className="inline-block"
                        >
                            {letter === " " ? "\u00A0" : letter}
                        </motion.span>
                    ))}
                </motion.div>
            </motion.div>
        </motion.div>
    );
}