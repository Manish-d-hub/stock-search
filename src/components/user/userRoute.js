import { Router } from 'express';
import {
  createUser,
  loginUser,
  renderlogin,
  renderRegister,
} from './userController.js';

const router = Router();

router.get('/register', renderRegister);
router.post('/create-user', createUser);

router.get('/login', renderlogin);
router.post('/login', loginUser);

export { router as userRouter };
