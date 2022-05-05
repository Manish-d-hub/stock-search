import { Router } from 'express';
import { protectRoute } from '../api/middleware/auth.js';
import {
  renderRegister,
  renderSearch,
  renderlogin,
  getData,
} from './viewController.js';

const router = Router();

// router.use(protectRoute);
router.get('/register', renderRegister);
router.get('/login', renderlogin);

router.use(protectRoute);
router.get('/search', renderSearch);
router.post('/display-chart', getData);

export { router as viewRouter };
