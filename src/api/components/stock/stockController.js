import cron from 'node-cron';

import logger from '../../middleware/logger.js';
import AppError from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { getOneStock, upadteDbStocks } from './stockService.js';

export const getStock = catchAsync(async (req, res) => {
  logger.info('Inside getStock controller');
  const { symbol } = req.query;
  const { id } = req.user;
  const stock = await getOneStock(symbol.toUpperCase(), id);

  if (stock.err) throw new AppError(stock.err, stock.statusCode);

  res.status(200).json({
    status: 'success',
    data: stock,
  });
});

export const updateStock = catchAsync(async (req, res) => {
  logger.info('Inside updateStock controller');
  // const { symbol } = req.query;
  const updatedStock = await upadteDbStocks();

  if (updatedStock.err)
    throw new AppError(updatedStock.err, updatedStock.statusCode);

  logger.info('Stocks updated in DB');
});

cron.schedule('15 10 * * *', updateStock);
