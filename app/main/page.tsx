import Product from '../components/Product';
import Nav from '../components/Nav';
import Categories from '../components/Categories';
import { SearchParamTypes } from '@/types/SearchParamTypes';

export default async function Main({ searchParams }: SearchParamTypes) {
  const { type } = searchParams;

  const res = await fetch(
    `https://alex-and-coffee.vercel.app/api/products?type=${type}`
  );
  const products = await res.json();

  return (
    <div>
      <div className="ml-72">
        <Nav />
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
      </div>
    </div>
  );
}
