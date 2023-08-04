import Image from 'next/image';
import { ProductType } from '@/types/ProductType';

export default function Product({
  name,
  image,
  unit_amount,
  unit,
  id,
  description,
  currency,
}: ProductType) {
  return (
    <div className="bg-gray-50 rounded-md font-medium">
      <Image
        src={image as string}
        alt={name}
        width={1000}
        height={1000}
        priority={true}
        className="w-96 h-96 object-cover"
      />
      <div className="flex justify-between items-center p-4">
        <div>
          <h1>
            {name} {unit}
            <span className="text-sm">Мл</span>
          </h1>
          <p>
            <span className="text-teal-600">
              {currency}: {unit_amount}
            </span>
          </p>
        </div>
        <button className="py-3 px-2 bg-teal-500 rounded-md text-white">
          Заказать
        </button>
      </div>
    </div>
  );
}
