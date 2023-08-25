import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const { type } = req.query;

      if (type !== 'undefined') {
        const product = await prisma.menu.findMany({
          where: {
            type: type as string,
          },
        });

        if (product.length === 0) {
          res.status(404);
        }

        res.status(200).json(product);
      } else {
        const allProduct = await prisma.menu.findMany({});
        res.status(200).json(allProduct);
      }
    } catch (err) {
      console.error('Неудалось получить продукты:', err);
      res.status(500).end();
    }
  } else {
    res.status(405).json({ error: 'Метод не разрешен' });
  }
}
