"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { BrainCircuit, Boxes, Smartphone, Cloud, Layers, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AmbientBackground } from "@/components/ui/ambient-background";

interface Step {
    title: string;
    description: string;
    icon: React.ReactNode;
    colors: number[][];
    span: string;
    dotSize: number;
    speed: number;
    image: string;
    content: string;
}

// --- ANIMATION VARIANTS (FIXED) ---
const fadeUpVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: 0.1 * i,
            // Explicitly cast to tuple to fix TypeScript error
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    }),
};

export const TechStack = () => {
    const [selectedStep, setSelectedStep] = useState<Step | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const steps: Step[] = [
        {
            title: "AI & Machine Learning",
            description: "Realize your vision with our expert AI & ML product design services.",
            icon: <BrainCircuit className="w-10 h-10 text-cyan-400" />,
            colors: [[0, 255, 255], [0, 200, 255]],
            span: "md:col-span-2",
            dotSize: 4,
            speed: 4,
            image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-LfpfRdF2BugZEEpTgPQNhXOgbpJBMo.png&w=1000&q=75",
            content: `At our software development company, we have a dedicated team of mobile app developers who specialize in creating Android and iOS applications that not only look great but also perform flawlessly across all devices. We use a range of technologies, including Flutter, Node.js, MongoDB, and Express.js, to deliver exceptional mobile app development services.\n\nOur mobile app development process begins with a deep understanding of our client's business requirements and goals. We work closely with our clients to identify the use case for the mobile app and the target audience. Our team then develops a comprehensive plan and design for the app, taking into account the latest design trends and best practices for mobile app development.\n\nWe specialize in using Flutter, a mobile app development framework created by Google, to create visually stunning and high-performance mobile apps. Flutter allows us to create apps that perform flawlessly across all devices, providing a seamless user experience. We also use Node.js, MongoDB, and Express.js for server-side development, which allows us to create scalable and reliable mobile apps.\n\nOur mobile app development team is committed to delivering mobile apps that not only look great but also perform flawlessly. We conduct extensive testing and quality assurance checks to ensure that our mobile apps meet the highest standards of performance and functionality. We also ensure that our mobile apps are optimized for speed and are responsive across all devices.\n\nWe believe in providing our clients with mobile apps that align with their unique business needs and goals. Our team works closely with our clients to ensure that the mobile app meets their requirements and provides a seamless user experience. We also provide our clients with ongoing support and maintenance services to ensure that their mobile app remains up-to-date and functional.\n\nIn summary, our mobile app development team is committed to building mobile apps that not only look great but perform flawlessly across all devices. We use cutting-edge technologies and frameworks to create high-performance, visually stunning, and reliable mobile apps that meet our client's business needs and goals.`,
        },
        {
            title: "Blockchain & Web3",
            description: "Empower your business with the transformative potential of blockchain technology.",
            icon: <Boxes className="w-10 h-10 text-purple-400" />,
            colors: [[168, 85, 247], [192, 132, 252]],
            span: "md:col-span-1",
            dotSize: 3,
            speed: 4,
            image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-2ojjAp7s2KeO3J9shvCPNH9nuhz3zi.png&w=1000&q=75",
            content: `At our software development company, we are committed to empowering businesses with the transformative potential of blockchain technology. We have a dedicated blockchain development team that specializes in using Solidity, Ethereum, Polygon, Hardhat, Ethers.js, and other cutting-edge technologies to create secure, reliable, and scalable blockchain solutions.\n\nWe understand that blockchain technology has the potential to revolutionize the way businesses operate, and our team is dedicated to helping our clients harness this potential to achieve their business goals. Whether it's creating a decentralized application (DApp), a smart contract, or a blockchain-based solution, our team has the expertise and experience to deliver exceptional blockchain solutions.\n\nOur blockchain development process begins with a thorough understanding of our client's business needs and goals. We work closely with our clients to identify the use case and requirements for the blockchain project. Our team then develops a comprehensive plan and design for the project, taking into account the security best practices for smart contracts to ensure the project's security.\n\nOur blockchain development team has extensive experience in creating smart contracts, which are self-executing contracts that automatically enforce the rules and regulations of a contract. We use Solidity, a contract-oriented programming language, to develop smart contracts that are secure, efficient, and reliable.\n\nWe also specialize in using Ethereum and Polygon, two of the most popular blockchain platforms, to create blockchain-based solutions for our clients. We use Hardhat, a development environment, to develop, test, and deploy smart contracts and Ethers.js, a JavaScript library, to interact with the Ethereum network.\n\nWe understand that immutability is a key feature of blockchain technology, and our team places great emphasis on creating secure, reliable, and scalable blockchain solutions that are resilient to cyber-attacks and other security threats. We also conduct thorough testing and auditing of our smart contracts to ensure that they are free from vulnerabilities and are secure.\n\nIn summary, our blockchain development team is committed to empowering businesses with the transformative potential of blockchain technology. We provide our clients with exceptional blockchain solutions that are tailored to their unique business needs and goals, ensuring that they achieve their business objectives.`,

        },
        {
            title: "Android & iOS Applications",
            description: "Experience the future with our advanced neural network solutions.",
            icon: <Smartphone className="w-10 h-10 text-emerald-400" />,
            colors: [[52, 211, 153], [110, 231, 183]],
            span: "md:col-span-1",
            dotSize: 3,
            speed: 3,
            image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-AEQHfiKbM10ybAm0ZP6jzvu5hNwzEB.png&w=1000&q=75",
            content: `At our software development company, we have a highly skilled web development team that specializes in using cutting-edge technologies and frameworks to deliver exceptional web development services. Our team utilizes a range of technologies, including Node.js, React.js,Next.js, MongoDB, Python, and Express.js, to create high-performance, scalable, and responsive web applications.\n\nOur web development process begins with ideation, where we work closely with our clients to understand their business needs and goals. We then move on to the planning and design phase, where we create a detailed plan and wireframes for the project. Once the design is finalized, we move on to the development phase, where our team of expert developers begins to bring the project to life.\n\nOur web development team utilizes industry best practices and coding standards to ensure that every project we deliver is of the highest quality. We believe in delivering excellence at every step of the development process, and we take pride in our ability to deliver solutions that exceed our client's expectations.\n\nWe specialize in using Node.js for server-side development, which allows us to create scalable and high-performance web applications. We use React.js and Next.js for front-end development, providing our clients with responsive and visually stunning web applications that provide a seamless user experience across devices. We also use MongoDB as our database of choice, which allows us to create flexible and scalable database structures for our clients' web applications.\n\nOur web development team is committed to staying up-to-date with the latest technologies and frameworks, ensuring that we can provide our clients with the best possible solutions. We believe that every web development project is unique, and we work closely with our clients to deliver tailor-made solutions that align with their business goals.\n\nIn summary, our web development team is dedicated to delivering excellence at every step of the web development process. From ideation to launch, we provide our clients with exceptional web development services that are tailored to their unique requirements, ensuring that they achieve their business goals.`,
        },
        {
            title: "SaaS Platforms",
            description: "Elevate your business with our cutting-edge SaaS solutions for seamless scalability and efficiency.",
            icon: <Cloud className="w-10 h-10 text-blue-400" />,
            colors: [[59, 130, 246], [96, 165, 250]],
            span: "md:col-span-1",
            dotSize: 3,
            speed: 3,
            image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-b4opFtjTkc0AjPR6H9fuB42Qm0lnE4.png&w=1000&q=75",
            content: `At our software development company, we offer expert Windows and Mac application development services that enable our clients to maximize their devices' potential. Our team of experienced developers specializes in using Flutter, a cross-platform app development framework, to create visually stunning and high-performance Windows and Mac applications.\n\nOur Windows and Mac application development process begins with a thorough understanding of our client's business requirements and goals. We work closely with our clients to identify the use case for the application and the target audience. Our team then develops a comprehensive plan and design for the application, taking into account the latest design trends and best practices for Windows and Mac application development.\n\nWe specialize in using Flutter to create Windows and Mac applications that are visually stunning, high-performance, and scalable. Flutter allows us to create cross-platform applications that can run seamlessly across Windows and Mac devices, providing a seamless user experience. We also use Node.js, MongoDB, and Express.js for server-side development, which allows us to create scalable and reliable Windows and Mac applications.\n\nOur Windows and Mac application development team is committed to delivering applications that meet the highest standards of performance and functionality. We conduct extensive testing and quality assurance checks to ensure that our applications are optimized for speed and are responsive across all devices. We also ensure that our applications are secure and meet our client's business requirements.\n\nWe believe in providing our clients with applications that align with their unique business needs and goals. Our team works closely with our clients to ensure that the application meets their requirements and provides a seamless user experience. We also provide ongoing support and maintenance services to ensure that our clients' applications remain up-to-date and functional.\n\nIn summary, our Windows and Mac application development team is committed to maximizing our clients' devices' potential by providing expert application development services. We use cutting-edge technologies and frameworks, including Flutter, to create visually stunning, high-performance, and reliable applications that meet our client's business needs and goals.`,
        },
        {
            title: "Product Design",
            description: "Transform your ideas into reality with our expert product design services.",
            icon: <Layers className="w-10 h-10 text-orange-400" />,
            colors: [[249, 115, 22], [251, 146, 60]],
            span: "md:col-span-1",
            dotSize: 3,
            speed: 3,
            image: "https://www.thiings.co/_next/image?url=https%3A%2F%2Flftz25oez4aqbxpq.public.blob.vercel-storage.com%2Fimage-zKoxdD3l5QDuQDFQGP45fqO0EuaKqP.png&w=1000&q=75",
            content: `At our software development company, we take pride in having a creative design team that can transform our client's ideas into reality. Our design team consists of experienced and talented professionals who specialize in UI/UX design. Our team utilizes industry-leading design tools such as Adobe XD and Figma to create visually stunning and user-friendly interfaces that enhance the user experience.\n\nWe understand that design is a critical aspect of any product, and our design team is committed to delivering exceptional design services to our clients. We take a client-centered approach to design, meaning that we work closely with our clients to understand their needs and vision for the product. Our team carries out intensive research on the project before starting the design process to ensure that we have a deep understanding of the project's unique requirements.\n\nOur design process involves several stages, including wireframing, prototyping, and testing. We create wireframes to provide a basic visual representation of the product's layout and functionality. Once the wireframes are approved, we move on to prototyping, which involves creating a clickable prototype to give the client a better understanding of the final product. We then conduct user testing to gather feedback and refine the design to ensure that it meets the user's needs.\n\nOur design team's expertise in UI/UX design, coupled with our commitment to research, ensures that we deliver exceptional design services that align with our client's vision. We believe that design is an integral part of the product development process and plays a critical role in the success of the final product. Therefore, we place great emphasis on providing our clients with exceptional design services that help them achieve their business goals.`,
        },
    ];

    return (
        <section id="services" className="relative z-20 py-24 bg-black overflow-hidden">
            {/* --- AMBIENT BACKGROUND --- */}
            <AmbientBackground intensity="subtle" />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="mb-16 text-center">
                    <motion.h2
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUpVariant}
                        className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50 pb-4"
                    >
                        Our Expertise In
                    </motion.h2>
                    <motion.p
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUpVariant}
                        className="mt-4 text-neutral-300 max-w-2xl mx-auto text-lg"
                    >
                        We build with the latest and most robust technologies to deliver scalable digital solutions.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            className={`${step.span} cursor-pointer group/card`}
                            custom={idx + 2} // Staggered delay
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-50px" }}
                            variants={fadeUpVariant}
                            onClick={() => setSelectedStep(step)}
                        >
                            <CardSpotlight
                                className={`flex flex-col justify-between min-h-[20rem] md:min-h-[22rem] h-full rounded-[2rem] relative bg-neutral-900/50 border-white/5`}
                                color={undefined}
                                canvasColors={step.colors}
                                canvasDotSize={step.dotSize}
                                canvasAnimationSpeed={step.speed}
                            >
                                <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
                                    <div className="relative z-10 p-10 flex flex-col justify-between h-full">
                                        <div>
                                            <div className="mb-4 p-3 bg-white/5 rounded-xl w-fit backdrop-blur-sm border border-white/10">
                                                {step.icon}
                                            </div>
                                            <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                                            <p className="text-neutral-300">{step.description}</p>
                                        </div>
                                    </div>

                                    <div className="absolute -bottom-10 -right-10 z-0 pointer-events-none transition-opacity duration-300 group-hover/spotlight:opacity-0">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            className="w-56 h-auto object-contain grayscale brightness-75 contrast-125 opacity-30 origin-bottom-right transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                <div className="absolute -bottom-10 -right-10 z-20 pointer-events-none">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="w-56 h-auto object-contain grayscale brightness-75 contrast-125 opacity-0 transition-all duration-300 ease-in-out origin-bottom-right group-hover/spotlight:opacity-100 group-hover/spotlight:grayscale-0 group-hover/spotlight:brightness-100 group-hover/spotlight:contrast-100 group-hover/spotlight:scale-50 group-hover/spotlight:-translate-x-10 group-hover/spotlight:-translate-y-10"
                                    />
                                </div>
                            </CardSpotlight>
                        </motion.div>
                    ))}
                </div>
            </div>

            {mounted && createPortal(
                <AnimatePresence>
                    {selectedStep && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                            onClick={() => setSelectedStep(null)}
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-neutral-900 border border-neutral-800 rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    onClick={() => setSelectedStep(null)}
                                    className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
                                >
                                    <X size={20} />
                                </button>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                                        {selectedStep.icon}
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                                        {selectedStep.title}
                                    </h3>
                                </div>

                                <div className="space-y-4 text-neutral-300 leading-relaxed text-lg">
                                    {selectedStep.content.split('\n\n').map((paragraph, index) => (
                                        <p key={index}>{paragraph}</p>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </section>
    );
};