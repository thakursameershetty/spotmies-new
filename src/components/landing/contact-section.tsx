"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Twitter, Linkedin, Instagram, Youtube, Send } from "lucide-react"; // Removed MapPin
import { cn } from "@/lib/utils";
import { LocationMap } from "@/components/ui/expand-map";
import { AmbientBackground } from "@/components/ui/ambient-background";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmCKtzq0paW6ovftholsG1MqTpYVngu6JE6n12HWYnysF78xpS/exec";
const N8N_WEBHOOK_URL = "https://n8n.srv1253159.hstgr.cloud/webhook/website-form";

// Custom Icon: Material Symbols Rounded "location_on" (Outlined)
const LocationOnIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24px"
        viewBox="0 -960 960 960"
        width="24px"
        fill="currentColor"
        className={className}
    >
        <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89t96.5 239q0 119-79.5 236.5T480-80Zm0-480Z" />
    </svg>
);

export const ContactSection = () => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        phoneCode: "+91",
        phoneNumber: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("Name", formState.name);
            formData.append("Email", formState.email);
            formData.append("Phone", `${formState.phoneCode} ${formState.phoneNumber}`);
            formData.append("Message", formState.message);
            formData.append("Date", new Date().toISOString().substring(0, 10));

            const n8nPayload = {
                name: formState.name,
                email: formState.email,
                phone: `${formState.phoneCode} ${formState.phoneNumber}`,
                message: formState.message,
                source: "spotmies-website"
            };

            await Promise.all([
                fetch(GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    body: formData,
                }).catch(err => console.error("Google Script Error:", err)),

                fetch(N8N_WEBHOOK_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(n8nPayload)
                }).catch(err => console.error("n8n Webhook Error:", err))
            ]);

            alert("Thank you! We have received your message and will contact you shortly.");
            setFormState({
                name: "",
                email: "",
                phoneCode: "+91",
                phoneNumber: "",
                message: "",
            });

        } catch (error) {
            console.error("Error sending message:", error);
            alert("Something went wrong. Please try again or email us directly.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="relative w-full py-24 px-4 md:px-6 overflow-hidden bg-[#0a0a0a]">

            <AmbientBackground intensity="subtle" />

            <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                {/* Left Column: Info & Text */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col space-y-8"
                >
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300 mb-6">
                            <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                            Available for new projects
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 tracking-tight leading-tight pb-2">
                            Let&apos;s build something <br />
                            extraordinary.
                        </h2>
                        <p className="mt-6 text-zinc-400 text-lg leading-relaxed max-w-md">
                            Whether you need to modernize your infrastructure, scale your platform, or build from scratch—we are ready to help.
                        </p>
                    </div>

                    {/* Contact Details & Map Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-start mt-8">
                        <div className="space-y-6">
                            <ContactItem icon={<Mail className="w-5 h-5" />} label="Email us" value="info@spotmies.com" href="mailto:info@spotmies.com" />
                            <ContactItem icon={<Phone className="w-5 h-5" />} label="Call us" value="+91 8019933883" href="tel:+918019933883" />
                            <ContactItem icon={<Phone className="w-5 h-5" />} label="Hiring" value="+91 7207333883" href="tel:+917207333883" />
                        </div>
                        <div className="flex flex-col h-full pt-1">
                            <LocationMap location="Visakhapatnam, India" coordinates="17.7292° N, 83.3213° E" className="w-full" />
                            <div className="flex items-start gap-3 mt-4 pl-1">
                                {/* UPDATED: Using custom Material Symbol LocationOnIcon */}
                                <LocationOnIcon className="w-6 h-6 text-brand-cyan shrink-0 mt-0.5" />
                                <p className="text-sm text-zinc-500 leading-relaxed">
                                    AU incubation centre, Andhra university,<br />Visakhapatnam - 530003
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 pt-4">
                        <SocialLink href="https://twitter.com/spotmies" icon={<Twitter className="w-5 h-5" />} />
                        <SocialLink href="https://linkedin.com/company/spotmies" icon={<Linkedin className="w-5 h-5" />} />
                        <SocialLink href="https://instagram.com/spotmies" icon={<Instagram className="w-5 h-5" />} />
                        <SocialLink href="https://youtube.com/@spotmies" icon={<Youtube className="w-5 h-5" />} />
                    </div>
                </motion.div>

                {/* Right Column: Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative"
                >
                    <div className="relative rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-xl p-10 md:p-14 shadow-xl">
                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-medium text-zinc-400 ml-1">Name <span className="text-red-500/[0.54]">*</span></label>
                                    <input type="text" id="name" required value={formState.name} onChange={(e) => setFormState({ ...formState, name: e.target.value })} className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-brand-cyan/50 focus:border-brand-cyan/50 transition-all duration-300" placeholder="Name" />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-zinc-400 ml-1">Email <span className="text-red-500/[0.54]">*</span></label>
                                    <input type="email" id="email" required value={formState.email} onChange={(e) => setFormState({ ...formState, email: e.target.value })} className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-brand-cyan/50 focus:border-brand-cyan/50 transition-all duration-300" placeholder="Email" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium text-zinc-400 ml-1">Phone Number <span className="text-zinc-600 text-xs">(Optional)</span></label>
                                <div className="flex gap-4">
                                    <select value={formState.phoneCode} onChange={(e) => setFormState({ ...formState, phoneCode: e.target.value })} className="bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-brand-cyan/50 focus:border-brand-cyan/50 transition-all duration-300 w-[100px] appearance-none cursor-pointer">
                                        <option value="+91">+91</option>
                                        <option value="+1">+1</option>
                                        <option value="+44">+44</option>
                                        <option value="+61">+61</option>
                                        <option value="+971">+971</option>
                                    </select>
                                    <input type="tel" id="phone" value={formState.phoneNumber} onChange={(e) => setFormState({ ...formState, phoneNumber: e.target.value })} className="flex-1 bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-brand-cyan/50 focus:border-brand-cyan/50 transition-all duration-300" placeholder="Phone number" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium text-zinc-400 ml-1">Message <span className="text-red-500/[0.54]">*</span></label>
                                <textarea id="message" required rows={4} value={formState.message} onChange={(e) => setFormState({ ...formState, message: e.target.value })} className="w-full bg-zinc-800/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-brand-cyan/50 focus:border-brand-cyan/50 transition-all duration-300 resize-none" placeholder="Message" />
                            </div>

                            <button type="submit" disabled={isSubmitting} className={cn("group relative w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-black transition-all duration-300", "bg-white hover:bg-neutral-200", "shadow-lg hover:shadow-white/10", isSubmitting && "opacity-80 cursor-not-allowed")}>
                                {isSubmitting ? (<span className="animate-pulse">Sending...</span>) : (<>Send Message<Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></>)}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

const ContactItem = ({ icon, label, value, href }: { icon: React.ReactNode, label: string, value: string, href?: string }) => {
    const Content = () => (
        <div className="flex items-center gap-4 group cursor-pointer">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/5 border border-white/10 text-white group-hover:bg-brand-cyan group-hover:text-black transition-all duration-300">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors">{label}</p>
                <p className="text-white font-medium group-hover:text-white transition-colors">{value}</p>
            </div>
        </div>
    );
    return href ? <a href={href} className="block w-fit"><Content /></a> : <div className="block w-fit"><Content /></div>;
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:bg-brand-cyan hover:text-black transition-all duration-300">
            {icon}
        </a>
    );
};