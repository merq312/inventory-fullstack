import { PrismaClient } from '@prisma/client';

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

async function createProductCountEntry(menuItemOnStoreId: number) {
  return await prisma.productCount.create({
    data: {
      menuItemOnStoreId: menuItemOnStoreId
    }
  });
}

export async function getProductsCount(req, res, next) {
  const { storeName, date } = req.params;

  let day = '';
  try {
    day = getDate(date);
  } catch (err) {
    return next();
  }

  const [productCounts] = await Promise.all([findStore(storeName)
    .then(store => findAllMenuItemsOnStore(store.id))
    .then(menuItemsOnStore => Promise.all(menuItemsOnStore.map(async (item) => {
      let productCount = await findProductCount(item.id, day);

      if (!productCount && !date) {
        productCount = await createProductCountEntry(item.id);
      }

      return productCount;
    })))
    .catch(() => null)]);

  return productCounts && productCounts[0]
    ? res.status(200).json({
      status: 'success',
      data: productCounts
    })
    : next();
}

// export async function editProductsCount(req, res, next) {
//   const { storeName, date } = req.params;
//   const { productData } = req.body.productData;
//
// }
