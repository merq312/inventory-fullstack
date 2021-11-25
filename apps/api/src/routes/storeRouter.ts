import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import { addItemToStore, editItemPrice, getStore } from '../controllers/storeController';

const router = express.Router();

router.get('/:name', getStore);
// router.delete('/:storeName/:menuItemName', );
router.post('/add_item', addItemToStore);
router.patch('/change_item_price', editItemPrice);
router.get('/check_health', checkHealth);

export default router;
