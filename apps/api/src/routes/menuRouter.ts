import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import { addMenuItem, changeMenuItemName } from '../controllers/menuController';

const router = express.Router();

router.post('/', addMenuItem)
router.patch('/', changeMenuItemName)
router.get('/check-health', checkHealth);

export default router;
