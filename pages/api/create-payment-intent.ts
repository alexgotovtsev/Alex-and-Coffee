import { AddCartType } from '@/types/AddCartType';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const calculateOrderAmount = (items: AddCartType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
  return totalPrice;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // получение пользователя
  // извлечение юзера из боди
  const { items, payment_intent_id } = req.body;

  // создаем данные из заказа
  const orderData = {
    // user
    amount: calculateOrderAmount(items),
    currency: 'Руб',
    status: 'Ожидание',
    paymentIntentId: payment_intent_id,
    products: {
      create: items.map((item) => ({
        name: item.name,
        type: item.type,
        unit: item.unit,
        quantity: item.quantity,
        unit_amount: item.unit_amount,
      })),
    },
  };

  // если палатежное намерение существует то обновляем заказ
  if (payment_intent_id) {
    // обновляем заказ

    const existing_order = await prisma.order.findFirst({
      where: { paymentIntentId: payment_intent_id },
      include: { products: true },
    });

    if (!existing_order) {
      res.status(400).json({ message: 'Invalid Payment Intent' });
    }

    // обновить существующий заказ
    const updated_order = await prisma.order.update({
      where: { id: existing_order?.id },
      data: {
        amount: calculateOrderAmount(items),
        products: {
          deleteMany: {},
          create: items.map((item) => ({
            name: item.name,
            type: item.type,
            unit: item.unit,
            quantity: item.quantity,
            unit_amount: item.unit_amount,
          })),
        },
      },
    });

    res.status(200).json({ paymentIntent: payment_intent_id });
    return;
  } else {
    // создаем новый заказ в призме
    const paymentIntent = uuidv4();
    orderData.paymentIntentId = paymentIntent;
    const newOrder = await prisma.order.create({
      data: orderData,
    });
    res.status(200).json({ paymentIntent });
    return;
  }
}
