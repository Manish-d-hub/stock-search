import { getOneStock } from '../api/components/stock/stockService.js';
import logger from '../api/middleware/logger.js';
import AppError from '../api/utils/AppError.js';
import { catchAsync } from '../api/utils/catchAsync.js';

export const renderRegister = (req, res) => {
  logger.info('inside renderRegister controller');
  res.render('register', { title: 'User sign up' });
};

export const renderlogin = (req, res) => {
  logger.info('inside renderlogin controller');
  res.render('login', { title: 'Log into your account' });
};

export const renderSearch = (req, res) => {
  logger.info('inside renderSearch controller');
  res.render('search', { title: 'Stock search' });
};

export const getData = catchAsync(async (req, res) => {
  logger.info('inside getData controller');
  const { symbol } = req.body;
  const { id } = req.user;
  const stock = await getOneStock(symbol.toUpperCase(), id);

  if (stock.err) throw new AppError(stock.err, stock.statusCode);

  const stockData = stock.weeklyData;
  // return stockData
  const dates = Object.keys(stockData[0]);
  const prices = Object.values(stockData[0]);

  res.render('chart', { title: 'Stock Chart', dates, prices });
});


// export const renderChart = (req, res) => {
//   logger.info('inside renderChart controller');
//   res.render('chart', { title: 'Stock chart' });
// };