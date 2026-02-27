'use client'

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": "https://moskethperfumesandbeauty.co.ke",
    "name": "MosKeth Perfumes & Beauty",
    "image": "https://moskethperfumesandbeauty.co.ke/images/logo.png",
    "url": "https://moskethperfumesandbeauty.co.ke",
    "telephone": "+254742783907",
    "email": "info@mosketh.co.ke",
    "priceRange": "KSh 500 - KSh 15000",
    "description": "Nairobi's premier destination for authentic perfumes and beauty products. Shop at our CBD store or order online.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Shop F5, First Floor, Superior Centre, Kimathi Street",
      "addressLocality": "Nairobi",
      "addressRegion": "Nairobi County",
      "postalCode": "00100",
      "addressCountry": "KE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -1.28333,
      "longitude": 36.81667
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "11:00",
        "closes": "17:00"
      }
    ],
    "sameAs": [
      "https://www.instagram.com/moskethperfumes",
      "https://www.tiktok.com/@moskethbeautytouch",
      "https://www.facebook.com/moskethbeautytouch",
      "https://wa.me/254742783907"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "1250",
      "bestRating": "5",
      "worstRating": "1"
    },
    "paymentAccepted": ["M-Pesa", "PayPal", "Visa", "Mastercard", "Cash on Delivery"],
    "currenciesAccepted": "KES, USD",
    "areaServed": ["Nairobi", "Kenya", "Worldwide"],
    "hasMap": "https://maps.google.com/?q=Superior+Centre+Kimathi+Street+Nairobi",
    "parentOrganization": {
      "@type": "Organization",
      "name": "MosKeth Beauty Group",
      "logo": "https://moskethperfumesandbeauty.co.ke/images/logo.png"
    },
    "makesOffer": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Perfumes",
          "description": "Authentic designer perfumes for men, women, and unisex"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Body Oils",
          "description": "Premium body oils for nourishment and hydration"
        }
      }
    ]
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}