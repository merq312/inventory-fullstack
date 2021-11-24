import { PrismaClient } from '@prisma/client';
import * as express from 'express';
import { checkHealth } from '../controllers/miscController';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:store_name', async (req, res, next) => {
  const { store_name } = req.params;

  const store = await prisma.store.findUnique({
    where: { name: store_name },
  });

  if (store) {
    return res.status(200).json({
      status: 'success',
      data: store,
    })
  }

  next()
});

router.get('/check_health', checkHealth);

export default router;
