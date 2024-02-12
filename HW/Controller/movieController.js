const Movie = require('../Model/movieModel');

exports.addNewMovie = async (req, res) => {
  try {
    console.log(req.body);
    const newMovie = await Movie.create(req.body);
    res.status(201).json({
      status: 'success',
      //   data: {
      //     movie: newMovie,
      //   },
    });
  } catch (error) {
    console.error('Error adding new movie:', error.message);
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getMovies = async (req, res) => {
  try {
    console.log(req.params);
    const movies = await Movie.find();
    res.status(200).json({
      status: 'success',
      data: { movies: movies },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};
