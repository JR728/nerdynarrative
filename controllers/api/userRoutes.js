const router = require('express').Router();
const { User } = require('../../models');

// Route to handle user login:
router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    const userData = await User.findOne({ where: { username } });

    if (!userData || !userData.checkPassword(password)) {
      res.status(400).json({ message: 'Incorrect username or password' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.signedIn = true;

      res.json({ user: userData, message: 'Login successful.' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Route to handle user signup. Posts new username, password to database:
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this username already exists.' });
    }

    const userData = await User.create({ username, password });

    req.session.save(() => {
      req.session.userId = userData.id;
      req.session.signedIn = true;

      res.json({ user: userData, message: 'New user successfully added.' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Route to handle user signout:
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
