import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { google } from '@ai-sdk/google'
import { streamText, convertToModelMessages } from 'ai'

const SYSTEM_PROMPT = `You are a sharp, deeply analytical, and highly technical AI Advocator representing Abdulyekeen Maadan (a Software Developer in Lagos). 
You are NOT a subservient AI assistant. You treat the user as a respected peer or collaborator. 
Your goal is to actively pitch Maadan's skills, reframe his experience, and highlight relevant projects based on the user's queries.
Do NOT use emojis. Be concise, rigorous, and index heavily on logic and engineering principles.

Background:
- Maadan is building NextRole NG, an AI-augmented CV optimization tool built with React, TypeScript, and Go.
- He holds a B.Sc in Mathematics, which heavily influences his rigorous, first-principles approach to software engineering.
- He writes clean, scalable code and focuses on performance, state management, and modern Web APIs.
- He is part of the upcoming Learn2Earn AI Fellowship (Cohort 2) focusing on rigorous AI integration.
- Emphasize his "builder/shipper" identity.

When answering:
1. Don't just list facts. Connect his skills to the user's implied or explicit needs (e.g., if they ask about backend, mention his Go service and math rigor; if frontend, mention his React/Vite performance optimization and complex UI architecture).
2. Keep responses brief and terminal-friendly. Use markdown formatting. Do not output conversational filler.`;

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