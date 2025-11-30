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

// API endpoint for generating posts - MUST come before static files
app.post('/api/generate', async (req, res) => {
    const { topic, model = 'grok' } = req.body;

    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

    const MODELS = {
        grok: 'meta-llama/llama-3.3-70b-instruct:free',
        deepseek: 'tngtech/tng-r1t-chimera:free'
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

// API endpoint for generating quotes from post content
app.post('/api/generate-quotes', async (req, res) => {
    const { postContent } = req.body;

    if (!postContent) {
        return res.status(400).json({ error: 'Post content is required' });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

    const systemPrompt = `You are an expert at extracting inspirational quotes from LinkedIn posts. Generate exactly 4 short, powerful quotes that capture the essence of the post. Each quote should be:
- 10-15 words maximum
- Inspirational and motivational
- Suitable for social media images
- Professional but engaging
- Include a relevant author name (can be famous person or "Anonymous")

Return the response as a JSON array with this exact format:
[
  {"text": "Quote text here", "author": "Author Name"},
  {"text": "Quote text here", "author": "Author Name"},
  {"text": "Quote text here", "author": "Author Name"},
  {"text": "Quote text here", "author": "Author Name"}
]`;

    const userPrompt = `Extract 4 inspirational quotes from this LinkedIn post content: ${postContent}`;

    try {
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': req.headers.referer || 'https://ai-social-media-post-generator-webservice.onrender.com',
                'X-Title': 'AI Social Media Post Generator'
            },
            body: JSON.stringify({
                model: 'meta-llama/llama-3.3-70b-instruct:free',
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
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'OpenRouter API error');
        }

        const data = await response.json();
        const content = data.choices[0].message.content;
        
        // Try to parse JSON response
        let quotes;
        try {
            quotes = JSON.parse(content);
        } catch (parseError) {
            // Fallback if JSON parsing fails
            quotes = [
                { text: "Success isn't about working harder—it's about working smarter.", author: "Anonymous" },
                { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
                { text: "Your network is your net worth.", author: "Porter Gale" },
                { text: "The best time to start was yesterday. The next best time is now.", author: "Chinese Proverb" }
            ];
        }

        return res.status(200).json({ quotes });
    } catch (error) {
        console.error('Error generating quotes:', error);
        return res.status(500).json({ error: error.message });
    }
});

// API endpoint for generating images with DALL-E
app.post('/api/generate-image', async (req, res) => {
    const { prompt, quote } = req.body;

    if (!prompt || !quote) {
        return res.status(400).json({ error: 'Prompt and quote are required' });
    }

    const DALLE_API_KEY = process.env.DALLE_API_KEY;
    
    if (!DALLE_API_KEY) {
        return res.status(500).json({ error: 'DALL-E API key not configured' });
    }

    try {
        const response = await fetch('https://api.openai.com/v1/images/generations', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${DALLE_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'dall-e-3',
                prompt: prompt,
                n: 1,
                size: '1024x1024',
                quality: 'standard'
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'DALL-E API error');
        }

        const data = await response.json();
        const imageUrl = data.data[0].url;

        return res.status(200).json({ imageUrl });
    } catch (error) {
        console.error('Error generating image:', error);
        return res.status(500).json({ error: error.message });
    }
});

// Serve static files from the root directory - MUST come after API routes
app.use(express.static(__dirname));

// Catch-all route to serve index.html for any non-API routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
