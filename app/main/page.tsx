import { PrismaClient } from '@prisma/client';
import Product from '../components/Product';
import Nav from '../components/Nav';

const getProducts = async () => {
  const client = new PrismaClient();
  await client.$connect();
  const data = await client.menu.findMany({});
  return data;
};

export default async function Main() {
  const products = await getProducts();

  return (
    <div>
      <Nav />
      <div className="grid grid-cols-fluid gap-12">
        {products.map((product) => (
          <Product {...product} key={product.id} />
        ))}
      </div>
    </div>
  );
}
