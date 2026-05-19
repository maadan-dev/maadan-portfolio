import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { personalInfo } from '../../data/content';
import emailjs from '@emailjs/browser';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';

const ACCENT = '#3b82f6';
const AR = '59,130,246';
const E = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  { id: 'email', label: 'Email', value: personalInfo.email, action: 'copy' as const },
  { id: 'github', label: 'GitHub', value: 'github.com/maadan-dev', href: personalInfo.github },
  { id: 'linkedin', label: 'LinkedIn', value: 'linkedin.com/in/abdulyekeenmaadan', href: personalInfo.linkedin },
  { id: 'twitter', label: 'Twitter / X', value: 'x.com/maadan_dev', href: personalInfo.twitter },
];

function CopyToast({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div key="t" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.28 }} style={{ position: 'fixed', top: 28, left: '50%', transform: 'translateX(-50%)', zIndex: 9999, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 18px', borderRadius: 8, background: 'rgba(5,5,5,0.96)', border: `1px solid rgba(${AR},0.3)`, boxShadow: `0 8px 32px rgba(0,0,0,0.5)`, pointerEvents: 'none' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6.5" stroke={ACCENT} strokeWidth="1" /><path d="M4 7l2 2 4-4" stroke={ACCENT} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <span style={{ fontSize: 12, color: 'rgba(250,250,250,0.85)', letterSpacing: '0.06em' }}>Copied to clipboard</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ContactLink({ link, index, onCopy }: { link: typeof LINKS[0]; index: number; onCopy: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleClick = useCallback(() => {
    if (link.action === 'copy') {
      navigator.clipboard.writeText(personalInfo.email).then(() => { setCopied(true); onCopy(); setTimeout(() => setCopied(false), 2200); });
    } else if ('href' in link && link.href) {
      window.open(link.href, '_blank', 'noopener,noreferrer');
    }
  }, [link, onCopy]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: E as any }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      className="cursor-pointer select-none"
      data-hover
    >
      <div className="flex items-center gap-6 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: '0.20em', color: `rgba(${AR},0.35)`, minWidth: 28 }}>0{index + 1}</span>
        <motion.span animate={{ color: hovered ? '#FFF' : 'rgba(250,250,250,0.5)', x: hovered ? 6 : 0 }} transition={{ duration: 0.22 }} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(1.4rem,3vw,2.5rem)', letterSpacing: '0.02em', textTransform: 'uppercase', lineHeight: 1, flex: 1 }}>
          {link.label}
        </motion.span>
        <motion.span animate={{ color: copied ? ACCENT : hovered ? 'rgba(250,250,250,0.5)' : 'rgba(250,250,250,0.18)' }} className="hidden md:block" style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 300, fontSize: 'clamp(0.65rem,1vw,0.80rem)', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>
          {link.action === 'copy' && copied ? 'Copied ✓' : link.value}
        </motion.span>
        <motion.span animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }} style={{ color: ACCENT, fontSize: '1rem', flexShrink: 0 }}>↗</motion.span>
      </div>
    </motion.div>
  );
}

export function ContactSection() {
  const formRef = useRef<HTMLFormElement>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const showToast = useCallback(() => {
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 2200);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setStatus('sending');
    try {
      await emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE_ID, import.meta.env.VITE_EMAILJS_TEMPLATE_ID, formRef.current, import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      console.error('EmailJS Error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const inputStyle: React.CSSProperties = { width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 6, padding: '12px 16px', color: 'rgba(250,250,250,0.85)', fontSize: 14, outline: 'none', transition: 'border-color 0.2s ease' };
  const labelStyle: React.CSSProperties = { fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 500, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(250,250,250,0.35)', marginLeft: 2 };

  return (
    <>
      <CopyToast visible={toastVisible} />
      <section id="contact" className="relative" style={{ background: '#050505', borderTop: '1px solid rgba(255,255,255,0.04)', overflow: 'hidden' }}>
        {/* Ambient glow */}
        <div className="absolute pointer-events-none" style={{ width: 900, height: 900, left: '50%', top: '50%', transform: 'translate(-50%,-50%)', borderRadius: '50%', background: `radial-gradient(circle,rgba(${AR},0.10) 0%,transparent 60%)`, filter: 'blur(100px)' }} />

        {/* Ghost "HELLO." */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" style={{ zIndex: 1 }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(15vw,20vw,25vw)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 1, color: 'transparent', WebkitTextStroke: '1px rgba(250,250,250,0.04)' }}>HELLO.</span>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', padding: 'clamp(64px,12vh,120px) clamp(24px,5vw,80px)', position: 'relative', zIndex: 2 }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: links */}
            <div className="flex flex-col gap-8">
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="flex items-center gap-4">
                <div style={{ width: 24, height: 1, background: ACCENT, opacity: 0.5 }} />
                <span style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 400, fontSize: 10, letterSpacing: '0.32em', textTransform: 'uppercase', color: `rgba(${AR},0.55)` }}>03 / Contact</span>
              </motion.div>

              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: E as any }} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: 'clamp(2.5rem,7vw,5rem)', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 0.92, color: 'rgba(250,250,250,0.95)', margin: 0 }}>
                Let's build<br /><span style={{ color: ACCENT }}>something</span><br />that matters.
              </motion.h2>

              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ fontFamily: "'Barlow',sans-serif", fontWeight: 300, fontSize: 'clamp(0.85rem,1.4vw,1rem)', color: 'rgba(250,250,250,0.3)', fontStyle: 'italic', margin: 0 }}>
                Or just say hello — no agenda required.
              </motion.p>

              <div>
                {LINKS.map((link, i) => <ContactLink key={link.id} link={link} index={i} onCopy={showToast} />)}
              </div>
            </div>

            {/* Right: form */}
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }} className="flex flex-col justify-center">
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label style={labelStyle}>Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" style={inputStyle} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label style={labelStyle}>Email</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" style={inputStyle} />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label style={labelStyle}>Subject</label>
                  <input required type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="How can I help?" style={inputStyle} />
                </div>
                <div className="flex flex-col gap-2">
                  <label style={labelStyle}>Message</label>
                  <textarea required name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="Your message..." style={{ ...inputStyle, resize: 'none' }} />
                </div>
                <button type="submit" disabled={status === 'sending' || status === 'success'} data-hover style={{ width: '100%', padding: 14, borderRadius: 6, border: status === 'success' ? '1px solid rgba(34,197,94,0.4)' : status === 'error' ? '1px solid rgba(239,68,68,0.4)' : `1px solid rgba(${AR},0.2)`, background: status === 'success' ? 'rgba(34,197,94,0.1)' : status === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(250,250,250,0.92)', color: status === 'success' ? 'rgb(34,197,94)' : status === 'error' ? 'rgb(239,68,68)' : '#050505', fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: status === 'sending' ? 'wait' : 'pointer', transition: 'all 0.2s ease', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  <AnimatePresence mode="wait">
                    {status === 'idle' && <motion.span key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">Send Message <Send className="w-4 h-4" /></motion.span>}
                    {status === 'sending' && <motion.span key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">Sending... <Loader2 className="w-4 h-4 animate-spin" /></motion.span>}
                    {status === 'success' && <motion.span key="d" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">Message Sent! <CheckCircle2 className="w-5 h-5" /></motion.span>}
                    {status === 'error' && <motion.span key="e" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>Something went wrong. Try again?</motion.span>}
                  </AnimatePresence>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
