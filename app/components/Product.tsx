import Image from 'next/image';
import { ProductType } from '@/types/ProductType';

export default function Product({
  name,
  image,
  unit_amount,
  id,
  description,
  currency,
}: ProductType) {
  return (
    <div className="">
      <h1>{name}</h1>
      <Image
        src={image as string}
        alt={name}
        width={300}
        height={300}
        priority={true}
      />
      <p>
        {currency}: {unit_amount}
      </p>
    </div>
  );
}
