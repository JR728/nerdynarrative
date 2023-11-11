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

// Example of a route that requires authentication (similar to dashboard)
router.get('/authenticated-route', withAuth, async (req, res) => {
  try {
    // Your logic for an authenticated route goes here
    res.render('authenticated', { signedIn: req.session.signedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
