const Post = require('../pkg/posts/postSchema');

exports.getLoginForm = async (req, res) => {
  try {
    res.status(200).render('login');
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.postsView = async (req, res) => {
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

exports.singlePostView = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);
    res.status(200).render('singlePost', {
      status: 'success',
      title: post.title,
      post,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
