import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '@/lib/seed' // This will seed the database

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mosketh Perfumes & Beauty',
  description: 'Luxury fragrances in Kenya',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster position="bottom-right" />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
