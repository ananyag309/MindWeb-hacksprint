// JavaScript to handle dynamic features can be added here (optional)

// Example: Automatically update recent activities based on user actions
const activities = [
    { time: '10 minutes ago', user: 'John Doe', activity: 'posted a new question in Chatbot Integration thread.' },
    { time: '15 minutes ago', user: 'Jane Smith', activity: 'liked your comment on Best Practices for Sustainable Web Design.' },
];

const activityFeed = document.querySelector('.activity-feed');
activities.forEach(activity => {
    const activityItem = document.createElement('div');
    activityItem.classList.add('activity-item');
    activityItem.innerHTML = `
        <span class="activity-time">${activity.time}</span>
        <p><strong>${activity.user}</strong> ${activity.activity}</p>
    `;
    activityFeed.appendChild(activityItem);
});
