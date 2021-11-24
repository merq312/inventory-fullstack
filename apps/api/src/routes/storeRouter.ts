import { PrismaClient } from '@prisma/client';
import * as express from 'express';
import { checkHealth } from '../controllers/miscController';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:store_name', async (req, res) => {
  const { store_name } = req.params;

  const findStore = await prisma.store.findUnique({
    where: { name: store_name },
  });

  findStore
    ? res.status(200).json({
        status: 'success',
        data: findStore,
      })
    : res.status(401).json({
        status: 'failure',
        message: 'store not found',
      });
});

router.get('/check_health', checkHealth);

export default router;
