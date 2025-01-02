const express = require('express');
const router = express.Router();
const path = require('path');

// Serve homepage
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Serve specific pages
router.get('/:page', (req, res) => {
    const page = req.params.page;
    const filePath = path.join(__dirname, `../../public/${page}.html`);
    res.sendFile(filePath, (err) => {
        if (err) {
            res.status(404).send({ error: 'Page not found' });
        }
    });
});

// Serve user dashboard
router.get('/dashboard', async (req, res) => {
    try {
        const user = await User.findById(req.user.id); // Assuming authentication middleware
        res.render('dashboard', {
            username: user.name,
            age: user.age,
            hobbies: user.hobbies,
            mentalHealthConcerns: user.mentalHealthConcerns,
        });
    } catch (error) {
        res.status(500).send({ error: 'Unable to fetch user data' });
    }
});

module.exports = router;
