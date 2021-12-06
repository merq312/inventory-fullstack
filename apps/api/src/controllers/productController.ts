import { PrismaClient } from '@prisma/client';
import * as createError from 'http-errors';

const prisma = new PrismaClient();

function getDate(date) {
  if (date) {
    return new Date(date).toISOString();
  } else {
    return new Date().toISOString();
  }
}

async function findMenuItemOnStore(storeName, menuItemName) {
  return await prisma.menuItemsOnStores.findMany({
    where: {
      store: {
        name: storeName,
      },
      menuItem: {
        name: menuItemName,
      },
    },
  });
}

async function findProductCount(menuItemOnStoreId: number, day: string) {
  return await prisma.productCount.findFirst({
    where: {
      menuItemOnStoreId: menuItemOnStoreId,
      day: day,
    },
  });
}

async function findAllMenuItemsOnStore(storeName: string) {
  return await prisma.menuItemsOnStores.findMany({
    where: {
      store: {
        name: storeName,
      },
    },
    include: {
      menuItem: true,
    },
  });
}

async function createProductCount(menuItemOnStoreId: number, day: string) {
  return await prisma.productCount.create({
    data: {
      menuItemOnStoreId: menuItemOnStoreId,
      day: day,
    },
  });
}

export async function getProductCounts(req, res, next) {
  const { storeName, date } = req.params;

  try {
    const day = getDate(date);

    const menuItemsOnStore = await findAllMenuItemsOnStore(storeName);
    const productCounts = await Promise.all(
      menuItemsOnStore.map(async (item) => {
        let productCount = await findProductCount(item.id, day);

        if (!productCount) {
          productCount = await createProductCount(item.id, day);
        }

        Object.assign(productCount, { name: item.menuItem.name });

        return productCount;
      })
    );

    if (productCounts.length === 0)
      return next(createError(400, 'Bad request'));

    return res.status(200).json({
      status: 'success',
      data: productCounts,
    });
  } catch (err) {
    return next(createError(500, 'Internal server error'));
  }
}

async function updateProductCount(
  menuItemId: number,
  day: string,
  productCounts
) {
  await prisma.productCount.updateMany({
    where: {
      menuItemOnStoreId: menuItemId,
      day: day,
    },
    data: { ...productCounts },
  });
}

export async function updateProductCounts(req, res, next) {
  const { storeName, date } = req.params;
  const { productData } = req.body;

  try {
    const day = getDate(date);

    for (const product of productData) {
      const menuItemOnStore = await findMenuItemOnStore(
        storeName,
        product.name
      );
      await updateProductCount(menuItemOnStore[0].id, day, product.counts);
    }

    return res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    return next(createError(500, 'Internal server error'));
  }
}
