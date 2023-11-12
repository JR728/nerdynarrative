const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

// Home route - Get all blog posts for the homepage feed
router.get('/', async (req, res) => {
  try {
    const dbBlogPostData = await BlogPost.findAll({
      attributes: ['id', 'title', 'created_at', 'post_text'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const blogPosts = dbBlogPostData.map((post) => post.get({ plain: true }));

    res.render('homepage', { blogPosts, signedIn: req.session.signedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/signup', (req, res) => {
    // If the user goes to the '/signin' route but is already signed in, redirect to the homepage
    if (req.session.loggedIn) {
      return res.redirect('/');
    }
    res.render('signup');
  });

module.exports = router;
