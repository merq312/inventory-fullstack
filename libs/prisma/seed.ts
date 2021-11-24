import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: 'Alex',
      role: 'Owner',
      stores: {
        create: [
          {
            store: {
              create: { name: 'RCSS' },
            },
          },
        ],
      },
    },
  });

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
