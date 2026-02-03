"use client";

import { cn } from "@/lib/utils";

interface AmbientBackgroundProps {
    className?: string;
    intensity?: "subtle" | "medium" | "strong";
}

export function AmbientBackground({ className, intensity = "subtle" }: AmbientBackgroundProps) {
    const opacityMap = {
        subtle: "opacity-20",
        medium: "opacity-30",
        strong: "opacity-40",
    };

    const opacityClass = opacityMap[intensity];

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none select-none", className)}>
            {/* 1. Primary Blob (Top Left) - Matches Logo Cyan */}
            <div
                className={cn(
                    "absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full",
                    "bg-brand-cyan blur-[120px] mix-blend-screen animate-blob-bounce",
                    opacityClass
                )}
            />

            {/* 2. Secondary Blob (Bottom Right) - Darker variant */}
            <div
                className={cn(
                    "absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full",
                    "bg-brand-cyan-dark blur-[130px] mix-blend-screen animate-blob-bounce animation-delay-2000",
                    opacityClass
                )}
            />

            {/* 3. Accent Blob (Center-ish) - Deep variant for depth */}
            <div
                className={cn(
                    "absolute top-[20%] right-[20%] w-[40%] h-[40%] rounded-full",
                    "bg-brand-cyan-deep blur-[100px] mix-blend-screen animate-pulse-slow",
                    opacityClass
                )}
            />
        </div>
    );
}