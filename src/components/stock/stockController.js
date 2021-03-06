import logger from '../../middleware/logger.js';
import AppError from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';
import { getOneStock, upadteDbStocks } from './stockService.js';

export const renderSearch = (req, res) => {
  logger.info('inside renderSearch controller');
  res.render('search');
};

export const getStock = catchAsync(async (req, res) => {
  logger.info('Inside getStock controller');
  const { symbol } = req.query;
  const stock = await getOneStock(symbol);

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
