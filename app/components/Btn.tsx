'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCartStore } from '@/store';

export default function Btn() {
  const cartStore = useCartStore();

  // const createPayment = () => {
  //   console.log('1️⃣', cartStore.cart);
  //   fetch('/api/create-payment-intent', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({
  //       items: cartStore.cart,
  //       payment_intent_id: cartStore.paymentIntent,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       cartStore.setPaymentIntent(data.paymentIntent);
  //     });
  // };

  return (
    <div>
      <Link href={'/main'}>
        <button
          className=" bg-teal-500 text-white px-4 py-2 rounded-md"
          // onClick={() => createPayment()}
        >
          Сделать заказ
        </button>
      </Link>
    </div>
  );
}
