import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import AppError from '../utils/AppError.js';
import User from '../components/user/userModel.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createToken = (id) => {
  const accessToken = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return accessToken;
};

export const createSendToken = (user, statusCode, res) => {
  const token = createToken(user.id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

export const protectRoute = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    throw new AppError(
      'You are not logged in! Please log in to get access',
      401
    );
  }

  const userToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currUser = await User.findById(userToken.id);
  if (!currUser) {
    throw new AppError(
      'The user belonging to this token no longer exist.',
      401
    );
  }

  req.user = currUser;
  res.locals.user = currUser;
  next();
});
