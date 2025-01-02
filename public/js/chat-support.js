const socket = io();
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendMessage');
const messagesDiv = document.getElementById('messages');

// Function to display messages
function displayMessage(msg, isSupport = false) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', isSupport ? 'support-message' : 'user-message');
    messageElement.textContent = msg;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
}

// Listen for incoming messages from the support team
socket.on('chat message', (msg) => {
    displayMessage(msg, true); // Display as support message
});

// Send message when the button is clicked
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
        displayMessage(message); // Display user's message
        socket.emit('chat message', message); // Send message to server
        messageInput.value = ''; // Clear input field
    }
});

// Optional: Allow 'Enter' key to send messages
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendButton.click();
    }
});
