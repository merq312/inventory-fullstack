import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.store.create({
    data: {
      name: 'rcss',
    },
  });

  const rcss_store = await prisma.store.findUnique({ where: { name: 'rcss' } });

  if (rcss_store) {
    await prisma.user.create({
      data: {
        username: 'Alex',
        role: 'Owner',
        stores: {
          create: [{ storeId: rcss_store.id }],
        },
      },
    });
  }

  // const allUsers = await prisma.user.findMany({
  //   include: {
  //     stores: true,
  //   },
  // })
  // console.dir(allUsers, { depth: null })
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
