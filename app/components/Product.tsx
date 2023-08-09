import Image from 'next/image';
import { ProductType } from '@/types/ProductType';
import AddCart from './AddCart';

export default function Product({
  id,
  type,
  name,
  image,
  unit_amount,
  unit,
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
        <AddCart
          id={id}
          type={type}
          name={name}
          image={image as string}
          unit_amount={unit_amount}
          unit={unit}
          currency={currency}
        />
      </div>
    </div>
  );
}
