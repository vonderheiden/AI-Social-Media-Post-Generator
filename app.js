// Supabase configuration
const SUPABASE_URL = 'https://pkibhlyvjtzikvyjmrdm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBraWJobHl2anR6aWt2eWptcmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDYxNjMsImV4cCI6MjA3OTcyMjE2M30.BAF-zEZSgjW7DSrt4QTGUxH_UtPqq7pVJv4sLYzvF_g';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

// Sign In
const signInForm = document.getElementById('signInForm');
if (signInForm) {
    signInForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            if (error.message.includes('Email not confirmed')) {
                showNotification('Please confirm your email address before signing in. Check your inbox for the confirmation link.', 'error');
            } else {
                showNotification('Error: ' + error.message, 'error');
            }
        } else {
            // Redirect directly to generate page, skipping dashboard
            window.location.href = 'generate.html';
        }
    });
}

// Sign Up
const signUpForm = document.getElementById('signUpForm');
if (signUpForm) {
    signUpForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log('Attempting signup for:', email);

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: 'https://ai-social-media-post-generator-tpwg.onrender.com/dashboard.html',
                data: {
                    email: email
                }
            }
        });

        console.log('Signup response:', { data, error });

        if (error) {
            showNotification('Error: ' + error.message, 'error');
            console.error('Signup error:', error);
        } else if (data?.user) {
            if (data.user.identities && data.user.identities.length === 0) {
                showNotification('This email is already registered. Please sign in instead.', 'info');
                window.location.href = 'index.html';
            } else {
                showNotification('Account created! Please check your email to confirm your account before signing in.', 'success');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
            }
        } else {
            showNotification('Sign up initiated. Please check your email for confirmation.', 'success');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 2000);
        }
    });
}
