import { NextApiRequest, NextApiResponse } from 'next';

import { AddCartType } from '@/types/AddCartType';
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
  // получаем и проверяем залогинился пользователь или нет
  // const userSession = await getServerSession(req, res, authOptions);
  // if (!userSession?.user) {
  //   res.status(403).json({
  //     message: 'not Logged in',
  //   });
  //   return;
  // }

  // получаем БОДИ с данныеми об Элементах и (Платежном намерении -> пустая строка )
  const { items, payment_intent_id } = req.body;

  // create the order data
  // const orderData = {
    // user: { connect: { id: userSession.user?.id } },
  //   amount: calculateOrderAmount(items),
  //   currency: 'Руб',
  //   status: 'В ожидании',
  //   paymentIntentId: payment_intent_id,
  //   products: {
  //     create: items.map((item) => ({
  //       name: item.name,
  //       description: item.description,
  //       unit_amount: parseFloat(item.unit_amount) || null,
  //       image: item.image,
  //       quantity: item.quantity,
  //     })),
  //   },
  // };

  // Check if the payment intent exist just update the order
  // if (payment_intent_id) {
  //   const current_intent = await stripe.paymentIntents.retrieve(
  //     payment_intent_id
  //   );
  //   if (current_intent) {
  //     const updated_intent = await stripe.paymentIntents.update(
  //       payment_intent_id,
  //       { amount: calculateOrderAmount(items) }
  //     );

      const existing_order = await prisma.order.findFirst({
        where: { paymentIntentId: updated_intent.id },
        include: { products: true },
      });
      if (!existing_order) {
        res.status(400).json({ message: 'Invalid Payment Intent' });
      }
      const updated_order = await prisma.order.update({
        where: { id: existing_order?.id },
        data: {
          amount: calculateOrderAmount(items),
          products: {
            deleteMany: {},
            create: items.map((item) => ({
              name: item.name,
              description: item.description,
              unit_amount: parseFloat(item.unit_amount) || null,
              image: item.image,
              quantity: item.quantity,
            })),
          },
        },
      });
      res.status(200).json({ paymentIntent: updated_intent });
      return;
    }
  } else {
    // create new order with prisma
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });

    orderData.paymentIntentId = paymentIntent.id;
    const newOrder = await prisma.order.create({
      data: orderData,
    });
    res.status(200).json({ paymentIntent });
    return;
  }
}
