import mongoose from 'mongoose';

import logger from '../../middleware/logger.js';

const DB = process.env.DATABASE.replace('<password>', process.env.DB_PASS);

// Create the database connection
const db = mongoose.createConnection(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// on successfull connection
db.on('connected', () => {
  logger.info('Mongoose connection open for DATABASE');
});

// If connection throws an error
db.on('error', (err) => {
  logger.debug('Mongoose connection error for DATABASE:', err);
});

// When the connection is disconnected
db.on('disconnected', () => {
  logger.debug('Mongoose connection disconnected for DATABASE');
});

// When connection is reconnected
db.on('reconnected', () => {
  logger.info('Mongoose connection reconnected to DATABASE');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  db.close(() => {
    logger.debug(
      'Mongoose connection disconnected for DATABASE through app termination'
    );
  });
  process.exit(0);
});

export default db;
