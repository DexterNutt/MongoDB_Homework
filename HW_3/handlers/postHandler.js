const Post = require('../pkg/posts/postSchema');
const mail = require('./emailHandler');

exports.getAll = async (req, res) => {
  try {
    // How to search from route
    // Step 1: copy the object req.query
    const queryObj = { ...req.query };
    let queryString = JSON.stringify(queryObj);

    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      match => `$${match}`
    );
    const query = JSON.parse(queryString);

    let posts = await Post.find(query);
    res.status(200).json({
      status: 'success',
      data: {
        posts,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.replace = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      overwrite: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        post,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.create = async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.delete = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({ status: 'fail', message: err });
  }
};

exports.createByUser = async (req, res, next) => {
  try {
    const createPost = await Post.create({
      title: req.body.title,
      post: req.body.post,
      date: req.body.date,
      author: req.auth.id,
    });

    res.status(201).json(createPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getByUser = async (req, res, next) => {
  try {
    const userId = req.auth.id;

    const myPosts = await Post.find({ author: userId });

    res.status(201).json(myPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const averageYear = async (req, res) => {
//   try {
//     const result = await Movie.aggregate([
//       {
//         $group: {
//           _id: null,
//           averageYear: { $avg: '$year' },
//         },
//       },
//     ]);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
