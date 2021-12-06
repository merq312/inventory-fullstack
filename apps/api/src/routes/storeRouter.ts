import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import {
  addMenuItemToStore,
  getAllStoresWithMenu,
  getStore,
  removeMenuItemFromStore,
  updateMenuItemPrice,
} from '../controllers/storeController';

const router = express.Router();

router.get('/all-stores-with-menu', getAllStoresWithMenu);
router.get('/:storeName', getStore);
router.delete('/:storeName', removeMenuItemFromStore);
router.post('/:storeName', addMenuItemToStore);
router.patch('/:storeName', updateMenuItemPrice);
router.get('/check-health', checkHealth);

export default router;
