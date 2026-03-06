'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cartDB } from '@/lib/cartDB';

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = () => {
    if (!product || !product.id) return;
    cartDB.addItem(product);
    alert(`${product.name || 'Product'} added to cart!`);
  };

  if (!product || !product.id) return null;

  // Generate alt text for SEO
  const altText = `${product.name} - Luxury perfume from Mosketh Perfumes & Beauty Kenya`;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
      <Link href={`/product/${product.slug || '#'}`}>
        <div className="relative pt-[100%] overflow-hidden bg-gray-100">
          <img
            src={imageError ? 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400' : (product.images?.[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400')}
            alt={altText}
            className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
          {product.stock <= 5 && product.stock > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
              Only {product.stock} left
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/product/${product.slug || '#'}`}>
          <h3 className="font-semibold text-gray-800 hover:text-purple-600 mb-2 line-clamp-2">{product.name || 'Unnamed Product'}</h3>
        </Link>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-purple-600">KES {product.priceKES || 0}</span>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full py-2 rounded font-semibold ${
            product.stock > 0
              ? 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
