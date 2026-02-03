"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = () => {
    const [matrix, setMatrix] = useState<number[][]>([]);
    const [cellSize] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateMatrix = () => {
            if (!containerRef.current) return;
            const { clientWidth, clientHeight } = containerRef.current;
            const cols = Math.ceil(clientWidth / cellSize);
            const rows = Math.ceil(clientHeight / cellSize);

            // Initialize matrix with simplified data if needed, or just use indices in render
            // For now just setting grid dimensions effectively
            setMatrix(Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0)));
        };

        updateMatrix();
        window.addEventListener("resize", updateMatrix);
        return () => window.removeEventListener("resize", updateMatrix);
    }, [cellSize]);

    const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 z-0 flex flex-wrap content-start overflow-hidden opacity-30"
        >
            {matrix.map((row, rowIndex) =>
                row.map((_, colIndex) => (
                    <div
                        key={`${rowIndex}-${colIndex}`}
                        className={cn(
                            "border-r border-b border-white/5 relative bg-transparent transition-colors duration-500",
                            activeCell?.row === rowIndex && activeCell?.col === colIndex
                                ? "bg-white/10"
                                : "hover:bg-white/5"
                        )}
                        style={{
                            width: cellSize,
                            height: cellSize,
                        }}
                        onMouseMove={() => setActiveCell({ row: rowIndex, col: colIndex })}
                        onMouseLeave={() => setActiveCell(null)}
                    >
                        {activeCell?.row === rowIndex && activeCell?.col === colIndex && (
                            <div className="absolute inset-0 animate-cell-ripple bg-white/20" />
                        )}
                    </div>
                ))
            )}
        </div>
    );
};
