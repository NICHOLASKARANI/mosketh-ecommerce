import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import SocialMediaBar from '@/components/layout/SocialMediaBar'
import WhatsAppButton from '@/components/social/WhatsAppButton'
import LivePurchaseNotification from '@/components/ui/LivePurchaseNotification'
import ExitIntentPopup from '@/components/ui/ExitIntentPopup'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/store/cartStore'
import { AuthProvider } from '@/store/authStore'
import { WishlistProvider } from '@/store/wishlistStore'
import Script from 'next/script'
import LocalBusinessSchema from '@/components/seo/LocalBusinessSchema'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL('https://moskethperfumesandbeauty.co.ke'),
  title: {
    default: 'MosKeth Perfumes & Beauty - #1 Beauty Store in Nairobi, Kenya',
    template: '%s | MosKeth Perfumes & Beauty',
  },
  description: 'Discover authentic perfumes, body oils, and beauty products at MosKeth Perfumes & Beauty. Shop F5, Superior Centre, Kimathi Street, Nairobi CBD. Fast delivery across Kenya. M-Pesa Paybill: 0742783907.',
  keywords: 'perfumes kenya, beauty products nairobi, body oils kenya, face creams nairobi, authentic perfumes, mosketh beauty, mosketh perfumes, mosketh beauty touch, cosmetics kenya, nairobi beauty store, buy perfume online kenya, best beauty shop nairobi',
  authors: [{ name: 'MosKeth Perfumes & Beauty', url: 'https://moskethperfumesandbeauty.co.ke' }],
  creator: 'MosKeth Beauty',
  publisher: 'MosKeth Perfumes & Beauty',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://moskethperfumesandbeauty.co.ke',
    siteName: 'MosKeth Perfumes & Beauty',
    title: 'MosKeth Perfumes & Beauty - #1 Beauty Store in Nairobi, Kenya',
    description: 'Discover authentic perfumes, body oils, and beauty products at MosKeth Perfumes & Beauty. Shop F5, Superior Centre, Kimathi Street, Nairobi CBD.',
    images: [
      {
        url: 'https://moskethperfumesandbeauty.co.ke/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'MosKeth Perfumes & Beauty - Premium Beauty Products in Nairobi',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MosKeth Perfumes & Beauty - #1 Beauty Store in Nairobi',
    description: 'Discover authentic perfumes, body oils, and beauty products in Nairobi CBD.',
    images: ['https://moskethperfumesandbeauty.co.ke/images/og-image.jpg'],
    creator: '@moskethbeauty',
    site: '@moskethbeauty',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE',
    yandex: 'YOUR_YANDEX_VERIFICATION',
    yahoo: 'YOUR_YAHOO_VERIFICATION',
  },
  alternates: {
    canonical: 'https://moskethperfumesandbeauty.co.ke',
    languages: {
      'en-KE': 'https://moskethperfumesandbeauty.co.ke',
    },
  },
  category: 'beauty',
  classification: 'E-commerce',
  referrer: 'origin-when-cross-origin',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  // manifest: '/manifest.json', // TEMPORARILY DISABLED
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <LocalBusinessSchema />
        
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `
          }}
        />

        {/* Facebook Pixel */}
        <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', 'YOUR_FACEBOOK_PIXEL_ID');
              fbq('track', 'PageView');
            `
          }}
        />

        {/* TikTok Pixel */}
        <Script
          id="tiktok-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
              }(window, document, 'ttq');
              ttq.load('YOUR_TIKTOK_PIXEL_ID');
              ttq.page();
            `
          }}
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <SocialMediaBar />
              <Header />
              <main className="min-h-screen pt-24">
                {children}
              </main>
              <Footer />
              <WhatsAppButton />
              <LivePurchaseNotification />
              <ExitIntentPopup />
              <Toaster 
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#363636',
                    color: '#fff',
                  },
                  success: {
                    duration: 3000,
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#fff',
                    },
                  },
                }}
              />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}