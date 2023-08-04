'use client';

import { useCartStore } from '@/store';
import Cart from './Cart';
import Link from 'next/link';
import { AiFillShopping } from 'react-icons/ai';

export default function Nav() {
  const cartStore = useCartStore();

  return (
    <nav className="flex justify-between items-center p-8 bg-gray-100">
      <Link href={'/'}>
        <h1 className="text-3xl font-bold">Alex & Cofee</h1>
      </Link>
      <ul className="flex items-center gap-12">
        <li className="flex items-center text-5xl cursor-pointer relative">
          <AiFillShopping />
          <span className="bg-teal-500 h-8 w-8 text-lg font-bold text-white rounded-full absolute left-6 bottom-6 flex items-center justify-center  ">
            {cartStore.cart.length}
          </span>
        </li>
      </ul>
      {cartStore.isOpen && <Cart />}
    </nav>
  );
}
