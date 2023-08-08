import { PrismaClient } from '@prisma/client';
import Product from './components/Product';

const getProducts = async () => {
  const client = new PrismaClient();
  await client.$connect();
  const data = await client.menu.findMany({});
  return data;
};

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="grid grid-cols-fluid gap-12">
      {products.map((product) => (
        <Product {...product} key={product.id} />
      ))}
    </main>
  );
}
