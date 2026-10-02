import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === 'production';
const PORT = process.env.PORT || 3000;

async function startServer() {
  const app = express();
  app.use(express.json());

  // Initialize Gemini
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Route for generating names
  app.post('/api/generate-names', async (req, res) => {
    try {
      const { description, industry, keywords, audience, tone, style, location, resultCount } = req.body;

      if (!description) {
        return res.status(400).json({ error: 'Description is required' });
      }

      const prompt = `
        Generate ${resultCount || 20} unique business name ideas based on the following criteria:
        - Description: ${description}
        - Industry: ${industry}
        - Keywords: ${keywords?.join(', ') || 'N/A'}
        - Target Audience: ${audience}
        - Tone: ${tone}
        - Naming Style: ${style}
        ${location ? `- Location/Region: ${location}` : ''}

        Rules:
        1. Names must be memorable, easy to pronounce, and brandable.
        2. Provide a short explanation (1-2 sentences) for why each name fits.
        3. Do not generate trademarked names or copy famous brands.
        4. Use a variety of patterns: Word+Word, Word+Lab, Word+Co, invented words, etc.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              names: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    style: { type: Type.STRING },
                    industry: { type: Type.STRING }
                  },
                  required: ["name", "description", "style", "industry"]
                }
              }
            },
            required: ["names"]
          }
        }
      });

      const text = response.text;
      if (!text) {
        throw new Error('No response from AI');
      }

      const data = JSON.parse(text);
      res.json(data);
    } catch (error: any) {
      console.error('Generation error:', error);
      res.status(500).json({ error: 'Failed to generate names. Please try again.' });
    }
  });

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

startServer();
