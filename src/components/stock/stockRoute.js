import { Router } from 'express';
import { protectRoute } from '../../middleware/auth.js';
import { getStock, renderSearch, updateStock } from './stockController.js';

const router = Router();

router.use(protectRoute);

router.get('/search', renderSearch);
router.post('/stock-search', getStock);

router.put('/update-stocks', updateStock);

export { router as stockRouter };
