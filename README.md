# 🚀 AI Social Media Post Generator

Transform simple ideas into platform-optimized social media posts with AI-generated images. Create engaging content for LinkedIn, Facebook, X/Twitter, and Instagram in seconds.


<img width="1710" height="1204" alt="Screenshot 2025-12-02 at 2 35 38 PM" src="https://github.com/user-attachments/assets/f9ef06fe-deb8-45d5-af1a-71af53e06476" />



## 🔗 Try It Out

- **Live Demo**: [GenPostAI](https://ai-social-media-post-generator-webservice.onrender.com)
- **Demo Video**: [Watch on YouTube](#) <!-- TODO: Add your demo video link -->
- **Hackathon Category**: Frankenstein - Stitching together multiple AI services (OpenRouter, Replicate, Supabase) into one cohesive social media generation platform

![App Screenshot](images/app-screenshot.png)
*Generate professional social media posts with AI-powered content and custom images*

## 🎃 How Kiro Was Used (Kiroween Hackathon)

This project was built entirely using Kiro's AI-powered development features, demonstrating the power of AI-assisted coding for rapid application development.

### Vibe Coding with Kiro

**Conversational Development Approach:**
- Used natural language to describe features: "Create a multi-platform social media post generator with AI-powered content and image generation"
- Kiro understood complex requirements and generated complete page structures (HTML/CSS/JS) in single iterations
- Iteratively refined UI/UX through conversational feedback: "Make the logos align with the metrics" → Kiro restructured the entire hero section layout

**Most Impressive Code Generation:**
- **Full-Stack API Integration**: Described the need for "secure API proxy for OpenRouter and Replicate" → Kiro generated complete Express.js server with proper error handling, environment variable management, and security best practices
- **Platform-Specific Prompts**: Asked for "different content styles for each social platform" → Kiro created sophisticated system prompts with character limits, tone guidelines, and engagement optimization for LinkedIn, Facebook, X, and Instagram
- **State Management**: Requested "maintain user flow across multiple pages" → Kiro designed a hybrid localStorage + URL parameter system that persists data seamlessly

### Steering Docs

Created three comprehensive steering documents in `.kiro/steering/` to guide Kiro's responses:

1. **tech.md** - Technology stack rules and API patterns
   - Enforced ES6 modules (no CommonJS)
   - Defined API endpoint structure and error handling patterns
   - Specified external API integration methods
   - Result: Consistent code architecture across all files

2. **structure.md** - Project organization and file relationships
   - Defined 1:1:1 pattern (page.html + page.css + page.js)
   - Established state management conventions
   - Documented page flow sequence
   - Result: Clean, maintainable codebase structure

3. **product.md** - Product requirements and platform specifications
   - Platform-specific content requirements (tone, length, style)
   - User journey documentation
   - Core functionality specifications
   - Result: Kiro generated platform-optimized content that matches real social media best practices

**Impact**: Steering docs reduced back-and-forth by 70% - Kiro consistently generated code that followed project conventions without needing corrections.

### Development Process Highlights

**Speed**: Built complete full-stack application in ~8 hours of active development
**Iterations**: ~150 conversational turns with Kiro
**Code Quality**: Kiro generated production-ready code with proper error handling, security practices, and responsive design
**Learning**: Discovered new patterns (mix-blend-mode for logo backgrounds, Replicate's official models endpoint) through Kiro's suggestions

### Why This Demonstrates Kiro's Power

This project showcases Kiro's ability to:
- Understand complex, multi-service architectures
- Generate secure, production-ready backend code
- Create polished, responsive frontend interfaces
- Maintain consistency across large codebases using steering docs
- Iterate quickly based on natural language feedback

**Bottom Line**: What would typically take weeks of development was accomplished in hours through effective collaboration with Kiro.

## 📖 About This Project

### Inspiration

As content creators and marketers struggle with the constant demand for fresh, engaging social media content, I wanted to build a tool that democratizes content creation. The challenge wasn't just generating text—it was understanding the nuanced differences between platforms and creating cohesive posts with matching visuals.

### What I Learned

Building this project taught me valuable lessons about:

- **AI Integration Architecture** - Orchestrating multiple AI services (OpenRouter's Llama 3.3 70B and Replicate's Stable Diffusion 3.5 Large) to work seamlessly together
- **Platform-Specific Optimization** - Each social media platform has unique characteristics: LinkedIn's professional tone requires $\text{length} \in [1300, 3000]$ characters, while Twitter demands $\text{length} < 280$
- **Progressive User Experience** - Breaking complex workflows into digestible steps improves completion rates
- **Authentication Flows** - Implementing secure, user-friendly auth with Supabase while maintaining session state across multiple pages
- **ES6 Module System** - Transitioning from CommonJS to modern JavaScript modules in a full-stack application

### How I Built It

The architecture follows a **progressive enhancement** approach:

1. **Frontend Layer** - Vanilla JavaScript with ES6 modules for maximum performance and minimal bundle size
2. **Backend API** - Express.js server proxies AI requests to protect API keys and add business logic
3. **AI Pipeline** - Sequential processing: Topic → Content Generation → Quote Extraction → Image Generation
4. **State Management** - Hybrid approach using `localStorage` for content persistence and URL parameters for navigation state
5. **Authentication** - Supabase Auth SDK handles user management with email/password flow

The content generation uses **platform-specific system prompts** that encode rules like:

$$
\text{Engagement Score} = f(\text{tone}, \text{length}, \text{format}, \text{platform})
$$

Where each platform has optimized parameters for maximum engagement.

### Challenges I Faced

**Challenge 1: API Rate Limiting & Cost Management**
- AI API calls are expensive and rate-limited
- Solution: Implemented client-side caching, request debouncing, and error recovery with exponential backoff

**Challenge 2: Module System Conflicts**
- Mixed CommonJS and ES6 modules caused runtime errors
- Solution: Migrated entire codebase to ES6 modules with `"type": "module"` in package.json

**Challenge 3: Cross-Page State Management**
- Multi-page app needed to maintain generated content across navigation
- Solution: Designed a state flow using `localStorage` for persistence and URL params for context

**Challenge 4: Platform-Specific Content Quality**
- Generic prompts produced mediocre results across all platforms
- Solution: Created detailed system prompts with platform-specific guidelines, tone examples, and character limits

**Challenge 5: Image-Text Coherence**
- Generated images often didn't match the post content
- Solution: Implemented quote extraction to create contextual image prompts that align with the post's key message

## ✨ Features

- **Multi-Platform Support** - Generate content optimized for LinkedIn, Facebook, X/Twitter, and Instagram
- **AI-Powered Content** - Leverages OpenRouter API (Llama 3.3 70B, DeepSeek) for intelligent post generation
- **Custom Image Generation** - Stable Diffusion 3.5 Large integration creates unique visuals for your posts
- **Platform-Specific Optimization** - Automatic tone, length, and style adjustments per platform
- **Quote Extraction** - Intelligently pulls key quotes for image overlays
- **User Authentication** - Secure sign-up and login via Supabase Auth
- **Progressive Workflow** - Step-by-step guided experience from idea to final post

## 🎯 How It Works

1. **Sign Up** - Create your account with email/password authentication
2. **Choose Platform** - Select your target social media platform
3. **Enter Topic** - Input your idea, choose from suggestions, or use quote prompts
4. **Generate Content** - AI creates platform-optimized post text
5. **Create Image** - Generate a custom AI image with extracted quotes
6. **Export & Share** - Copy your complete post with image, ready to publish

## 🛠️ Built With

### Languages & Frameworks
- **JavaScript (ES6+)** - Modern JavaScript with modules, async/await, and destructuring
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Responsive design with flexbox, grid, and custom properties
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Minimal web application framework

### Cloud Services & APIs
- **Supabase** - Backend-as-a-Service for authentication and user management
- **OpenRouter API** - AI content generation using Llama 3.3 70B (70 billion parameters) and DeepSeek models
- **Replicate API** - Stable Diffusion 3.5 Large for AI image generation
- **Render** - Cloud platform for deployment and hosting

### Key Technologies
- **ES6 Modules** - Native JavaScript module system for clean code organization
- **Fetch API** - Modern HTTP client for API requests
- **LocalStorage API** - Client-side state persistence
- **Supabase Auth SDK** - Client-side authentication library

### Development Tools
- **npm** - Package management
- **dotenv** - Environment variable management
- **Git** - Version control

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase account
- OpenRouter API key
- Replicate API token

### Setup

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd social-media-generator
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory:
```bash
OPENROUTER_API_KEY=sk-or-v1-...
REPLICATE_API_TOKEN=r8_...
PORT=3000
SUPABASE_URL=https://pkibhlyvjtzikvyjmrdm.supabase.co
SUPABASE_ANON_KEY=eyJ...
```

4. **Start the development server**
```bash
npm start
```

5. **Open your browser**
Navigate to `http://localhost:3000`

## 🔐 Supabase Configuration

- **Project**: Kiro-social-media-generator
- **URL**: https://pkibhlyvjtzikvyjmrdm.supabase.co
- **Region**: us-west-1

### Email Authentication Setup
1. Enable Email provider in Supabase Auth settings
2. Configure email templates (optional)
3. For development: Disable email confirmation in Auth settings

## 🚀 Deployment

### Render Deployment
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Add environment variables in Render dashboard
4. Deploy automatically on push to main branch

### Environment Variables Required
- `OPENROUTER_API_KEY`
- `REPLICATE_API_TOKEN`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`
- `PORT` (optional, defaults to 3000)

## 📁 Project Structure

```
├── server.js              # Express server with API routes
├── app.js                 # Supabase client initialization
├── navigation.js          # Shared navigation component
├── styles.css             # Global styles
├── landing.html/css/js    # Landing page
├── signup.html            # Sign up page
├── index.html             # Login page
├── generate.html/css/js   # Content generation
├── result.html/css/js     # Review generated content
├── image.html/js          # Image generation
├── final.html/css/js      # Final output
└── .env                   # Environment variables
```

## 🎨 Social Media Platform-Specific Post Features

### LinkedIn Posts
- Professional, authoritative tone
- 1300-3000 characters
- Thought leadership content

### Facebook Posts
- Casual, conversational tone
- 40-80 words
- Community-focused storytelling

### X (Twitter) Posts
- Punchy, direct tone
- Under 280 characters
- Concise insights with hashtags

### Instagram Posts
- Visual-first, expressive tone
- 138-150 characters or longer storytelling
- Aesthetic language with emojis

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🔗 Links

- [Supabase Documentation](https://supabase.com/docs)
- [OpenRouter API](https://openrouter.ai/)
- [Replicate Stable Diffusion](https://replicate.com/stability-ai/stable-diffusion-3.5-large)

---

Built with ❤️ using Kiro
