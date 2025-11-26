// Sample post templates based on common topics
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

// Load and display post
function displayPost() {
    const topic = localStorage.getItem('postTopic');
    
    if (!topic) {
        window.location.href = 'generate.html';
        return;
    }
    
    // Simulate loading delay
    setTimeout(() => {
        const post = generatePost(topic);
        
        document.getElementById('postTitle').textContent = post.title;
        document.getElementById('postBody').innerHTML = post.body;
    }, 500);
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

// Initialize
checkAuth();
displayPost();
