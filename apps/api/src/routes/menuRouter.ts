import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import {
  addMenuItem,
  changeMenuItemName,
  getAllMenuItems,
} from '../controllers/menuController';

const router = express.Router();

router.get('/all-menu-items', getAllMenuItems);
router.post('/', addMenuItem);
router.patch('/', changeMenuItemName);
router.get('/check-health', checkHealth);

export default router;
