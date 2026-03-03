import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { useCartStore } from '@/store/cartStore'
import { AuthProvider } from '@/store/authStore'
import { WishlistProvider } from '@/store/wishlistStore'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import FloatingSocialWidget from '@/components/social/FloatingSocialWidget'
import WhatsAppChatWidget from '@/components/social/WhatsAppChatWidget'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mosketh Perfumes & Beauty - Luxury Fragrances in Kenya',
  description: 'Shop authentic luxury perfumes and beauty products in Kenya. Fast delivery nationwide with M-Pesa payments.',
  keywords: 'perfumes Kenya, luxury fragrances, beauty products, authentic perfumes, Nairobi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <WishlistProvider>
            {children}
            <Toaster position="bottom-right" />
            <FloatingSocialWidget />
            <WhatsAppChatWidget />
            <Analytics />
            <SpeedInsights />
          </WishlistProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
