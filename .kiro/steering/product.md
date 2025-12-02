---
inclusion: always
---

# Product Overview

AI Social Media Post Generator - transforms topic ideas into platform-optimized social media posts with AI-generated images.

## Core Functionality
- **Multi-platform generation**: LinkedIn, Facebook, X/Twitter, Instagram
- **AI content creation**: OpenRouter API (Llama 3.3 70B, DeepSeek models)
- **Quote extraction**: Pulls key quotes from generated content
- **Image generation**: Replicate Stable Diffusion 3.5 Large for visual content
- **Authentication**: Supabase Auth for user management
- **Progressive workflow**: Step-by-step guided experience

## User Journey
1. **Authentication** (`landing.html` → `signup.html` → `index.html`)
   - Sign up or sign in via Supabase
   - Session persists across pages

2. **Content Generation** (`generate.html`)
   - Select target platform (affects tone, length, style)
   - Input topic via:
     - Manual text entry
     - Pre-defined topic suggestions
     - Inspirational quote prompts
   - Submit to `/api/generate` endpoint

3. **Review & Refine** (`result.html`)
   - View generated post content
   - Regenerate if needed (calls API again)
   - Extract quotes for image overlay
   - Proceed to image generation

4. **Image Creation** (`image.html`)
   - Generate AI image via `/api/generate-image`
   - Uses extracted quote or custom prompt
   - DALL-E 3 creates visual content

5. **Final Output** (`final.html`)
   - Combined post text + image
   - Ready for copy/download/share

## Platform-Specific Requirements

### LinkedIn
- **Tone**: Professional, authoritative, insight-driven
- **Length**: 1300-3000 characters (optimal engagement)
- **Style**: Thought leadership, industry insights, career advice
- **Format**: Paragraphs with line breaks, occasional emojis

### Facebook
- **Tone**: Casual, conversational, personal
- **Length**: 40-80 words (higher engagement for shorter posts)
- **Style**: Storytelling, community-focused, relatable
- **Format**: Friendly language, questions to drive engagement

### X (Twitter)
- **Tone**: Punchy, direct, attention-grabbing
- **Length**: Under 280 characters (hard limit)
- **Style**: Concise insights, hot takes, quick tips
- **Format**: Short sentences, strategic hashtags

### Instagram
- **Tone**: Visual-first, expressive, lifestyle-oriented
- **Length**: 138-150 characters (optimal) or longer storytelling
- **Style**: Aesthetic language, emotional connection
- **Format**: Line breaks, emojis, 3-5 relevant hashtags

## Key Product Rules
- Always maintain platform-specific character limits and tone
- Quote extraction should identify the most impactful 1-2 sentences
- Image prompts should be descriptive and align with post content
- Users can regenerate content unlimited times
- Session state flows between pages via localStorage and URL params
- All AI calls include error handling and loading states