import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the root directory
app.use(express.static(__dirname));

// API endpoint for generating posts
app.post('/api/generate', async (req, res) => {
    const { topic, model = 'grok' } = req.body;

    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

    const MODELS = {
        grok: 'x-ai/grok-beta',
        deepseek: 'deepseek/deepseek-r1-distill-llama-70b'
    };

    const systemPrompt = `You are an expert LinkedIn content creator. Generate engaging, professional LinkedIn posts that:
- Start with a compelling hook
- Use clear formatting with line breaks
- Include relevant emojis sparingly
- Have 3-5 key points with checkmarks (✅) or bullet points
- End with a call-to-action or question
- Include 5 relevant hashtags at the end
- Keep it between 150-300 words
- Sound authentic and conversational, not corporate
- Focus on providing value and insights`;

    const userPrompt = `Create a LinkedIn post about: ${topic}

Make it engaging, actionable, and shareable. Format it properly with line breaks and structure.`;

    try {
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': req.headers.referer || 'https://ai-social-media-post-generator-tpwg.onrender.com',
                'X-Title': 'AI Social Media Post Generator'
            },
            body: JSON.stringify({
                model: MODELS[model] || MODELS.grok,
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: userPrompt
                    }
                ],
                temperature: 0.8,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'OpenRouter API error');
        }

        const data = await response.json();
        const content = data.choices[0].message.content;

        return res.status(200).json({ content });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Catch-all route to serve index.html for any non-API routes
app.get('*', (req, res) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith('/api/')) {
        return res.status(404).json({ error: 'API endpoint not found' });
    }
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
