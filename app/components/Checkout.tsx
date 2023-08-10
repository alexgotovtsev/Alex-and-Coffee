'use client';

import { useCartStore } from '@/store';
import { useState, useEffect } from 'react';

export default function Checkout({ total }) {
  const cartStore = useCartStore();

  const [clicked, setClicked] = useState(false);

  const cancelHandler = () => {
    if (!clicked) {
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
        cartStore.toggleCart();
        cartStore.setPaymentIntent('');
        cartStore.clearCart();
        cartStore.setCheckout('cart');
      }, 3000);
    }
  };

  const сheckoutHandler = () => {
    if (!clicked) {
      setClicked(true);
      setTimeout(() => {
        setClicked(false);
        cartStore.setCheckout('success');
      }, 3000);
    }
  };

  useEffect(() => {
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: cartStore.cart,
        payment_intent_id: cartStore.paymentIntent,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        cartStore.setPaymentIntent(data.paymentIntent);
      });
  }, []);

  return (
    <div className="flex justify-center flex-col gap-4">
      <h1 className="text-xl font-medium mt-10">
        Общая сумма заказа: {total} Руб
      </h1>
      <div className="flex justify-between ">
        <button
          className="bg-teal-500 py-2 px-4 text-white rounded-md"
          onClick={() => сheckoutHandler()}
        >
          {clicked ? 'Подождите...' : 'Оформить заказ'}
        </button>
        <button
          className="bg-red-500 py-2 px-4 text-white rounded-md"
          onClick={() => cancelHandler()}
          disabled={clicked}
        >
          {clicked ? 'Подождите...' : 'Отменить заказ'}
        </button>
      </div>
    </div>
  );
}
