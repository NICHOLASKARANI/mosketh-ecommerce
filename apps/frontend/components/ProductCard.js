'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cart } from '@/lib/cart';

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    const success = cart.addItem(product);
    if (success) {
      setAdded(true);
      alert(`${product.name} added to cart!`);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  // Ensure product has required fields
  const safeProduct = {
    id: product.id || Date.now().toString(),
    name: product.name || 'Product',
    priceKES: product.priceKES || 0,
    images: product.images || ['https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'],
    slug: product.slug || '#'
  };

  const imageUrl = imageError 
    ? 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop'
    : (safeProduct.images[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop');

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
      <Link href={`/product/${safeProduct.slug}`}>
        <div className="relative pt-[100%] overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={safeProduct.name}
            className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/product/${safeProduct.slug}`}>
          <h3 className="font-semibold text-gray-800 hover:text-purple-600 mb-2">
            {safeProduct.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-purple-600">
            KES {safeProduct.priceKES?.toLocaleString()}
          </span>
        </div>
        
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 rounded font-semibold transition-all ${
            added 
              ? 'bg-green-600 text-white' 
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {added ? '✓ Added!' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
