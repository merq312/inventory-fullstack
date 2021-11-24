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

export const getAllProductsCount = async (req, res, next) => {
  const { store_name, date } = req.params;

  let day = '';
  try {
    day = getDate(date);
  } catch (err) {
    return next();
  }

  const store = await findStore(store_name);

  if (store) {
    const menuItemsOnStore = await findAllMenuItemsOnStore(store.id);

    const productCounts = await Promise.all(menuItemsOnStore.map(async (item) => {
      let productCount = await findProductCount(item.id, day);

      // If a product count doesn't exist for the current day and no date is specified (ie- user is trying to get product count for today), make an entry for it
      if (!productCount && !date) {
        productCount = await createProductCountEntry(item.id);
      }

      return productCount;
    }));

    if (productCounts[0]) {
      return res.status(200).json({
        status: 'success',
        data: productCounts
      });
    }
  }
  next();
};
