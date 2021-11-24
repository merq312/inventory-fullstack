import { PrismaClient } from '@prisma/client';
import * as express from 'express';
import { checkHealth } from '../controllers/miscController';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:store_name/:product_name', async (req, res, next) => {
  const { store_name, product_name } = req.params;

  const store = await prisma.store.findUnique({
    where: { name: store_name }
  });
  const menuItem = await prisma.menuItem.findUnique({
    where: { name: product_name }
  });

  if (store && menuItem) {
    const menuItemOnStore =
      await prisma.menuItemsOnStores.findFirst({
        where: {
          menuItemId: menuItem.id,
          storeId: store.id
        }
      });

    const menuItemOnStoreCount = await prisma.productCount.findFirst({
      where: {
        menuItemOnStoreId: menuItemOnStore.id,
        day: '2021-11-24T00:00:00.000Z'
      }
    });

    if (menuItemOnStoreCount) {
      return res.status(200).json({
        status: 'success',
        data: menuItemOnStoreCount
      });
    }
  }
  next();
});

router.get('/check_health', checkHealth);

export default router;
