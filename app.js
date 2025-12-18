// Supabase configuration - loaded from server
let supabase;

// Initialize Supabase client with config from server
async function initSupabase() {
    try {
        console.log('Fetching Supabase config...');
        const response = await fetch('/api/config');
        
        if (!response.ok) {
            throw new Error(`Config fetch failed: ${response.status}`);
        }
        
        const config = await response.json();
        console.log('Config received:', { url: config.supabaseUrl, hasKey: !!config.supabaseAnonKey });
        
        supabase = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
        console.log('Supabase client created successfully');
    } catch (error) {
        console.error('Failed to initialize Supabase:', error);
        // Fallback for development
        console.log('Using fallback Supabase config');
        supabase = window.supabase.createClient(
            'https://pkibhlyvjtzikvyjmrdm.supabase.co',
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBraWJobHl2anR6aWt2eWptcmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDYxNjMsImV4cCI6MjA3OTcyMjE2M30.BAF-zEZSgjW7DSrt4QTGUxH_UtPqq7pVJv4sLYzvF_g'
        );
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initSupabase);

// Custom notification system (replaces alert)
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existing = document.querySelector('.custom-notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `custom-notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 4000);
}

// Export supabase for use in other files
window.getSupabase = () => supabase;
