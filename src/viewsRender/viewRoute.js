import { Router } from 'express';
import { protectRoute } from '../api/middleware/auth.js';
import {
  renderRegister,
  renderSearch,
  renderlogin,
  getData,
} from './viewController.js';

const router = Router();

router.get('/register', renderRegister);
router.get('/login', renderlogin);

router.get('/search',protectRoute, renderSearch);
router.post('/display-chart',protectRoute, getData);

export { router as viewRouter };
