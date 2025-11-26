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
            alert('Please enter a topic or quote to generate a post.');
            return;
        }
        
        const content = topic || quote;
        
        // Store in localStorage for next page
        localStorage.setItem('postTopic', content);
        localStorage.setItem('postType', topic ? 'topic' : 'quote');
        
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
