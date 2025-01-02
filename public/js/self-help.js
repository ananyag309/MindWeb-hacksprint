// Mood Tracker
const moodRange = document.getElementById('moodRange');
const moodValue = document.getElementById('moodValue');

moodRange.addEventListener('input', () => {
    moodValue.textContent = moodRange.value;
});

// Breathing Exercise
const startBreathing = document.getElementById('startBreathing');
startBreathing.addEventListener('click', () => {
    alert("Inhale deeply... Hold... Exhale slowly... Repeat!");
});

// Gratitude Journal
const gratitudeText = document.getElementById('gratitudeText');
gratitudeText.addEventListener('focusout', () => {
    if (gratitudeText.value.trim() !== '') {
        alert("Gratitude saved!");
    }
});

// Habit Tracker
const habits = ['exercise', 'meditate', 'journal'];
habits.forEach(habit => {
    document.getElementById(habit).addEventListener('change', (e) => {
        if (e.target.checked) {
            alert(`${habit.charAt(0).toUpperCase() + habit.slice(1)} completed!`);
        }
    });
});

// Daily Affirmations
const affirmationDisplay = document.getElementById('affirmationDisplay');
const newAffirmation = document.getElementById('newAffirmation');
const addAffirmation = document.getElementById('addAffirmation');

addAffirmation.addEventListener('click', () => {
    if (newAffirmation.value.trim() !== '') {
        affirmationDisplay.textContent = `"${newAffirmation.value}"`;
        newAffirmation.value = '';
        alert("Affirmation added!");
    } else {
        alert("Please enter a valid affirmation.");
    }
});

// Motivational Quotes
const quotes = [
    '"Believe you can, and you’re halfway there." – Theodore Roosevelt',
    '"The only way to do great work is to love what you do." – Steve Jobs',
    '"Keep going. Everything you need will come to you at the perfect time."',
    '"You are braver than you believe, stronger than you seem, and smarter than you think." – A.A. Milne'
];
const newQuote = document.getElementById('newQuote');
const quoteText = document.getElementById('quoteText');

newQuote.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[randomIndex];
});
