"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Send, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { Job } from "@/types/types"; // Updated import

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxmCKtzq0paW6ovftholsG1MqTpYVngu6JE6n12HWYnysF78xpS/exec";

interface JobApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    job: Job | null;
}

export const JobApplicationModal = ({ isOpen, onClose, job }: JobApplicationModalProps) => {
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        phone: "",
        portfolio: "",
        coverLetter: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!job) return;
        setIsSubmitting(true);

        try {
            const formData = new FormData();
            formData.append("Name", formState.name);
            formData.append("Email", formState.email);
            formData.append("Phone", formState.phone);

            const applicationMessage = `
🚀 NEW JOB APPLICATION
----------------------
Position: ${job.jobTitle} (ID: ${job._id})
Portfolio: ${formState.portfolio}

Cover Letter:
${formState.coverLetter}
            `.trim();

            formData.append("Message", applicationMessage);
            formData.append("Date", new Date().toISOString().substring(0, 10));

            await fetch(GOOGLE_SCRIPT_URL, { method: "POST", body: formData });

            alert("Application sent successfully!");
            onClose();
            setFormState({ name: "", email: "", phone: "", portfolio: "", coverLetter: "" });

        } catch (error) {
            console.error("Error submitting:", error);
            alert("Failed to submit. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && job && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-[70] p-4"
                    >
                        <div className="bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                            {/* Header */}
                            <div className="p-6 border-b border-white/5 bg-zinc-900/50 flex justify-between items-start shrink-0">
                                <div>
                                    <div className="flex items-center gap-2 text-[#00d3f3] mb-1">
                                        <Briefcase className="w-4 h-4" />
                                        <span className="text-xs font-semibold uppercase tracking-wider">Applying For</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white">{job.jobTitle}</h3>
                                    <p className="text-zinc-400 text-sm mt-1 capitalize">{job.locations[0]} • {job.jobMode}</p>
                                </div>
                                <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                                    <X className="w-5 h-5 text-zinc-400" />
                                </button>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">

                                {/* Job Description (HTML Rendered) */}
                                <div className="prose prose-invert prose-sm max-w-none text-zinc-400">
                                    <h4 className="text-white font-semibold mb-2">About the Role</h4>
                                    <div dangerouslySetInnerHTML={{ __html: job.jobDescription }} />
                                </div>

                                {/* Application Form */}
                                <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                                    <h4 className="text-white font-semibold mb-4">Submit Your Application</h4>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-300">Full Name</label>
                                            <input required value={formState.name} onChange={e => setFormState({ ...formState, name: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00d3f3]/50 outline-none transition-all" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-zinc-300">Email</label>
                                                <input required type="email" value={formState.email} onChange={e => setFormState({ ...formState, email: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00d3f3]/50 outline-none" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-zinc-300">Phone</label>
                                                <input required type="tel" value={formState.phone} onChange={e => setFormState({ ...formState, phone: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00d3f3]/50 outline-none" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-300">Portfolio / Resume Link</label>
                                            <input required type="url" value={formState.portfolio} onChange={e => setFormState({ ...formState, portfolio: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00d3f3]/50 outline-none" placeholder="https://..." />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-zinc-300">Why Spotmies?</label>
                                            <textarea rows={3} value={formState.coverLetter} onChange={e => setFormState({ ...formState, coverLetter: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#00d3f3]/50 outline-none resize-none" />
                                        </div>
                                        <button type="submit" disabled={isSubmitting} className={cn("w-full py-3 rounded-lg font-bold text-black bg-white hover:bg-[#00d3f3] transition-all duration-300", isSubmitting && "opacity-70")}>
                                            {isSubmitting ? "Sending..." : "Submit Application"}
                                        </button>
                                    </form>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};