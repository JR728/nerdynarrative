// controllers/api/userRoutes.js
const router = require('express').Router();
const { User } = require('../../models');

router.post('/signup', async (req, res) => {
    try {
        if (req.session.signedIn) {
            return res.status(400).json({ message: 'You are already signed in.' });
        }

        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide username and password' });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
        }

        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this username already exists.' });
        }

        const userData = await User.create({ username, password });

        req.session.userId = userData.id;
        req.session.signedIn = true;

        req.session.save(() => {
            console.log("Session data:", req.session);
            res.redirect('/dashboard');
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { username, password } = req.body;

        const userData = await User.findOne({ where: { username } });

        if (!userData || !userData.checkPassword(password)) {
            return res.status(400).json({ message: 'Incorrect username or password' });
        }

        req.session.userId = userData.id;
        req.session.signedIn = true;

        req.session.save(() => {
            console.log("Session data:", req.session);
            res.redirect('/dashboard');
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.post('/signout', (req, res) => {
    if (req.session.signedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;
