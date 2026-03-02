import React from 'react';
import Script from 'next/script';

export default function LocalBusinessSchema() {
  return (
    <Script id="local-business-schema" type="application/ld+json">
      {JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Store",
        "name": "Mosketh Perfumes",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Shop F5, Superior Centre, Kimathi Street",
          "addressLocality": "Nairobi",
          "addressCountry": "KE"
        },
        "telephone": "0742783907"
      })}
    </Script>
  );
}
