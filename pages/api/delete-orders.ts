import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

export default function DeleteOrders(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  async function deleteAllOrders() {
    try {
      const deleteResult = await prisma.order.deleteMany();
      res.status(200).send(`Deleted ${deleteResult.count} order`);
    } catch (error) {
      res.status(200).send(`Error deleting order: ${error}`);
      console.error();
    } finally {
      await prisma.$disconnect();
    }
  }
  deleteAllOrders();
}
