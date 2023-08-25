import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/util/prisma';

export default function DeleteOrders(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
