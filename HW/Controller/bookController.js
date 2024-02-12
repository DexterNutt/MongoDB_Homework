const Book = require('../Model/bookModel');

exports.addNewBook = async (req, res) => {
  try {
    console.log(req.body);
    const newBook = await Book.create(req.body);
    res.status(201).json({
      status: 'success',
    });
  } catch (error) {
    console.error('Error adding new Book:', error.message);
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    console.log(req.params);
    const books = await Book.find();
    res.status(200).json({
      status: 'success',
      data: { books: books },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
