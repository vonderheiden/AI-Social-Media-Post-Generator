// Character counter
const topicInput = document.getElementById('topicInput');
const charCount = document.getElementById('charCount');

if (topicInput && charCount) {
    topicInput.addEventListener('input', () => {
        charCount.textContent = topicInput.value.length;
    });
}

// Toggle sections
function toggleSection(sectionName) {
    const sections = {
        topic: document.getElementById('topicSection'),
        suggestions: document.getElementById('suggestionsSection'),
        quote: document.getElementById('quoteSection')
    };
    
    const targetSection = sections[sectionName];
    const content = targetSection.querySelector('.section-content');
    const isActive = targetSection.classList.contains('active');
    
    // Close all sections
    Object.values(sections).forEach(section => {
        section.classList.remove('active');
        section.querySelector('.section-content').style.display = 'none';
    });
    
    // Open clicked section if it wasn't active
    if (!isActive) {
        targetSection.classList.add('active');
        content.style.display = 'block';
    }
}

// Select suggestion
function selectSuggestion(button) {
    // Remove selection from all buttons
    document.querySelectorAll('.suggestion-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Select clicked button
    button.classList.add('selected');
    
    // Copy text to topic input
    const topicInput = document.getElementById('topicInput');
    topicInput.value = button.textContent.trim();
    
    // Update character count
    const charCount = document.getElementById('charCount');
    charCount.textContent = topicInput.value.length;
}

let selectedPlatform = 'linkedin'; // Default platform

// Platform selection
function selectPlatform(platform) {
    // Remove active class from all cards
    document.querySelectorAll('.platform-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to selected card
    document.querySelector(`[data-platform="${platform}"]`).classList.add('active');
    
    selectedPlatform = platform;
    
    // Update UI based on platform
    updatePlatformUI(platform);
}

// Update UI based on selected platform
function updatePlatformUI(platform) {
    const platformInfo = {
        linkedin: {
            title: 'Write your first LinkedIn post',
            subtitle: 'Professional insights and thought leadership',
            description: 'LinkedIn posts are professional and insight-driven, perfect for sharing industry knowledge and building your professional brand.',
            charLimit: 1300,
            tips: [
                'Share professional insights and experiences',
                'Use structured formatting with bullet points',
                'Include relevant industry hashtags',
                'Ask engaging questions to drive discussion'
            ]
        },
        facebook: {
            title: 'Write your first Facebook post',
            subtitle: 'Casual and personal storytelling',
            description: 'Facebook posts are casual and personal, great for storytelling and connecting with your community on a more personal level.',
            charLimit: 2000,
            tips: [
                'Tell personal stories and experiences',
                'Use conversational, friendly tone',
                'Include emojis and casual language',
                'Encourage comments and engagement'
            ]
        },
        twitter: {
            title: 'Write your first X (Twitter) post',
            subtitle: 'Short, punchy, and impactful',
            description: 'X posts are concise and punchy, designed to capture attention quickly and spark immediate engagement.',
            charLimit: 280,
            tips: [
                'Keep it short and impactful',
                'Use trending hashtags strategically',
                'Ask questions or make bold statements',
                'Consider creating a thread for longer thoughts'
            ]
        },
        instagram: {
            title: 'Write your first Instagram post',
            subtitle: 'Visual-first with expressive captions',
            description: 'Instagram posts are visual-first with expressive captions that complement your images and connect with your audience.',
            charLimit: 400,
            tips: [
                'Write captions that complement your visuals',
                'Use storytelling and emotional connection',
                'Include relevant hashtags (up to 30)',
                'Encourage saves and shares'
            ]
        }
    };
    
    const info = platformInfo[platform];
    
    // Update left panel content
    document.querySelector('.left-panel h1').textContent = info.title;
    document.querySelector('.subtitle').textContent = info.subtitle;
    document.querySelector('.description').textContent = info.description;
    
    // Update tips
    const methodsList = document.querySelector('.methods-list');
    methodsList.innerHTML = info.tips.map(tip => `<li>${tip}</li>`).join('');
    
    // Update character limit
    const charCount = document.getElementById('charCount');
    if (charCount) {
        charCount.parentElement.innerHTML = `<span id="charCount">0</span>/${info.charLimit} characters`;
    }
}

// Form submission
const generateForm = document.getElementById('generateForm');
if (generateForm) {
    generateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const topicInput = document.getElementById('topicInput');
        const quoteInput = document.getElementById('quoteInput');
        
        const topic = topicInput.value.trim();
        const quote = quoteInput.value.trim();
        
        if (!topic && !quote) {
            showNotification('Please enter a topic or quote to generate a post.', 'error');
            return;
        }
        
        const content = topic || quote;
        
        // Store in localStorage for next page
        localStorage.setItem('postTopic', content);
        localStorage.setItem('postType', topic ? 'topic' : 'quote');
        localStorage.setItem('selectedPlatform', selectedPlatform);
        
        // Navigate to result page
        window.location.href = 'result.html';
    });
}

// Check authentication
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        window.location.href = 'index.html';
    }
}

checkAuth();
