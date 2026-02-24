import { Inter } from 'next/font/google'
import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MosKeth Beauty & Perfumes - Nairobi CBD',
  description: 'Shop F5, Superior Centre, Kimathi Street, Nairobi CBD. Call/WhatsApp: 0742783907',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-20">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Toaster position="top-right" />
      </body>
    </html>
  )
}