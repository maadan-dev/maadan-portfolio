"use client";

import { useState, useEffect, useRef } from 'react';
import { personalInfo, projects, skillCategories } from '../../data/content';

// Unified structured data for experience, education, certifications, and additional notes
const experienceData = [
  {
    role: "Contract Frontend Developer",
    company: "Self-Employed",
    duration: "May 2023 – Dec 2025",
    tags: ["react", "typescript", "javascript", "framer-motion", "tailwind-css", "figma", "chrome-devtools", "rest-apis"],
    category: "frontend",
    bullets: [
      "Delivered production React/TypeScript interfaces for paying clients across travel, non-profit, and executive persona verticals — including ATEKER Luxury Safaris (Canada) and a diplomatic executive's digital platform (segunalabi.me).",
      "Built interactive UI components with Framer Motion; enforced strict TypeScript typing across API boundaries; developed dev-mode fallbacks to maintain build velocity.",
      "Managed full project cycles independently — scoping, building, testing, and deploying without institutional support."
    ]
  }
];

const educationData = [
  {
    role: "AI Engineering Fellowship",
    company: "Learn2Earn · Cohort 2",
    duration: "June 2026 (incoming)",
    tags: ["learn2earn"],
    category: "ai go",
    description: "Tuition-free, 24-month systems and AI software engineering program founded by Iyinoluwa Aboyeji (Andela, Flutterwave). Selected through a highly competitive assessment process from ~4,000 Lagos applicants. Located in Yaba, Lagos."
  },
  {
    role: "01-edu Piscine",
    company: "Learn2Earn",
    duration: "March 2026",
    tags: ["go", "learn2earn", "unix-shell"],
    category: "go",
    description: "Intensive 4-week systems programming bootcamp focusing on Go, data structures, algorithms, and Unix shell environment. Deep peer-to-peer collaboration and test-driven development."
  },
  {
    role: "B.Sc. Mathematics",
    company: "Federal University of Agriculture, Abeokuta (FUNAAB)",
    duration: "2019 – 2024",
    tags: ["mathematics"],
    category: "go",
    description: "Mathematics background trains a structured, logic-driven approach to architectural decisions, debugging, complex logic state modeling, and problem decomposition."
  }
];

const certifications = [
  { name: "Responsive Web Design", issuer: "freeCodeCamp", date: "June 2022", category: "frontend" },
  { name: "NYSC Discharge Certificate", issuer: "National Youth Service Corps", date: "2025", category: "go" }
];

const additionalInfo = [
  "Self-taught developer — built real client projects from scratch without formal CS training or bootcamp support prior to Learn2Earn.",
  "Mathematics background informs structured debugging, algorithm analysis, and state machine architecture."
];

