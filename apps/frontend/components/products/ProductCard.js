'use client';

import React from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { FaShoppingCart, FaHeart, FaEye } from 'react-icons/fa';

export default function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  const safeProduct = {
    id: product?.id || Math.random().toString(),
    name: String(product?.name || 'Unnamed Product'),
    priceKES: Number(product?.priceKES || 0),
    slug: String(product?.slug || '#'),
    images: Array.isArray(product?.images) && product.images.length > 0 ? product.images : ['/logo.png'],
    shortDescription: String(product?.shortDescription || product?.description || 'Luxury fragrance'),
    stock: Number(product?.stock || 0),
    featured: Boolean(product?.featured)
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full">
      <Link href={`/product/${safeProduct.slug}`} className="block relative pt-[100%] overflow-hidden bg-gray-100">
        <img
          src={safeProduct.images[0]}
          alt={safeProduct.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => e.target.src = 'https://via.placeholder.com/400?text=Mosketh'}
        />
        
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <button onClick={handleAddToCart} className="bg-white text-purple-600 p-3 rounded-full hover:bg-purple-600 hover:text-white transition-all transform hover:scale-110">
            <FaShoppingCart size={20} />
          </button>
          <button className="bg-white text-pink-600 p-3 rounded-full hover:bg-pink-600 hover:text-white transition-all transform hover:scale-110">
            <FaHeart size={20} />
          </button>
          <Link href={`/product/${safeProduct.slug}`} className="bg-white text-blue-600 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-all transform hover:scale-110">
            <FaEye size={20} />
          </Link>
        </div>

        {safeProduct.stock > 0 && safeProduct.stock <= 5 && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Only {safeProduct.stock} left
          </div>
        )}
        
        {safeProduct.stock === 0 && (
          <div className="absolute top-4 right-4 bg-gray-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Out of Stock
          </div>
        )}

        {safeProduct.featured && (
          <div className="absolute top-4 left-4 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
      </Link>

      <div className="p-5 flex flex-col flex-grow">
        <Link href={`/product/${safeProduct.slug}`} className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors line-clamp-2 mb-2">
            {safeProduct.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {safeProduct.shortDescription}
        </p>
        
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-purple-600">
              KES {safeProduct.priceKES.toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={safeProduct.stock === 0}
            className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
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
    </div>
  );
}
