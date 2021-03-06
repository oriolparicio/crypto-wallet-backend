// COmponents
import User from '../model/User.js';
import APIError from '../utils/apiError.js';
import jwt from 'jsonwebtoken';

// Utils
import { checkHeadersAuthentification } from '../utils/authChecks.js';

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

// Check if valid Token
const protect = async (req, res, next) => {
  // Get the token
  let token;
  if (checkHeadersAuthentification(req)) {
    // Split Bearer keyword from the token
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    // User is not authorized
    res.status(401).send({
      message: 'You are not logged in.',
    });
    throw new APIError('You are not logged in', 401);
  }

  let decoded;
  try {
    // Validate the token (will cause an error if the token has expired or has been hardcoded)
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401).send({
      message: 'Unauthorized.',
    });
    throw new APIError('Unauthorized', 401, error);
  }

  // Check if the user still exists
  const user = await User.findById(decoded.id);
  if (!user) {
    res.status(401).send({
      message: 'The user belonging to this token does no longer exist.',
    });
    throw new APIError(
      'The user belonging to this token does no longer exist.',
      401
    );
  }

  // Grant access to protected routes
  req.user = user;

  next();
};

export { login, protect };
