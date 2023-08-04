import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // save all data in the local storage

type CartItem = {
  name: string;
  id: string;
  images?: string[];
  description?: string;
  unit_amount: number;
  unit: number;
  quantity: number;
};

type CartState = {
  cart: CartItem[];
  isOpen: boolean;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
    }),
    { name: 'cart-store' }
  )
);
