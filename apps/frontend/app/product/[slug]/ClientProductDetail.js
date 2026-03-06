'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { cartDB } from '@/lib/cartDB';
import Script from 'next/script';

export default function ClientProductDetail({ product }) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!product) {
      const timer = setTimeout(() => router.push('/products'), 2000);
      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [product, router]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
        <Link href="/products" className="text-purple-600 hover:text-purple-700">
          Go to Products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      cartDB.addItem(product);
    }
    setAdded(true);
    alert(`${quantity} x ${product.name} added to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  // Structured data for Google
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.images?.[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400',
    "brand": {
      "@type": "Brand",
      "name": "Mosketh Perfumes & Beauty"
    },
    "offers": {
      "@type": "Offer",
      "price": product.priceKES,
      "priceCurrency": "KES",
      "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }
  };

  return (
    <>
      <Script id="product-schema" type="application/ld+json">
        {JSON.stringify(structuredData)}
      </Script>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Link href="/products" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
          <FaArrowLeft className="mr-2" /> Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.images?.[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'} 
              alt={product.name}
              className="w-full h-auto object-cover"
              onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'}
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
            <div className="text-3xl font-bold text-purple-600">KES {product.priceKES}</div>
            <p className="text-gray-600">{product.description}</p>
            
            <div className="flex items-center gap-2">
              <span className="font-medium">Stock:</span>
              {product.stock > 0 ? (
                <span className="text-green-600">{product.stock} available</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </div>

            {product.stock > 0 && (
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center border rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-100">-</button>
                  <span className="px-4 py-2 border-x min-w-[60px] text-center">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.stock, quantity + 1))} className="px-3 py-2 hover:bg-gray-100">+</button>
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full py-3 rounded-lg font-semibold ${
                product.stock > 0
                  ? added ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-gray-300 cursor-not-allowed'
              } text-white`}
            >
              {product.stock > 0 ? (added ? 'Added to Cart!' : 'Add to Cart') : 'Out of Stock'}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
