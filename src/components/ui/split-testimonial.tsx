"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const testimonials = [
    {
        id: 1,
        quote:
            "Impressed by the team’s expertise and adaptability regarding the development of our AI solution, which made the process went smoothly. Highly recommend them for innovative solutions.",
        name: "Marco Turk",
        role: "Founder",
        company: "Zin In Thuiswerken",
        time: "1 year ago",
        image:
            "https://spotmiesstorage.blob.core.windows.net/old-data/0bc8f2ee-eaf3-4760-9400-ef08d1967917.jpg",
    },
    {
        id: 2,
        quote:
            "Spotmies team provided top-notch customer service. Our project was completed in a timely manner, and the quality of the work was outstanding.",
        name: "Vamsi Gummadi",
        role: "Founder & CEO",
        company: "Sweken",
        time: "3 years ago",
        image:
            "https://spotmiesstorage.blob.core.windows.net/old-data/spotmies_site_OurClients_vamsi.jpeg",
    },
    {
        id: 3,
        quote:
            "UI Designer in this team is very good at suggesting ideas to get more attention for the clients businesses while frontend & the blockchain devs are exceptionally experienced & excellent in their respective fields. Really impressed by their work, 10/10 would recommend.",
        name: "Ravi Unukuru",
        role: "Web3 Entrepreneur & YouTuber",
        company: "Content Creator",
        time: "3 years ago",
        image:
            "https://spotmiesstorage.blob.core.windows.net/old-data/spotmies_site_OurClients_Ravi.jpeg",
    },
    {
        id: 4,
        quote:
            "We chose spotmies because of responsive and trust work on delivery on time. They implemented cleared designs and latest strategies for outlining and reporting for every stage of the development process.",
        name: "Anand Boddeti",
        role: "Founder",
        company: "A-Square Entertainments",
        time: "2 years ago",
        image:
            "https://spotmiesstorage.blob.core.windows.net/old-data/spotmies_site_OurClients_Anand.png",
    },
    {
        id: 5,
        quote:
            "The team at Spotmies is highly dedicated & efficient in their work. Their responsiveness & commitment towards implementing tech ideas is commendable. I feel fortunate to have learned about them through a referral, and I am eagerly looking forward to continue working with them in the future.",
        name: "Swaroop",
        role: "Founder",
        company: "Advait Labs & Decentrialz",
        time: "2 years ago",
        image:
            "https://spotmiesstorage.blob.core.windows.net/old-data/spotmies_site_OurClients_Swaroop.jpeg",
    },
    {
        id: 6,
        quote:
            "Spotmies is a dynamic company with an impressive portfolio of completed projects. Their commitment to excellence and top-notch solutions make them a valuable partner",
        name: "Mahidhar",
        role: "Founder & CEO",
        company: "Edumoon",
        time: "2 years ago",
        image:
            "https://spotmiesstorage.blob.core.windows.net/old-data/spotmies_site_OurClients_Mahidhar.jpg",
    },
    {
        id: 7,
        quote:
            "Spotmies has been a reliable partner for our business, delivering high-quality services and products that have exceeded our expectations.",
        name: "Dileep",
        role: "Founder",
        company: "chaloride",
        time: "2 years ago",
        image:
            "https://spotmiesstorage.blob.core.windows.net/old-data/spotmies_site_OurClients_Dileep.jpeg",
    },
    {
        id: 8,
        quote:
            "Spotmies is not just a service provider; they are visionaries who understand the pulse of our industry. With their cutting-edge product designing, they have given us a competitive edge and positioned us as leaders in the market.",
        name: "Venkat",
        role: "Founder",
        company: "Mr bikes",
        time: "2 years ago",
        image:
            "https://spotmiesstorage.blob.core.windows.net/old-data/spotmies_site_OurClients_Venkat.jpeg",
    },
];

export function TestimonialsSplit() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    const active = testimonials[activeIndex];

    const nextTestimonial = () => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <section className="w-full bg-[#050505] text-white">
            <div className="w-full max-w-5xl mx-auto px-6 py-24">

                {/* --- ADDED HEADER SECTION --- */}
                <div className="mb-16 md:mb-24">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
                    >
                        What our clients say
                    </motion.h2>
                </div>

                <div
                    className="relative grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 items-center cursor-pointer group"
                    onClick={nextTestimonial}
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                >
                    {/* Left: Quote Content */}
                    <div className="space-y-8">
                        {/* Company Tag */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.company}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-zinc-400"
                            >
                                <span className="w-8 h-px bg-zinc-600" />
                                {active.company}
                                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                                <span className="text-zinc-500">{active.time}</span>
                            </motion.div>
                        </AnimatePresence>

                        {/* Quote */}
                        <div className="relative overflow-hidden min-h-[180px] md:min-h-[140px]">
                            <AnimatePresence mode="wait">
                                <motion.blockquote
                                    key={active.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -40 }}
                                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                                    className="text-2xl md:text-3xl lg:text-3xl font-light leading-[1.4] tracking-tight text-white"
                                >
                                    &quot;{active.quote}&quot;
                                </motion.blockquote>
                            </AnimatePresence>
                        </div>

                        {/* Author Info */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.name}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="flex items-center gap-4"
                            >
                                <div className="w-10 h-px bg-white/20" />
                                <div>
                                    <p className="text-sm font-medium text-white">{active.name}</p>
                                    <p className="text-xs text-zinc-500">{active.role}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right: Visual Element */}
                    <div className="relative w-full md:w-48 aspect-[3/4] md:h-64 mx-auto md:mx-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active.id}
                                initial={{ opacity: 0, filter: "blur(20px)", scale: 1.05 }}
                                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                                exit={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0"
                            >
                                <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 bg-zinc-900">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={active.image}
                                        alt={active.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Click indicator */}
                        <motion.div
                            animate={{
                                opacity: isHovering ? 1 : 0,
                                scale: isHovering ? 1 : 0.8,
                            }}
                            transition={{ duration: 0.2 }}
                            className="absolute -bottom-12 left-1/2 -translate-x-1/2 hidden md:flex items-center gap-2 text-xs text-zinc-500"
                        >
                            <span>Next</span>
                            <ArrowUpRight className="w-3 h-3" />
                        </motion.div>
                    </div>

                    {/* Progress Dots */}
                    <div className="absolute -bottom-12 md:-bottom-16 left-0 md:left-0 flex items-center gap-3">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setActiveIndex(index);
                                }}
                                className="relative p-1 group/dot"
                            >
                                <span
                                    className={`
                  block w-2 h-2 rounded-full transition-all duration-300
                  ${index === activeIndex
                                            ? "bg-white scale-100"
                                            : "bg-zinc-600 scale-75 hover:bg-zinc-500 hover:scale-100"
                                        }
                `}
                                />
                                {index === activeIndex && (
                                    <motion.span
                                        layoutId="activeDot"
                                        className="absolute inset-0 border border-white/30 rounded-full"
                                        transition={{ duration: 0.3 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}