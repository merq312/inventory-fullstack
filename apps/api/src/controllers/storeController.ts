import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findStore(store_name) {
  return await prisma.store.findUnique({
    where: { name: store_name }
  });
}

export async function getStore(req, res, next) {
  const { storeName } = req.params;
  const store = await findStore(storeName);

  return store
    ? res.status(200).json({
      status: 'success',
      data: store
    })
    : next();
}

async function createMenuItemOnStore(store, menuItem, price) {
  return await prisma.menuItemsOnStores.create({
    data: {
      storeId: store.id,
      menuItemId: menuItem.id,
      price: parseFloat(price)
    }
  });
}

async function updateMenuItemOnStore(store, menuItem, price) {
  return await prisma.menuItemsOnStores.updateMany({
    where: {
      storeId: store.id,
      menuItemId: menuItem.id,
    },
    data: {
      price: parseFloat(price)
    }
  });
}

async function storeItemHelper(req, res, next, databaseFunction) {
  const { storeName, menuItemName, price } = req.params;

  const [menuItemOnStore] = await Promise.all([
    Promise.all([
      prisma.store.findUnique({ where: { name: storeName } }),
      prisma.menuItem.findUnique({ where: { name: menuItemName } })])
      .then(([store, menuItem]) => databaseFunction(store, menuItem, price))
      .catch(() => null)]);

  return menuItemOnStore
    ? res.status(200).json({
      status: 'success',
      data: menuItemOnStore
    })
    : next();
}

export async function addItemToStore(req, res, next) {
  return await storeItemHelper(req, res, next, createMenuItemOnStore);
}

export async function editItemPrice(req, res, next) {
  return await storeItemHelper(req, res, next, updateMenuItemOnStore);
}
