const express = require('express');
const router = express.Router();
const Progress = require('../models/progress');

// Fetch user progress
router.get('/', async (req, res) => {
    try {
        const progress = await Progress.findOne({ userId: req.user.id }); // Assuming middleware for user authentication
        if (!progress) {
            return res.status(404).send({ error: 'Progress not found' });
        }
        res.status(200).send(progress);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch progress' });
    }
});

// Update user progress
router.post('/update', async (req, res) => {
    const { points } = req.body;

    try {
        let progress = await Progress.findOne({ userId: req.user.id });

        if (!progress) {
            progress = new Progress({
                userId: req.user.id,
                points: 0,
                badges: [],
            });
        }

        progress.points += points;

        // Award badges based on milestones
        if (progress.points >= 100 && !progress.badges.includes('Mental Health Advocate')) {
            progress.badges.push('Mental Health Advocate');
        }
        if (progress.points >= 500 && !progress.badges.includes('Resilience Pro')) {
            progress.badges.push('Resilience Pro');
        }

        await progress.save();
        res.status(200).send({ message: 'Progress updated successfully', progress });
    } catch (error) {
        res.status(500).send({ error: 'Failed to update progress' });
    }
});

// Reset user progress (admin feature)
router.post('/reset', async (req, res) => {
    try {
        const progress = await Progress.findOne({ userId: req.user.id });

        if (!progress) return res.status(404).send({ error: 'Progress not found' });

        progress.points = 0;
        progress.badges = [];
        await progress.save();

        res.status(200).send({ message: 'Progress reset successfully', progress });
    } catch (error) {
        res.status(500).send({ error: 'Failed to reset progress' });
    }
});

module.exports = router;
