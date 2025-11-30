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
    const { topic, model = 'grok', platform = 'linkedin' } = req.body;

    if (!topic) {
        return res.status(400).json({ error: 'Topic is required' });
    }

    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

    const MODELS = {
        grok: 'meta-llama/llama-3.3-70b-instruct:free',
        deepseek: 'tngtech/tng-r1t-chimera:free'
    };

    // Platform-specific prompts
    const platformPrompts = {
        linkedin: {
            systemPrompt: `You are an expert LinkedIn content creator. Generate professional, insight-driven LinkedIn posts that:
- Start with a compelling hook or question
- Use clear formatting with line breaks and bullet points
- Include relevant emojis sparingly (1-3 per post)
- Have 3-5 key insights or actionable points
- End with a call-to-action or engaging question
- Include 3-5 relevant professional hashtags
- Keep it between 300-1300 characters
- Sound authentic and conversational, not overly corporate
- Focus on providing value, insights, and thought leadership
- Use professional tone suitable for business networking`,
            
            userPrompt: `Create a professional LinkedIn post about: ${topic}

Make it insightful, actionable, and suitable for professional networking. Focus on thought leadership and industry insights.`
        },
        
        facebook: {
            systemPrompt: `You are an expert Facebook content creator. Generate casual, personal Facebook posts that:
- Use a friendly, conversational tone
- Tell stories and share personal experiences
- Include emojis naturally throughout (3-8 per post)
- Create emotional connection with readers
- Encourage comments and engagement
- Use casual language and contractions
- Can be flexible in length (50-2000 characters)
- Feel authentic and relatable
- Include 2-4 relevant hashtags
- Focus on community and personal connection`,
            
            userPrompt: `Create a casual, personal Facebook post about: ${topic}

Make it relatable, engaging, and encourage community interaction. Use storytelling and personal connection.`
        },
        
        twitter: {
            systemPrompt: `You are an expert X (Twitter) content creator. Generate short, punchy tweets that:
- Are concise and impactful (under 280 characters)
- Start with a strong hook or bold statement
- Use 1-2 emojis strategically
- Include trending or relevant hashtags (2-3 max)
- Spark immediate engagement and discussion
- Use conversational, direct language
- Can be controversial or thought-provoking
- Focus on one clear message or insight
- Encourage retweets and replies`,
            
            userPrompt: `Create a short, punchy X (Twitter) post about: ${topic}

Keep it under 280 characters, make it impactful and engaging. Focus on one clear, memorable message.`
        },
        
        instagram: {
            systemPrompt: `You are an expert Instagram content creator. Generate visual-first Instagram captions that:
- Complement and enhance visual content
- Use expressive, emotional language
- Include 3-8 emojis naturally throughout
- Tell stories that connect with followers
- Use line breaks for easy reading
- Include a mix of popular and niche hashtags (5-15 hashtags)
- Keep captions between 50-400 words
- Encourage saves, shares, and comments
- Use authentic, personal voice
- Focus on lifestyle, inspiration, or behind-the-scenes content`,
            
            userPrompt: `Create an engaging Instagram caption about: ${topic}

Make it visual-first, expressive, and perfect for accompanying an image or video. Focus on storytelling and emotional connection.`
        }
    };

    const selectedPrompt = platformPrompts[platform] || platformPrompts.linkedin;
    const systemPrompt = selectedPrompt.systemPrompt;
    const userPrompt = selectedPrompt.userPrompt;

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

// API endpoint for client configuration (non-sensitive data only)
app.get('/api/config', (req, res) => {
    res.json({
        supabaseUrl: process.env.SUPABASE_URL || 'https://pkibhlyvjtzikvyjmrdm.supabase.co',
        supabaseAnonKey: process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBraWJobHl2anR6aWt2eWptcmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDYxNjMsImV4cCI6MjA3OTcyMjE2M30.BAF-zEZSgjW7DSrt4QTGUxH_UtPqq7pVJv4sLYzvF_g'
    });
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
