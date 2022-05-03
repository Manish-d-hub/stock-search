import logger from '../../../middleware/logger.js';
import AppError from '../../../utils/AppError.js';
import { catchAsync } from '../../../utils/catchAsync.js';
import { getSearchHistory } from './searchService.js';

export const userSearchHistory = catchAsync(async (req, res) => {
  logger.info('Inside userSearchHistory controller');
  const { id } = req.params;
  const history = await getSearchHistory(id);

  if (history.err) throw new AppError(history.err, history.statusCode);

  res.status(200).json({
    status: 'success',
    data: history,
  });
});
