'use client';

import Image from 'next/image';
import { useCartStore } from '@/store';

export default function Cart() {
  const cartStore = useCartStore();
  console.log(cartStore);

  return (
    <div
      className="w-full h-screen left-0 top-0 fixed bg-black/25"
      onClick={() => cartStore.toggleCart()}
    >
      <div
        className="bg-white absolute top-0 right-0 w-1/4 h-screen p-12 overflow-y-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-xl flex justify-center font-bold">
          Ваш лист заказа 📃
        </h1>
        {cartStore.cart.map((item) => (
          <div
            className="flex p-4 gap-3 bg-gray-100 mt-2 rounded-md"
            key={item.id}
          >
            <Image
              className="rounded-md h-24 w-24 object-cover"
              src={item.image}
              alt={item.name}
              width={150}
              height={150}
              priority={true}
            />
            <div>
              <h2>{item.name}</h2>
              <h2>Количество: {item.quantity}</h2>
              <p>
                Цена: {item.unit_amount} {item.currency}
              </p>
            </div>
          </div>
        ))}
        <button className="py-2 mt-4 bg-teal-500 w-full rounded-md text-white">
          Сделать заказ
        </button>
      </div>
    </div>
  );
}
