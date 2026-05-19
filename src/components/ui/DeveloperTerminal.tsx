import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChat } from '@ai-sdk/react';
import type { UIMessage } from '@ai-sdk/react';
import { Terminal, X, Maximize2, Minimize2, Send } from 'lucide-react';

const ACCENT = '#60a5fa';

function getMessageText(m: UIMessage): string {
  return m.parts
    .filter((part) => part.type === 'text')
    .map((part) => (part as any).text)
    .join('');
}

export function DeveloperTerminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    messages: [
      {
        id: '1',
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: "Connection established. I am Maadan's AI Advocator. How can I assist with your technical evaluation?",
          },
        ],
      },
    ],
  });

  const isLoading = status === 'submitted' || status === 'streaming';

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim() || isLoading) return;

    sendMessage({ text: inputVal });
    setInputVal('');
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full shadow-lg"
        style={{
          width: 56,
          height: 56,
          background: 'rgba(5,5,5,0.9)',
          border: `1px solid rgba(96,165,250,0.3)`,
          backdropFilter: 'blur(10px)',
          display: isOpen ? 'none' : 'flex',
        }}
        data-hover
      >
        <Terminal size={24} color={ACCENT} />
      </motion.button>

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
                  advocator@maadan.dev:~
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => setIsExpanded(!isExpanded)} data-hover aria-label="Toggle Fullscreen">
                  {isExpanded ? <Minimize2 size={14} color="rgba(250,250,250,0.5)" /> : <Maximize2 size={14} color="rgba(250,250,250,0.5)" />}
                </button>
                <button onClick={() => setIsOpen(false)} data-hover aria-label="Close Terminal">
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
                    {m.role === 'user' ? 'Guest' : 'Advocator'}
                  </div>
                  <div className="whitespace-pre-wrap">{getMessageText(m)}</div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2" style={{ color: ACCENT, fontSize: 13 }}>
                  <span className="animate-pulse">_</span> processing...
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
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Ask about my skills, stack, or experience..."
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
