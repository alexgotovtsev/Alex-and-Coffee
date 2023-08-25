import './globals.css';
import type { Metadata } from 'next';
import Hydrate from './components/Hydrate';
import { Roboto } from 'next/font/google';
import { Providers } from './components/Providers';

const roboto = Roboto({ weight: ['400', '700'], subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: 'Alex & Coffee',
  description: 'Alex & Coffee',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className} mx-48 mb-12 bg-gray-300`}>
        <Providers>
          <Hydrate>{children}</Hydrate>
        </Providers>
      </body>
    </html>
  );
}
