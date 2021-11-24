import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import { getProductCount } from '../controllers/productController';

const router = express.Router();

// router.get('/:store_name', getProductCount);
// router.get('/:store_name/:date', getProductCount);
router.get('/:store_name/:product_name', getProductCount);
router.get('/:store_name/:product_name/:date', getProductCount);

router.get('/check_health', checkHealth);

export default router;
