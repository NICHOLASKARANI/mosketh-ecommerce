'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  // Ensure product has all required fields
  const safeProduct = {
    id: product.id || Math.random().toString(),
    name: product.name || 'Unnamed Product',
    priceKES: product.priceKES || 0,
    slug: product.slug || '#',
    images: product.images && product.images.length > 0 ? product.images : ['/logo.png'],
    shortDescription: product.shortDescription || product.description?.substring(0, 100) || 'Luxury fragrance',
    stock: product.stock || 0,
    featured: product.featured || false
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image Container */}
      <Link href={`/product/${safeProduct.slug}`} className="block relative h-64 overflow-hidden">
        <img
          src={safeProduct.images[0]}
          alt={safeProduct.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay with quick actions */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button
            onClick={handleAddToCart}
            className="bg-white text-purple-600 p-3 rounded-full hover:bg-purple-600 hover:text-white transition-all transform hover:scale-110"
            title="Add to Cart"
          >
            <FaShoppingCart size={20} />
          </button>
          
          <button
            className="bg-white text-pink-600 p-3 rounded-full hover:bg-pink-600 hover:text-white transition-all transform hover:scale-110"
            title="Add to Wishlist"
          >
            <FaHeart size={20} />
          </button>
          
          <Link
            href={`/product/${safeProduct.slug}`}
            className="bg-white text-blue-600 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110"
            title="View Details"
          >
            <FaEye size={20} />
          </Link>
        </div>

        {/* Stock Badge */}
        {safeProduct.stock <= 5 && safeProduct.stock > 0 && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Only {safeProduct.stock} left
          </div>
        )}
        
        {safeProduct.stock === 0 && (
          <div className="absolute top-4 right-4 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Out of Stock
          </div>
        )}

        {/* Featured Badge */}
        {safeProduct.featured && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
      </Link>

      {/* Product Info */}
      <div className="p-5">
        <Link href={`/product/${safeProduct.slug}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors line-clamp-2 min-h-[56px]">
            {safeProduct.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mt-2 line-clamp-2 min-h-[40px]">
          {safeProduct.shortDescription}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-purple-600">
            KES {safeProduct.priceKES?.toLocaleString()}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={safeProduct.stock === 0}
          className={`mt-4 w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
            safeProduct.stock > 0
              ? 'bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <FaShoppingCart />
          {safeProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
}