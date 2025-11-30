let selectedQuote = '';
let generatedQuotes = [];

// Load post content and generate quotes
function loadPostContent() {
    const postContent = localStorage.getItem('finalPost') || localStorage.getItem('generatedPost');
    
    if (!postContent) {
        window.location.href = 'generate.html';
        return;
    }
    
    // Generate quotes from post content
    generateQuotes();
}

// Generate inspirational quotes from post content
async function generateQuotes() {
    const postContent = localStorage.getItem('finalPost') || localStorage.getItem('generatedPost');
    const quotesContainer = document.getElementById('quotesContainer');
    
    // Show loading state
    quotesContainer.innerHTML = `
        <div class="loading-quotes">
            <div class="loading-spinner"></div>
            <p>Generating inspirational quotes from your post...</p>
        </div>
    `;
    
    try {
        const response = await fetch('/api/generate-quotes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                postContent: postContent
            })
        });

        if (!response.ok) {
            throw new Error('Failed to generate quotes');
        }

        const data = await response.json();
        generatedQuotes = data.quotes;
        
        displayQuotes(generatedQuotes);
        
    } catch (error) {
        console.error('Error generating quotes:', error);
        
        // Fallback quotes based on common themes
        const fallbackQuotes = [
            { text: "Success isn't about working harder—it's about working smarter.", author: "Anonymous" },
            { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
            { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
            { text: "Your network is your net worth.", author: "Porter Gale" }
        ];
        
        generatedQuotes = fallbackQuotes;
        displayQuotes(generatedQuotes);
        
        showNotification('Using fallback quotes. AI generation temporarily unavailable.', 'info');
    }
}

// Display quotes in the UI
function displayQuotes(quotes) {
    const quotesContainer = document.getElementById('quotesContainer');
    
    const quotesHTML = `
        <div class="quotes-grid">
            ${quotes.map((quote, index) => `
                <div class="quote-card" onclick="selectQuote('${quote.text.replace(/'/g, "\\'")}', ${index})">
                    <div class="quote-text">"${quote.text}"</div>
                    <div class="quote-author">— ${quote.author}</div>
                </div>
            `).join('')}
        </div>
    `;
    
    quotesContainer.innerHTML = quotesHTML;
}

// Select a quote
function selectQuote(quoteText, index) {
    // Remove previous selection
    document.querySelectorAll('.quote-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    // Select current quote
    document.querySelectorAll('.quote-card')[index].classList.add('selected');
    
    selectedQuote = quoteText;
    
    // Clear custom input
    const customInput = document.getElementById('customQuoteInput');
    if (customInput) {
        customInput.value = '';
        updateCharCount();
    }
    
    // Enable generate button
    document.getElementById('generateBtn').disabled = false;
}

// Character counter for custom quote
const customQuoteInput = document.getElementById('customQuoteInput');
const customCharCount = document.getElementById('customCharCount');

function updateCharCount() {
    if (customQuoteInput && customCharCount) {
        customCharCount.textContent = customQuoteInput.value.length;
        
        // If custom quote is entered, clear selected quote
        if (customQuoteInput.value.trim()) {
            document.querySelectorAll('.quote-card').forEach(card => {
                card.classList.remove('selected');
            });
            selectedQuote = customQuoteInput.value.trim();
            document.getElementById('generateBtn').disabled = false;
        } else if (!selectedQuote) {
            document.getElementById('generateBtn').disabled = true;
        }
    }
}

if (customQuoteInput) {
    customQuoteInput.addEventListener('input', updateCharCount);
}

// Form submission
const imageForm = document.getElementById('imageForm');
if (imageForm) {
    imageForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const quote = quoteInput.value.trim();
        
        const finalQuote = selectedQuote || customQuoteInput.value.trim();
        
        if (!finalQuote) {
            showNotification('Please select a quote or write your own.', 'error');
            return;
        }
        
        // Store quote for image generation
        localStorage.setItem('imageQuote', finalQuote);
        
        // Generate image with DALL-E
        generateImage(finalQuote);
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

// Generate image using DALL-E
async function generateImage(quote) {
    const generateBtn = document.getElementById('generateBtn');
    const originalText = generateBtn.textContent;
    
    // Show loading state
    generateBtn.disabled = true;
    generateBtn.innerHTML = '<div class="loading-spinner" style="width: 20px; height: 20px; margin-right: 8px; display: inline-block;"></div>Generating Image...';
    
    const prompt = `A realistic city sidewalk scene outside a cozy, independent bookstore or library. A quote is displayed prominently on a clean white brick wall in an elegant serif font: "${quote}". The window reveals shelves filled with books inside, warm interior lighting glowing softly. Tall trees and square planters line the sidewalk, casting gentle shadows in the late afternoon light. The vibe is intellectual, calm, and inspirational—perfect for thoughtful social media quotes.`;
    
    try {
        const response = await fetch('/api/generate-image', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: prompt,
                quote: quote
            })
        });

        if (!response.ok) {
            throw new Error('Failed to generate image');
        }

        const data = await response.json();
        
        // Store image URL and navigate to final page
        localStorage.setItem('generatedImageUrl', data.imageUrl);
        localStorage.setItem('finalQuote', quote);
        
        showNotification('Image generated successfully!', 'success');
        
        // Navigate to final page (to be created)
        setTimeout(() => {
            window.location.href = 'final.html';
        }, 1500);
        
    } catch (error) {
        console.error('Error generating image:', error);
        showNotification('Image generation failed. Please try again.', 'error');
        
        // Reset button
        generateBtn.disabled = false;
        generateBtn.textContent = originalText;
    }
}