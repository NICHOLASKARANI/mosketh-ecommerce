import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mosketh Perfumes & Beauty',
  description: 'Luxury fragrances and beauty products in Kenya',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
