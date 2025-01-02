const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Mood = require('../models/mood');
const Progress = require('../models/progress');

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';

// Register Route
router.post('/register', async (req, res) => {
    const { name, email, password, age, hobbies, mentalHealthConcerns } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).send({ error: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        age,
        hobbies: hobbies.split(','),
        mentalHealthConcerns: mentalHealthConcerns.split(','),
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

    res.header('auth-token', token).send({ token, message: 'Registration successful' });
});

// Login Route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).send({ error: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send({ error: 'Invalid password' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.header('auth-token', token).send({ token, message: 'Login successful' });
});

// Log Mood
router.post('/log-mood', async (req, res) => {
    const { mood } = req.body;

    const newMood = new Mood({
        userId: req.user.id, // Assuming middleware for authentication is applied
        mood,
    });

    await newMood.save();
    res.send({ message: 'Mood logged successfully' });
});

// Update Progress
router.post('/update-progress', async (req, res) => {
    const progress = await Progress.findOne({ userId: req.user.id });
    progress.points += 10;

    if (progress.points >= 100 && !progress.badges.includes('Mental Health Advocate')) {
        progress.badges.push('Mental Health Advocate');
    }

    await progress.save();
    res.send({ message: 'Progress updated successfully', progress });
});

module.exports = router;
