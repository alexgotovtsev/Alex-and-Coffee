'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center h-screen gap-12">
      <h1 className="text-3xl font-bold text-gray-600">Alex & Coffee</h1>
      <div className="flex gap-8">
        <Link
          className="bg-teal-600 text-lg px-4 py-2 text-white rounded-md"
          href={'/main'}
        >
          Сделать Заказ
        </Link>
      </div>
    </main>
  );
}
