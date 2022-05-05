import logger from '../../middleware/logger.js';
import AppError from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { getOneStock, upadteDbStocks } from './stockService.js';

export const getStock = catchAsync(async (req, res) => {
  logger.info('Inside getStock controller');
  const { symbol } = req.query;
  const { id } = req.user;
  const stock = await getOneStock(symbol, id);

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

  res.status(200).json({
    status: 'success',
    data: updatedStock,
  });
});
