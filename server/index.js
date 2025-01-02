const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware for static files
app.use(express.static('public'));
app.use(express.json());

// Socket.io setup
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });

    // Handle incoming messages
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg); // Broadcast message to all clients
    });
});

// Set up routes
app.get('/', (req, res) => res.sendFile(__dirname + '/public/index.html'));

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});