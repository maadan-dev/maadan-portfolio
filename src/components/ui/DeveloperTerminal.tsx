import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import type { UIMessage } from '@ai-sdk/react';
import { Terminal, X, Maximize2, Minimize2, Send } from 'lucide-react';

const ACCENT = '#60a5fa';
const TIMEOUT_MS = 20000;

const SUGGESTED_PROMPTS = [
  'What did Maadan build?',
  'Why Go + React?',
  'Is he available for work?',
];

function getMessageText(m: UIMessage): string {
  return m.parts
    .filter((part) => part.type === 'text')
    .map((part) => (part.type === 'text' ? part.text : ''))
    .join('');
}

const SESSION_KEY = 'maadan-terminal-messages';

function loadPersistedMessages(): UIMessage[] {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [
    {
      id: 'welcome',
      role: 'assistant',
      parts: [
        {
          type: 'text',
          text: "Hey — I'm an AI that knows Maadan's work inside out. Ask me anything about his stack, projects, or how he works.",
        },
      ],
    },
  ];
}

export function DeveloperTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [hasLoaded, setHasLoaded] = useState(() => {
    if (window.location.pathname === '/' && !sessionStorage.getItem('hasLoaded')) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    const handleLoaded = () => setHasLoaded(true);
    window.addEventListener('portfolio-loaded', handleLoaded);
    return () => window.removeEventListener('portfolio-loaded', handleLoaded);
  }, []);

  const initialMessages = useRef(loadPersistedMessages()).current;

  const { messages, sendMessage, status } = useChat({
    messages: initialMessages,
    onError: () => {
      setError("Something went wrong. Try again or reach out directly at maadan.dev@gmail.com");
    },
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  // Persist messages to sessionStorage
  useEffect(() => {
    if (messages.length > 0) {
      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
      } catch {}
    }
  }, [messages]);

  // Auto-scroll
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Clear error when new message comes in
  useEffect(() => {
    if (messages.length > 0) setError(null);
  }, [messages]);

  // Timeout for long requests
  useEffect(() => {
    if (isLoading) {
      timeoutRef.current = setTimeout(() => {
        setError("Taking too long to respond. Try asking again or email maadan.dev@gmail.com directly.");
      }, TIMEOUT_MS);
    } else {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isLoading]);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard shortcuts: Cmd/Ctrl+K to toggle, Escape to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
        setIsExpanded(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSubmit = useCallback((e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputVal.trim() || isLoading) return;
    setError(null);
    sendMessage({ text: inputVal });
    setInputVal('');
  }, [inputVal, isLoading, sendMessage]);

  const handleSuggestion = useCallback((prompt: string) => {
    setError(null);
    sendMessage({ text: prompt });
  }, [sendMessage]);

  const showSuggestions = messages.length <= 1;

  return (
    <>
      {/* Floating Action Button */}
      {hasLoaded && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-lg group"
          style={{
            width: 56,
            height: 56,
            background: 'rgba(5,5,5,0.9)',
            border: `1px solid rgba(96,165,250,0.3)`,
            backdropFilter: 'blur(10px)',
            display: isOpen ? 'none' : 'flex',
          }}
          data-hover
          aria-label="Open AI Terminal (Ctrl+K)"
          title="Ask AI about Maadan (Ctrl+K)"
        >
          <Terminal size={24} color={ACCENT} />
        </motion.button>
      )}

      {/* Terminal Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed z-50 flex flex-col overflow-hidden"
            style={{
              bottom: isExpanded ? 0 : 24,
              right: isExpanded ? 0 : 24,
              width: isExpanded ? '100vw' : 'min(400px, calc(100vw - 48px))',
              height: isExpanded ? '100vh' : '500px',
              background: 'rgba(5,5,5,0.95)',
              border: isExpanded ? 'none' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: isExpanded ? 0 : 12,
              backdropFilter: 'blur(16px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3 select-none"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.02)' }}
            >
              <div className="flex items-center gap-2">
                <Terminal size={14} color={ACCENT} />
                <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 12, color: 'rgba(250,250,250,0.7)' }}>
                  advocate@maadan.dev:~
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span style={{ fontFamily: "'Geist Mono', monospace", fontSize: 10, color: 'rgba(250,250,250,0.25)', marginRight: 8 }}>
                  {navigator.platform.includes('Mac') ? '⌘K' : 'Ctrl+K'}
                </span>
                <button onClick={() => setIsExpanded(!isExpanded)} data-hover aria-label="Toggle Fullscreen" className="p-1.5 rounded hover:bg-white/5 transition-colors">
                  {isExpanded ? <Minimize2 size={14} color="rgba(250,250,250,0.5)" /> : <Maximize2 size={14} color="rgba(250,250,250,0.5)" />}
                </button>
                <button onClick={() => { setIsOpen(false); setIsExpanded(false); }} data-hover aria-label="Close Terminal" className="p-1.5 rounded hover:bg-white/5 transition-colors">
                  <X size={16} color="rgba(250,250,250,0.5)" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4" style={{ fontFamily: "'Geist Mono', monospace", fontSize: 13, lineHeight: 1.6 }}>
              {messages.map((m: UIMessage) => (
                <div
                  key={m.id}
                  className="flex flex-col gap-1"
                  style={{
                    color: m.role === 'user' ? 'rgba(250,250,250,0.55)' : 'rgba(250,250,250,0.9)',
                  }}
                >
                  <div className="flex items-center gap-2" style={{ color: m.role === 'user' ? 'rgba(250,250,250,0.4)' : ACCENT, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {m.role === 'user' ? 'Guest' : 'Advocate'}
                  </div>
                  <div className="whitespace-pre-wrap">{getMessageText(m)}</div>
                </div>
              ))}

              {/* Suggested Prompts */}
              {showSuggestions && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSuggestion(prompt)}
                      disabled={isLoading}
                      data-hover
                      style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 11,
                        color: 'rgba(250,250,250,0.6)',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        borderRadius: 6,
                        padding: '6px 12px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        (e.target as HTMLElement).style.borderColor = 'rgba(96,165,250,0.3)';
                        (e.target as HTMLElement).style.color = 'rgba(250,250,250,0.85)';
                      }}
                      onMouseLeave={(e) => {
                        (e.target as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                        (e.target as HTMLElement).style.color = 'rgba(250,250,250,0.6)';
                      }}
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}

              {isLoading && (
                <div className="flex items-center gap-2" style={{ color: ACCENT, fontSize: 13 }}>
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    _
                  </motion.span>
                  processing...
                </div>
              )}

              {error && (
                <div
                  style={{
                    padding: '10px 14px',
                    borderRadius: 6,
                    background: 'rgba(239,68,68,0.08)',
                    border: '1px solid rgba(239,68,68,0.2)',
                    color: 'rgba(239,68,68,0.85)',
                    fontSize: 12,
                    lineHeight: 1.5,
                  }}
                >
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="p-3"
              style={{ borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}
            >
              <div className="relative flex items-center">
                <span className="absolute left-3" style={{ color: ACCENT, fontFamily: "'Geist Mono', monospace" }}>$</span>
                <input
                  ref={inputRef}
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask about skills, stack, or experience..."
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    padding: '8px 40px 8px 24px',
                    color: '#fff',
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 13,
                  }}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputVal.trim()}
                  className="absolute right-2 p-1 rounded transition-opacity"
                  style={{
                    opacity: inputVal.trim() && !isLoading ? 1 : 0.3,
                    background: 'rgba(255,255,255,0.05)',
                  }}
                >
                  <Send size={14} color={ACCENT} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
