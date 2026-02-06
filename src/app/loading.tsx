"use client"; // Optional, but good for UI-only components

import React from "react";

// ⚠️ This function must NOT be async
export default function Loading() {
    return (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]">
            {/* Ambient background */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#00d3f3]/10 rounded-full blur-[120px] animate-pulse" />

            {/* Animated Loader */}
            <div className="relative flex items-center justify-center">
                {/* Outer Ring */}
                <div className="w-16 h-16 border-4 border-[#00d3f3]/30 border-t-[#00d3f3] rounded-full animate-spin" />

                {/* Inner Dot */}
                <div className="absolute w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>

            {/* Text */}
            <div className="mt-4 flex flex-col items-center gap-1">
                <span className="text-white font-medium tracking-widest text-sm uppercase animate-pulse">
                    Loading
                </span>
            </div>
        </div>
    );
}