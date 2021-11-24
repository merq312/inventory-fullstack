import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import { getAllProductsCount} from '../controllers/productController';

const router = express.Router();

router.get('/:store_name', getAllProductsCount);
router.get('/:store_name/:date', getAllProductsCount);

router.get('/check_health', checkHealth);

export default router;
