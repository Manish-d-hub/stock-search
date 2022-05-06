import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import methodOverride from 'method-override';

import globalErrorHandler from './middleware/errorHandler.js';
import logger from './middleware/logger.js';
import indexRouter from './components/router.js';
import { viewRouter } from '../viewsRender/viewRoute.js';

const app = express();

const __dirname = path.resolve();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));
app.use(express.static(path.join(__dirname, 'src/public')));

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(cookieParser());

app.use('/', viewRouter);
app.use('/api/v1', indexRouter);

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  logger.info(`Listening on ...${port}...`);
});

export default app;
