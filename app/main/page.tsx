import Product from '../components/Product';
import Nav from '../components/Nav';
import Categories from '../components/Categories';

export default async function Main({ params, searchParams }) {
  const { type } = searchParams;

  const res = await fetch(`http://localhost:3000/api/products?type=${type}`);
  const products = await res.json();
  console.log(products, '💥');

  return (
    <div>
      <div className="ml-72">
        <Nav />
        <Categories />
        <div className="grid grid-cols-fluid gap-12 text-gray-600">
          {products.length === 0 ? (
            <div className="flex text-3xl font-bold items-center justify-center h-96">
              <h1>Товар не найден</h1>
            </div>
          ) : (
            products.map((product) => <Product {...product} key={product.id} />)
          )}
        </div>
      </div>
    </div>
  );
}
