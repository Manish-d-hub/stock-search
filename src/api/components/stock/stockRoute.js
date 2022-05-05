import { Router } from 'express';
import { authorizeTo, protectRoute } from '../../middleware/auth.js';
import { getStock, updateStock } from './stockController.js';

const router = Router();

router.use(protectRoute);

router.post('/stock-search', getStock);
router.put('/update-stocks', authorizeTo('admin'), updateStock);

export { router as stockRouter };
