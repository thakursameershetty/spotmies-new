"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlowDividerProps {
  className?: string;
}

export function GlowDivider({ className }: GlowDividerProps) {
  return (
    <div className={cn("relative w-full h-[1px] bg-white/10 overflow-hidden", className)}>
      {/* 1. Static Glow Line (Base) - Increased opacity */}
      <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-r from-transparent via-brand-cyan/50 via-brand-blue/50 to-transparent opacity-80" />

      {/* 2. Moving Gradient Beam - Added white core for brightness */}
      <div
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-brand-cyan via-white via-brand-blue to-transparent blur-[5px]"
        style={{
          animation: "beam-slide 4s linear infinite",
        }}
      />

      {/* 3. Sharp Beam Core (No Blur) for definition */}
      <div
        className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-brand-cyan via-white via-brand-blue to-transparent"
        style={{
          animation: "beam-slide 4s linear infinite",
        }}
      />

      <style jsx>{`
        @keyframes beam-slide {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(200%);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}