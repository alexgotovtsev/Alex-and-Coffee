import { AddCartType } from '@/types/AddCartType';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/util/prisma';

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
    const orderData = {
      // user
      amount: calculateOrderAmount(items),
      currency: 'Руб',
      status: 'Потерянный',
      products: {
        create: items.map((item: any) => ({
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
    const orderData = {
      // user
      amount: calculateOrderAmount(items),
      currency: 'Руб',
      status: 'Уcпешный',
      products: {
        create: items.map((item: any) => ({
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
