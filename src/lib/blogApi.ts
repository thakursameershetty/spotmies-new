import { STATIC_BLOG_DATA } from "@/data/blog-data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.spotmies.com/api';

export interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    featuredImage?: string;
    image?: string;
    category?: string | { name: string };
    author?: string | { name: string; image?: string };
    author_image?: string;
    updatedAt: string;
    createdAt: string;
    externalLink?: string; // <--- Add this optional property
}

const apiCall = async (endpoint: string, options = {}) => {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const url = `${API_BASE_URL}${endpoint}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            signal: controller.signal,
            ...options,
        });
        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { data, status: response.status };
    } catch (error) {
        throw error;
    }
};

export const blogApi = {
    getAllBlogs: async (): Promise<BlogPost[]> => {
        try {
            const response = await apiCall('/blogs');
            const result = response.data?.data || response.data || [];
            return Array.isArray(result) ? result : [];
        } catch (error) {
            console.warn('⚠️ API Connection failed. Falling back to static data.');
            return STATIC_BLOG_DATA;
        }
    },

    getBlogBySlug: async (slug: string): Promise<BlogPost | null> => {
        try {
            const allBlogs = await blogApi.getAllBlogs();
            return allBlogs.find(b => b._id === slug || b.slug === slug) || null;
        } catch (error) {
            console.warn('⚠️ API Connection failed. Falling back to static data.');
            return STATIC_BLOG_DATA.find(b => b._id === slug || b.slug === slug) || null;
        }
    }
};