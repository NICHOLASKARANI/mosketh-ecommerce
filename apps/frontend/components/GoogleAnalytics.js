'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

// Replace with your actual Google Analytics ID
const GA_MEASUREMENT_ID = 'G-9WPW690YDT'; // You'll need to create this at analytics.google.com

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Add Google Analytics script
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    gtag('js', new Date());
    gtag('config', GA_MEASUREMENT_ID);

    // Track page views
    const handleRouteChange = (url) => {
      if (window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
          page_path: url,
        });
      }
    };

    handleRouteChange(pathname);
  }, [pathname]);

  return null;
}
