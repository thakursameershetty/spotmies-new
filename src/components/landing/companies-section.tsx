"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/ui/ambient-background";
import { cn } from "@/lib/utils";

const ALL_COMPANIES = [
    { name: "Zin in Thuiswerken", desc: "Professional Services", src: "https://spotmiesstorage.blob.core.windows.net/media/comp1.png" },
    { name: "A Square GoKarting", desc: "Entertainment", src: "https://spotmiesstorage.blob.core.windows.net/media/comp2.png" },
    { name: "SMARTFALCON", desc: "Blockchain", src: "https://spotmiesstorage.blob.core.windows.net/media/comp3.png" },
    { name: "Credit Report", desc: "Fintech", src: "https://spotmiesstorage.blob.core.windows.net/media/comp4.png" },
    { name: "Andhra University Incubation Center", desc: "Incubation Center", src: "https://spotmiesstorage.blob.core.windows.net/media/comp5.png" },
    { name: "Schemax Tech", desc: "Software Development", src: "https://spotmiesstorage.blob.core.windows.net/media/comp6.png" },
    { name: "Sweken IT Solutions", desc: "Software Development", src: "https://spotmiesstorage.blob.core.windows.net/media/comp7.png" },
    { name: "Vihaan Electrix", desc: "Travel", src: "https://spotmiesstorage.blob.core.windows.net/media/comp8.png" },
    { name: "DecenTrialz", desc: "Healthcare", src: "https://spotmiesstorage.blob.core.windows.net/media/comp9.png" },
    { name: "ADVAIT LABS", desc: "Healthcare", src: "https://spotmiesstorage.blob.core.windows.net/media/comp10.png" },
    { name: "Chalo Ride", desc: "Travel", src: "https://spotmiesstorage.blob.core.windows.net/media/comp11.png" },
    { name: "Mr Bikes", desc: "Travel", src: "https://spotmiesstorage.blob.core.windows.net/media/comp12.png" },
    { name: "IOX Academy", desc: "Edtech", src: "https://spotmiesstorage.blob.core.windows.net/media/comp13.png" },
    { name: "ID No Drafts", desc: "Travel", src: "https://spotmiesstorage.blob.core.windows.net/media/comp14.png" },
    { name: "CGRUM", desc: "Fintech", src: "https://spotmiesstorage.blob.core.windows.net/media/comp15.png" },
    { name: "Nandikrushi", desc: "AgriTech", src: "https://spotmiesstorage.blob.core.windows.net/media/comp16.png" },
    { name: "HRDInc", desc: "HRTech", src: "https://spotmiesstorage.blob.core.windows.net/media/comp17.png" },
    { name: "ADVON", desc: "Fintech", src: "https://spotmiesstorage.blob.core.windows.net/media/comp18.png" },
    { name: "INDIESKULL-SYNDICATE", desc: "NFTs", src: "https://spotmiesstorage.blob.core.windows.net/media/comp19.png" },
    { name: "My Body Qode", desc: "Healthcare", src: "https://spotmiesstorage.blob.core.windows.net/media/comp20.png" },
    { name: "SafeGuard air", desc: "Healthcare", src: "https://spotmiesstorage.blob.core.windows.net/media/comp21.png" },
    { name: "Orfus", desc: "HRTech", src: "https://spotmiesstorage.blob.core.windows.net/media/comp22.png" },
    { name: "Vitals", desc: "Healthcare", src: "https://spotmiesstorage.blob.core.windows.net/media/comp23.png" },
    { name: "VarunMotors", desc: "Travel", src: "https://spotmiesstorage.blob.core.windows.net/media/comp24.png" },
    { name: "Reaidy", desc: "HRTech", src: "https://www.reaidy.io/assets/logo_dark-DMRlJ8_-.png" },
    { "name": "Awaken", "desc": "Fintech", "src": "/assets/compan/awaken.png" },
    { "name": "Amero X", "desc": "Blockchain & Fintech", "src": "/assets/compan/amerox.png" },
    { "name": "BoomBoomTalk", "desc": "Social", "src": "/assets/compan/boomboomtalk.png" },
    { "name": "Commuter", "desc": "Travel", "src": "/assets/compan/commuter.png" },
    { "name": "EduMoon", "desc": "EdTech", "src": "/assets/compan/edumoon.png" },
    { "name": "Farm Vaidya", "desc": "AgriTech", "src": "/assets/compan/farmvidya.png" },
    { "name": "Mobile Masala", "desc": "Entertainment", "src": "/assets/compan/mobile-masala.png" },
    { "name": "OROLEXA", "desc": "Healthcare", "src": "/assets/compan/orelexa.png" },
    { "name": "TheReachX", "desc": "Marketing", "src": "/assets/compan/reachx.png" },
    { "name": "Referral Bazaar", "desc": "Retail", "src": "/assets/compan/referalbazaar.png" },
    { "name": "Stoory", "desc": "Marketing", "src": "/assets/compan/stoory.png" },
    { "name": "Teckybot", "desc": "EdTech", "src": "/assets/compan/teckybot.png" },
    { "name": "WingDent", "desc": "Healthcare", "src": "/assets/compan/wingdent.png" }
];

