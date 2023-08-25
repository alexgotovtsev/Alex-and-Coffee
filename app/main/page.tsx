import Product from '../components/Product';
import Nav from '../components/Nav';
import Categories from '../components/Categories';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

export default async function Main({ searchParams }: { searchParams: any }) {
  const { type } = searchParams;

  const session = await getServerSession(authOptions);
  console.log(session);

  const res = await fetch(`http://localhost:3000/api/products?type=${type}`);
  const products = await res.json();

  return (
    <div>
      <div className="ml-72">
        <Nav />
        {session?.user?.name === process.env.NAME &&
        session?.user?.email === process.env.EMAIL ? (
          <div>
            <Categories />
            <div className="grid grid-cols-fluid gap-12 text-gray-600">
              {products.length === 0 ? (
                <div className="flex text-3xl font-bold items-center justify-center h-96">
                  <h1>Товар не найден</h1>
                </div>
              ) : (
                products.map((product: any) => (
                  <Product {...product} key={product.id} />
                ))
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-96 gap-8">
            <h1 className="text-xl font-medium">
              Вероятно, вам следует войти в систему как Админ, чтобы просмотреть
              эту страницу
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
