// File: src/types.ts

export interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    link: string;
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
}