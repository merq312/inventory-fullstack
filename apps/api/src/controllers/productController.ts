import { PrismaClient } from '@prisma/client';
import * as createError from 'http-errors';
import { findStore } from './storeController';

const prisma = new PrismaClient();

function getDate(date) {
  if (date) {
    return new Date(date).toISOString();
  } else {
    return new Date().toISOString();
  }
}

async function findStore(store_name) {
  return await prisma.store.findUnique({
    where: { name: store_name }
  });
}

async function findProductCount(menuItemOnStoreId: number, day: string) {
  return await prisma.productCount.findFirst({
    where: {
      menuItemOnStoreId: menuItemOnStoreId,
      day: day
    }
  });
}

async function findAllMenuItemsOnStore(storeId: number) {
  return await prisma.menuItemsOnStores.findMany({
    where: {
      storeId: storeId
    }
  });
}

async function createProductCount(menuItemOnStoreId: number) {
  return await prisma.productCount.create({
    data: {
      menuItemOnStoreId: menuItemOnStoreId
    }
  });
}

export async function getProductCounts(req, res, next) {
  const { storeName, date } = req.params;

  try {
    const day = getDate(date);

    const store = await findStore(storeName);
    const menuItemsOnStore = await findAllMenuItemsOnStore(store.id);
    const productCounts = await Promise.all(menuItemsOnStore.map(async (item) => {
      let productCount = await findProductCount(item.id, day);

      if (!productCount && !date) {
        productCount = await createProductCount(item.id);
      }

      return productCount;
    }));

    if (!productCounts[0]) return next(createError(400, 'Bad request'));

    return res.status(200).json({
      status: 'success',
      data: productCounts
    });
  } catch (err) {
    return next(createError(500, "Internal server error"));
  }
}

// export async function editProductsCount(req, res, next) {
//   const { storeName, date } = req.params;
//   const { productData } = req.body.productData;
//
// }
