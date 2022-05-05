import { Router } from 'express';
import { protectRoute } from '../../api/middleware/auth.js';
import {
  renderRegister,
  renderSearch,
  renderlogin,
} from '../controllers/viewController.js';

const router = Router();

// router.use(protectRoute);
router.get('/register', renderRegister);
router.get('/login', renderlogin);
router.get('/search', renderSearch);

export { router as viewRouter };
