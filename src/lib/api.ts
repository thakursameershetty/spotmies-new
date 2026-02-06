// src/lib/api.ts
import { Project, Job } from "@/types/types";

const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbyXROJrPM-Wd1Orae-417sW-4hTF4sMmd-knAPmDAWaVk7YyYQVu8kQATmauaspe7B8OA/exec";
const CAREERS_API_URL = "https://api.reaidy.io/public/job-post/search-jobs";

export async function getProjects(): Promise<Project[]> {
    try {
        const res = await fetch(SHEET_API_URL, { cache: 'no-store' });
        if (!res.ok) throw new Error("Failed to fetch projects");
        return await res.json();
    } catch (error) {
        console.error("Project API Error:", error);
        return [];
    }
}

// Updated getJobs to support Pagination
export async function getJobs(page: number = 1, limit: number = 6): Promise<{ jobs: Job[], total: number }> {
    try {
        const skip = (page - 1) * limit;
        const res = await fetch(`${CAREERS_API_URL}?skip=${skip}&limit=${limit}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                recruiterId: ["67d1aba6681a45400442f68c", "658bd65337b2a440f7f467df"]
            }),
            cache: 'no-store'
        });

        if (!res.ok) throw new Error("Failed to fetch jobs");

        const responseData = await res.json();

        return {
            jobs: responseData.data || [],
            total: responseData.count || 0
        };
    } catch (error) {
        console.error("Careers API Error:", error);
        return { jobs: [], total: 0 };
    }
}