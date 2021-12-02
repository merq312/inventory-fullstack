import { PrismaClient } from '@prisma/client';
import * as createError from 'http-errors';

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
    return next(createError(500, "Internal server error"));
  }
}

export async function changeMenuItemName(req, res, next) {
  const { oldName, newName } = req.body;

  try {
    const menuItem = updateMenuItemName(oldName, newName);

    return res.status(200).json({
      status: 'success',
      data: menuItem
    });
  } catch {
    return next(createError(500, "Internal server error"));
  }
}

export async function getAllMenuItems(req, res, next) {
  try {
    const menuItems =  await prisma.menuItem.findMany()

    if (!menuItems[0]) return next(createError(400, 'No stores found'));

    return res.status(200).json({
      status: 'success',
      data: menuItems
    });
  } catch {
    return next(createError(500, 'Internal server error'));
  }
}
