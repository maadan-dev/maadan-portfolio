import type { Project, Metric, SkillCategory } from '../types';

export const personalInfo = {
  name: "ABDULYEKEEN MAADAN",
  role: "Software Developer",
  headline: "I build things that work for real people.",
  subHeadline: "Mathematics graduate turned software developer. I ship client projects, build AI-powered tools, and learn fastest when the stakes are real.",
  about: "Self-taught developer based in Lagos. I studied Mathematics at FUNAAB, did NYSC as a STEM educator, and taught myself frontend development by building for real clients — not tutorials. My most recent project is a full-stack CV optimization tool I built using AI-augmented development: I direct AI agents with specific, narrow instructions to ship working products. I'm not a computer science engineer and I don't pretend to be. I'm someone who solves real problems, ships on deadline, and closes the gap between where I am and where I'm going — one project at a time.",
  email: "babatundemaadan@gmail.com",
  github: "https://github.com/maadan-dev",
  linkedin: "https://www.linkedin.com/in/abdulyekeenmaadan",
  twitter: "https://x.com/maadan_dev",
  resumePdf: "/resume/Abdulyekeen_Maadan_Resume.pdf",
  personality: "I prefer solving real problems over building pretty placeholders."
};

export const metrics: Metric[] = [
  { label: "Clients Shipped", value: "3+ paid projects delivered" },
  { label: "Latest Build", value: "Full-stack AI product with real users" },
  { label: "Stack", value: "React · TypeScript · Go · AI-Augmented" }
];

export const education = {
  degree: "B.Sc. Mathematics",
  institution: "Federal University of Agriculture, Abeokuta",
  description: "A mathematics degree taught me to break problems into provable steps before writing any code. That same discipline — structure first, then execution — shapes how I approach frontend architecture, state management, and debugging. I don't guess. I reason through it."
};

export const testimonials = [
  {
    quote: "I'm thrilled to share my positive experience working with Abdulyekeen on the website for the Jaytee Fayemi Foundation. The website is visually appealing, well-organized, and perfectly reflects our mission and values. The design and functionality are top-notch, making it easy for our visitors to engage with our content. He was attentive to our needs and delivered a product that exceeds our expectations. For anyone looking for a skilled professional in web design, I highly recommend Abdulyekeen.",
    author: "Janet Fayemi",
    role: "Operations Coordinator & Nonprofit Program Leader"
  }
];

export const projects: Project[] = [
  {
    title: "NextRole NG",
    role: "Builder — Full-Stack (AI-Augmented Development)",
    problem: "Nigerian graduates send one generic CV to every role — Sales, Tech, Admin, Graduate Trainee programs. Global tools like Teal and Resume Worded don't understand NYSC, GTBank's 2:1 requirement, or Lagos private sector CV conventions.",
    execution: "Built a two-phase Gemini AI pipeline: Phase 1 extracts verified CV facts, Phase 2 generates tailored rewrites and strategy. SSE streaming shows real results in ~15 seconds. Handles Canva CVs via multimodal PDF extraction. Click-to-edit inline CV editor with live PDF sync.",
    result: "Launched April 13, 2026. Got organic traction on day one — real users sharing it in WhatsApp groups unprompted. No marketing spend.",
    tech: ["Go", "React", "TypeScript", "Tailwind CSS", "Gemini API", "Supabase"],
    image: "/nextrole-ng.mp4",
    link: "https://nextrole-ng.vercel.app",
    featured: true,
    highlights: [
      "Two-phase AI pipeline separating fact extraction from generation to prevent hallucination",
      "Role-specific prompt modules for 10 Nigerian job categories with hard-coded institutional knowledge",
      "ATS-readable PDF generation with inline click-to-edit fields"
    ]
  },
  {
    title: "ATEKER Luxury Safaris",
    role: "UI Developer (Contract)",
    problem: "Needed a modern, responsive web presence that reflected the premium nature of their safari services.",
    execution: "Developed the responsive hero section, interactive horizontal scroll cards, and collaborated on a brand visual refresh using React, Tailwind, and Framer Motion.",
    result: "Delivered a mobile-optimized landing experience with improved usability and premium aesthetics.",
    tech: ["React", "TypeScript", "TailwindCSS", "Framer Motion"],
    image: "/images/ensii.webp",
    link: "https://ensiisafaris.ca/"
  },
  {
    title: "Executive Persona Platform",
    role: "Frontend Developer",
    problem: "Build an authoritative digital presence for a diplomatic executive.",
    execution: "Designed and implemented a clean design system focusing on typography, whitespace, and high-performance load times.",
    result: "Established a commanding web presence, optimized for both desktop and mobile viewing with zero layout shift.",
    tech: ["React", "JavaScript", "Tailwind CSS"],
    image: "/images/segunalabi.webp",
    link: "https://segunalabi.me"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Core Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "Go (Learning)", "HTML5/CSS3"]
  },
  {
    title: "Frameworks & Tools",
    skills: ["React", "Vite", "Tailwind CSS", "Framer Motion"]
  },
  {
    title: "Building & Shipping",
    skills: ["Git/GitHub", "AI-Augmented Dev", "Supabase", "REST APIs", "Vercel"]
  }
];
