"use client";

import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const AboutSection = () => {
    return (
        // Reduced py-24 to py-12
        <section id="about-us" className="w-full py-12 px-4 md:px-6 relative overflow-hidden">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center gap-12">

                {/* HEADLINE */}
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 tracking-tight leading-tight pb-2">
                    We Are
                    <span className="relative inline-block mx-3 md:mx-4">
                        <PointerHighlight
                            rectangleClassName="bg-[#01eaf5]/10 border-[#01eaf5]/50"
                            pointerClassName="text-[#01eaf5] h-5 w-5"
                            containerClassName="inline-flex items-center justify-center pt-1"
                            initialColor="#e5e5e5" // Matching the light neutral text
                            highlightColor="#01eaf5"
                        >
                            <span className="relative z-10 px-2 italic">Creative</span>
                        </PointerHighlight>
                    </span>
                    <br className="md:hidden" /> {/* Break line on mobile for better spacing */}
                    Tech Company
                </h2>

                {/* SUBTEXT (Optional, keeps it clean) */}
                <p className="text-zinc-400 max-w-2xl text-lg md:text-xl leading-relaxed">
                    Transforming bold ideas into powerful digital reality. We build scalable, secure, and intuitive solutions for the modern web.
                </p>

                {/* STATISTICS */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 w-full max-w-4xl py-4">
                    {[
                        { label: "Established in", value: "2019" },
                        { label: "Projects Completed", value: "30+" },
                        { label: "Blockchain Projects", value: "5+" },
                        { label: "AI Solutions", value: "4+" },
                    ].map((stat, index) => (
                        <div key={index} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                            <span className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</span>
                            <span className="text-sm text-zinc-400 font-medium">{stat.label}</span>
                        </div>
                    ))}
                </div>

                {/* BIG IMAGE */}
                <div className="w-full relative mt-8 group cursor-pointer">
                    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl transition-all duration-500 group-hover:border-white/80 group-hover:shadow-[0_0_80px_rgba(255,255,255,0.4)]">
                        {/* Using the banner image you uploaded */}
                        <Image
                            src="/about.png"
                            alt="Spotmies Team or Banner"
                            width={1920}
                            height={1080}
                            className="w-full h-auto object-cover transform transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                            priority
                        />

                        {/* Optional Overlay Gradient for depth */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40"></div>
                    </div>
                </div>

            </div>
        </section>
    );
};