// Navigation and stepper functionality

// Sign out function
async function handleSignOut() {
    const { error } = await supabase.auth.signOut();
    if (error) {
        alert('Error signing out: ' + error.message);
    } else {
        window.location.href = 'index.html';
    }
}

// Update stepper based on current page
function updateStepper(currentStep) {
    const steps = document.querySelectorAll('.step');
    const connectors = document.querySelectorAll('.step-connector');
    
    steps.forEach((step, index) => {
        const stepNumber = index + 1;
        
        if (stepNumber < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (stepNumber === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('completed', 'active');
        }
    });
    
    connectors.forEach((connector, index) => {
        if (index + 1 < currentStep) {
            connector.classList.add('completed');
        } else {
            connector.classList.remove('completed');
        }
    });
}

// Initialize stepper on page load
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    let currentStep = 1;
    
    if (path.includes('generate.html')) {
        currentStep = 1;
    } else if (path.includes('result.html')) {
        currentStep = 2;
    } else if (path.includes('image.html')) {
        currentStep = 3;
    }
    
    updateStepper(currentStep);
});
