'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cartDB } from '@/lib/cartDB';

export default function ProductCard({ product }) {
  const [imageError, setImageError] = useState(false);
  const [added, setAdded] = useState(false);
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    setAdding(true);
    
    const result = cartDB.addItem(product);
    
    if (result.success) {
      setAdded(true);
      // Show success message
      alert(`✅ ${product.name} added to cart!`);
      setTimeout(() => setAdded(false), 2000);
    } else {
      alert('❌ Failed to add to cart. Please try again.');
    }
    
    setAdding(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
      <Link href={`/product/${product.slug}`}>
        <div className="relative pt-[100%] overflow-hidden bg-gray-100">
          <img
            src={imageError ? 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400' : product.images[0]}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        </div>
      </Link>
      
      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-semibold text-gray-800 hover:text-purple-600 mb-2">{product.name}</h3>
        </Link>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{product.shortDescription}</p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-purple-600">KES {product.priceKES}</span>
          {product.stock <= 5 && product.stock > 0 && (
            <span className="text-xs text-orange-600">Only {product.stock} left</span>
          )}
        </div>
        
        <button
          onClick={handleAddToCart}
          disabled={adding || product.stock === 0}
          className={`w-full py-2 rounded font-semibold transition-all flex items-center justify-center gap-2 ${
            product.stock > 0
              ? added 
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-purple-600 text-white hover:bg-purple-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {adding ? (
            <span>Adding...</span>
          ) : added ? (
            <>✓ Added to Cart</>
          ) : product.stock > 0 ? (
            <>Add to Cart</>
          ) : (
            <>Out of Stock</>
          )}
        </button>
      </div>
    </div>
  );
}
