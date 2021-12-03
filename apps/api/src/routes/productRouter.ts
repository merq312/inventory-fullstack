import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import {
  updateProductCounts,
  getProductCounts,
} from '../controllers/productController';

const router = express.Router();

router.get('/:storeName', getProductCounts);
router.patch('/:storeName', updateProductCounts);
router.get('/:storeName/:date', getProductCounts);
router.patch('/:storeName/:date', updateProductCounts);
router.get('/check_health', checkHealth);

export default router;
