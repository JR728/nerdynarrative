const router = require('express').Router();
const { BlogPost, User } = require('../models');
const withAuth = require('../utils/auth');

// Dashboard route - Get user-specific data
router.get('/', withAuth, async (req, res) => {
  try {
    const dbBlogPostData = await BlogPost.findAll({
      where: {
        user_id: req.session.userId
      },
      attributes: ['id', 'title', 'created_at', 'post_text'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const posts = dbBlogPostData.map(post => post.get({ plain: true }));

    res.render('dashboard', { posts, signedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route lets the user create a new post:
router.get('/create', withAuth, async (req, res) => {
  try {
    const dbPostData = await BlogPost.findAll({
      where: {
        user_id: req.session.userId
      },
      attributes: ['id', 'title', 'created_at', 'post_text'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    });

    const posts = dbPostData.map(post => post.get({ plain: true }));

    res.render('create-blogpost', { posts, signedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
