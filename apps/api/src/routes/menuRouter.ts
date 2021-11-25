import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import { addMenuItem, editMenuItemName } from '../controllers/menuController';

const router = express.Router();

router.post('/add_menu_item', addMenuItem)
router.patch('/change_menu_item_name', editMenuItemName)
router.get('/check_health', checkHealth);

export default router;
