import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import { addItemToStore, editItemPrice, getStore } from '../controllers/storeController';

const router = express.Router();

router.get('/:storeName', getStore);
router.post('/:storeName/:menuItemName/:price', addItemToStore);
router.patch('/:storeName/:menuItemName/:price', editItemPrice);
router.get('/checkHealth', checkHealth);

export default router;
