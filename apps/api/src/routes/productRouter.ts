import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import { getAllProductsCount} from '../controllers/productController';

const router = express.Router();

router.get('/:storeName', getAllProductsCount);
router.get('/:storeName/:date', getAllProductsCount);
router.get('/checkHealth', checkHealth);

export default router;