const TOTAL_CELLS = 15;

export default function ClientsSectionDark() {
    const containerRef = useRef<HTMLDivElement>(null);
    const cellsRef = useRef<(HTMLDivElement | null)[]>([]);
    const gridStateRef = useRef<number[]>(Array.from({ length: TOTAL_CELLS }, (_, i) => i));
    const isPausedRef = useRef(false);

    useEffect(() => {
        const diagonals = [
            [0], [1, 5], [2, 6, 10], [3, 7, 11],
            [4, 8, 12], [9, 13], [14]
        ];

        let currentDiagIndex = 0;
        let timeoutId: NodeJS.Timeout;

        const triggerWave = (diagIndex: number) => {
            const indicesToSwap = diagonals[diagIndex];
            indicesToSwap.forEach((cellIndex) => {
                const cell = cellsRef.current[cellIndex];
                if (!cell) return;
                const img = cell.querySelector(".logo-img") as HTMLImageElement;
                const text = cell.querySelector(".subtext") as HTMLDivElement;
                const parent = cell;

                const randomDuration = Math.random() * 0.3 + 0.4;
                img.style.transitionDuration = `${randomDuration}s`;
                img.classList.remove("opacity-100", "scale-100");
                img.classList.add("opacity-0", "scale-50");

                setTimeout(() => {
                    let newIndex;
                    do {
                        newIndex = Math.floor(Math.random() * ALL_COMPANIES.length);
                    } while (gridStateRef.current.includes(newIndex));

                    gridStateRef.current[cellIndex] = newIndex;
                    const newData = ALL_COMPANIES[newIndex];
                    if (img) img.src = newData.src;
                    if (text) text.innerText = newData.desc;

                    const isSpecial = ["WingDent", "OROLEXA", "Awaken"].includes(newData.name);
                    const hasDarkLogoBox = ["Teckybot", "EduMoon"].includes(newData.name);

                    img.className = "logo-img w-auto h-10 md:h-16 max-w-[80%] object-contain opacity-0 scale-50 transition-all ease-[cubic-bezier(0.34,1.56,0.64,1)]";

                    if (isSpecial) {
                        img.classList.add("grayscale", "brightness-200", "group-hover:grayscale-0", "group-hover:brightness-100");
                    } else {
                        img.classList.add("brightness-0", "invert", "group-hover:invert-0", "group-hover:brightness-100");
                    }

                    if (hasDarkLogoBox) {
                        img.classList.add("group-hover:bg-neutral-950", "group-hover:p-2", "group-hover:rounded-lg", "group-hover:shadow-sm");
                    }

                    parent.className = cn(
                        "group relative flex flex-col justify-center items-center p-4 md:p-6 aspect-[4/3] rounded-xl md:rounded-2xl border border-transparent transition-all duration-300 cursor-pointer bg-transparent opacity-100 group-hover/grid:blur-[2px] group-hover/grid:opacity-40 hover:!blur-none hover:!opacity-100 hover:!scale-110 hover:bg-white hover:shadow-2xl hover:shadow-black/50 hover:z-10",
                        cellIndex === 14 ? "hidden md:flex" : "flex"
                    );

                    text.className = "subtext absolute bottom-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-xs font-bold tracking-wide text-center w-full px-2 pointer-events-none text-black";

                    requestAnimationFrame(() => {
                        img.classList.remove("opacity-0", "scale-50");
                        img.classList.add("opacity-100", "scale-100");
                    });
                }, randomDuration * 1000 * 0.8);
            });
        };

        const scheduleNextWave = () => {
            if (isPausedRef.current) {
                timeoutId = setTimeout(scheduleNextWave, 200);
                return;
            }
            triggerWave(currentDiagIndex);
            currentDiagIndex++;
            if (currentDiagIndex < diagonals.length) {
                timeoutId = setTimeout(scheduleNextWave, 400);
            } else {
                currentDiagIndex = 0;
                timeoutId = setTimeout(scheduleNextWave, 3000);
            }
        };

        const startTimer = setTimeout(scheduleNextWave, 1000);
        return () => {
            clearTimeout(startTimer);
            clearTimeout(timeoutId);
        };
    }, []);

    return (
        <section className="relative w-full bg-[#050505] pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden text-white">

            <AmbientBackground intensity="subtle" />

            {/* UPDATED: Changed padding to md:px-6 to align with other sections */}
            <div className="relative z-10 max-w-[1362px] mx-auto px-6 md:px-6">
                <div className="flex flex-col lg:flex-row justify-between items-start mb-16 gap-10 lg:gap-0">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-md"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold leading-[1.2] tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400">
                            For companies with <br />
                            tech leverage
                        </h2>
                        <a href="#" className="inline-flex items-center text-sm font-semibold uppercase tracking-wider text-white hover:text-neutral-400 transition-colors group">
                            All Works
                            <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="max-w-xl lg:pt-2"
                    >
                        <p className="text-base md:text-lg text-neutral-400 font-light leading-relaxed">
                            We specialize in working with digital products and brands,
                            regardless of the size and lifecycle stage, from startups
                            to established businesses striving to achieve significant
                            tech leverage.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    ref={containerRef}
                    className="group/grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-x-10 md:gap-y-6 lg:gap-x-12 lg:gap-y-8 w-full min-h-[400px]"
                    onMouseEnter={() => (isPausedRef.current = true)}
                    onMouseLeave={() => (isPausedRef.current = false)}
                >
                    {Array.from({ length: TOTAL_CELLS }).map((_, index) => {
                        const initialData = ALL_COMPANIES[index];
                        const isSpecial = ["WingDent", "OROLEXA", "Awaken"].includes(initialData.name);
                        const hasDarkLogoBox = ["Teckybot", "EduMoon"].includes(initialData.name);

                        const isLastItem = index === TOTAL_CELLS - 1;

                        return (
                            <div
                                key={index}
                                ref={(el) => { cellsRef.current[index] = el; }}
                                className={cn(
                                    "group relative flex flex-col justify-center items-center p-4 md:p-6 aspect-[4/3] rounded-xl md:rounded-2xl border border-transparent transition-all duration-300 cursor-pointer bg-transparent opacity-100",
                                    "group-hover/grid:blur-[2px] group-hover/grid:opacity-40",
                                    "hover:!blur-none hover:!opacity-100 hover:!scale-110 hover:shadow-2xl hover:shadow-black/50 hover:z-10",
                                    "hover:bg-white",
                                    isLastItem ? "hidden md:flex" : "flex"
                                )}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={initialData.src}
                                    alt={initialData.name}
                                    className={cn(
                                        "logo-img w-auto h-10 md:h-16 max-w-[80%] object-contain opacity-100 scale-100 transition-all ease-[cubic-bezier(0.34,1.56,0.64,1)]",
                                        isSpecial
                                            ? "grayscale brightness-200 group-hover:grayscale-0 group-hover:brightness-100"
                                            : "brightness-0 invert group-hover:invert-0 group-hover:brightness-100",
                                        hasDarkLogoBox && "group-hover:bg-neutral-950 group-hover:p-2 group-hover:rounded-lg group-hover:shadow-sm"
                                    )}
                                />
                                <span className="subtext absolute bottom-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 text-xs font-bold tracking-wide text-center w-full px-2 pointer-events-none text-black">
                                    {initialData.desc}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}