//blogpostRoutes.js
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
    console.log(dbBlogPostData);

    const blogPosts = dbBlogPostData.map((post) => {
        return {
          id: post.id,
          title: post.title,
          created_at: post.created_at,
          post_text: post.post_text,
          // Access username directly from the User model
          username: post.User.username
        };
    });

    res.render('homepage', { blogPosts, signedIn: req.session.signedIn });
    res.json(dbBlogPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Route creates a new post for the BlogPost model:
router.post('/create', withAuth, async (req, res) => {
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

router.get('/:id/edit', withAuth, async (req, res) => {
    try {
        const dbBlogPostData = await BlogPost.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });
      
        if (!dbBlogPostData) {
            res.status(404).json({ message: 'No post found with this id' });
                return;
        }
      
        const post = dbBlogPostData.get({ plain: true });
      
        res.render('edit-blogpost', { postId: req.params.id, ...post, signedIn: true });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Route to handle updating a specific post
router.put('/:id/update', withAuth, async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, post_text } = req.body;
  
        const [updatedRows] = await BlogPost.update(
            { title, post_text },
            {
                where: {
                id: postId,
                user_id: req.session.userId,
                },
            }
        );
  
        if (updatedRows > 0) {
            res.status(200).json({ message: 'Post updated successfully' });
        } else {
            res.status(404).json({ message: 'Post not found or user unauthorized' });
        }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
});

// Route to delete a post for the BlogPost model
router.delete('/:id/delete', withAuth, async (req, res) => {
    try {
        const postId = req.params.id;

        // Delete the post
        await BlogPost.destroy({
            where: {
                id: postId,
                user_id: req.session.userId,
            },
        });

        // Respond with success
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;
