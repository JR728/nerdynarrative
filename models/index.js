const User = require('./User');
const BlogPost = require('./BlogPost');
const PostComment = require('./PostComments')
// Assocations:
//blogpost+comment
BlogPost.hasMany(PostComment, {
    foreignKey: 'blogpost_id'
});

PostComment.belongsTo(BlogPost, {
    foreignKey: 'blogpost_id'
});
//user+comment
User.hasMany(PostComment, {
    foreignKey: 'user_id'
});

PostComment.belongsTo(User, {
    foreignKey: 'user_id'
});
//user+blog post
User.hasMany(BlogPost, {
    foreignKey: 'user_id'
});

BlogPost.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, BlogPost, PostComment };