import { Router } from 'express';
import { stockRouter } from './stock/stockRoute.js';
import { userRouter } from './user/userRoute.js';

const router = Router();

router.use('/user', userRouter);
router.use('/stocks', stockRouter);

export default router;
