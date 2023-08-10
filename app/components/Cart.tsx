'use client';

import Image from 'next/image';
import { useCartStore } from '@/store';
import { IoAddCircle, IoRemoveCircle } from 'react-icons/io5';

import basket from '@/public/basket.png';
import { motion, AnimatePresence } from 'framer-motion';
import Checkout from './Checkout';
import OrderConfirmed from './OrderConfirmed';

export default function Cart() {
  const cartStore = useCartStore();

  const totalPrice = cartStore.cart.reduce(
    (acc, item) => acc + item.quantity! * item.unit_amount!,
    0
  );

  return (
    <motion.div
      className="w-full h-screen left-0 top-0 fixed bg-black/25"
      onClick={() => cartStore.toggleCart()}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
    >
      <motion.div
        className="bg-white absolute top-0 right-0 w-1/4 h-screen px-12 py-4 overflow-y-scroll text-gray-600"
        onClick={(e) => e.stopPropagation()}
      >
        {cartStore.onCheckout === 'cart' && (
          <button onClick={() => cartStore.toggleCart()} className="mb-12">
            Назад в магазин ☕
          </button>
        )}
        {cartStore.onCheckout === 'checkout' && (
          <button
            onClick={() => cartStore.setCheckout('cart')}
            className="mb-12"
          >
            Проверить корзину 🛒
          </button>
        )}

        {/* список заказов */}
        {cartStore.onCheckout === 'cart' && (
          <>
            {cartStore.cart.length > 0 && (
              <h1 className="text-xl flex justify-center font-bold mb-9">
                Ваш лист заказа 📃
              </h1>
            )}

            {cartStore.cart.map((item) => (
              <motion.div
                className="flex p-4 gap-3 bg-gray-100 mt-2 rounded-md"
                key={item.id}
                layout
              >
                <Image
                  className="rounded-md h-24 w-24 object-cover"
                  src={item.image!}
                  alt={item.name}
                  width={150}
                  height={150}
                  priority={true}
                />
                <motion.div layout>
                  <h2>{item.name}</h2>
                  <div className="flex gap-2">
                    <h2>Количество: {item.quantity}</h2>
                    <button
                      onClick={() =>
                        cartStore.removeProduct({
                          id: item.id,
                          name: item.name,
                          type: item.type,
                          image: item.image,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                          unit: item.unit,
                          currency: item.currency,
                        })
                      }
                    >
                      <IoRemoveCircle className="text-lg" />
                    </button>
                    <button
                      onClick={() =>
                        cartStore.addProduct({
                          id: item.id,
                          name: item.name,
                          image: item.image,
                          type: item.type,
                          unit_amount: item.unit_amount,
                          quantity: item.quantity,
                          unit: item.unit,
                          currency: item.currency,
                        })
                      }
                    >
                      <IoAddCircle className="text-lg" />
                    </button>
                  </div>

                  <p>
                    Цена: {item.unit_amount}{' '}
                    <span className="text-sm">{item.currency}</span>
                  </p>
                </motion.div>
              </motion.div>
            ))}

            {/* скрываем кнопку  */}
            {cartStore.cart.length > 0 && (
              <motion.div layout>
                <button
                  className="py-2 mt-4 bg-teal-500 w-full rounded-md text-white"
                  onClick={() => cartStore.setCheckout('checkout')}
                >
                  Сделать заказ
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* onCheckout */}
        {cartStore.onCheckout === 'checkout' && <Checkout total={totalPrice} />}

        {/* success */}
        {cartStore.onCheckout === 'success' && <OrderConfirmed />}

        {/* пустая корзина */}
        {cartStore.onCheckout === 'cart' && !cartStore.cart.length && (
          <AnimatePresence>
            <motion.div
              className="flex flex-col font-medium text-2xl justify-center gap-12 items-center pt-48 opacity-75"
              initial={{ scale: 0, rotateZ: -90, opacity: 0 }}
              animate={{ scale: 1, rotateZ: 0, opacity: 0.75 }}
              exit={{ scale: 0, rotateZ: -90, opacity: 0 }}
            >
              <h1>Охх... ваша корзина пуста 😥</h1>
              <Image
                src={basket}
                alt="ampty cart"
                width={200}
                height={200}
                priority={true}
              />
            </motion.div>
          </AnimatePresence>
        )}
      </motion.div>
    </motion.div>
  );
}
