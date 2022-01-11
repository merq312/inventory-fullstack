import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import {
  addMenuItemToStore,
  createStore,
  getAllStores,
  getAllStoresWithMenu,
  getStore,
  removeMenuItemFromStore,
  updateMenuItemPrice,
  updateMenuItemRetired,
} from '../controllers/storeController';

const router = express.Router();

router.post('/create-store/:storeName', createStore);
router.get('/all-stores', getAllStores);
router.get('/all-stores-with-menu', getAllStoresWithMenu);
router.get('/:storeName', getStore);
router.delete('/:storeName', removeMenuItemFromStore);
router.post('/:storeName', addMenuItemToStore);
router.patch('/:storeName/update-price', updateMenuItemPrice);
router.patch('/:storeName/retire-item', updateMenuItemRetired);
router.get('/check-health', checkHealth);

export default router;
