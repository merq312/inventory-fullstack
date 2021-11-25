import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createMenuItem(name) {
  return await prisma.menuItem.create({
    data: {
      name: name
    }
  });
}

export async function addMenuItem(req, res, next) {
  const { name } = req.params;
  const [menuItem] = await Promise.all([createMenuItem(name)
    .catch(() => null)]);

  return menuItem
    ? res.status(200).json({
      status: 'success',
      data: menuItem
    })
    : next();
}

async function updateMenuItemName(oldName, newName) {
  return await prisma.menuItem.update({
    where: {
      name: oldName
    },
    data: {
      name: newName
    }
  });
}

export async function editMenuItemName(req, res, next) {
  const { oldName, newName } = req.params;
  const [menuItem] = await Promise.all([updateMenuItemName(oldName, newName)
    .catch(() => null)]);

  return menuItem
    ? res.status(200).json({
      status: 'success',
      data: menuItem
    })
    : next();
}
