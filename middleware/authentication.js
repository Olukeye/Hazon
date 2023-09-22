const CustomError = require('../errors');
const { promisify } = require('util');
const User = require('./../models/user');
const jwt = require('jsonwebtoken');

const authenticateUser = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new CustomError.UnauthenticatedError('You are not login, please log in');
  }

  const decodedToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currentUser = await User.findById(decodedToken.userId);
  // console.log(19, currentUser);
  if (!currentUser) {
    throw new CustomError.UnauthenticatedError('The user doesnt exists');
  }

  if (currentUser.changedPasswordAfter(decodedToken.iat)) {
    throw new CustomError.UnauthenticatedError(
      'User recently changed password! please log in again'
    );
  }
  req.user = req.user = {
    firstname: currentUser.firstname,
    lastname: currentUser.lastname,
    userId: currentUser._id,
    role: currentUser.role
  };
  next();
};

const authorize = async(...roles) => {

  console.log(roles);
  return (req, _res, next) => {
    console.log(req.user);

    if (roles?.includes(req.user.role_id)) {
      throw new CustomError.UnauthorizedError(
        'You do not have access to perform the operation!'
      );
    }
    next();
  };
};


const adminMiddleware = (req, _role, res, next) => {

  if (req.userId.role !== 'admin') {
    return res.status(400).json({ message: "Access denied" });
  }
  next();
};

module.exports = {
  authenticateUser,
  authorize,
  adminMiddleware
};
