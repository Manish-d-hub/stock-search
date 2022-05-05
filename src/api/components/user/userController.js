import { createSendToken } from '../../middleware/auth.js';
import logger from '../../middleware/logger.js';
import AppError from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { createOneUser, loginCurrUser } from './userService.js';

export const createUser = catchAsync(async (req, res) => {
  logger.info('inside createUser controller');
  const { email, password, passwordConfirm, role } = req.body;
  const newUser = await createOneUser(email, password, passwordConfirm, role);

  if (newUser.err) throw new AppError(newUser.err, newUser.statusCode);

  createSendToken(newUser, 200, res);
});

export const loginUser = catchAsync(async (req, res) => {
  logger.info('inside loginUser controller');
  const { email, password } = req.body;
  if (!email || !password)
    throw new AppError('Please provide email and password', 400);

  const user = await loginCurrUser(email, password);

  if (user.err) throw new AppError(user.err, user.statusCode);

  createSendToken(user, 200, res);
});
