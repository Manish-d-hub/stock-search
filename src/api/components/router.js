import { Router } from 'express';

import { searchHistoryRouter } from './search/searchRoutes.js';
import { stockRouter } from './stock/stockRoute.js';
import { userRouter } from './user/userRoute.js';

const router = Router();

router.use('/user', userRouter);
router.use('/stocks', stockRouter);
router.use('/history', searchHistoryRouter);

export default router;
