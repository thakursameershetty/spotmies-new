import React from 'react';
import Navbar from "@/components/landing/navbar";
import { HeroSection } from "@/components/landing/hero-section";
import { TechStack } from "@/components/landing/tech-stack";
import CompaniesSection from "@/components/landing/companies-section";
import BrandMastery from "@/components/landing/brand-mastery";
import { ProcessSection } from "@/components/landing/process-section";
import { FoundersSection } from "@/components/landing/founders-section";
import { TestimonialsSplit } from "@/components/ui/split-testimonial";
import { FaqSection } from "@/components/landing/faq-section";
import { ContactSection } from "@/components/landing/contact-section";
import { ProjectsSection } from "@/components/landing/projects-section";
import Footer from "@/components/landing/footer";
import { GlowDivider } from "@/components/ui/glow-divider";
import { getProjects } from "@/lib/api";

export default async function Home() {

  // Fetch data on the server
  const projects = await getProjects();

  return (
    <main className="bg-[#050505] min-h-screen w-full selection:bg-brand-cyan/30">
      <Navbar />

      {/* Pass projects to HeroSection */}
      <HeroSection projects={projects} />

      {/* Reduced dividers: Removed after Hero */}

      <TechStack />

      {/* Reduced dividers: Removed after TechStack */}

      <CompaniesSection />

      {/* Reduced dividers: Removed after Companies */}

      <BrandMastery />


      <ProjectsSection data={projects} />

      {/* Reduced dividers: Removed after Projects */}

      <ProcessSection />

      {/* Reduced dividers: Removed after Process */}

      <FoundersSection />

      {/* Reduced dividers: Removed after Founders */}

      <TestimonialsSplit />


      <FaqSection />
      <ContactSection />
      <div className="my-8 md:my-16"><GlowDivider /></div>
      <Footer />
    </main>
  );
}