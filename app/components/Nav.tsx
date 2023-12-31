'use client';

import { AiFillShopping } from 'react-icons/ai';
import { useCartStore } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';
import Cart from './Cart';
import Link from 'next/link';

export default function Nav() {
  const cartStore = useCartStore();

  return (
    <nav className="flex justify-between items-center p-6 text-gray-600">
      <div className="flex gap-8">
        <Link href={'/'}>
          <button className="text-3xl font-bold">Alex & Coffee</button>
        </Link>

        <Link href={'api/delete-poroduct'}>
          <button className="bg-white p-1 rounded-md">Уд прод</button>
        </Link>
        <Link href={'api/delete-orders'}>
          <button className="bg-white p-1 rounded-md">Уд заказ</button>
        </Link>
      </div>
      <div>
        <ul className="flex items-center gap-12">
          <li
            className="flex items-center text-4xl cursor-pointer relative"
            onClick={() => cartStore.toggleCart()}
          >
            <AiFillShopping />
            {cartStore.cart.length > 0 && (
              <motion.span
                className="bg-teal-500 h-7 w-7 text-lg text-white rounded-full absolute left-5 bottom-4 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {cartStore.cart.length}
              </motion.span>
            )}
          </li>
        </ul>
      </div>
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
