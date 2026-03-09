'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cartDB } from '@/lib/cartDB';

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const result = cartDB.addItem(product);
    if (result.success) {
      setAdded(true);
      alert(result.message);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  // Create a URL-friendly slug from the product name
  const productSlug = product.slug || product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
      <Link href={`/product/${productSlug}`}>
        <div className="relative pt-[100%] overflow-hidden bg-gray-100 cursor-pointer">
          <img
            src={imageError ? 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400' : (product.images?.[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400')}
            alt={product.name}
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
        <Link href={`/product/${productSlug}`}>
          <h3 className="font-semibold text-gray-800 hover:text-purple-600 mb-2 line-clamp-2 cursor-pointer">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {product.shortDescription || product.description?.substring(0, 100) || ''}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-purple-600">KES {product.priceKES}</span>
        </div>
        
        <button
          onClick={handleAddToCart}
          className={`w-full py-2 rounded font-semibold transition-all ${
            added 
              ? 'bg-green-600 text-white hover:bg-green-700' 
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {added ? '✓ Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
