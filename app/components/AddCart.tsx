'use client';

import { useCartStore } from '@/store';
import { AddCartType } from '@/types/AddCartType';
import { useState } from 'react';

export default function AddCart({
  id,
  type,
  name,
  image,
  unit_amount,
  quantity,
  unit,
  currency,
}: AddCartType) {
  const cartStore = useCartStore();

  const createPayment = () => {
    cartStore.addProduct({
      id,
      type,
      name,
      image,
      unit_amount,
      quantity,
      unit,
      currency,
    });

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
    console.log(cartStore.paymentIntent);
  };

  return (
    <div>
      <button
        className="py-3 px-2 bg-teal-500 rounded-md text-white"
        onClick={() => {
          createPayment();
        }}
      >
        В корзину
      </button>
    </div>
  );
}
