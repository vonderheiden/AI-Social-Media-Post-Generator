---
inclusion: always
---

# Tech Stack & Development Guidelines

## Technology Stack
- **Frontend**: Vanilla JavaScript (ES6 modules), HTML5, CSS3 - NO frameworks
- **Backend**: Node.js with Express.js
- **Authentication**: Supabase Auth (client-side SDK)
- **AI Services**: 
  - OpenRouter API for text generation (Llama 3.3 70B, DeepSeek models)
  - Replicate API for image generation (Stable Diffusion 3.5 Medium)
- **Deployment**: Render web service

## Critical Architecture Rules

### Module System
- Project uses ES6 modules: `"type": "module"` in package.json
- Use `import`/`export` syntax, NEVER `require()`
- All script tags must include `type="module"`
- Top-level `await` is supported

### API Endpoint Rules
- ALL API routes MUST be defined in `server.js` under `/api/*` prefix
- API routes MUST be registered BEFORE `express.static()` middleware
- Use async/await for all async operations
- Always include try/catch error handling with proper HTTP status codes
- Return JSON responses with consistent structure

### Frontend Code Style
- Use `const` by default, `let` only when reassignment needed
- Use async/await, NEVER `.then()` chains
- Use template literals for string interpolation
- Use arrow functions for callbacks
- Destructure objects and arrays where appropriate
- Handle errors with try/catch blocks

### Supabase Integration
- Supabase client initialized in `app.js` and exported
- Import with: `import { supabase } from './app.js'`
- Check auth state: `const { data: { session } } = await supabase.auth.getSession()`
- Protected pages must redirect to `/landing.html` if no session

### Environment Variables
Required in `.env` file:
```bash
OPENROUTER_API_KEY=sk-or-v1-...
REPLICATE_API_TOKEN=r8_...
PORT=3000
SUPABASE_URL=https://pkibhlyvjtzikvyjmrdm.supabase.co
SUPABASE_ANON_KEY=eyJ...
```

Access in Node.js with `process.env.VARIABLE_NAME`

## API Request Patterns

### Making API Calls (Frontend)
```javascript
const response = await fetch('/api/endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: value })
});

if (!response.ok) {
  throw new Error(`API error: ${response.status}`);
}

const data = await response.json();
```

### Defining API Routes (Backend)
```javascript
app.post('/api/endpoint', async (req, res) => {
  try {
    const { key } = req.body;
    // Process request
    res.json({ success: true, data: result });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});
```

## External API Integration

### OpenRouter API
- Endpoint: `https://openrouter.ai/api/v1/chat/completions`
- Auth: `Authorization: Bearer ${process.env.OPENROUTER_API_KEY}`
- Models: `meta-llama/llama-3.3-70b-instruct`, `deepseek/deepseek-chat`
- Use platform-specific system prompts for content generation

### Replicate Stable Diffusion 3.5 Medium
- Endpoint: `https://api.replicate.com/v1/models/stability-ai/stable-diffusion-3.5-medium/predictions`
- Auth: `Authorization: Bearer ${process.env.REPLICATE_API_TOKEN}`
- Model: `stability-ai/stable-diffusion-3.5-medium`
- Aspect Ratio: `1:1` (square format for social media)
- Output Format: `png`
- Inference Steps: 28 (default)
- Guidance Scale: 3.5 (default)

## Development Commands
```bash
npm install          # Install dependencies
npm start            # Start server (PORT=3000 default)
node server.js       # Direct server start
```

## Dependencies
Core packages (see package.json):
- `express` - Web server framework
- `dotenv` - Environment variable management
- `cors` - Cross-origin resource sharing
- `@supabase/supabase-js` - Supabase client (frontend)

## Common Pitfalls to Avoid
- Don't use `api/generate.js` - it's legacy code, all routes go in `server.js`
- Don't forget `type="module"` in script tags
- Don't use CommonJS syntax (`require`, `module.exports`)
- Don't define API routes after `express.static()` middleware
- Don't expose API keys in frontend code - always proxy through backend
- Don't forget CORS headers for API endpoints