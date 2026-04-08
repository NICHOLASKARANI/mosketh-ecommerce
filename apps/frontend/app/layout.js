import './globals.css';
import { Inter } from 'next/font/google';
import dynamic from 'next/dynamic';

const inter = Inter({ subsets: ['latin'] });

// Dynamic imports for popups (no SSR to avoid hydration issues)
const EmailCapturePopup = dynamic(() => import('@/components/EmailCapturePopup'), { ssr: false });
const AbandonedCartTracker = dynamic(() => import('@/components/AbandonedCartTracker'), { ssr: false });
const RecentPurchasePopup = dynamic(() => import('@/components/RecentPurchasePopup'), { ssr: false });

export const metadata = {
  title: 'Mosketh Perfumes & Beauty - Luxury Fragrances in Kenya',
  description: 'Discover authentic luxury perfumes, body care, and beauty products in Kenya. Free delivery on orders over KES 5,000.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        {children}
        <EmailCapturePopup />
        <AbandonedCartTracker />
        <RecentPurchasePopup />
      </body>
    </html>
  );
}
