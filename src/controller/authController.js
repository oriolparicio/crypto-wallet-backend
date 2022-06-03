import User from '../model/User.js';
import APIError from '../utils/apiError.js';

import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';

const signToken = (id) => {
  // Create JWT token
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

const createAndSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  // Define the cookie options for jwt
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXP * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  // Send the JWT through a cookie
  res.cookie('jwt', token, cookieOptions);

  // Hide the password from the response object
  user.password = undefined;

  res.status(statusCode).send({
    status: 'success',
    token: token,
    data: user,
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    if (!username || !password) {
      res.status(400).send({
        message: 'Please provide username and password.',
      });
      throw new APIError('Please provide username and password.', 400);
    }

  // Check if user exists and password is correct
  const user = await User.findOne({ username });
  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(401).send({
      message: 'Incorrect username or password.',
    });
    throw new APIError('Incorrect username or password.', 401);
  }

  // Send the token back to the client
  createAndSendToken(user, 200, res);
};
export { login };
