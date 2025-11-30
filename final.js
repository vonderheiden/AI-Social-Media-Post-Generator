// Final page functionality
let finalPostContent = '';
let generatedImageUrl = '';

// Load final post and image
function loadFinalContent() {
    // Load post content
    finalPostContent = localStorage.getItem('finalPost') || localStorage.getItem('generatedPost');
    
    if (!finalPostContent) {
        window.location.href = 'generate.html';
        return;
    }
    
    // Display post content
    document.getElementById('finalPostContent').innerHTML = finalPostContent;
    
    // Load generated image
    generatedImageUrl = localStorage.getItem('generatedImageUrl');
    const imageContainer = document.getElementById('imageContainer');
    
    if (generatedImageUrl) {
        imageContainer.innerHTML = `
            <img src="${generatedImageUrl}" alt="Generated AI Image" class="generated-image" />
        `;
    } else {
        // Show placeholder if no image
        imageContainer.innerHTML = `
            <div class="image-placeholder">
                <div style="padding: 60px 20px; text-align: center; color: #666;">
                    <div style="font-size: 48px; margin-bottom: 16px;">🖼️</div>
                    <p>Image will appear here once generated</p>
                </div>
            </div>
        `;
    }
}

// Copy post text to clipboard
async function copyPost() {
    try {
        // Strip HTML tags for plain text copy
        const textContent = finalPostContent.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ');
        
        await navigator.clipboard.writeText(textContent);
        
        // Show success feedback
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="success-checkmark">✓</span>Copied!';
        btn.style.background = '#4caf50';
        btn.style.color = 'white';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
        
        showNotification('Post text copied to clipboard!', 'success');
    } catch (error) {
        console.error('Failed to copy text:', error);
        showNotification('Failed to copy text. Please try again.', 'error');
    }
}

// Download generated image
async function downloadImage() {
    if (!generatedImageUrl) {
        showNotification('No image to download. Please generate an image first.', 'error');
        return;
    }
    
    try {
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '⏳ Downloading...';
        btn.disabled = true;
        
        // Fetch the image
        const response = await fetch(generatedImageUrl);
        const blob = await response.blob();
        
        // Create download link
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `linkedin-post-image-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Show success feedback
        btn.innerHTML = '<span class="success-checkmark">✓</span>Downloaded!';
        btn.style.background = '#4caf50';
        btn.style.color = 'white';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
            btn.disabled = false;
        }, 2000);
        
        showNotification('Image downloaded successfully!', 'success');
    } catch (error) {
        console.error('Failed to download image:', error);
        showNotification('Failed to download image. Please try again.', 'error');
        
        // Reset button
        const btn = event.target;
        btn.innerHTML = '📥 Download Image';
        btn.disabled = false;
    }
}

// Copy image URL to clipboard
async function copyImageUrl() {
    if (!generatedImageUrl) {
        showNotification('No image URL to copy. Please generate an image first.', 'error');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(generatedImageUrl);
        
        // Show success feedback
        const btn = event.target;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="success-checkmark">✓</span>Copied!';
        btn.style.background = '#4caf50';
        btn.style.color = 'white';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
        
        showNotification('Image URL copied to clipboard!', 'success');
    } catch (error) {
        console.error('Failed to copy URL:', error);
        showNotification('Failed to copy URL. Please try again.', 'error');
    }
}

// Create another post
function createAnother() {
    // Clear stored data
    localStorage.removeItem('postTopic');
    localStorage.removeItem('generatedPost');
    localStorage.removeItem('finalPost');
    localStorage.removeItem('imageQuote');
    localStorage.removeItem('generatedImageUrl');
    localStorage.removeItem('finalQuote');
    
    // Navigate to start
    window.location.href = 'generate.html';
}

// Check authentication
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        window.location.href = 'index.html';
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadFinalContent();
});