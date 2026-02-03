"use client";

import React from 'react';
import { LogoCloud } from "@/components/ui/logo-cloud";

const CLIENT_LOGOS = [
    "/clients/comp1.png",
    "/clients/comp2.png",
    "/clients/comp3.png",
    "/clients/comp4.png",
    "/clients/comp5.png",
    "/clients/comp6.png",
    "/clients/comp7.png",
    "/clients/comp8.png",
    "/clients/comp9.png",
    "/clients/comp10.png",
    "/clients/comp11.png",
    "/clients/comp12.png",
    "/clients/comp13.png",
    "/clients/comp14.png",
    "/clients/comp15.png",
    "/clients/comp16.png",
    "/clients/comp17.png",
    "/clients/comp18.png",
    "/clients/comp19.png",
    "/clients/comp20.png",
    "/clients/comp21.png",
    "/clients/comp22.png",
    "/clients/comp23.png",
    "/clients/comp24.png"
];

export const Collaborations = () => {
    return (
        // Reduced py-24 to py-10
        <section className="relative z-1 bg-[#030303] py-10">
            <div className="max-w-7xl mx-auto px-6 mb-8 text-center md:text-left">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.3em]">Trusted by Industry Leaders</p>
            </div>

            <div className="w-full border-y border-white/5 bg-white/[0.01]">
                <LogoCloud logos={CLIENT_LOGOS} />
            </div>
        </section>
    );
};