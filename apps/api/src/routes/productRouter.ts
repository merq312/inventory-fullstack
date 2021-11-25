import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import { getProductsCount } from '../controllers/productController';

const router = express.Router();

router.get('/:storeName', getProductsCount);
// router.patch('/:storeName', editProductsCount);
router.get('/:storeName/:date', getProductsCount);
// router.patch('/:storeName/:date', editProductsCount);
router.get('/check_health', checkHealth);

export default router;
