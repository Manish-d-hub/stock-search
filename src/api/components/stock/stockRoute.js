import { Router } from 'express';
import { authorizeTo, protectRoute } from '../../middleware/auth.js';
import { getStock, renderSearch, updateStock } from './stockController.js';

const router = Router();

// router.use(protectRoute);

router.get('/search', renderSearch);
router.post('/stock-search', getStock);

router.put('/update-stocks', authorizeTo('admin'), updateStock);

export { router as stockRouter };
