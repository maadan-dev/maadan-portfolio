import { google } from '@ai-sdk/google';
import { streamText, convertToModelMessages } from 'ai';
import { SYSTEM_PROMPT } from '../src/data/ai-prompt';

export const config = {
  runtime: 'edge',
};

const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const body = await req.json();
    const { messages } = body;

    // Input validation
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: 'Invalid messages format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Cap conversation length
    const trimmedMessages = messages.slice(-MAX_MESSAGES).map((msg: any) => ({
      ...msg,
      parts: Array.isArray(msg.parts)
        ? msg.parts.map((part: any) => ({
            ...part,
            text: typeof part.text === 'string' ? part.text.slice(0, MAX_MESSAGE_LENGTH) : part.text,
          }))
        : msg.parts,
    }));

    const result = streamText({
      model: google('gemini-2.5-flash'),
      system: SYSTEM_PROMPT,
      messages: await convertToModelMessages(trimmedMessages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
