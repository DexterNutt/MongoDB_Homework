const User = require('../pkg/users/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //? 1. Check if Password and email is entered
    if (!email || !password) {
      res.status(400).send('Please add an e-mail and password!');
    }
    //? 2. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).send('Invalid e-mail or password!');
    }
    //? 3. Compare the password
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      res.status(400).send(`Password and email don't match!`);
    }

    //? 4. Generate and send a token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES,
      }
    );

    //? 5. Send Cookies with the token
    res.cookie('jwt', token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      secure: false,
      httpOnly: true,
    });

    //? 6. Send final response with status and token
    res.status(201).json({
      status: 'success',
      token,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
