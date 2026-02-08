// src/types/types.ts

// Existing Project Interface
export interface Project {
    id: number;
    title: string;
    category: string;
    description?: string;
    image: string;
    link?: string;
    client: string;
    timeline: string;
    role: string;
    rating: number;
    introduction: string;
    challenge?: string;
    approach: string;
    result?: string;
    testimonial?: {
        text: string;
        author: string;
        position: string;
    };
    gallery: string[];
    priority?: boolean;
}

// NEW: Job Interface for Reaidy API
export interface Job {
    _id: string;
    jobTitle: string;
    jobDescription: string; // This contains HTML
    jobMode: string; // e.g., "internship", "full-time"
    locations: string[];
    requiredSkills: string[];
    recruiterId?: {
        industry?: string;
        companyName?: string;
    };
    createdAt: number;
}