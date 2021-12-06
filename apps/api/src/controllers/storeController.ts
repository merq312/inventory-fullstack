import { PrismaClient } from '@prisma/client';
import * as createError from 'http-errors';

const prisma = new PrismaClient();

export async function findStore(storeName) {
  return await prisma.store.findUnique({
    where: { name: storeName },
  });
}

async function createMenuItemOnStore(storeName, menuItemName, price) {
  return await prisma.menuItemsOnStores.create({
    data: {
      store: {
        connect: { name: storeName },
      },
      menuItem: {
        connect: { name: menuItemName },
      },
      price: parseFloat(price),
    },
  });
}

async function updateMenuItemOnStore(storeName, menuItemName, price) {
  return await prisma.menuItemsOnStores.updateMany({
    where: {
      store: { name: storeName },
      menuItem: { name: menuItemName },
    },
    data: {
      price: parseFloat(price),
    },
  });
}

async function deleteMenuItemOnStore(storeName, menuItemName) {
  return await prisma.menuItemsOnStores.deleteMany({
    where: {
      store: { name: storeName },
      menuItem: { name: menuItemName },
    },
  });
}

async function menuItemOnStoreHelper(req, res, next, databaseFunction) {
  const { menuItemName, price } = req.body;
  const { storeName } = req.params;

  try {
    const menuItemOnStore = await databaseFunction(
      storeName,
      menuItemName,
      price
    );

    return res.status(200).json({
      status: 'success',
      data: menuItemOnStore,
    });
  } catch {
    return next(createError(400, 'Bad request'));
  }
}

export async function addMenuItemToStore(req, res, next) {
  return await menuItemOnStoreHelper(req, res, next, createMenuItemOnStore);
}

export async function updateMenuItemPrice(req, res, next) {
  return await menuItemOnStoreHelper(req, res, next, updateMenuItemOnStore);
}

export async function removeMenuItemFromStore(req, res, next) {
  return await menuItemOnStoreHelper(req, res, next, deleteMenuItemOnStore);
}

export async function getStore(req, res, next) {
  const { storeName } = req.params;

  try {
    const store = await findStore(storeName);

    if (!store) return next(createError(400, 'Store name not found'));

    return res.status(200).json({
      status: 'success',
      data: store,
    });
  } catch {
    return next(createError(500, 'Internal server error'));
  }
}

export async function getAllStoresWithMenu(req, res, next) {
  try {
    const stores = await prisma.store.findMany({
      include: {
        menuItems: {
          select: {
            id: true,
            price: true,
            menuItem: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (stores.length === 0) return next(createError(400, 'No stores found'));

    return res.status(200).json({
      status: 'success',
      data: stores,
    });
  } catch {
    return next(createError(500, 'Internal server error'));
  }
}
