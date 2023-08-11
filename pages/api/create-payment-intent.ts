import { AddCartType } from '@/types/AddCartType';
import { NextApiRequest, NextApiResponse } from 'next';
// import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const calculateOrderAmount = (items: AddCartType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    return acc + item.unit_amount! * item.quantity!;
  }, 0);
  return totalPrice;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { items, status } = req.body;

  if (status === 'lost') {
    // const paymentIntent = uuidv4();

    const orderData = {
      // user
      amount: calculateOrderAmount(items),
      currency: 'Руб',
      status: 'Потерянный',
      // paymentIntentId: paymentIntent,
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

    const lostOrder = await prisma.order.create({
      data: orderData,
    });

    res.status(200).json({ lostOrder });
    return;
    ///////////////////////////////////////////////////////////////////////////////////////////////////////
  }

  if (status === 'success') {
    // const paymentIntent = uuidv4();

    const orderData = {
      // user
      amount: calculateOrderAmount(items),
      currency: 'Руб',
      status: 'Уcпешный',
      // paymentIntentId: paymentIntent,
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

    const successOrder = await prisma.order.create({
      data: orderData,
    });

    res.status(200).json({ successOrder });
    return;
  }
}
