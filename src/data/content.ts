import type { Project, Metric, SkillCategory } from '../types';

export const personalInfo = {
  name: "ABDULYEKEEN MAADAN",
  role: "Software Developer",
  headline: "I build things that work for real people.",
  subHeadline: "Self-taught developer. I ship products, not just projects. Currently deepening my engineering foundations at Learn2Earn — a 2-year AI software engineering fellowship backed by the co-founder of Andela.",
  about: "Self-taught developer based in Lagos. I studied Mathematics at FUNAAB, did NYSC as a STEM educator, and taught myself to build by shipping for real clients — not tutorials. I direct AI agents with specific, narrow instructions to produce working products, and I've shipped everything from a full-stack CV optimization tool to client websites for safaris and executives. I solve real problems, ship on deadline, and close the gap between where I am and where I'm going — one project at a time. Starting June 2026, I'm joining Learn2Earn's AI Software Engineering Fellowship to deepen my systems engineering skills over 24 months.",
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

export const fellowship = {
  name: "Learn2Earn AI Software Engineering Fellowship",
  cohort: "Cohort 2",
  duration: "24 months (June 2026 – 2028)",
  location: "Yaba, Lagos",
  status: "Incoming Fellow",
  founder: "Iyinoluwa Aboyeji (Co-founder, Andela & Flutterwave)",
  platform: "01-edu (peer-to-peer, project-based)",
  selection: "Competitive — selected from ~4,000 Lagos applicants via gamified assessment and 30-day Go/Shell piscine",
  description: "A tuition-free, 2-year fellowship training AI-native software engineers for global tech roles. Selected through a rigorous process: a gamified cognitive assessment, followed by a 30-day systems programming piscine in Go and Shell with zero instruction — peer-to-peer learning only."
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
    link: "https://nextroleng.tech",
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
    skills: ["JavaScript (ES6+)", "TypeScript", "Go", "HTML5/CSS3"]
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
