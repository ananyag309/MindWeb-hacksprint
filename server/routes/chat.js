const express = require('express');
const router = express.Router();
const Chat = require('../models/chat');

// Fetch chat messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await Chat.find({}).sort({ timestamp: -1 }).limit(50); // Fetch recent messages
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve messages' });
    }
});

// Post a new chat message
router.post('/messages', async (req, res) => {
    const { userId, message } = req.body;

    try {
        const newMessage = new Chat({
            userId,
            message,
            timestamp: new Date(),
        });
        await newMessage.save();
        res.status(201).send({ message: 'Message sent successfully', data: newMessage });
    } catch (error) {
        res.status(500).send({ error: 'Failed to send message' });
    }
});

// Fetch chat history by user
router.get('/messages/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
        const userMessages = await Chat.find({ userId }).sort({ timestamp: -1 });
        res.status(200).send(userMessages);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve user messages' });
    }
});

module.exports = router;
