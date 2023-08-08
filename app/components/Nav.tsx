'use client';

import { AiFillShopping } from 'react-icons/ai';
import { useCartStore } from '@/store';
import Cart from './Cart';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function Nav() {
  const cartStore = useCartStore();

  return (
    <nav className="flex justify-between items-center p-6">
      <Link href={'/'}>
        <h1 className="text-xl font-bold">Alex & Cofee</h1>
      </Link>
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
      <AnimatePresence>{cartStore.isOpen && <Cart />}</AnimatePresence>
    </nav>
  );
}
