'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import dance from '@/public/dance.gif';
import { useCartStore } from '@/store';
import { useEffect } from 'react';

export default function OrderConfirmed() {
  const cartStore = useCartStore();

  useEffect(() => {
    cartStore.setPaymentIntent('');
    cartStore.clearCart();
  }, []);

  return (
    <motion.div
      className="flex items-center justify-center my-12"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
    >
      <div className="p-12 rounded-md text-center">
        <h1 className="text-xl font-medium">Заказ выполнен 🚀</h1>
        <h2 className="my-4 text-sm">Спасибо за покупку</h2>
        <Image
          src={dance}
          alt="dance"
          width={300}
          height={300}
          priority={true}
          className="py-8"
        ></Image>

        <button
          onClick={() => {
            cartStore.setCheckout('cart');
            cartStore.toggleCart();
          }}
        >
          Создать новый заказ
        </button>
      </div>
    </motion.div>
  );
}
