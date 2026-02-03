// lib/api.ts
import { Project } from "@/types/types"; // Make sure your Project type is defined

// 🔴 YOUR SPECIFIC API URL
const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbyXROJrPM-Wd1Orae-417sW-4hTF4sMmd-knAPmDAWaVk7YyYQVu8kQATmauaspe7B8OA/exec";

export async function getProjects(): Promise<Project[]> {
    try {
        const res = await fetch(SHEET_API_URL, {
            // revalidate: 3600 // Optional: Cache for 1 hour to speed up the site
            cache: 'no-store' // Useful for development so you see changes immediately
        });

        if (!res.ok) throw new Error("Failed to fetch projects");

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("API Error:", error);
        return [];
    }
}