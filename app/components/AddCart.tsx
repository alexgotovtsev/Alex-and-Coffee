'use client';

import { useCartStore } from '@/store';
import { AddCartType } from '@/types/AddCartType';
import { useState } from 'react';

export default function AddCart({
  id,
  name,
  image,
  unit_amount,
  quantity,
  unit,
  currency,
}: AddCartType) {
  const cartStore = useCartStore();
  // const [added, setAdded] = useState(false);

  return (
    <>
      <button
        className="py-3 px-2 bg-teal-500 rounded-md text-white"
        onClick={() =>
          cartStore.addProduct({
            id,
            name,
            image,
            unit_amount,
            quantity,
            unit,
            currency,
          })
        }
      >
        В корзину
      </button>
    </>
  );
}
