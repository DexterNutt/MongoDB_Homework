const Actor = require('../Model/actorModel');

exports.addNewActor = async (req, res) => {
  try {
    console.log(req.body);
    const newActor = await Actor.create(req.body);
    res.status(201).json({
      status: 'success',
    });
  } catch (error) {
    console.error('Error adding new Actor:', error.message);
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

exports.getActors = async (req, res) => {
  try {
    console.log(req.params);
    const actors = await Actor.find();
    res.status(200).json({
      status: 'success',
      data: { actors: actors },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
