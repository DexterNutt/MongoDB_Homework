const Post = require('../pkg/posts/postSchema');

exports.getLoginForm = async (req, res) => {
  try {
    res.status(200).render('login');
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getSignupForm = async (req, res) => {
  try {
    res.status(200).render('signup');
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.postsView = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).render('viewPosts', {
      status: 'success',
      title: 'Twitter Clone',
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

exports.createPostView = async (req, res) => {
  try {
    res.render('createPost');
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createPost = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    console.log(req.body);
    res.status(201).send({ _id: newPost._id });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).send(error.message);
  }
};
