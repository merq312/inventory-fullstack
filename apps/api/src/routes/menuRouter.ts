import * as express from 'express';
import { checkHealth } from '../controllers/miscController';
import { addMenuItem, editMenuItemName } from '../controllers/menuController';

const router = express.Router();

router.post('/:name', addMenuItem)
router.patch('/:oldName/:newName', editMenuItemName)
router.get('/checkHealth', checkHealth);

export default router;
