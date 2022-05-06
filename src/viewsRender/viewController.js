import { getOneStock } from '../api/components/stock/stockService.js';
import logger from '../api/middleware/logger.js';

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

export const getData = async (req, res) => {
  logger.info('inside getData controller');
  const { symbol } = req.body;
  const { id } = req.user;
  const stock = getOneStock(symbol, id);

  if (stock.err) throw new AppError(stock.err, stock.statusCode);

  const stockData = stock.weeklyData;

  console.log(stockData);
};
