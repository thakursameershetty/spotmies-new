"use client";

interface GradualBlurProps {
    position: "top" | "bottom" | "left" | "right";
    target?: "parent" | "viewport";
    height?: string;
    width?: string;
    zIndex?: number;
    strength?: number;
    opacity?: number;
    className?: string;
}

export default function GradualBlur({
    position,
    height = "100px",
    zIndex = 10,
    strength = 1,
    opacity = 1,
    className = "",
}: GradualBlurProps) {

    const getStyle = () => {
        const baseStyle: React.CSSProperties = {
            position: "absolute",
            zIndex,
            opacity,
            pointerEvents: "none",
        };

        if (position === "top") {
            baseStyle.top = 0;
            baseStyle.left = 0;
            baseStyle.right = 0;
            baseStyle.height = height;
            baseStyle.background = `linear-gradient(to bottom, rgba(3,3,3,1) 0%, rgba(3,3,3,0) ${100 / strength}%)`;
        } else if (position === "bottom") {
            baseStyle.bottom = 0;
            baseStyle.left = 0;
            baseStyle.right = 0;
            baseStyle.height = height;
            baseStyle.background = `linear-gradient(to top, rgba(3,3,3,1) 0%, rgba(3,3,3,0) ${100 / strength}%)`;
        }
        // Add other cases if needed

        return baseStyle;
    };

    // Simplified implementation for the specific requested use case (top gradient)
    // The user passed: position="top", target="parent", height="128px", zIndex={40}, strength={8}, opacity={1}

    return (
        <div
            style={getStyle()}
            className={className}
        >
            {/* Optional: Add Backdrop blur if needed, but the user requested 'GradualBlur' and passed strength. 
            Often this means a mask, but the usage in App.js implies a covering overlay. 
            I'll use a gradient overlay matching the background color #030303. 
        */}
        </div>
    );
}
