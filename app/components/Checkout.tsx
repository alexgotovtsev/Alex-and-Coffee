'use client';

import { useCartStore } from '@/store';
import { useState, useEffect } from 'react';

export default function Checkout() {
  const cartStore = useCartStore();

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
        console.log(data.paymentIntent, 'ФРОНТ');
        cartStore.setPaymentIntent(data.paymentIntent);
      });
  }, []);

  return (
    <div>
      <h1>Checkout</h1>
    </div>
  );
}
