const router = require('express').Router();
const { BlogPost, User, PostComment } = require('../models');
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
    
    console.log(blogPosts);

    res.render('homepage', { blogPosts, signedIn: req.session.signedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/post/:postid', async (req, res) => {
    try {
        const dbBlogPostData = await BlogPost.findByPk(req.params.postid,{
          attributes: ['id', 'title', 'created_at', 'post_text'],
          include: [
            {
              model: User,
              attributes: ['username']
            },
            {
                model:PostComment,
                attributes: ['comment_text'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
          ]
        });
    
        const blogPost = dbBlogPostData.get({ plain: true });
        
        console.log(blogPost);
    
        res.render('single-blogpost', { blogPost, signedIn: req.session.signedIn });
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

router.post('/blogpost/:postid/comment', async (req, res) => {
    try {
        const user_id = req.session.userId
        const dbBlogPostData = await PostComment.create({
            comment_text:req.body.comment,
            blogpost_id:req.params.postid,
            user_id
        })
    
        res.redirect(`/post/${req.params.postid}`);
      } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

router.get('/signup', (req, res) => {
    // If the user goes to the '/signup' route but is already signed in, redirect to the homepage
    if (req.session.loggedIn) {
      return res.redirect('/');
    }
    res.render('signup');
  });

module.exports = router;
