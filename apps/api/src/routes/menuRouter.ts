import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import { createMenuItem, updateMenuItemName } from '../controllers/menuController';

const router = express.Router();

router.post('/add_menu_item', createMenuItem)
router.patch('/change_menu_item_name', updateMenuItemName)
router.get('/check_health', checkHealth);

export default router;
