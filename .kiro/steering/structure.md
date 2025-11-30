# Project Structure & Organization

## File Organization
```
├── server.js              # Express server with API routes
├── app.js                 # Supabase client initialization & auth
├── package.json           # Dependencies and scripts
├── render.yaml            # Render deployment config
├── _redirects             # SPA routing fallback
├── .env.example           # Environment variable template
│
├── api/
│   └── generate.js        # Legacy API endpoint (use server.js instead)
│
├── HTML Pages (User Flow)
├── index.html             # Entry point (redirects to landing)
├── landing.html           # Marketing/welcome page
├── signup.html            # User registration
├── dashboard.html         # User dashboard (optional step)
├── generate.html          # Topic input & platform selection
├── result.html            # Generated post display
├── image.html             # AI image generation
├── final.html             # Final post with image
│
├── CSS Files
├── styles.css             # Global styles
├── landing.css            # Landing page styles
├── generate.css           # Generation form styles
├── result.css             # Post result styles
├── final.css              # Final page styles
├── navigation.css         # Navigation component styles
│
├── JavaScript Files
├── landing.js             # Landing page interactions
├── generate.js            # Post generation logic
├── result.js              # Result page functionality
├── image.js               # Image generation handling
├── final.js               # Final page interactions
└── navigation.js          # Navigation component logic
```

## Architecture Patterns

### Page Flow
1. `landing.html` → `signup.html` → `index.html` (sign in)
2. `generate.html` → `result.html` → `image.html` → `final.html`

### CSS Organization
- Global styles in `styles.css`
- Page-specific styles in dedicated files
- Shared navigation styles in `navigation.css`
- Consistent naming: `page-name.css`

### JavaScript Modules
- `app.js`: Core Supabase setup and auth utilities
- Page-specific JS files handle their own interactions
- `navigation.js`: Shared navigation functionality
- All scripts use ES6 modules and async/await

### API Structure
- All API routes in `server.js` under `/api/*` prefix
- Static file serving from root directory
- API routes defined before static middleware
- Catch-all route serves `index.html` for SPA behavior

### Naming Conventions
- HTML files: lowercase with hyphens
- CSS classes: kebab-case
- JavaScript: camelCase for variables/functions
- API endpoints: `/api/verb-noun` pattern