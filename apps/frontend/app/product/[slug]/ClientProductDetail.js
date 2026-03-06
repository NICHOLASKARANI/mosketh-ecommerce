'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import { cartDB } from '@/lib/cartDB';

export default function ClientProductDetail({ product }) {
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
        <Link href="/products" className="text-purple-600 hover:text-purple-700 mt-4 inline-block">
          Back to Products
        </Link>
      </div>
    );
  }

  const [mainImage, setMainImage] = useState(product.images?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    cartDB.addItem(product);
    setAdded(true);
    alert(`${product.name} added to cart!`);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <Link href="/products" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6">
        <FaArrowLeft className="mr-2" /> Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
            <img 
              src={mainImage || 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'} 
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'}
            />
          </div>
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

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-3 rounded-lg font-semibold ${
              product.stock > 0
                ? added ? 'bg-green-600 hover:bg-green-700' : 'bg-purple-600 hover:bg-purple-700'
                : 'bg-gray-300 cursor-not-allowed'
            } text-white`}
          >
            {product.stock > 0 ? (added ? 'Added!' : 'Add to Cart') : 'Out of Stock'}
          </button>
        </div>
      </div>
    </main>
  );
}