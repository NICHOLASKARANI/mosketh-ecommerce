'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FaShoppingCart, FaEye, FaStar, FaHeart } from 'react-icons/fa';
import OptimizedImage from '@/components/ui/OptimizedImage';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const productId = product._id || product.id;
  
  // Calculate discount (mock for demo - you can set actual discounts in admin)
  const hasDiscount = product.priceKES > 2000;
  const discountedPrice = hasDiscount ? Math.round(product.priceKES * 0.85) : null;
  const discountPercent = hasDiscount ? 15 : 0;

  const getImageUrl = () => {
    if (!product.images || product.images.length === 0) {
      return 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400';
    }
    const firstImage = product.images[0];
    if (firstImage && (firstImage.startsWith('http') || firstImage.startsWith('data:'))) {
      return firstImage;
    }
    return 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400';
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cartItem = {
      id: productId,
      name: product.name,
      price: discountedPrice || product.priceKES,
      originalPrice: product.priceKES,
      image: getImageUrl(),
      quantity: 1
    };
    
    const existingCart = JSON.parse(localStorage.getItem('mosketh_cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => item.id === productId);
    
    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += 1;
    } else {
      existingCart.push(cartItem);
    }
    
    localStorage.setItem('mosketh_cart', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('cartUpdated'));
    
    // Show success feedback
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in';
    toast.textContent = `✓ ${product.name} added to cart!`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlist(!isWishlist);
    // Save to localStorage wishlist
    const wishlist = JSON.parse(localStorage.getItem('mosketh_wishlist') || '[]');
    if (!isWishlist) {
      wishlist.push(productId);
      alert('Added to wishlist!');
    } else {
      const index = wishlist.indexOf(productId);
      if (index > -1) wishlist.splice(index, 1);
    }
    localStorage.setItem('mosketh_wishlist', JSON.stringify(wishlist));
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${productId}`}>
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discountPercent}% OFF
          </div>
        )}
        
        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition"
        >
          <FaHeart className={`${isWishlist ? 'text-red-500' : 'text-gray-400'} hover:text-red-500 transition`} />
        </button>

        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <OptimizedImage
            src={getImageUrl()}
            alt={product.name}
            className="w-full h-full"
            productName={product.name}
          />
          
          {/* Quick View Overlay */}
          <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transform transition hover:scale-105">
              <FaEye /> Quick View
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-purple-600 transition">
            {product.name}
          </h3>
          
          {/* Rating Stars */}
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400 text-sm" />
            ))}
            <span className="text-xs text-gray-500 ml-1">(24 reviews)</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.shortDescription}</p>
          
          {/* Price Section */}
          <div className="flex items-center justify-between">
            <div>
              {hasDiscount ? (
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-purple-600">
                    KES {discountedPrice?.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    KES {product.priceKES?.toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-purple-600">
                  KES {product.priceKES?.toLocaleString()}
                </span>
              )}
            </div>
            
            {product.stock > 0 && (
              <button
                onClick={handleAddToCart}
                className="bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition transform hover:scale-105 flex items-center gap-2"
                title="Add to Cart"
              >
                <FaShoppingCart />
              </button>
            )}
          </div>
          
          {/* Stock Status */}
          {product.stock < 5 && product.stock > 0 && (
            <p className="text-xs text-orange-500 mt-2">🔥 Only {product.stock} left in stock!</p>
          )}
        </div>
      </Link>
    </div>
  );
}
