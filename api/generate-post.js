// OpenRouter API integration for LinkedIn post generation
const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Available models
const MODELS = {
    grok: 'x-ai/grok-beta',
    deepseek: 'deepseek/deepseek-r1-distill-llama-70b'
};

async function generateLinkedInPost(topic, model = 'grok') {
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
                'HTTP-Referer': window.location.origin,
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
            throw new Error(`API request failed: ${response.status}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error generating post:', error);
        throw error;
    }
}

// Export for use in other files
window.generateLinkedInPost = generateLinkedInPost;
