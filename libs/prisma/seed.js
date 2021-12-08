const { PrismaClient } = require('@prisma/client');
const menuItems = require('./menu_items.json');

const prisma = new PrismaClient();

async function createStore(storeName) {
  await prisma.store.create({
    data: {
      name: storeName,
    },
  });
}

async function createUser(name, role, stores) {
  await prisma.user.create({
    data: {
      username: name,
      role: role,
      stores: {
        create: stores.map((ea) => {
          return {
            storeId: ea.id,
          };
        }),
      },
    },
  });
}

async function createMenuItem(item, stores) {
  return await prisma.menuItem.create({
    data: {
      name: item.name,
      stores: {
        create: stores.map((ea) => {
          return {
            storeId: ea.id,
            price: item.price,
          };
        }),
      },
    },
  });
}

async function main() {
  await createStore('rcss');
  await createStore('wm_south');

  const rcss_store = await prisma.store.findUnique({ where: { name: 'rcss' } });
  const wm_south_store = await prisma.store.findUnique({
    where: { name: 'wm_south' },
  });
  const stores = [rcss_store, wm_south_store];

  await createUser('Alex', 'role', stores);

  for (const item of menuItems) {
    await createMenuItem(item, stores);
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
