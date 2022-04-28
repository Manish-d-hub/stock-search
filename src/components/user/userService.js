import logger from '../../middleware/logger.js';
import User from './userModel.js';

export const createOneUser = async (email, password, passwordConfirm, role) => {
  logger.info('Inside createOneUser service');

  const existigUser = await User.findOne({ email });
  if (existigUser)
    return {
      err: 'User already exists! Please register with different email',
      statusCode: 400,
    };

  const newUser = await User.create({ email, password, passwordConfirm, role });
  return newUser;
};

export const loginCurrUser = async (email, password) => {
  logger.info('Inside loginCurrUser service');
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return { err: 'Incorrect email or password!', statusCode: 401 };
  }

  return user;
};
