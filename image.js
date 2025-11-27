// Load post content
function loadPostContent() {
    const postContent = localStorage.getItem('finalPost') || localStorage.getItem('generatedPost');
    
    if (!postContent) {
        window.location.href = 'generate.html';
        return;
    }
    
    // Display post preview (strip HTML for preview)
    const postPreview = document.getElementById('postPreview');
    postPreview.innerHTML = postContent;
}

// Character counter for quote
const quoteInput = document.getElementById('quoteInput');
const quoteCharCount = document.getElementById('quoteCharCount');

if (quoteInput && quoteCharCount) {
    quoteInput.addEventListener('input', () => {
        quoteCharCount.textContent = quoteInput.value.length;
    });
}

// Form submission
const imageForm = document.getElementById('imageForm');
if (imageForm) {
    imageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const quote = quoteInput.value.trim();
        
        if (!quote) {
            showNotification('Please enter a quote for your image.', 'error');
            return;
        }
        
        // Store quote for image generation
        localStorage.setItem('imageQuote', quote);
        
        // Navigate to final page (to be implemented)
        showNotification('Quote saved! Image generation coming soon.', 'success');
        setTimeout(() => {
            window.location.href = 'generate.html';
        }, 1500);
    });
}

// Check authentication
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        window.location.href = 'index.html';
    }
}

// Initialize
checkAuth();
loadPostContent();
