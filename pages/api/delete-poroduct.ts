import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/util/prisma';

export default function DeleteProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  async function deleteAllPosts() {
    try {
      const deleteResult = await prisma.product.deleteMany();
      res.status(200).send(`Deleted ${deleteResult.count} product`);
    } catch (error) {
      res.status(200).send(`Error deleting product: ${error}`);
      console.error();
    } finally {
      await prisma.$disconnect();
    }
  }
  deleteAllPosts();
}
