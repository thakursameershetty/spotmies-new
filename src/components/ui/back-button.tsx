"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
    className?: string;
    label?: string;
    onClick?: () => void;
}

export default function BackButton({
    className,
    label = "Back",
    onClick
}: BackButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            router.back();
        }
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                "group flex items-center gap-3 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 transition-all duration-300 hover:border-[#00d3f3] hover:bg-[#00d3f3]/5 hover:shadow-[0_0_20px_rgba(0,211,243,0.15)]",
                className
            )}
        >
            <div className="p-1 rounded-full bg-white/10 group-hover:bg-[#00d3f3]/20 text-neutral-400 group-hover:text-[#00d3f3] transition-colors duration-300">
                <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform duration-300" />
            </div>
            <span className="text-sm font-medium text-neutral-400 group-hover:text-[#00d3f3] transition-colors duration-300">
                {label}
            </span>
        </button>
    );
}