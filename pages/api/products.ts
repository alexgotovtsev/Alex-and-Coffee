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
      console.log(type);

      if (type !== 'undefined') {
        console.log('✅');

        const product = await prisma.menu.findMany({
          where: {
            type: type,
          },
        });

        if (product.length === 0) {
          res.status(404);
        }

        res.status(200).json(product);
      } else {
        console.log('💥');
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
