import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createMenuItem(name) {
  return await prisma.menuItem.create({
    data: {
      name: name
    }
  });
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

export async function addMenuItem(req, res, next) {
  const { name } = req.body;

  try {
    const menuItem = await createMenuItem(name);

    return res.status(200).json({
      status: 'success',
      data: menuItem
    });
  } catch {
    return next();
  }
}

export async function editMenuItemName(req, res, next) {
  const { oldName, newName } = req.body;

  try {
    const menuItem = updateMenuItemName(oldName, newName);

    return res.status(200).json({
      status: 'success',
      data: menuItem
    });
  } catch {
    return next();
  }
}
