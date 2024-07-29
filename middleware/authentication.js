const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { UnauthenticatedError, CustomAPIError } = require('../errors');

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Invalid Token');
  }

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // const user = User.findById(payload.id).select('-password') //This finds the user by the id and removes the password when importing it

    req.user = { userId: payload.userId, name: payload.name }; //This makes the next req.user in jobs.js this
    next();
  } catch (error) {
    throw new UnauthenticatedError('Invalid Token');
  }
};

module.exports = auth;
