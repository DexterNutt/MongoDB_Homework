const Advert = require('./advertisementSchema');

exports.createAdvert = async (req, res) => {
  try {
    const newAdvert = await Advert.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        advert: newAdvert,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.getAllAdverts = async (req, res) => {
  try {
    const adverts = await Advert.find();
    res.status(201).json({
      status: 'success',
      data: {
        adverts: adverts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.getAdvert = async (req, res) => {
  try {
    const id = req.params.id;
    // const title = req.params.title;
    const advert = await Advert.findById(id);

    res.status(200).json({
      status: 'success',
      data: {
        advert: advert,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.deleteAdvert = async (req, res) => {
  try {
    const id = req.params.id;
    await Advert.findByIdAndDelete(id);
    res.status(201).json({
      status: 'success',
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};

exports.updateAdvert = async (req, res) => {
  try {
    const id = req.params.id;
    const advert = await Advert.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    Advert.findByIdAndUpdate({ slug: req.params.slug });

    res.status(200).json({
      status: 'success',
      data: {
        advert: advert,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message,
    });
  }
};
