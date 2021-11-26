import { PrismaClient } from '@prisma/client';
import * as createError from 'http-errors';

const prisma = new PrismaClient();

async function createMenuItemHelper(name) {
  return await prisma.menuItem.create({
    data: {
      name: name
    }
  });
}

async function updateMenuItemNameHelper(oldName, newName) {
  return await prisma.menuItem.update({
    where: {
      name: oldName
    },
    data: {
      name: newName
    }
  });
}

export async function createMenuItem(req, res, next) {
  const { name } = req.body;

  try {
    const menuItem = await createMenuItemHelper(name);

    return res.status(200).json({
      status: 'success',
      data: menuItem
    });
  } catch {
    return next(createError(500, "Internal server error"));
  }
}

export async function updateMenuItemName(req, res, next) {
  const { oldName, newName } = req.body;

  try {
    const menuItem = updateMenuItemNameHelper(oldName, newName);

    return res.status(200).json({
      status: 'success',
      data: menuItem
    });
  } catch {
    return next(createError(500, "Internal server error"));
  }
}
