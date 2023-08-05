import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Nav from './components/Nav';
import Hydrate from './components/Hydrate';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={`${inter.className} mx-48`}>
        <Hydrate>
          <Nav />
          {children}
        </Hydrate>
      </body>
    </html>
  );
}
