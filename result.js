// OpenRouter API configuration
const OPENROUTER_API_KEY = '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';
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

// Available models
const MODELS = {
    grok: 'x-ai/grok-beta',
    deepseek: 'deepseek/deepseek-r1-distill-llama-70b'
};

let currentModel = 'grok';
let isGenerating = false;

// Sample post templates as fallback
const postTemplates = {
    'leadership': {
        title: 'The 3 Traits Every Great Leader Must Have',
        body: `Leadership isn't about having all the answers—it's about asking the right questions.

After working with dozens of teams, I've noticed that the most effective leaders share three key traits:

<strong>1. Empathy 🤝</strong>
They understand that behind every task is a person with their own challenges and aspirations. Great leaders listen first, then act.

<strong>2. Adaptability 🔄</strong>
The best plans change. Great leaders pivot without losing sight of the goal. They embrace uncertainty as an opportunity to innovate.

<strong>3. Authenticity ✨</strong>
People follow leaders who are genuine. When you show up as your true self, you give others permission to do the same.

<strong>The bottom line?</strong>
Leadership is a practice, not a position. It's built through consistent actions, not grand gestures.

<span class="hashtags">#Leadership #Management #CareerGrowth #ProfessionalDevelopment #Teamwork</span>`
    },
    'remote': {
        title: 'Remote Work: The Future is Already Here',
        body: `Remote work isn't a trend—it's the new reality.

Here's what I've learned after 3 years of leading a fully remote team:

<strong>✅ Communication is everything</strong>
Over-communicate. What feels like too much is probably just right. Use video calls for complex discussions, async for everything else.

<strong>✅ Trust over surveillance</strong>
Measure outcomes, not hours. The best remote teams are built on trust, not tracking software.

<strong>✅ Create rituals</strong>
Virtual coffee chats, weekly wins, monthly all-hands. These moments build culture when you can't share a physical space.

<strong>✅ Embrace flexibility</strong>
Different time zones? Different peak hours? That's a feature, not a bug. Let people work when they're most productive.

The companies that thrive in this new era aren't the ones forcing people back to offices—they're the ones reimagining what work can be.

<span class="hashtags">#RemoteWork #FutureOfWork #WorkFromHome #DigitalNomad #ProductivityTips</span>`
    },
    'career': {
        title: 'Career Growth: Stop Waiting for Permission',
        body: `The biggest career mistake I made? Waiting for someone to give me permission to grow.

Here's what changed everything:

<strong>1. I stopped asking "Can I?" and started asking "How can I?"</strong>
Instead of waiting for opportunities, I created them. Volunteered for projects. Proposed solutions. Took initiative.

<strong>2. I invested in myself</strong>
Books, courses, mentors, conferences. Your company might not pay for your growth, but you can't afford not to invest in yourself.

<strong>3. I built in public</strong>
Shared my learnings. Wrote about my experiences. Connected with others on the same journey. Your network is your net worth.

<strong>4. I embraced discomfort</strong>
Growth happens outside your comfort zone. Every time I felt scared, I knew I was on the right track.

Your career is yours to build. Stop waiting for permission. Start creating opportunities.

<span class="hashtags">#CareerAdvice #ProfessionalGrowth #CareerDevelopment #Success #Motivation</span>`
    },
    'innovation': {
        title: 'Innovation Isn\'t About Technology—It\'s About People',
        body: `Everyone talks about innovation like it's a tech problem.

It's not. It's a people problem.

The most innovative companies I've worked with don't have the best technology—they have the best culture.

<strong>Here's what they do differently:</strong>

<strong>✅ They celebrate failure</strong>
Not reckless failure, but smart experiments that didn't work. Each failure is a lesson, not a setback.

<strong>✅ They give people space to think</strong>
Innovation doesn't happen in back-to-back meetings. It happens when people have time to explore, experiment, and dream.

<strong>✅ They listen to everyone</strong>
The best ideas don't always come from the top. They create channels for ideas to flow from anywhere in the organization.

<strong>✅ They act fast</strong>
Perfect is the enemy of good. They ship, learn, iterate. Speed beats perfection every time.

Want to build an innovative company? Start by building a culture where people feel safe to try new things.

<span class="hashtags">#Innovation #TechInnovation #StartupCulture #BusinessGrowth #Leadership</span>`
    },
    'default': {
        title: 'Thoughts on Professional Growth',
        body: `Success isn't about working harder—it's about working smarter.

Here are some insights I've gathered along my journey:

<strong>Focus on impact, not activity</strong>
Being busy doesn't mean being productive. Ask yourself: "What's the one thing I can do today that will make everything else easier?"

<strong>Build genuine relationships</strong>
Your network isn't about collecting contacts—it's about building real connections. Help others without expecting anything in return.

<strong>Never stop learning</strong>
The moment you think you know everything is the moment you stop growing. Stay curious. Stay humble.

<strong>Share your knowledge</strong>
Teaching others is the best way to solidify your own understanding. Plus, it builds your reputation as a thought leader.

What's one lesson that changed your professional life? Share in the comments! 👇

<span class="hashtags">#ProfessionalDevelopment #CareerAdvice #Success #Growth #Learning</span>`
    }
};

