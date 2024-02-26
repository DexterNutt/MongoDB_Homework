const Post = require('../pkg/posts/postSchema');

exports.getLoginForm = async (req, res) => {
  try {
    res.status(200).render('login');
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.postView = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).render('viewPosts', {
      status: 'success',
      title: 'HBO',
      posts,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
