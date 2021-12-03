import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import {
  addMenuItemToStore,
  updateMenuItemPrice,
  getStore,
  removeMenuItemFromStore,
  getAllStores,
} from '../controllers/storeController';

const router = express.Router();

router.get('/all-stores', getAllStores);
router.get('/:storeName', getStore);
router.delete('/:storeName', removeMenuItemFromStore);
router.post('/:storeName', addMenuItemToStore);
router.patch('/:storeName', updateMenuItemPrice);
router.get('/check-health', checkHealth);

export default router;
