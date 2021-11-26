import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import {
  addMenuItemToStore,
  updateMenuItemPrice,
  getStore,
  removeMenuItemFromStore
} from '../controllers/storeController';

const router = express.Router();

router.get('/', getStore);
router.delete('/', removeMenuItemFromStore);
router.post('/', addMenuItemToStore);
router.patch('/', updateMenuItemPrice);
router.get('/check-health', checkHealth);

export default router;
