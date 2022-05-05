import { Router } from 'express';
import { createUser, loginUser } from './userController.js';

const router = Router();

router.post('/create-user', createUser);

router.post('/login', loginUser);

export { router as userRouter };
