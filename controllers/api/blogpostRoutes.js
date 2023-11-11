const router = require('express').Router();
const { BlogPost, User } = require('../../models');
const withAuth = require('../../utils/auth');

// Route searches BlogPost and User models to get posts for homepage feed:
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

    res.json(dbBlogPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route creates a new post for the BlogPost model:
router.get('/create', withAuth, async (req, res) => {
  try {
    const { title, post_text } = req.body;

    // Assuming that the session contains userId
    const dbBlogPostData = await BlogPost.create({
      title,
      post_text,
      user_id: req.session.userId
    });

    res.json(dbBlogPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
