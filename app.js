// Supabase configuration
const SUPABASE_URL = 'https://pkibhlyvjtzikvyjmrdm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBraWJobHl2anR6aWt2eWptcmRtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxNDYxNjMsImV4cCI6MjA3OTcyMjE2M30.BAF-zEZSgjW7DSrt4QTGUxH_UtPqq7pVJv4sLYzvF_g';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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
            alert('Error: ' + error.message);
        } else {
            alert('Sign in successful!');
            window.location.href = 'dashboard.html';
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
            alert('Error: ' + error.message);
            console.error('Signup error:', error);
        } else if (data?.user) {
            if (data.user.identities && data.user.identities.length === 0) {
                alert('This email is already registered. Please sign in instead.');
                window.location.href = 'index.html';
            } else {
                alert('Sign up successful! You can now sign in (email confirmation may be required).');
                window.location.href = 'index.html';
            }
        } else {
            alert('Sign up initiated. Please check your email for confirmation.');
            window.location.href = 'index.html';
        }
    });
}
