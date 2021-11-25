import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import { addMenuItem, editMenuItemName } from '../controllers/menuController';

const router = express.Router();

router.post('/:name', addMenuItem)
router.post('/:oldName/:newName', editMenuItemName)
router.get('/check_health', checkHealth);

export default router;
