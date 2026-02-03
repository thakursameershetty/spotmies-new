"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";

export const CustomerStories = () => {
    const [activeFilter, setActiveFilter] = useState('By industry');
    const filters = ['By industry', 'By size', 'By use case'];

    const allStories = [
        {
            filter: 'By industry',
            company: 'Figma',
            logo: 'https://images.ctfassets.net/8aevphvgewt8/2xNJHobFMxrvAwj534sNMo/753fcd3beb5fd223d1d2ed918b868a5f/figma.svg',
            bgImage: 'https://images.ctfassets.net/8aevphvgewt8/5m9WKL1QJeiDrnxuL9pBux/f7336610c32283d86c71235c0d54ee16/figma.webp',
            tag: 'Technology',
            headline: 'Figma streamlines development and strengthens security',
        },
        {
            filter: 'By industry',
            company: 'Mercedes-Benz',
            logo: 'https://images.ctfassets.net/8aevphvgewt8/55wg5e2VhUvAbJBG0coTRy/9ced78d7b1f86bc72f214401ad57e69e/mercedes-benz.svg',
            bgImage: 'https://images.ctfassets.net/8aevphvgewt8/2so1SgbMPgAN2M091ep1YR/3c268f706e7a53fb79276b863e0c9436/mercedes-benz.webp',
            tag: 'Automotive',
            headline: 'Mercedes-Benz standardizes source code and automates onboarding',
        },
        {
            filter: 'By industry',
            company: 'Mercado Libre',
            logo: 'https://images.ctfassets.net/8aevphvgewt8/1kTDnd4nwOET5gPSpPk5z9/dc7d84e7c31e4ece4a9db441728c8e97/mercado-libre.svg',
            bgImage: 'https://images.ctfassets.net/8aevphvgewt8/6qeISSuZ9JWsaytftY1gqk/bd5f4532732d5cf163c8e1a2557f42ba/mercado-libre.webp',
            tag: 'Financial services',
            headline: 'Mercado Libre cuts coding time by 50%',
        },
        {
            filter: 'By size',
            company: 'Accenture',
            logo: 'https://images.ctfassets.net/8aevphvgewt8/21qSDWwgqbGnMquEyDmyYB/90e0510c7f0acb32d3da6bc79fe15f31/accenture.svg',
            bgImage: 'https://images.ctfassets.net/8aevphvgewt8/241lJPInJOBMu4KzlndiA9/3dda68c9e3dd72443040f9ec0f79fc43/accenture.webp',
            tag: 'Enterprises',
            headline: 'Accenture customizes GitHub Copilot for its 12,000 developers',
        },
        {
            filter: 'By size',
            company: 'Philips',
            logo: 'https://images.ctfassets.net/8aevphvgewt8/4Zwe1e3aWTxf5p7cPh56Dz/7afd965066fcf01952e0774a84493d73/philips.svg',
            bgImage: 'https://images.ctfassets.net/8aevphvgewt8/1qobGuPOaHD5mEHWIMgwNw/843f29d5baefade0a6260928abb2222b/philips.webp',
            tag: 'Enterprises',
            headline: 'Philips reduces infrastructure costs by 80%',
        },
        {
            filter: 'By size',
            company: 'Buffer',
            logo: 'https://images.ctfassets.net/8aevphvgewt8/6DBqgU8yPaenBdzbIbbEwO/1679c6ace60f1518df32e7337779f321/buffer.svg',
            bgImage: 'https://images.ctfassets.net/8aevphvgewt8/p9lE6W5qPklU0pkkLhxmN/33e6d0c652ad4507a99a9e2912875134/buffer.webp',
            tag: 'Teams',
            headline: 'Buffer enhances collaboration and control with GitHub Team',
        },
        {
            filter: 'By use case',
            company: 'TELUS',
            logo: 'https://images.ctfassets.net/8aevphvgewt8/2K5de308fm83HZM4kKTXg4/f4a4d8944c8cd8e0270ea41a5d26672c/telus.svg',
            bgImage: 'https://images.ctfassets.net/8aevphvgewt8/4cdBLmICq01lAhTsQg5EpI/5bb06a342377d0e59137562bb18b6a51/telus.webp',
            tag: 'DevSecOps',
            headline: 'TELUS saves $16.9M with GitHub',
        },
        {
            filter: 'By use case',
            company: 'Fullstory',
            logo: 'https://images.ctfassets.net/8aevphvgewt8/72vcE5kgbjV3dWDQRa4kC5/ab7181561f29f2a8b08d8fc16733a1dd/fullstory.svg',
            bgImage: 'https://images.ctfassets.net/8aevphvgewt8/1lHztvYLo6D7ulxPr61Bo8/d54d56e0a589aeb6e74e7552b0821ee2/fullstory.webp',
            tag: 'Automation',
            headline: 'Fullstory automates DevSecOps at scale with GitHub',
        },
        {
            filter: 'By use case',
            company: 'EY',
            logo: 'https://images.ctfassets.net/8aevphvgewt8/5QTFR4JmlwZoeRbXE6IxmF/d7729de572129984c922d1f0eba8c0f5/ey.svg',
            bgImage: 'https://images.ctfassets.net/8aevphvgewt8/4BJucEyEzNF2UR18yq1zbJ/0abf11ba6d2574a2c62966683150f480/ey.webp',
            tag: 'DevOps',
            headline: 'EY leverages GitHub and Microsoft Azure DevOps to outpace the competition',
        },
    ];

    const filteredStories = allStories.filter(story => story.filter === activeFilter);

    return (
        <div className="bg-black w-full font-sans text-white flex flex-col items-center justify-center py-24 overflow-hidden">

            {/* --- FILTER NAVIGATION --- */}
            <div className="inline-flex items-center justify-center p-1 border rounded-full border-white/20 bg-transparent backdrop-blur-sm mb-16 relative z-20">
                {filters.map((filter) => (
                    <button
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`
                          relative z-10 px-6 py-2 text-sm font-medium rounded-full transition-colors duration-200
                          ${activeFilter === filter ? 'text-black' : 'text-white hover:text-white/80'}
                        `}
                    >
                        <span className="relative z-10">{filter}</span>
                        {activeFilter === filter && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 rounded-full bg-white z-0"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                ))}
            </div>

            {/* --- CARDS GRID --- */}
            <div className="w-full max-w-[80rem] px-4 md:px-6">
                {/* layout prop on container helps smooth height changes */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* mode='popLayout' is CRITICAL for grid filtering. It lets exiting items pop out of the flow immediately. */}
                    <AnimatePresence mode="popLayout">
                        {filteredStories.map((story) => (
                            <motion.div
                                key={`${story.company}-${story.filter}`} // Unique key ensures proper exit animation
                                layout="position"
                                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                className={cn(
                                    "group relative aspect-[9/10] flex flex-col p-8 md:p-10",
                                    "bg-black border border-white/20 rounded-2xl",
                                    "hover:z-10 hover:border-white/40",
                                    "transition-all duration-300 overflow-hidden cursor-pointer"
                                )}
                            >

                                {/* --- BACKGROUND IMAGE FADE IN --- */}
                                <div className="absolute inset-0 z-0">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={story.bgImage}
                                        alt=""
                                        className="w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out transform group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                </div>

                                {/* Content Container */}
                                <div className="relative z-10 flex flex-col h-full w-full">
                                    <div className="h-8 flex items-center">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={story.logo}
                                            alt={`${story.company} logo`}
                                            className="h-full max-w-[120px] object-contain filter brightness-0 invert transition-all duration-300"
                                        />
                                    </div>

                                    <div className="mt-auto">
                                        <div className="mb-4 text-sm font-medium text-white/70 group-hover:text-white transition-colors">
                                            {story.tag}
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-semibold leading-snug text-white mb-4">
                                            {story.headline}
                                        </h3>

                                        <div className={cn(
                                            "transform transition-all duration-500 ease-out",
                                            "opacity-0 translate-y-4",
                                            "group-hover:opacity-100 group-hover:translate-y-0"
                                        )}>
                                            <span className="inline-flex items-center text-sm font-bold text-white">
                                                Read customer story
                                                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};