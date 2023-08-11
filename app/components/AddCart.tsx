'use client';

import { useCartStore } from '@/store';
import { AddCartType } from '@/types/AddCartType';

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

  const addProductToStore = () => {
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
  };

  return (
    <div>
      <button
        className="py-3 px-2 bg-teal-500 rounded-md text-white"
        onClick={() => {
          addProductToStore();
        }}
      >
        В корзину
      </button>
    </div>
  );
}
