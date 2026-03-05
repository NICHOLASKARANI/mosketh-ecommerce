import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import SeedProvider from '@/components/SeedProvider'
import SocialShare from '@/components/SocialShare'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mosketh Perfumes & Beauty - Luxury Fragrances in Kenya',
  description: 'Shop authentic luxury perfumes and beauty products in Kenya. Fast delivery nationwide with M-Pesa payments.',
  keywords: 'perfumes Kenya, luxury fragrances, beauty products, authentic perfumes, Nairobi, M-Pesa',
  openGraph: {
    title: 'Mosketh Perfumes & Beauty',
    description: 'Luxury fragrances and beauty products in Kenya',
    url: 'https://moskethperfumesandbeauty.com',
    siteName: 'Mosketh Perfumes & Beauty',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mosketh Perfumes & Beauty',
    description: 'Luxury fragrances in Kenya',
    images: ['https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta property="og:image" content="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className={inter.className}>
        <SeedProvider>
          {children}
          <SocialShare />
        </SeedProvider>
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
