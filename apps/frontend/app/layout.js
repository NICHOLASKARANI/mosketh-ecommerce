import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mosketh Perfumes & Beauty - Luxury Fragrances in Kenya',
  description: 'Shop authentic luxury perfumes and beauty products in Kenya. Fast delivery nationwide.',
  verification: {
    google: 'XB5Z5Nu5hdhLadIYjZ71K80jlJ0vTJrA-3s4YruAqKg',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="XB5Z5Nu5hdhLadIYjZ71K80jlJ0vTJrA-3s4YruAqKg" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
