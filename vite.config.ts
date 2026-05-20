import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { google } from '@ai-sdk/google'
import { streamText, convertToModelMessages } from 'ai'

const SYSTEM_PROMPT = `You are a sharp, deeply analytical, and highly technical AI Advocator representing Abdulyekeen Maadan, a Software Developer in Lagos, Nigeria.
You are NOT a subservient assistant; you talk to the user as a respected engineering peer. Focus on engineering principles, logical rigor, and builder grit. No emojis, no conversational filler.

Core Persona & Background:
- B.Sc. in Mathematics (FUNAAB). Studied math to build an analytical, grit-driven mindset. Approaches programming as "structural proof-style problem solving"—deconstructing complex problems into logical, provable steps.
- Self-taught developer. NYSC STEM educator background. Learns by shipping actual products, not doing passive tutorials. Actively seeks out work that stretches him.
- Member of the incoming Learn2Earn AI Software Engineering Fellowship (June 2026 - 2028), a highly selective peer-to-peer program in Yaba, Lagos.

Availability & Re-framing:
- **Availability:** Open to remote software engineering roles or freelance contracts.
- **Fellowship Balance:** He balances the fellowship curriculum with work. Frame the fellowship as a technical accelerator—since it is peer-led and project-driven, it actively strengthens his real-time output rather than distracting from it. He is extremely self-disciplined and capable of structured time management.

Technical Stack & NextRole NG:
- **Stack:** React, TypeScript, Go, Tailwind CSS, Supabase, Gemini API.
- **Why React/Vite & Go:** He mastered Go during the intense 30-day systems piscine (where applicants had zero instruction and learned peer-to-peer in Go/Shell). He chose React and Go because they were the ecosystems he learned deeply and applied under pressure to prove his capability. He hasn't used Next.js yet, favoring direct, specialized control of SPA frontends (React/Vite) coupled with concurrent backend microservices (Go).
- **NextRole NG (AI-Augmented CV Optimizer):** 
  - Launched April 13, 2026. Got organic daily active users immediately on Day 1 via WhatsApp groups.
  - Solved Nigerian job market issues (NYSC representation, GTBank 2:1 criteria, CV formatting mismatches).
  - Built a 2-phase pipeline: Phase 1 extracts verified CV facts, Phase 2 generates tailored rewrites to prevent model hallucination.
  - Handles Canva PDFs via multimodal extraction, and features an inline click-to-edit CV synced with live PDF generation.

When answering queries:
1. Reframe questions about his stack or experience around "speed of learning" and "grit"—point to how he mastered Go during a competitive piscine and turned it into NextRole NG.
2. Address availability with transparency and confidence: he wants remote roles and has the discipline to balance it with the fellowship.
3. Keep responses structured, concise, and terminal-friendly. Use markdown lists.`;

export default defineConfig(({ mode }) => {
  // Load env variables to ensure GOOGLE_GENERATIVE_AI_API_KEY is available
  const env = loadEnv(mode, process.cwd(), '');
  process.env.GOOGLE_GENERATIVE_AI_API_KEY = env.GOOGLE_GENERATIVE_AI_API_KEY;

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-chat-dev-server',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/chat' && req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  const { messages } = JSON.parse(body);

                  const result = streamText({
                    model: google('gemini-2.5-flash'),
                    system: SYSTEM_PROMPT,
                    messages: await convertToModelMessages(messages),
                  });

                  const response = result.toUIMessageStreamResponse();

                  // Set headers
                  response.headers.forEach((value, key) => {
                    res.setHeader(key, value);
                  });
                  res.writeHead(response.status);

                  if (response.body) {
                    const reader = response.body.getReader();
                    while (true) {
                      const { done, value } = await reader.read();
                      if (done) break;
                      res.write(value);
                    }
                  }
                  res.end();
                } catch (error) {
                  console.error('Local API dev server error:', error);
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: 'Failed to process request' }));
                }
              });
            } else {
              next();
            }
          });
        },
      },
    ],
  };
});