"use client";

import React, { useState, useEffect, useMemo } from "react";
import Navbar from "@/components/landing/navbar";
import Footer from "@/components/landing/footer";
import { AmbientBackground } from "@/components/ui/ambient-background";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, Search, X, SlidersHorizontal, ChevronDown, Calendar, User } from "lucide-react";
import { GlowDivider } from "@/components/ui/glow-divider";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { blogApi, BlogPost } from "@/lib/blogApi";
import { createExcerpt } from "@/lib/contentSanitizer";
import BackButton from "@/components/ui/back-button";

export default function BlogPage() {
    const router = useRouter();
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);

    // --- SEARCH & FILTER STATES ---
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);

    // Fetch Data
    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            const data = await blogApi.getAllBlogs();
            setBlogs(data);
            setLoading(false);
        };
        fetchBlogs();
    }, []);

    // --- DYNAMIC DATA EXTRACTION ---
    const allCategories = useMemo(() => {
        const cats = new Set<string>(["All"]);
        blogs.forEach(blog => {
            const catName = typeof blog.category === 'string' ? blog.category : blog.category?.name || 'Uncategorized';
            cats.add(catName);
        });
        return Array.from(cats).sort();
    }, [blogs]);

    // --- FILTERING LOGIC ---
    const filteredBlogs = useMemo(() => {
        return blogs.filter((blog) => {
            // 1. Search Filter
            const searchLower = searchQuery.toLowerCase();
            const matchesSearch =
                blog.title.toLowerCase().includes(searchLower) ||
                (blog.excerpt && blog.excerpt.toLowerCase().includes(searchLower));

            // 2. Category Filter
            const blogCategory = typeof blog.category === 'string' ? blog.category : blog.category?.name;
            const matchesCategory = activeCategory === "All" || blogCategory === activeCategory;

            return matchesSearch && matchesCategory;
        });
    }, [blogs, searchQuery, activeCategory]);

    // Helper for images
    const getImageSrc = (blog: BlogPost) => {
        if (blog.featuredImage && blog.featuredImage !== '/favicon.ico') return blog.featuredImage;
        if (blog.image && blog.image !== '/favicon.ico') return blog.image;
        return `https://placehold.co/800x600/1a1a1a/FFF?text=${encodeURIComponent(blog.title)}`;
    };

    return (
        <main className="bg-[#050505] min-h-screen w-full selection:bg-cyan-500/30">
            <Navbar />

            <div className="relative pt-32 pb-20 px-6 md:px-10 max-w-[1400px] mx-auto min-h-screen">
                <AmbientBackground intensity="medium" />

                {/* --- HEADER --- */}
                <div className="relative z-10 mb-10">
                    <div className="mb-8">
                        <BackButton />
                    </div>

                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 mb-6 tracking-tight">
                        Insights & News
                    </h1>
                    <p className="text-neutral-400 text-lg max-w-2xl">
                        Stay updated with the latest trends in technology, blockchain, and innovation.
                        Our experts share insights to help you stay ahead.
                    </p>
                </div>

                {/* --- SEARCH & FILTER BAR --- */}
                <div className="relative z-20 mb-12 space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
                        {/* Search Input */}
                        <div className="relative w-full md:max-w-md group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-neutral-500 group-focus-within:text-[#00eef9] transition-colors" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-10 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-neutral-500 focus:outline-none focus:border-[#00eef9]/50 focus:bg-white/10 transition-all shadow-lg"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute inset-y-0 right-3 flex items-center text-neutral-500 hover:text-white"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>

                        {/* Filter Visibility Toggle */}
                        <button
                            onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                            className={cn(
                                "flex items-center gap-2 px-5 py-3.5 rounded-2xl border transition-all font-medium text-sm whitespace-nowrap",
                                isFiltersVisible
                                    ? "bg-[#00eef9]/10 border-[#00eef9]/30 text-[#00eef9]"
                                    : "bg-white/5 border-white/10 text-neutral-400 hover:text-white"
                            )}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                            Filters
                            <ChevronDown className={cn("w-4 h-4 transition-transform", isFiltersVisible ? "rotate-180" : "")} />
                        </button>
                    </div>

                    {/* Collapsible Filter Section */}
                    <AnimatePresence>
                        {isFiltersVisible && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6 mt-2">
                                    <div>
                                        <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3 ml-1">
                                            Categories
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {allCategories.map((cat) => (
                                                <button
                                                    key={cat}
                                                    onClick={() => setActiveCategory(cat)}
                                                    className={cn(
                                                        "px-4 py-2 rounded-full text-sm transition-all duration-300 border",
                                                        activeCategory === cat
                                                            ? "bg-white text-black border-white font-semibold shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                                                            : "bg-white/5 text-neutral-400 border-white/5 hover:bg-white/10 hover:border-white/20 hover:text-white"
                                                    )}
                                                >
                                                    {cat}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* --- BLOG GRID --- */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="animate-pulse flex flex-col gap-4">
                                <div className="bg-white/5 h-64 rounded-2xl w-full"></div>
                                <div className="h-6 bg-white/5 w-3/4 rounded-full"></div>
                                <div className="h-4 bg-white/5 w-full rounded-full"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        <AnimatePresence mode="popLayout">
                            {filteredBlogs.map((blog) => {
                                // Conditional Rendering: External Link vs Internal Link
                                const CardContent = (
                                    <div className="group flex flex-col gap-6 h-full cursor-pointer">
                                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(0,238,249,0.15)] group-hover:border-[#00eef9]/30">
                                            <Image
                                                src={getImageSrc(blog)}
                                                alt={blog.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            />

                                            {/* Category Tag */}
                                            <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-medium border border-white/10">
                                                {typeof blog.category === 'string' ? blog.category : blog.category?.name}
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-3 flex-1">
                                            <div className="flex items-center gap-4 text-xs text-neutral-500 mb-1">
                                                <span className="flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" />
                                                    {new Date(blog.updatedAt).toLocaleDateString()}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <User className="w-3 h-3" />
                                                    {typeof blog.author === 'string' ? blog.author : blog.author?.name || 'Spotmies'}
                                                </span>
                                            </div>

                                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-[#00eef9] transition-colors line-clamp-2">
                                                {blog.title}
                                            </h3>

                                            <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
                                                {createExcerpt(blog.content || blog.excerpt)}
                                            </p>

                                            <div className="mt-auto pt-4 flex items-center text-[#00eef9] text-sm font-semibold gap-2">
                                                Read Article <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                            </div>
                                        </div>
                                    </div>
                                );

                                return (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        key={blog._id}
                                    >
                                        {blog.externalLink ? (
                                            <a href={blog.externalLink} target="_blank" rel="noopener noreferrer" className="block h-full">
                                                {CardContent}
                                            </a>
                                        ) : (
                                            <Link href={`/blog/${blog._id}`} className="block h-full">
                                                {CardContent}
                                            </Link>
                                        )}
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                )}

                {/* --- EMPTY STATE --- */}
                {!loading && filteredBlogs.length === 0 && (
                    <div className="py-32 flex flex-col items-center justify-center text-center">
                        <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                            <Search className="w-8 h-8 text-neutral-500" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No articles found</h3>
                        <p className="text-neutral-400 max-w-md mx-auto mb-8">
                            We couldn&apos;t find any articles matching your search.
                        </p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                            className="px-6 py-3 bg-[#00eef9] text-black rounded-full font-bold hover:bg-white transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            <div className="my-16"><GlowDivider /></div>
            <Footer />
        </main>
    );
}