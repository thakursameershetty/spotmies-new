"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PointerHighlightProps {
    children: React.ReactNode;
    containerClassName?: string;
    rectangleClassName?: string;
    pointerClassName?: string;
    initialColor?: string;
    highlightColor?: string;
}

export const PointerHighlight = ({
    children,
    containerClassName,
    rectangleClassName,
    pointerClassName,
    initialColor = "#ffffff",
    highlightColor = "#22d3ee",
}: PointerHighlightProps) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        const updateDimensions = () => {
            if (containerRef.current) {
                const { offsetWidth, offsetHeight } = containerRef.current;
                setDimensions({ width: offsetWidth, height: offsetHeight });

                // Only show if we have valid dimensions
                if (offsetWidth > 0 && offsetHeight > 0) {
                    setIsVisible(true);
                }
            }
            // Check for mobile width
            setIsMobile(window.innerWidth < 768);
        };

        // 1. Initial Check
        updateDimensions();

        // 2. Wait for fonts (Crucial for mobile load)
        if (document.fonts) {
            document.fonts.ready.then(updateDimensions);
        }

        // 3. Resize Observer for responsive shifts
        const resizeObserver = new ResizeObserver(() => {
            updateDimensions();
        });
        resizeObserver.observe(containerRef.current);

        // 4. Fallback timeout
        const timer = setTimeout(updateDimensions, 500);

        return () => {
            resizeObserver.disconnect();
            clearTimeout(timer);
        };
    }, []);

    return (
        <span
            ref={containerRef}
            className={cn("relative inline-block", containerClassName)}
        >
            <AnimatePresence>
                {isVisible && (
                    <motion.span
                        initial={{ width: 0, opacity: 0 }}
                        animate={{
                            width: "100%",
                            opacity: 1,
                            transition: {
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1], // Smooth easeOutExpo
                                delay: 0.2
                            }
                        }}
                        className={cn(
                            "absolute left-0 top-0 h-full rounded-lg border border-cyan-500/30 bg-cyan-500/10 -z-10 box-border",
                            rectangleClassName
                        )}
                    />
                )}
            </AnimatePresence>

            <span className="relative z-10">{children}</span>

            {/* Floating Pointer Icon */}
            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, x: -20, y: 10 }}
                        animate={{
                            opacity: 1,
                            x: dimensions.width, // Move to end of text
                            // Responsive Y positioning: +10 on Mobile, +30 on Desktop
                            y: dimensions.height / 2 + (isMobile ? 10 : 30),
                            transition: {
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                                delay: 0.2
                            }
                        }}
                        className={cn(
                            "absolute left-0 top-0 pointer-events-none z-20",
                            pointerClassName
                        )}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-cyan-400 drop-shadow-lg"
                        >
                            <path
                                d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
                                fill="currentColor"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    );
};