---
inclusion: always
---

# Project Structure & Organization

## Architecture Overview
This is a multi-page web application (not a true SPA) with server-side API routes. Each HTML page is a separate document with its own CSS and JS files following a 1:1:1 pattern (page.html + page.css + page.js).

## Critical Rules

### File Relationships
- Each page has three files: `{page}.html`, `{page}.css`, `{page}.js`
- `app.js` is imported by ALL pages for Supabase auth initialization
- `navigation.js` is imported by authenticated pages for nav component
- `styles.css` contains global styles, imported by all pages
- When modifying a page, check all three related files

### API Routes (server.js)
- ALL API endpoints MUST be defined in `server.js` under `/api/*` prefix
- API routes MUST be defined BEFORE `express.static()` middleware
- `api/generate.js` is LEGACY - do not use or reference it
- Pattern: `/api/verb-noun` (e.g., `/api/generate`, `/api/generate-image`)
- Always include error handling with proper HTTP status codes

### State Management
- Session state flows between pages via `localStorage` and URL parameters
- Auth state managed by Supabase (check `app.js` for utilities)
- Generated content passed via `localStorage.setItem('generatedPost', ...)`
- Platform selection passed via URL params: `?platform=linkedin`

### Page Flow Sequence
1. Auth: `landing.html` → `signup.html` → `index.html` (login)
2. Generation: `generate.html` → `result.html` → `image.html` → `final.html`
3. Users can navigate back to regenerate content at any step

## Naming Conventions
- HTML files: lowercase with hyphens (`generate.html`)
- CSS classes: kebab-case (`.post-container`)
- JavaScript: camelCase for variables/functions (`generatePost()`)
- API endpoints: `/api/verb-noun` pattern

## Code Style

### JavaScript
- Use ES6 modules: `import`/`export` syntax
- Use `async`/`await` for all async operations (no `.then()` chains)
- Use `const` by default, `let` only when reassignment needed
- Handle errors with try/catch blocks
- Check auth state on page load for protected pages

### HTML
- Include `<script type="module">` for ES6 imports
- Load page-specific CSS in `<head>`
- Import `app.js` first, then page-specific JS
- Use semantic HTML elements

### CSS
- Mobile-first responsive design
- Use CSS custom properties for colors/spacing when possible
- Page-specific styles in dedicated files
- Avoid inline styles

## Common Patterns

### Auth Check (in page JS files)
```javascript
import { supabase } from './app.js';

const { data: { session } } = await supabase.auth.getSession();
if (!session) {
  window.location.href = '/landing.html';
}
```

### API Calls
```javascript
const response = await fetch('/api/endpoint', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ data })
});
const result = await response.json();
```

### State Passing
```javascript
// Save state
localStorage.setItem('key', JSON.stringify(data));

// Retrieve state
const data = JSON.parse(localStorage.getItem('key'));

// URL params
const params = new URLSearchParams(window.location.search);
const platform = params.get('platform');
```

## File Organization
```
server.js          # Express server - ALL API routes here
app.js             # Supabase client + auth utilities
navigation.js      # Shared nav component logic
styles.css         # Global styles

{page}.html        # Page markup
{page}.css         # Page-specific styles  
{page}.js          # Page-specific logic

api/generate.js    # LEGACY - do not use
```