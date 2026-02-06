export interface Job {
    id: string;
    title: string;
    type: "Full-time" | "Part-time" | "Contract";
    location: string;
    department: string;
    description: string;
    requirements: string[];
}

export const OPEN_POSITIONS: Job[] = [
    {
        id: "FE-001",
        title: "Senior Frontend Engineer",
        type: "Full-time",
        location: "Visakhapatnam (Hybrid)",
        department: "Engineering",
        description: "We are looking for a React/Next.js expert to build pixel-perfect, fluid interfaces that define the next generation of web experiences.",
        requirements: ["3+ years with React & Next.js", "Experience with Framer Motion & Tailwind", "Deep understanding of DOM & Performance"],
    },
    {
        id: "BC-002",
        title: "Blockchain Developer",
        type: "Full-time",
        location: "Remote / Hybrid",
        department: "Web3",
        description: "Join our Web3 team to architect secure smart contracts and decentralized applications for global clients.",
        requirements: ["Solidity & Smart Contract Security", "Experience with Ethereum/Polygon", "Web3.js or Ethers.js proficiency"],
    },
    {
        id: "UI-003",
        title: "Product Designer (UI/UX)",
        type: "Full-time",
        location: "Visakhapatnam",
        department: "Design",
        description: "Shape the visual identity of our products. We need someone who obsesses over micro-interactions and clean, modernist aesthetics.",
        requirements: ["Portfolio demonstrating 'Glassmorphism' style", "Figma mastery", "Basic understanding of frontend limitations"],
    },
    {
        id: "MB-004",
        title: "Flutter Developer",
        type: "Contract",
        location: "Remote",
        department: "Mobile",
        description: "Build cross-platform mobile applications with native-like performance using Flutter.",
        requirements: ["Published at least 2 apps on Stores", "State management (Provider/Bloc)", "Native channel integration knowledge"],
    },
];