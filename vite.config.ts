import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { google } from '@ai-sdk/google'
import { streamText, convertToModelMessages } from 'ai'
import { SYSTEM_PROMPT } from './src/data/ai-prompt'

export default defineConfig(({ mode }) => {
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