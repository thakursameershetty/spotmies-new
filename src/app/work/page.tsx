import React from "react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { getProjects } from "@/lib/api";
import { AmbientBackground } from "@/components/ui/ambient-background";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { GlowDivider } from "@/components/ui/glow-divider";

export const metadata = {
    title: "Our Work | Spotmies",
    description: "Explore our portfolio of digital solutions, web apps, and innovative designs.",
};

// ⚠️ This function CAN be async
export default async function WorkPage() {
    const projects = await getProjects();

    return (
        <main className="bg-[#050505] min-h-screen w-full selection:bg-cyan-500/30">
            <Navbar />

            <div className="relative pt-32 pb-20 px-6 md:px-10 max-w-[1400px] mx-auto min-h-screen">
                <AmbientBackground intensity="medium" />

                <div className="relative z-10 mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6 tracking-tight">
                            Selected Works
                        </h1>
                        <p className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-xl">
                            A collection of projects where we transformed complex challenges into elegant digital solutions.
                        </p>
                    </div>
                </div>

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-24">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="group flex flex-col gap-6"
                        >
                            <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,238,249,0.15)] group-hover:border-[#00eef9]/30">
                                <Image
                                    src={project.image || "https://placehold.co/800x600/1a1a1a/FFF?text=Project"}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />

                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="px-6 py-3 bg-white text-black rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        View Case Study <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-start justify-between gap-4">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#00eef9] transition-colors">
                                        {project.title}
                                    </h3>
                                    <div className="hidden md:flex flex-wrap gap-2 justify-end max-w-[40%]">
                                        <span className="px-3 py-1 rounded-full border border-white/10 text-xs text-neutral-400 bg-white/5 whitespace-nowrap">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>
                                <p className="text-neutral-400 text-base leading-relaxed line-clamp-2">
                                    {project.description || project.introduction}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="my-16"><GlowDivider /></div>
            <Footer />
        </main>
    );
}