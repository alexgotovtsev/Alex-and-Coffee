import { PrismaClient } from '@prisma/client';
import Product from './components/Product';

const getProducts = async () => {
  const client = new PrismaClient();
  await client.$connect();
  const data = await client.product.findMany({});
  return data;
};

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="text-xl">
      {products.map((product) => (
        <Product {...product} />
      ))}
    </main>
  );
}
