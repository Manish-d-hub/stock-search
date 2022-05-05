import logger from '../../middleware/logger.js';
import Search from './searchModel.js';

export const getSearchHistory = async (userId) => {
  logger.info('Inside getSearchHistory service');
  const searchedStocks = await Search.find({ userId });

  if (!searchedStocks)
    return { err: "User haven't searched for anything", statusCode: 404 };

  return searchedStocks;
};
