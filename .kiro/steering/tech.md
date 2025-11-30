# Tech Stack & Development

## Core Technologies
- **Frontend**: Vanilla HTML, CSS, JavaScript (ES6 modules)
- **Backend**: Node.js with Express.js
- **Authentication**: Supabase Auth
- **AI Services**: 
  - OpenRouter API (Llama 3.3 70B, DeepSeek models)
  - OpenAI DALL-E 3 for image generation
- **Deployment**: Render (web service)

## Key Dependencies
```json
{
  "express": "^4.18.2",
  "dotenv": "^16.3.1", 
  "cors": "^2.8.5"
}
```

## Project Structure
- Static file serving from root directory
- API routes under `/api/*` prefix
- ES6 modules with `"type": "module"` in package.json
- Environment-based configuration

## Common Commands
```bash
# Install dependencies
npm install

# Start development server
npm start

# Server runs on PORT environment variable or 3000
```

## Environment Variables
```bash
OPENROUTER_API_KEY=your-openrouter-api-key-here
DALLE_API_KEY=your-openai-api-key-here
PORT=3000
SUPABASE_URL=https://pkibhlyvjtzikvyjmrdm.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
```

## API Architecture
- RESTful endpoints for post generation, quote extraction, and image creation
- Platform-specific prompt engineering for different social media platforms
- Error handling with proper HTTP status codes
- CORS enabled for cross-origin requests

## Deployment
- Render web service with automatic builds
- Static file serving with Express
- Environment variables managed through Render dashboard