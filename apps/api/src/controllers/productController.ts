import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProductCount = async (req, res, next) => {
  const { store_name, product_name, date } = req.params;

  let day = '';
  if (date) {
    try {
      day = new Date(date).toISOString()
    } catch (err) {
      return next()
    }
  } else {
    day = new Date().toISOString()
  }

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

    let menuItemOnStoreCount = await prisma.productCount.findFirst({
      where: {
        menuItemOnStoreId: menuItemOnStore.id,
        day: day
      }
    });

    if (!menuItemOnStoreCount && !date) {
      // If a product count doesn't exist for the current day and no date is specified (ie- user is trying to get product count for today), make an entry for it
      menuItemOnStoreCount = await prisma.productCount.create({
        data: {
          menuItemOnStoreId: menuItemOnStore.id
        }
      });
    }

    return res.status(200).json({
      status: 'success',
      data: menuItemOnStoreCount
    });
  }
  // If either store or menuItem are not found, throw error
  next();
};
