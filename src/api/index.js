import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';

import globalErrorHandler from './middleware/errorHandler.js';
import logger from './middleware/logger.js';
import indexRouter from './components/router.js';

const app = express();

const __dirname = path.resolve();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/frontend/views'));
app.use(express.static(path.join(__dirname, 'src/frontend/public')));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use('/api/v1', indexRouter);

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Listening on ...${port}...`);
});

export default app;