export function ResumeClient() {
  // 1. States
  const [activeFilter, setActiveFilter] = useState<'all' | 'ai' | 'go' | 'frontend'>('all');
  const [activeTagKey, setActiveTagKey] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastOpen, setToastOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<Array<{ type: string; text: string }>>([
    { type: 'welcome', text: "Welcome to Abdulyekeen Maadan's Interactive CLI Resume (v1.1.0)" },
    { type: 'hint', text: 'Type "help" to view available commands. Press Esc or backtick (`) to close.' }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // 2. Refs
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);

  // 3. Effects
  // Scroll terminal to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalOutput]);

  // Global Keyboard listener for terminal toggle (` / Esc)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`') {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        setTerminalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus terminal input when opened
  useEffect(() => {
    if (terminalOpen && terminalInputRef.current) {
      terminalInputRef.current.focus();
    }
  }, [terminalOpen]);

  const toggleTerminal = () => {
    setTerminalOpen(prev => !prev);
  };

  // 4. Tech tag normalizer
  const getTagKey = (techName: string) => {
    if (!techName) return '';
    const name = techName.toLowerCase().trim();
    if (name.includes('typescript')) return 'typescript';
    if (name.includes('javascript') || name.includes('es6+')) return 'javascript';
    if (name === 'go' || name.includes('go (net') || name.includes('go,')) return 'go';
    if (name.includes('react')) return 'react';
    if (name.includes('tailwind')) return 'tailwind-css';
    if (name.includes('gemini')) return 'gemini-api';
    if (name.includes('supabase')) return 'supabase';
    if (name.includes('railway')) return 'railway';
    if (name.includes('vercel')) return 'vercel';
    if (name.includes('framer') || name.includes('motion')) return 'framer-motion';
    if (name.includes('sse') || name.includes('streaming')) return 'sse-streaming';
    if (name.includes('learn2earn') || name.includes('fellowship')) return 'learn2earn';
    if (name.includes('math')) return 'mathematics';
    return name.replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  // 5. Mouse coordinated spotlight tracking
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  // 6. Copy-to-Clipboard handler
  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(text).then(() => {
      setCopiedEmail(true);
      setToastMsg(`Copied: ${text}`);
      setToastOpen(true);
      setTimeout(() => {
        setCopiedEmail(false);
        setToastOpen(false);
      }, 2500);
    });
  };

  // 7. Interactive Tag Highlights toggler
  const handleTagClick = (e: React.MouseEvent, rawTech: string) => {
    e.stopPropagation();
    const key = getTagKey(rawTech);
    if (!key) return;

    if (activeTagKey === key) {
      setActiveTagKey(null);
    } else {
      setActiveTagKey(key);
    }
  };

  // 8. Terminal Command Interpreter
  const handleCommandSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const inputVal = terminalInput.trim();
      setTerminalInput('');
      
      if (!inputVal) return;

      setCommandHistory(prev => [...prev, inputVal]);
      setHistoryIndex(-1);

      // Append echo
      setTerminalOutput(prev => [...prev, { type: 'prompt', text: `guest@maadan.dev:~$ ${inputVal}` }]);

      const cleanCmd = inputVal.toLowerCase().trim();
      switch (cleanCmd) {
        case 'help':
          setTerminalOutput(prev => [...prev, {
            type: 'info',
            text: 'Available Commands:\n  about       - Brief developer overview\n  projects    - Showcase product launches & stack\n  experience  - Software contractor vertically shipped\n  skills      - Tech stack categorized lists\n  education   - Fellowship & B.Sc Mathematics\n  download    - Download PDF resume copy\n  clear       - Clean terminal screen\n  close       - Hide terminal drawer'
          }]);
          break;

        case 'about':
        case 'summary':
          setTerminalOutput(prev => [...prev, {
            type: 'success',
            text: 'Abdulyekeen Maadan · Software Developer\nLagos-based developer with a Mathematics background and 2+ years delivering production client applications across the full frontend stack (React, TypeScript, Go).\nIncoming Fellow at the Learn2Earn AI Fellowship (Cohort 2), selected from ~4,000 applicants.'
          }]);
          break;

        case 'projects':
          setTerminalOutput(prev => [...prev, {
            type: 'success',
            text: 'NextRole NG — Full-Stack AI CV Optimisation Tool (nextroleng.tech)\n• Built a two-phase Gemini AI pipeline for tailored CV fact extractions and categories re-writing.\n• Designed SSE streaming pipelines for real-time extraction (~15s) with multimodal PDF extraction.\n• Stack: Go, React, TypeScript, Tailwind, Gemini API, Supabase, Railway, Vercel.'
          }]);
          break;

        case 'experience':
          setTerminalOutput(prev => [...prev, {
            type: 'success',
            text: 'Contract Frontend Developer — Self-Employed (May 2023 - Dec 2025)\n• Shipped high-performance React/TypeScript applications vertically for paying international clients (ATEKER Luxury Safaris, segunalabi.me).\n• Implemented interactive visual transitions using Framer Motion and typed API boundaries.'
          }]);
          break;

        case 'skills':
          setTerminalOutput(prev => [...prev, {
            type: 'info',
            text: 'Languages: TypeScript, JavaScript, Go, HTML5, CSS3\nFrameworks: React, Vite, Tailwind CSS, Framer Motion\nBackend & DB: Go (net/http), Supabase (PostgreSQL), REST, SSE Streaming\nAI & Workflows: Gemini API, Prompt Engineering, Git, Vercel, Railway'
          }]);
          break;

        case 'education':
          setTerminalOutput(prev => [...prev, {
            type: 'info',
            text: '• AI Engineering Fellowship | Learn2Earn (Cohort 2, Incoming)\n• 01-edu Piscine | Learn2Earn (March 2026 boot camp in Go & Unix shell)\n• B.Sc. Mathematics | FUNAAB (2019 - 2024)'
          }]);
          break;

        case 'download':
          setTerminalOutput(prev => [...prev, { type: 'info', text: 'Downloading PDF Resume...' }]);
          if (typeof window !== 'undefined') {
            const a = document.createElement('a');
            a.href = '/resume/Abdulyekeen_Maadan_Resume.pdf';
            a.download = 'Abdulyekeen_Maadan_Resume.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          }
          break;

        case 'clear':
          setTerminalOutput([]);
          break;

        case 'close':
          setTerminalOpen(false);
          break;

        default:
          setTerminalOutput(prev => [...prev, { type: 'error', text: `Command not found: "${inputVal}". Type "help" to view valid commands.` }]);
          break;
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        let newIdx = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIdx);
        setTerminalInput(commandHistory[newIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex !== -1) {
        let newIdx = historyIndex + 1;
        if (newIdx >= commandHistory.length) {
          setHistoryIndex(-1);
          setTerminalInput('');
        } else {
          setHistoryIndex(newIdx);
          setTerminalInput(commandHistory[newIdx]);
        }
      }
    }
  };

  // 9. Filtering logic lists
  const resumeProjects = projects.map(proj => {
    if (proj.title === 'NextRole NG') {
      return {
        ...proj,
        category: 'ai go frontend',
        tags: ['go', 'react', 'typescript', 'tailwind-css', 'gemini-api', 'supabase', 'railway', 'vercel', 'sse-streaming'],
        bullets: [
          "Built a two-phase Gemini AI pipeline: Phase 1 extracts verified CV facts, Phase 2 generates tailored rewrites per Nigerian job category — reducing hallucination and improving output reliability.",
          "Implemented SSE streaming for real-time results (~15 seconds), with multimodal PDF extraction handling Canva-formatted CVs.",
          "Built role-specific prompt modules for 10 Nigerian job categories with hard-coded institutional knowledge of the local hiring market.",
          "Gained organic traction within the first week — users sharing the tool in WhatsApp groups unprompted with zero marketing spend."
        ]
      };
    }
    let cat = 'frontend';
    if (proj.title.includes('Safaris')) cat = 'frontend';
    else if (proj.title.includes('Persona')) cat = 'frontend';
    const tags = proj.tech.map(t => getTagKey(t));
    return {
      ...proj,
      category: cat,
      tags: tags,
      bullets: proj.highlights || [proj.execution, proj.result]
    };
  });

  const filteredProjects = resumeProjects.filter(p => activeFilter === 'all' || p.category.split(' ').includes(activeFilter));
  const filteredExperience = experienceData.filter(e => activeFilter === 'all' || e.category.split(' ').includes(activeFilter));
  const filteredEducation = educationData.filter(ed => activeFilter === 'all' || ed.category.split(' ').includes(activeFilter));
  const filteredCertifications = certifications.filter(c => activeFilter === 'all' || c.category === activeFilter || activeFilter === 'go');

  return (
    <div className="relative min-h-screen pt-32 pb-24 px-6 md:px-12 bg-background select-none">
      {/* Toast Notification */}
      <div 
        className={`fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-2xl z-50 transition-all duration-300 transform ${
          toastOpen ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
        }`}
        role="alert"
      >
        {toastMsg}
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-12 lg:gap-24 relative">
        {/* Sidebar Left Pane */}
        <aside className="lg:sticky lg:top-32 h-fit flex flex-col gap-10">
          {/* Profile Photo */}
          <div className="relative w-36 h-36">
            <img 
              src="/images/profile.webp" 
              alt="Abdulyekeen Maadan" 
              className="w-full h-full rounded-[28px] object-cover border-2 border-border shadow-2xl transition-all duration-300 hover:border-accent hover:scale-[1.02] hover:shadow-accent/15" 
            />
            <div 
              className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-[3.5px] border-[#050505] shadow-[0_0_10px_rgba(16,185,129,0.6)] animate-pulse" 
              title="Available for Contracts & Remote Roles" 
            />
          </div>

          {/* Download Button */}
          <div>
            <a 
              href="/resume/Abdulyekeen_Maadan_Resume.pdf" 
              className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-text-primary text-[10px] font-semibold tracking-wider uppercase hover:bg-text-primary hover:text-[#050505] hover:border-text-primary hover:-translate-y-0.5 hover:shadow-white/10 transition-all duration-300"
              download="Abdulyekeen_Maadan_Resume.pdf"
            >
              <svg className="w-3.5 h-3.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
              <span>Download PDF Resume</span>
            </a>
          </div>

          {/* Tagline Info */}
          <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary/50">
            &middot; Resume &middot; Software Developer &middot; Lagos, Nigeria
          </div>

          {/* Header Name */}
          <div className="flex flex-col gap-3">
            <h1 className="font-display font-bold text-[2.75rem] leading-[1.1] tracking-tighter uppercase flex flex-col">
              <span className="text-text-primary">Abdulyekeen</span>
              <span className="bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">Maadan</span>
            </h1>
            <p className="text-xs text-text-secondary leading-relaxed font-light">
              React &middot; TypeScript &middot; Go &middot; AI-Augmented Development
            </p>
          </div>

          {/* Contacts info card */}
          <section className="bg-surface/30 border border-border/80 rounded-2xl p-6 backdrop-blur-md flex flex-col gap-4 shadow-xl hover:border-border transition-colors">
            {[
              { label: 'Email', value: personalInfo.email, link: `mailto:${personalInfo.email}` },
              { label: 'Website', value: 'maadan.dev', link: 'https://maadan.dev' },
              { label: 'GitHub', value: 'github.com/maadan-dev', link: 'https://github.com/maadan-dev' },
              { label: 'LinkedIn', value: 'linkedin.com/in/abdulyekeenmaadan', link: 'https://linkedin.com/in/abdulyekeenmaadan' }
            ].map(contact => (
              <div key={contact.label} className="flex flex-col gap-1">
                <span className="font-mono text-[9px] uppercase tracking-wider text-text-secondary/40">{contact.label}</span>
                <div className="flex items-center justify-between gap-4">
                  <a href={contact.link} target={contact.label !== 'Email' ? "_blank" : undefined} rel="noopener noreferrer" className="text-[13px] font-medium text-text-primary hover:text-accent hover:underline hover:underline-offset-4 transition-all overflow-hidden text-overflow-ellipsis whitespace-nowrap">
                    {contact.value}
                  </a>
                  <button 
                    onClick={(e) => handleCopy(e, contact.value)} 
                    className="p-1.5 rounded-lg border border-transparent text-text-secondary/40 hover:text-text-primary hover:bg-white/5 hover:border-border transition-all"
                    title={`Copy ${contact.label}`}
                  >
                    {copiedEmail && toastMsg.includes(contact.value) ? (
                      <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </section>

          <p className="hidden lg:block text-[11px] text-text-secondary/30 italic">
            Tips: Click tags to highlight matching skills, or press ` to toggle the CLI.
          </p>
        </aside>

        {/* Right Pane Scroll Area */}
        <main className="flex flex-col gap-12">
          {/* CLI Terminal trigger and window */}
          <section className="flex flex-col gap-4 w-full">
            <div className="flex">
              <button 
                onClick={toggleTerminal}
                className="inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-xl bg-surface/40 border border-border text-xs font-semibold text-text-secondary hover:border-accent hover:text-text-primary hover:bg-accent/5 hover:scale-[0.99] transition-all duration-300"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981] animate-pulse" />
                <span>Open Interactive CLI Terminal</span>
                <kbd className="bg-white/5 border border-white/10 rounded px-1.5 py-0.5 text-[9px] font-mono text-text-secondary/50">`</kbd>
              </button>
            </div>

            {/* CLI Terminal emulator */}
            <div 
              className={`rounded-2xl bg-zinc-950/95 border border-border shadow-2xl overflow-hidden flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                terminalOpen ? 'max-h-[420px] min-h-[280px] opacity-100 border-accent/20' : 'max-h-0 min-h-0 opacity-0 border-transparent pointer-events-none'
              }`}
            >
              <div className="bg-zinc-900/50 border-b border-border/80 px-4 py-2.5 flex items-center justify-between">
                <div className="flex gap-2">
                  <span onClick={toggleTerminal} className="w-3 h-3 rounded-full bg-rose-500 cursor-pointer hover:bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                </div>
                <span className="font-mono text-[10px] text-text-secondary/40">guest@maadan.dev: ~ (cli-resume)</span>
                <button onClick={toggleTerminal} className="text-text-secondary/50 hover:text-text-primary font-mono text-xs">&times;</button>
              </div>
              <div className="p-5 flex-grow overflow-y-auto font-mono text-xs text-zinc-300 flex flex-col gap-3" id="terminal-body" onClick={() => terminalInputRef.current?.focus()}>
                <div className="flex flex-col gap-1.5">
                  {terminalOutput.map((line, idx) => (
                    <div key={idx} className="flex flex-col gap-0.5">
                      {line.text.split('\n').map((subLine, sIdx) => (
                        <p 
                          key={sIdx} 
                          className={
                            line.type === 'prompt' ? 'text-amber-500 font-medium' :
                            line.type === 'success' ? 'text-emerald-400' :
                            line.type === 'info' ? 'text-blue-400' :
                            line.type === 'error' ? 'text-rose-500' :
                            'text-zinc-300'
                          }
                        >
                          {subLine}
                        </p>
                      ))}
                    </div>
                  ))}
                  <div ref={terminalEndRef} />
                </div>
                
                <div className="flex items-center gap-2 mt-auto pt-3 border-t border-border/30">
                  <span className="text-emerald-400 font-semibold">guest@maadan.dev:~$</span>
                  <input 
                    ref={terminalInputRef}
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={handleCommandSubmit}
                    className="bg-transparent border-none outline-none text-white font-mono text-xs flex-grow w-full"
                    autoComplete="off"
                    spellCheck="false"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Quick Filters Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-surface/30 border border-border/80 p-3 px-5 rounded-2xl backdrop-blur-md">
            <span className="font-mono text-[10px] uppercase text-text-secondary/40 tracking-wider">Filter View:</span>
            <div className="flex gap-2 flex-wrap">
              {(['all', 'ai', 'go', 'frontend'] as const).map(filter => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setActiveTagKey(null); // Clear tag selection when changing categories
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wide border transition-all ${
                    activeFilter === filter
                      ? 'bg-accent/10 text-accent border-accent/25'
                      : 'bg-transparent text-text-secondary border-transparent hover:text-text-primary hover:bg-white/5'
                  }`}
                >
                  {filter === 'all' ? 'ALL' : filter === 'ai' ? 'AI / LLM' : filter === 'go' ? 'GO & BACKEND' : 'FRONTEND'}
                </button>
              ))}
            </div>
          </div>

          {/* Summary Section */}
          <section className="flex flex-col gap-6" id="summary">
            <h2 className="font-display font-semibold text-lg uppercase tracking-wider text-text-primary flex items-center gap-4">
              <span>Summary</span>
              <span className="h-[1px] bg-border/50 flex-grow" />
            </h2>
            <p className="text-[15px] text-text-secondary leading-relaxed font-light">
              Software developer with a Mathematics background and 2+ years delivering production applications for real clients. 
              Ships across the full frontend stack &mdash; <strong onClick={(e) => handleTagClick(e, 'react')} className={`font-semibold cursor-pointer border-b border-dashed border-white/20 hover:text-accent hover:border-accent transition-colors ${activeTagKey === 'react' ? 'bg-accent/10 text-accent border-accent/40 px-1 rounded' : ''}`}>React</strong>,{' '}
              <strong onClick={(e) => handleTagClick(e, 'typescript')} className={`font-semibold cursor-pointer border-b border-dashed border-white/20 hover:text-accent hover:border-accent transition-colors ${activeTagKey === 'typescript' ? 'bg-accent/10 text-accent border-accent/40 px-1 rounded' : ''}`}>TypeScript</strong>,{' '}
              <strong onClick={(e) => handleTagClick(e, 'go')} className={`font-semibold cursor-pointer border-b border-dashed border-white/20 hover:text-accent hover:border-accent transition-colors ${activeTagKey === 'go' ? 'bg-accent/10 text-accent border-accent/40 px-1 rounded' : ''}`}>Go</strong> &mdash; and builds AI-augmented products using{' '}
              <strong onClick={(e) => handleTagClick(e, 'gemini-api')} className={`font-semibold cursor-pointer border-b border-dashed border-white/20 hover:text-accent hover:border-accent transition-colors ${activeTagKey === 'gemini-api' ? 'bg-accent/10 text-accent border-accent/40 px-1 rounded' : ''}`}>Gemini</strong> and{' '}
              <strong onClick={(e) => handleTagClick(e, 'sse-streaming')} className={`font-semibold cursor-pointer border-b border-dashed border-white/20 hover:text-accent hover:border-accent transition-colors ${activeTagKey === 'sse-streaming' ? 'bg-accent/10 text-accent border-accent/40 px-1 rounded' : ''}`}>SSE streaming</strong> pipelines. Selected from ~4,000 Lagos applicants for the{' '}
              <strong onClick={(e) => handleTagClick(e, 'learn2earn')} className={`font-semibold cursor-pointer border-b border-dashed border-white/20 hover:text-accent hover:border-accent transition-colors ${activeTagKey === 'learn2earn' ? 'bg-accent/10 text-accent border-accent/40 px-1 rounded' : ''}`}>Learn2Earn AI Engineering Fellowship</strong> (Cohort 2, 2026&ndash;2028).
            </p>
          </section>

          {/* Projects Section */}
          <section className="flex flex-col gap-6" id="projects">
            <h2 className="font-display font-semibold text-lg uppercase tracking-wider text-text-primary flex items-center gap-4">
              <span>Projects</span>
              <span className="h-[1px] bg-border/50 flex-grow" />
            </h2>
            <div className="flex flex-col gap-8">
              {filteredProjects.map(proj => {
                const isTagMatch = activeTagKey && proj.tags.includes(activeTagKey);
                return (
                  <article 
                    key={proj.title}
                    onMouseMove={handleMouseMove}
                    className={`relative bg-surface/30 border border-border/80 rounded-3xl p-8 backdrop-blur-md flex flex-col gap-6 transition-all duration-500 overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-[radial-gradient(800px_circle_at_var(--mouse-x,0)_var(--mouse-y,0),rgba(255,255,255,0.025),transparent_40%)] before:z-1 before:pointer-events-none before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-500 hover:-translate-y-1 hover:border-border-hover hover:shadow-2xl ${
                      isTagMatch ? 'border-accent shadow-[0_0_20px_rgba(59,130,246,0.1)]' : ''
                    }`}
                  >
                    <header className="flex justify-between items-start gap-4 relative z-10">
                      <div>
                        <h3 className="font-display font-bold text-xl tracking-tight text-text-primary flex flex-col gap-1">
                          {proj.title}
                          <span className="font-sans text-xs font-normal text-text-secondary">{proj.problem}</span>
                        </h3>
                        <span className="font-mono text-[9px] uppercase tracking-wider text-accent mt-2 block">{proj.role}</span>
                      </div>
                      {proj.link && (
                        <a href={proj.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-border text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-white/10 transition-colors">
                          <span>Live</span>
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                          </svg>
                        </a>
                      )}
                    </header>

                    <div className="relative z-10">
                      <ul className="flex flex-col gap-2.5">
                        {proj.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="text-sm text-text-secondary pl-5 relative leading-relaxed font-light">
                            <span className="absolute left-0 text-accent font-semibold">—</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <footer className="border-t border-border/40 pt-4 relative z-10">
                      <div className="flex flex-wrap gap-2">
                        {proj.tech.map(t => {
                          const tagKey = getTagKey(t);
                          const isActive = activeTagKey === tagKey;
                          return (
                            <span 
                              key={t} 
                              onClick={(e) => handleTagClick(e, t)}
                              className={`font-mono text-[10px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer select-none ${
                                isActive 
                                  ? 'bg-accent text-white border-accent shadow-[0_0_12px_rgba(59,130,246,0.4)]'
                                  : 'bg-white/2 border-border text-text-secondary hover:text-accent hover:border-accent hover:bg-accent/5'
                              }`}
                            >
                              {t}
                            </span>
                          );
                        })}
                      </div>
                    </footer>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Experience Section */}
          <section className="flex flex-col gap-6" id="experience">
            <h2 className="font-display font-semibold text-lg uppercase tracking-wider text-text-primary flex items-center gap-4">
              <span>Experience</span>
              <span className="h-[1px] bg-border/50 flex-grow" />
            </h2>
            <div className="flex flex-col relative pl-6 border-l border-border/80">
              {filteredExperience.map(exp => {
                const isTagMatch = activeTagKey && exp.tags.includes(activeTagKey);
                return (
                  <article 
                    key={exp.role} 
                    className={`relative pb-8 last:pb-0 transition-all duration-300 group ${
                      isTagMatch ? 'border-l-2 border-accent-purple bg-accent-purple/5 pl-4 rounded-r-xl' : ''
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className={`absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#050505] transition-all duration-300 ${
                      isTagMatch ? 'bg-purple-500 scale-125 shadow-[0_0_10px_rgba(139,92,246,0.6)]' : 'bg-border group-hover:scale-125 group-hover:bg-purple-500'
                    }`} />
                    
                    <header className="flex justify-between items-start gap-4 mb-3">
                      <div>
                        <h3 className="font-display font-bold text-base text-text-primary group-hover:text-accent transition-colors">{exp.role}</h3>
                        <span className="text-xs text-text-secondary font-medium">{exp.company}</span>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-text-secondary/40 border border-border px-2 py-1 rounded-md bg-white/2">
                        {exp.duration}
                      </span>
                    </header>
                    
                    <div className="timeline-body">
                      <ul className="flex flex-col gap-2">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="text-sm text-text-secondary pl-4 relative leading-relaxed font-light">
                            <span className="absolute left-0 text-purple-400">•</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Skills Section */}
          <section className="flex flex-col gap-6" id="skills">
            <h2 className="font-display font-semibold text-lg uppercase tracking-wider text-text-primary flex items-center gap-4">
              <span>Skills</span>
              <span className="h-[1px] bg-border/50 flex-grow" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skillCategories.map(cat => {
                // Determine if category belongs to active category filter
                const isCategoryActive = activeFilter === 'all' || 
                  (activeFilter === 'frontend' && cat.title.includes('Frameworks') || cat.title.includes('Core')) ||
                  (activeFilter === 'go' && cat.title.includes('Backend') || cat.title.includes('Core')) ||
                  (activeFilter === 'ai' && cat.title.includes('AI'));
                
                return (
                  <div 
                    key={cat.title} 
                    className={`bg-surface/30 border border-border/80 rounded-2xl p-6 backdrop-blur-md flex flex-col gap-4 hover:border-border transition-colors ${
                      isCategoryActive ? 'opacity-100' : 'opacity-40'
                    }`}
                  >
                    <h3 className="font-display font-semibold text-sm text-text-primary border-b border-border/50 pb-2">{cat.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map(skill => {
                        const tagKey = getTagKey(skill);
                        const isActive = activeTagKey === tagKey;
                        return (
                          <span 
                            key={skill}
                            onClick={(e) => handleTagClick(e, skill)}
                            className={`font-mono text-[10px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer select-none ${
                              isActive 
                                ? 'bg-accent text-white border-accent shadow-[0_0_12px_rgba(59,130,246,0.4)]'
                                : 'bg-white/2 border-border text-text-secondary hover:text-accent hover:border-accent hover:bg-accent/5'
                            }`}
                          >
                            {skill}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Education Section */}
          <section className="flex flex-col gap-6" id="education">
            <h2 className="font-display font-semibold text-lg uppercase tracking-wider text-text-primary flex items-center gap-4">
              <span>Education</span>
              <span className="h-[1px] bg-border/50 flex-grow" />
            </h2>
            <div className="flex flex-col relative pl-6 border-l border-border/80">
              {filteredEducation.map(ed => {
                const isTagMatch = activeTagKey && ed.tags.includes(activeTagKey);
                const isPulse = ed.role.includes("Fellowship");
                return (
                  <article 
                    key={ed.role} 
                    className={`relative pb-8 last:pb-0 transition-all duration-300 group ${
                      isTagMatch ? 'bg-accent/5 pl-4 rounded-r-xl border-l-2 border-accent' : ''
                    }`}
                  >
                    {/* Timeline dot */}
                    <div className={`absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-[#050505] transition-all duration-300 ${
                      isPulse ? 'bg-accent animate-pulse scale-105 shadow-[0_0_8px_rgba(59,130,246,0.8)]' : 
                      isTagMatch ? 'bg-accent scale-125 shadow-[0_0_10px_rgba(59,130,246,0.6)]' : 'bg-border group-hover:scale-125 group-hover:bg-accent'
                    }`} />
                    
                    <header className="flex justify-between items-start gap-4 mb-2">
                      <div>
                        <h3 className="font-display font-bold text-base text-text-primary group-hover:text-accent transition-colors">{ed.role}</h3>
                        <span className="text-xs text-text-secondary font-medium">{ed.company}</span>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-wider text-text-secondary/40 border border-border px-2 py-1 rounded-md bg-white/2">
                        {ed.duration}
                      </span>
                    </header>
                    <p className="text-sm text-text-secondary font-light leading-relaxed">{ed.description}</p>
                  </article>
                );
              })}
            </div>
          </section>

          {/* Certifications Section */}
          <section className="flex flex-col gap-6" id="certifications">
            <h2 className="font-display font-semibold text-lg uppercase tracking-wider text-text-primary flex items-center gap-4">
              <span>Certifications &amp; Details</span>
              <span className="h-[1px] bg-border/50 flex-grow" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Certifications Card */}
              <div className="bg-surface/30 border border-border/80 rounded-2xl p-6 backdrop-blur-md flex flex-col gap-4 hover:border-border transition-colors">
                <h3 className="font-display font-semibold text-sm text-text-primary border-b border-border/50 pb-2">Certifications</h3>
                <ul className="flex flex-col gap-4">
                  {filteredCertifications.map(cert => (
                    <li key={cert.name} className="flex flex-col gap-0.5">
                      <strong className="text-sm text-text-primary font-medium">{cert.name}</strong>
                      <span className="font-mono text-[10px] text-text-secondary/40">{cert.issuer} &middot; {cert.date}</span>
                    </li>
                  ))}
                  {filteredCertifications.length === 0 && (
                    <p className="text-xs text-text-secondary/40 italic">Filtered out by current view.</p>
                  )}
                </ul>
              </div>

              {/* Additional Card */}
              <div className="bg-surface/30 border border-border/80 rounded-2xl p-6 backdrop-blur-md flex flex-col gap-4 hover:border-border transition-colors">
                <h3 className="font-display font-semibold text-sm text-text-primary border-b border-border/50 pb-2">Additional Info</h3>
                <ul className="flex flex-col gap-3">
                  {additionalInfo.map((info, idx) => (
                    <li key={idx} className="text-sm text-text-secondary leading-relaxed font-light">
                      {info}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Small details Actively Maintained Timestamp */}
          <div className="text-right text-[10px] font-mono text-text-secondary/20 pt-6">
            Last updated: June 2026
          </div>
        </main>
      </div>
    </div>
  );
}
