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
import { auth } from 'express-oauth2-jwt-bearer';

const router = express.Router();

const checkJwt = auth({
  audience: 'https://mighty-atoll-05391.herokuapp.com/api',
  issuerBaseURL: `https://dev-iukg50h5.us.auth0.com/`,
});

router.post('/create-store/:storeName', checkJwt, createStore);
router.get('/all-stores', getAllStores);
router.get('/all-stores-with-menu', getAllStoresWithMenu);
router.get('/:storeName', getStore);
router.delete('/:storeName', removeMenuItemFromStore);
router.post('/:storeName', addMenuItemToStore);
router.patch('/:storeName/update-price', updateMenuItemPrice);
router.patch('/:storeName/retire-item', updateMenuItemRetired);
router.get('/check-health', checkHealth);

export default router;