// Generate post based on topic
function generatePost(topic) {
    const lowerTopic = topic.toLowerCase();
    
    // Match keywords to templates
    if (lowerTopic.includes('leader') || lowerTopic.includes('management')) {
        return postTemplates.leadership;
    } else if (lowerTopic.includes('remote') || lowerTopic.includes('work from home')) {
        return postTemplates.remote;
    } else if (lowerTopic.includes('career') || lowerTopic.includes('growth')) {
        return postTemplates.career;
    } else if (lowerTopic.includes('innovation') || lowerTopic.includes('tech')) {
        return postTemplates.innovation;
    } else {
        return postTemplates.default;
    }
}

// Generate post using OpenRouter API
async function generateLinkedInPost(topic, model = 'grok') {
    const systemPrompt = `You are an expert LinkedIn content creator. Generate engaging, professional LinkedIn posts that:
- Start with a compelling hook
- Use clear formatting with line breaks
- Include relevant emojis sparingly
- Have 3-5 key points with checkmarks (✅) or bullet points
- End with a call-to-action or question
- Include 5 relevant hashtags at the end
- Keep it between 150-300 words
- Sound authentic and conversational, not corporate
- Focus on providing value and insights`;

    const userPrompt = `Create a LinkedIn post about: ${topic}

Make it engaging, actionable, and shareable. Format it properly with line breaks and structure.`;

    try {
        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location.origin,
                'X-Title': 'AI Social Media Post Generator'
            },
            body: JSON.stringify({
                model: MODELS[model] || MODELS.grok,
                messages: [
                    {
                        role: 'system',
                        content: systemPrompt
                    },
                    {
                        role: 'user',
                        content: userPrompt
                    }
                ],
                temperature: 0.8,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error generating post:', error);
        throw error;
    }
}

// Extract title from post content
function extractTitle(content) {
    const lines = content.split('\n');
    const firstLine = lines[0].replace(/[*#]/g, '').trim();
    return firstLine.length > 80 ? firstLine.substring(0, 80) + '...' : firstLine;
}

// Format post content
function formatPostContent(content) {
    // Convert markdown-style formatting to HTML
    let formatted = content
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>');
    
    return formatted;
}

// Load and display post
async function displayPost(regenerate = false) {
    const topic = localStorage.getItem('postTopic');
    
    if (!topic) {
        window.location.href = 'generate.html';
        return;
    }
    
    if (isGenerating) return;
    
    isGenerating = true;
    
    // Show loading state
    document.getElementById('postTitle').textContent = 'Generating...';
    document.getElementById('postBody').innerHTML = '✨ Creating your LinkedIn post with AI...<br><br>This may take a few seconds.';
    
    // Disable regenerate button
    const regenBtn = document.querySelector('.action-buttons button:first-child');
    if (regenBtn) {
        regenBtn.disabled = true;
        regenBtn.style.opacity = '0.5';
    }
    
    try {
        // Generate post using AI
        const postContent = await generateLinkedInPost(topic, currentModel);
        
        // Extract title and format content
        const title = extractTitle(postContent);
        const body = formatPostContent(postContent);
        
        // Display the post
        document.getElementById('postTitle').textContent = title;
        document.getElementById('postBody').innerHTML = body;
        
        // Store generated post
        localStorage.setItem('generatedPost', postContent);
        
    } catch (error) {
        console.error('Failed to generate post:', error);
        
        // Fallback to template-based generation
        const post = generatePost(topic);
        document.getElementById('postTitle').textContent = post.title;
        document.getElementById('postBody').innerHTML = post.body;
        
        alert('AI generation failed. Using template instead. Error: ' + error.message);
    } finally {
        isGenerating = false;
        
        // Re-enable regenerate button
        if (regenBtn) {
            regenBtn.disabled = false;
            regenBtn.style.opacity = '1';
        }
    }
}

// Edit post function
function editPost() {
    const postBody = document.getElementById('postBody');
    const currentContent = postBody.innerHTML;
    
    // Make content editable
    postBody.contentEditable = true;
    postBody.style.border = '2px solid #1e88e5';
    postBody.style.padding = '12px';
    postBody.style.borderRadius = '6px';
    postBody.focus();
    
    // Change button to save
    const editBtn = document.querySelector('.action-buttons button:nth-child(2)');
    editBtn.textContent = '💾 Save Changes';
    editBtn.onclick = function() {
        postBody.contentEditable = false;
        postBody.style.border = 'none';
        postBody.style.padding = '0';
        editBtn.textContent = '✏️ Edit Post';
        editBtn.onclick = editPost;
        alert('Changes saved!');
    };
}

// Check authentication
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
        window.location.href = 'index.html';
    }
}

// Regenerate post with model switching
async function regeneratePost() {
    // Switch model
    currentModel = currentModel === 'grok' ? 'deepseek' : 'grok';
    
    const modelName = currentModel === 'grok' ? 'Grok Beta' : 'DeepSeek R1';
    document.getElementById('currentModelName').textContent = modelName;
    console.log(`Regenerating with ${modelName}...`);
    
    await displayPost(true);
}

// Continue to image generation
function continueToImage() {
    // Save the final post content
    const postContent = document.getElementById('postBody').innerHTML;
    localStorage.setItem('finalPost', postContent);
    
    window.location.href = 'image.html';
}

// Initialize
checkAuth();
displayPost();
