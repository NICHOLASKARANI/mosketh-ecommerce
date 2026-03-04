'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      addItem(product);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add to cart. Please try again.');
    }
  };

  // Ensure product has all needed fields
  const safeProduct = {
    id: product.id || Date.now().toString(),
    name: product.name || 'Product',
    priceKES: product.priceKES || 0,
    slug: product.slug || '#',
    images: product.images || ['https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'],
    stock: product.stock || 0,
    featured: product.featured || false,
    description: product.description || '',
    shortDescription: product.shortDescription || ''
  };

  const imageUrl = imageError 
    ? 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop'
    : (safeProduct.images[0] || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop');

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
      <Link href={`/product/${safeProduct.slug}`}>
        <div className="relative pt-[100%] overflow-hidden bg-gray-100">
          <img
            src={imageUrl}
            alt={safeProduct.name}
            className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
          {safeProduct.featured && (
            <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded text-xs">
              Featured
            </div>
          )}
          {safeProduct.stock <= 5 && safeProduct.stock > 0 && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs">
              Only {safeProduct.stock} left
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/product/${safeProduct.slug}`}>
          <h3 className="font-semibold text-gray-800 hover:text-purple-600 mb-2 line-clamp-2">
            {safeProduct.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">
          {safeProduct.shortDescription || safeProduct.description?.substring(0, 100) || ''}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-purple-600">
            KES {safeProduct.priceKES?.toLocaleString()}
          </span>
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={safeProduct.stock === 0}
          className={`w-full py-2 rounded font-semibold transition-all ${
            safeProduct.stock > 0
              ? 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {safeProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}
