import { create } from 'zustand';
import { persist } from 'zustand/middleware'; // save all data in the local storage
import { AddCartType } from './types/AddCartType';

type CartState = {
  cart: AddCartType[];
  isOpen: boolean;
  // paymentIntent: string;
  onCheckout: string;
  toggleCart: () => void;
  clearCart: () => void;
  addProduct: (item: AddCartType) => void;
  removeProduct: (item: AddCartType) => void;
  // setPaymentIntent: (val: string) => void;
  setCheckout: (val: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      isOpen: false,
      // paymentIntent: '',
      onCheckout: 'cart',
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
                return {
                  ...cartItem,
                  quantity: (cartItem.quantity as number) + 1,
                };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return { cart: [...state.cart, { ...item, quantity: 1 }] };
          }
        }),

      removeProduct: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.id === item.id
          );
          if (existingItem && existingItem.quantity! > 1) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.id === item.id) {
                return { ...cartItem, quantity: cartItem.quantity! - 1 };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            const filteredCart = state.cart.filter(
              (cartItem) => cartItem.id !== item.id
            );
            return { cart: filteredCart };
          }
        }),

      // setPaymentIntent: (val) => set((state) => ({ paymentIntent: val })),

      setCheckout: (val) => set((state) => ({ onCheckout: val })),

      clearCart: () => set((state) => ({ cart: [] })),
    }),

    { name: 'cart-store' }
  )
);
