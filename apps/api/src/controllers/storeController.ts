import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function findStore(storeName) {
  return await prisma.store.findUnique({
    where: { name: storeName }
  });
}

async function findMenuItem(menuItemName) {
  return await prisma.menuItem.findUnique({
    where: { name: menuItemName }
  });
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
      menuItemId: menuItem.id
    },
    data: {
      price: parseFloat(price)
    }
  });
}

async function storeItemHelper(req, res, next, databaseFunction) {
  const { storeName, menuItemName, price } = req.body;

  try {
    const [store, menuItem] = await Promise.all([findStore(storeName), findMenuItem(menuItemName)]);
    const menuItemOnStore = await databaseFunction(store, menuItem, price);

    return res.status(200).json({
      status: 'success',
      data: menuItemOnStore
    });
  } catch {
    return next();
  }
}

export async function addItemToStore(req, res, next) {
  return await storeItemHelper(req, res, next, createMenuItemOnStore);
}

export async function editItemPrice(req, res, next) {
  return await storeItemHelper(req, res, next, updateMenuItemOnStore);
}

export async function getStore(req, res, next) {
  const { name } = req.params;

  try {
    const store = await findStore(name);

    if (!store) return next();

    return res.status(200).json({
      status: 'success',
      data: store
    });
  } catch {
    return next();
  }
}
