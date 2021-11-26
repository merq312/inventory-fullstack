import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import { addMenuItemToStore, updateMenuItemPrice, getStore } from '../controllers/storeController';

const router = express.Router();

router.get('/:name', getStore);
// router.delete('/:storeName/:menuItemName', );
router.post('/add_item', addMenuItemToStore);
router.patch('/change_item_price', updateMenuItemPrice);
router.get('/check_health', checkHealth);

export default router;
