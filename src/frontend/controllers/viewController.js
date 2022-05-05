import logger from '../../api/middleware/logger.js';

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
