import { Router } from 'express';
import { authorizeTo, protectRoute } from '../../middleware/auth.js';
import { userSearchHistory } from './searchController.js';

const router = Router();

router.use(protectRoute, authorizeTo('admin'));
router.get('/user-search-history/:id', userSearchHistory);

export { router as searchHistoryRouter };
