import * as express from 'express';
import { checkHealth } from '../controllers/productController';

const router = express.Router();

router.get('/', checkHealth);

export default router;
