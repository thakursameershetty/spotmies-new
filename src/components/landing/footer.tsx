"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="w-full bg-[#050505] text-gray-400 pt-16 pb-8 border-t border-white/10 font-sans">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10">

                {/* --- MAIN CONTENT GRID --- */}
                <div className="flex flex-wrap justify-between mb-12 gap-y-10">

                    {/* 1. Company Info */}
                    <div className="w-full md:w-1/3 lg:w-1/3 pr-4">
                        <div className="relative w-52 h-12 mb-6">
                            {/* Using local banner if available, fallback to the URL you provided */}
                            <Image
                                src="/spotmies_banner.png"
                                alt="Spotmies Logo"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="mb-6 text-justify text-sm md:text-base lg:text-lg leading-relaxed opacity-80">
                            Spotmies is a leading provider of innovative solutions for Product Designing & Blockchain. With a team of experienced professionals & a commitment to excellence, we are dedicated to helping our clients achieve their goals and stay ahead of the competition. Our mission is to provide high-quality services & products that deliver tangible results and drive business success.
                        </p>
                    </div>

                    {/* 2. Useful Links */}
                    <div className="w-full md:w-1/5 lg:w-1/5">
                        <h2 className="text-white text-lg lg:text-xl font-bold mb-6">Useful Links</h2>
                        <ul className="space-y-3 text-base lg:text-lg">
                            {['Home', 'About Us', 'Services', 'Blog', 'Careers'].map((item) => (
                                <li key={item}>
                                    <Link href={`/#${item.toLowerCase().replace(" ", "")}`} className="hover:text-white transition-colors">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 3. More Links */}
                    <div className="w-full md:w-1/5 lg:w-1/5">
                        <h2 className="text-white text-lg lg:text-xl font-bold mb-6">More</h2>
                        <ul className="space-y-3 text-base lg:text-lg">
                            <li><Link href="/#faq" className="hover:text-white transition-colors">FAQ</Link></li>
                            <li><Link href="/#contactUs" className="hover:text-white transition-colors">Contact Us</Link></li>
                            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
                        </ul>
                    </div>

                    {/* 4. Newsletter & Recognition */}
                    <div className="w-full md:w-1/5 lg:w-1/4">
                        <h2 className="text-white text-lg lg:text-xl font-bold mb-6">Newsletter</h2>
                        <p className="mb-4 text-base lg:text-lg opacity-80">
                            Sign up for our newsletter and stay up-to-date with our latest news and offers.
                        </p>

                        {/* Input Form */}
                        <form className="flex mb-8">
                            <input
                                required
                                className="w-full bg-neutral-900 text-gray-200 border border-neutral-700 py-2 px-3 rounded-l-md outline-none focus:border-white/40 transition-colors"
                                type="email"
                                placeholder="Enter your email"
                            />
                            <button
                                className="bg-neutral-800 text-white font-bold py-2 px-4 rounded-r-md border-y border-r border-neutral-700 hover:bg-neutral-700 transition-colors"
                                type="submit"
                            >
                                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" className="w-5 h-5">
                                    <path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 0 0 0-48.4z"></path>
                                </svg>
                            </button>
                        </form>

                        {/* Recognized By */}
                        <div className="pt-2">
                            <h2 className="text-white text-lg lg:text-xl font-bold mb-4">Recognized By</h2>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="https://spotmiesstorage.blob.core.windows.net/old-data/spotmies_site_last image_startupindia.png"
                                alt="Recognized by Startup India"
                                className="w-[200px] grayscale hover:grayscale-0 transition-all duration-700 ease-in-out cursor-pointer opacity-80 hover:opacity-100"
                            />
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM BAR --- */}
                <div className="w-full flex flex-col md:flex-row items-center justify-between border-t border-white/10 pt-8">
                    <div className="text-sm lg:text-base text-gray-500">
                        © 2026 Spotmies LLP. All Rights Reserved.
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-5 mt-4 md:mt-0">
                        <SocialIcon label="Instagram" path="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z" viewBox="0 0 1024 1024" />
                        <SocialIcon label="LinkedIn" path="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" viewBox="0 0 448 512" />
                        <SocialIcon label="YouTube" path="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" viewBox="0 0 576 512" />
                        <SocialIcon label="Twitter" path="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" viewBox="0 0 512 512" />
                        <SocialIcon label="Github" path="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" viewBox="0 0 496 512" />
                        <SocialIcon label="Medium" path="M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zM598.5 350.9h138.4v33.7H598.5v-33.7zM512 628.8a89.52 89.52 0 0 1-27 31c-11.8 8.2-24.9 14.2-38.8 17.7a167.4 167.4 0 0 1-44.6 5.7H236V342.1h161c16.3 0 31.1 1.5 44.6 4.3 13.4 2.8 24.8 7.6 34.4 14.1 9.5 6.5 17 15.2 22.3 26 5.2 10.7 7.9 24.1 7.9 40 0 17.2-3.9 31.4-11.7 42.9-7.9 11.5-19.3 20.8-34.8 28.1 21.1 6 36.6 16.7 46.8 31.7 10.4 15.2 15.5 33.4 15.5 54.8 0 17.4-3.3 32.3-10 44.8zM790.8 576H612.4c0 19.4 6.7 38 16.8 48 10.2 9.9 24.8 14.9 43.9 14.9 13.8 0 25.5-3.5 35.5-10.4 9.9-6.9 15.9-14.2 18.1-21.8h59.8c-9.6 29.7-24.2 50.9-44 63.7-19.6 12.8-43.6 19.2-71.5 19.2-19.5 0-37-3.2-52.7-9.3-15.1-5.9-28.7-14.9-39.9-26.5a121.2 121.2 0 0 1-25.1-41.2c-6.1-16.9-9.1-34.7-8.9-52.6 0-18.5 3.1-35.7 9.1-51.7 11.5-31.1 35.4-56 65.9-68.9 16.3-6.8 33.8-10.2 51.5-10 21 0 39.2 4 55 12.2a111.6 111.6 0 0 1 38.6 32.8c10.1 13.7 17.2 29.3 21.7 46.9 4.3 17.3 5.8 35.5 4.6 54.7zm-122-95.6c-10.8 0-19.9 1.9-26.9 5.6-7 3.7-12.8 8.3-17.2 13.6a48.4 48.4 0 0 0-9.1 17.4c-1.6 5.3-2.7 10.7-3.1 16.2H723c-1.6-17.3-7.6-30.1-15.6-39.1-8.4-8.9-21.9-13.7-38.6-13.7zm-248.5-10.1c8.7-6.3 12.9-16.7 12.9-31 .3-6.8-1.1-13.5-4.1-19.6-2.7-4.9-6.7-9-11.6-11.9a44.8 44.8 0 0 0-16.6-6c-6.4-1.2-12.9-1.8-19.3-1.7h-70.3v79.7h76.1c13.1.1 24.2-3.1 32.9-9.5zm11.8 72c-9.8-7.5-22.9-11.2-39.2-11.2h-81.8v94h80.2c7.5 0 14.4-.7 21.1-2.1s12.7-3.8 17.8-7.2c5.1-3.3 9.2-7.8 12.3-13.6 3-5.8 4.5-13.2 4.5-22.1 0-17.7-5-30.2-14.9-37.8z" viewBox="0 0 1024 1024" />
                        <SocialIcon label="Community" path="M9.025 8c0 2.485-2.02 4.5-4.513 4.5A4.506 4.506 0 0 1 0 8c0-2.486 2.02-4.5 4.512-4.5A4.506 4.506 0 0 1 9.025 8zm4.95 0c0 2.34-1.01 4.236-2.256 4.236-1.246 0-2.256-1.897-2.256-4.236 0-2.34 1.01-4.236 2.256-4.236 1.246 0 2.256 1.897 2.256 4.236zM16 8c0 2.096-.355 3.795-.794 3.795-.438 0-.793-1.7-.793-3.795 0-2.096.355-3.795.794-3.795.438 0 .793 1.699.793 3.795z" viewBox="0 0 16 16" />
                    </div>
                </div>

            </div>
        </footer>
    );
}

// Helper for Social Icons
function SocialIcon({ path, viewBox, label }: { path: string; viewBox: string; label: string }) {
    return (
        <a
            aria-label={label}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
            <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox={viewBox}
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d={path}></path>
            </svg>
        </a>
    );
}