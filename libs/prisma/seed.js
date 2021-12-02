const  { PrismaClient } = require('@prisma/client')
const menuItems = require('./menu_items.json')

const prisma = new PrismaClient();

async function main() {
  await prisma.store.create({
    data: {
      name: 'rcss'
    }
  });

  const rcss_store = await prisma.store.findUnique({ where: { name: 'rcss' } });

  if (rcss_store) {
    await prisma.user.create({
      data: {
        username: 'Alex',
        role: 'Owner',
        stores: {
          create: [{ storeId: rcss_store.id }]
        }
      }
    });

    for (const item of menuItems) {
      const newMenuItem = await prisma.menuItem.create({
        data: {
          name: item.name,
          stores: {
            create: [{ storeId: rcss_store.id, price: item.price }]
          }
        }
      });

      const menuItemOnStore = await prisma.menuItemsOnStores.findFirst({ where: { menuItemId: newMenuItem.id, storeId: rcss_store.id } });

      await prisma.productCount.create({
        data: {
          menuItemOnStoreId: menuItemOnStore.id
        }
      })
    }
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
