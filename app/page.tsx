'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function Home() {
  const session = useSession();

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-12">
      <h1 className="text-3xl font-bold text-gray-600">Alex & Coffee</h1>
      <div className="flex gap-8">
        {!session?.data && (
          <button
            className="bg-red-400 text-lg px-4 py-2 text-white rounded-md"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        )}
        {session?.data && (
          <Link
            className="bg-teal-600 text-lg px-4 py-2 text-white rounded-md"
            href={'/main'}
          >
            Сделать Заказ
          </Link>
        )}
      </div>
    </main>
  );
}
