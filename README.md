# 🚀 AI Social Media Post Generator

Transform simple ideas into platform-optimized social media posts with AI-generated images. Create engaging content for LinkedIn, Facebook, X/Twitter, and Instagram in seconds.


<img width="1890" height="1165" alt="Screenshot 2025-12-02 at 1 59 58 PM" src="https://github.com/user-attachments/assets/59468a1e-2544-4e3e-8ae9-135611386cab" />


## 🔗 Try It Out

- **Live Demo**: [AI Social Media Post Generator](https://ai-social-media-post-generator-webservice.onrender.com)
- **Source Code**: [GitHub Repository](https://github.com/yourusername/social-media-generator)

![App Screenshot](images/app-screenshot.png)
*Generate professional social media posts with AI-powered content and custom images*

## 📖 About This Project

### Inspiration

As content creators and marketers struggle with the constant demand for fresh, engaging social media content, I wanted to build a tool that democratizes content creation. The challenge wasn't just generating text—it was understanding the nuanced differences between platforms and creating cohesive posts with matching visuals.

### What I Learned

Building this project taught me valuable lessons about:

- **AI Integration Architecture** - Orchestrating multiple AI services (OpenRouter's Llama 3.3 70B and Replicate's Stable Diffusion 3.5) to work seamlessly together
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
- **Custom Image Generation** - Stable Diffusion 3.5 Medium integration creates unique visuals for your posts
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
- **Replicate API** - Stable Diffusion 3.5 Medium for AI image generation
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

## 🎨 Platform-Specific Features

### LinkedIn
- Professional, authoritative tone
- 1300-3000 characters
- Thought leadership content

### Facebook
- Casual, conversational tone
- 40-80 words
- Community-focused storytelling

### X (Twitter)
- Punchy, direct tone
- Under 280 characters
- Concise insights with hashtags

### Instagram
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
- [Replicate Stable Diffusion](https://replicate.com/stability-ai/stable-diffusion-3.5-medium)

---

Built with ❤️ using AI-powered content generation
