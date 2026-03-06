'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaHeart, FaArrowLeft } from 'react-icons/fa';
import { cartDB } from '@/lib/cartDB';

export default function ClientProductDetail({ product }) {
  const [mainImage, setMainImage] = useState(product.images?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      cartDB.addItem(product);
    }
    setAdded(true);
    alert(`${quantity} x ${product.name} added to cart!`);
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
              src={mainImage} 
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400'}
            />
          </div>
          
          {product.images?.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setMainImage(img)}
                  className={`border-2 rounded-lg overflow-hidden aspect-square ${
                    mainImage === img ? 'border-purple-600' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <div className="text-3xl font-bold text-purple-600">KES {product.priceKES?.toLocaleString()}</div>
          
          <div className="border-t border-b py-4">
            <p className="text-gray-600 whitespace-pre-line">{product.description}</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-medium">Availability:</span>
            {product.stock > 0 ? (
              <span className="text-green-600">In Stock ({product.stock} available)</span>
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
              <span className="text-sm text-gray-500">Max: {product.stock}</span>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                product.stock > 0
                  ? added ? 'bg-green-600 text-white hover:bg-green-700' : 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <FaShoppingCart />
              {product.stock > 0 ? (added ? 'Added to Cart!' : 'Add to Cart') : 'Out of Stock'}
            </button>
            
            <button className="p-3 border rounded-lg hover:bg-gray-50">
              <FaHeart className="text-gray-600" />
            </button>
          </div>

          <div className="text-sm text-gray-500 space-y-1">
            <p>Category: <span className="capitalize">{product.category?.replace('-', ' ')}</span></p>
            {product.featured && <p>⭐ Featured Product</p>}
          </div>
        </div>
      </div>
    </main>
  );
}
