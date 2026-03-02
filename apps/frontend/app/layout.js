import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/store/cartStore'
import { AuthProvider } from '@/store/authStore'
import { WishlistProvider } from '@/store/wishlistStore'
import Script from 'next/script'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import FloatingSocialWidget from '@/components/social/FloatingSocialWidget'
import WhatsAppChatWidget from '@/components/social/WhatsAppChatWidget'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mosketh Perfumes - Luxury Fragrances in Kenya',
  description: 'Shop authentic luxury perfumes in Kenya. Fast delivery nationwide with M-Pesa payments.',
  keywords: 'perfumes Kenya, luxury fragrances, authentic perfumes, cologne Nairobi, perfume shop Kenya',
  openGraph: {
    title: 'Mosketh Perfumes - Luxury Fragrances Kenya',
    description: 'Discover authentic luxury perfumes in Kenya. Shop now with M-Pesa.',
    url: 'https://mosketh-frontend.vercel.app',
    siteName: 'Mosketh Perfumes',
    images: [
      {
        url: 'https://mosketh-backend.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_KE',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mosketh Perfumes',
    description: 'Luxury fragrances in Kenya',
    images: ['https://mosketh-backend.vercel.app/twitter-image.jpg'],
  },
  verification: {
    google: 'YOUR_GOOGLE_VERIFICATION_CODE', // Replace with your actual code
  },
}

export default function RootLayout({ children }) {
  // Replace with your actual tracking IDs
  const GA_TRACKING_ID = 'G-XXXXXXXXXX'; // Your Google Analytics ID
  const FB_PIXEL_ID = 'YOUR_FB_PIXEL_ID'; // Your Facebook Pixel ID
  const TIKTOK_PIXEL_ID = 'YOUR_TIKTOK_PIXEL_ID'; // Your TikTok Pixel ID

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
            gtag('config', 'AW-CONVERSION_ID'); // Google Ads conversion ID
          `}
        </Script>

        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>

        {/* TikTok Pixel */}
        <Script id="tiktok-pixel" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
              ttq.load('${TIKTOK_PIXEL_ID}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>

        {/* Meta tags for social sharing */}
        <meta property="og:title" content="Mosketh Perfumes - Luxury Fragrances Kenya" />
        <meta property="og:description" content="Shop authentic luxury perfumes in Kenya. Fast delivery with M-Pesa." />
        <meta property="og:image" content="https://mosketh-backend.vercel.app/og-image.jpg" />
        <meta property="og:url" content="https://mosketh-frontend.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
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
              <FloatingSocialWidget />
              <WhatsAppChatWidget />
              <Analytics />
              <SpeedInsights />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}