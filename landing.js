// Landing page functionality

// Modal functions
function showAuthModal() {
    document.getElementById('authModal').classList.add('active');
}

function hideAuthModal() {
    document.getElementById('authModal').classList.remove('active');
}

// Auth tab switching
function showSignIn() {
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    document.querySelector('.auth-tab:first-child').classList.add('active');
    document.getElementById('signInForm').classList.add('active');
}

function showSignUp() {
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
    
    document.querySelector('.auth-tab:last-child').classList.add('active');
    document.getElementById('signUpForm').classList.add('active');
}

// FAQ toggle
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Close modal when clicking outside
document.getElementById('authModal').addEventListener('click', function(e) {
    if (e.target === this) {
        hideAuthModal();
    }
});

// Initialize Supabase and handle auth forms
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize Supabase
    await initSupabase();
    
    // Handle Sign In form
    document.getElementById('signInForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;

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
            showNotification('Welcome back!', 'success');
            setTimeout(() => {
                window.location.href = 'generate.html';
            }, 1000);
        }
    });

    // Handle Sign Up form
    document.getElementById('signUpForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: window.location.origin + '/generate.html'
            }
        });

        if (error) {
            showNotification('Error: ' + error.message, 'error');
        } else if (data?.user) {
            if (data.user.identities && data.user.identities.length === 0) {
                showNotification('This email is already registered. Please sign in instead.', 'info');
                showSignIn();
            } else {
                showNotification('Account created! Please check your email to confirm your account.', 'success');
                setTimeout(() => {
                    hideAuthModal();
                }, 2000);
            }
        }
    });
});