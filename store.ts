import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // save all data in the local storage
import { AddCartType } from './types/AddCartType';

type CartState = {
  cart: AddCartType[];
  isOpen: boolean;
  toggleCart: () => void;
  addProduct: (item: AddCartType) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      addProduct: (item) =>
        set((state) => {
          // cмотрим есть ли товар в нашей корзине
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          // есди да ?
          if (existingItem) {
            // если товар в карзине такой же как и был, обновляем кол-во
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity + 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),
    }),

    { name: 'cart-store' }
  )
);
