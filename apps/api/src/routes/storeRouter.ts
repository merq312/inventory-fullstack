import * as express from 'express';
import { checkHealth } from '../controllers/miscController';

const router = express.Router();

router.get('/', checkHealth);

export default router;
