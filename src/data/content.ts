import type { Project, Metric, SkillCategory } from '../types';

export const personalInfo = {
  name: "ABDULYEKEEN MAADAN",
  role: "Software Developer",
  headline: "I don't build demos. I ship products.",
  subHeadline: "Mathematics graduate turned software developer. Incoming Fellow at the Learn2Earn AI Software Engineering Fellowship (selected from ~4,000 applicants) — building production-grade web applications and systems.",
  about: "I studied Mathematics at FUNAAB — it taught me to break problems into provable steps before writing a line of code. After NYSC as a STEM educator, I taught myself to build by shipping for real clients, not following tutorials.\n\nMy latest product, NextRole NG, is an AI-powered CV optimizer built specifically for the Nigerian job market. It got organic traction on day one — users sharing it in WhatsApp groups unprompted, with zero marketing spend. On hold — active development resumes post-fellowship. I've also shipped client websites for luxury safaris, nonprofit foundations, and diplomatic executives.\n\nStarting July 2026, I'm joining Learn2Earn's AI Software Engineering Fellowship — selected from ~4,000 Lagos applicants through a 30-day systems programming piscine in Go and Shell.",
  email: "maadan.dev@gmail.com",
  github: "https://github.com/maadan-dev",
  linkedin: "https://www.linkedin.com/in/abdulyekeenmaadan",
  twitter: "https://x.com/maadan_dev",
  resumePdf: "/resume/Abdulyekeen_Maadan_Resume.pdf",
  personality: "Open to freelance contracts, part-time remote roles, and gig-based work."
};


export const education = {
  degree: "B.Sc. Mathematics",
  institution: "Federal University of Agriculture, Abeokuta",
  description: "A mathematics degree taught me to break problems into provable steps before writing any code. That same discipline — structure first, then execution — shapes how I approach frontend architecture, state management, and debugging."
};

export const fellowship = {
  name: "Learn2Earn AI Software Engineering Fellowship",
  cohort: "Cohort 2",
  duration: "24 months (July 2026 – 2028)",
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
    role: "Sole Developer — Full-Stack",
    problem: "Nigerian graduates send one generic CV to every role — Sales, Tech, Admin, Graduate Trainee programs. Global tools like Teal and Resume Worded don't understand NYSC, GTBank's 2:1 requirement, or Lagos private sector CV conventions.",
    execution: "Built a two-phase Gemini AI pipeline: Phase 1 extracts verified CV facts, Phase 2 generates tailored rewrites and strategy. SSE streaming shows real results in ~15 seconds. Handles Canva CVs via multimodal PDF extraction. Click-to-edit inline CV editor with live PDF sync.",
    result: "Launched April 13, 2026. Got organic traction on day one — real users sharing it in WhatsApp groups unprompted. No marketing spend. On hold — active development resumes post-fellowship.",
    tech: ["Go", "React", "TypeScript", "Tailwind CSS", "Gemini API", "Supabase"],
    image: "/nextrole-ng.mp4",
    link: "https://nextroleng.tech",
    github: 'https://github.com/maadan-dev/nextrole-ng-frontend',
    featured: true,
    highlights: [
      "Two-phase AI pipeline separating fact extraction from generation to prevent hallucination",
      "Role-specific prompt modules for 10 Nigerian job categories with hard-coded institutional knowledge",
      "ATS-readable PDF generation with inline click-to-edit fields"
    ]
  },
  {
    title: "Executive Persona — segunalabi.me",
    role: "Frontend Developer (Repeat Client)",
    problem: "Build an authoritative digital presence for a diplomatic executive and MD of Davidorlah Nigeria Limited.",
    execution: "Designed and implemented a clean design system focusing on typography, whitespace, and high-performance load times. Contracted again for updates — second engagement with the same client.",
    result: "Established a commanding web presence, optimized for both desktop and mobile viewing with zero layout shift.",
    tech: ["React", "JavaScript", "Tailwind CSS"],
    image: "/images/segunalabi.webp",
    link: "https://segunalabi.me"
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
    title: "Jaytee Fayemi Foundation",
    role: "Web Developer (Contract)",
    problem: "A nonprofit foundation needed a professional web presence that clearly communicated their mission, values, and programs to donors and beneficiaries.",
    execution: "Built a 5-page responsive website with clear information architecture, donation CTAs, and a visual identity that reflects the foundation's work in community development.",
    result: "Client said the work was 'visually appealing, top-notch, and exceeded expectations.' The site launched and serves as the foundation's primary public-facing platform.",
    tech: ["WordPress", "CSS"],
    image: "/images/JTFfoundation.webp"
  }
];

export const skillCategories: SkillCategory[] = [
  {
    title: "Core Languages",
    skills: ["JavaScript (ES6+)", "TypeScript", "HTML5/CSS3"]
  },
  {
    title: "Frameworks & Tools",
    skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion"]
  },
  {
    title: "Backend & Infrastructure",
    skills: ["Go", "Supabase", "REST APIs", "Vercel"]
  },
  {
    title: "AI & Workflows",
    skills: ["Gemini API", "Prompt Engineering", "Git/GitHub"]
  }
];
