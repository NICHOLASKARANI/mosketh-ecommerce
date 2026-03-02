'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaShoppingCart, 
  FaHeart, 
  FaWhatsapp,
  FaFacebookF,
  FaTwitter,
  FaTelegramPlane,
  FaShareAlt,
  FaEye 
} from 'react-icons/fa';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const addToCart = useCartStore((state) => state.addItem);
  const addToWishlist = useWishlistStore((state) => state.addItem);

  const productUrl = `https://mosketh-frontend.vercel.app/product/${product.slug}`;
  const shareText = `Check out ${product.name} at Mosketh Perfumes! Only KES ${product.priceKES}`;

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + productUrl)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`, '_blank');
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`, '_blank');
  };

  const shareOnTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(productUrl)}&text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const handleAddToCart = () => {
    addToCart(product);
    toast.success('Added to cart!', {
      icon: '🛒',
      duration: 3000,
    });
    
    // Track conversion for Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'AddToCart', {
        content_name: product.name,
        content_category: product.category?.name,
        value: product.priceKES,
        currency: 'KES',
      });
    }
  };

  const handleAddToWishlist = () => {
    addToWishlist(product);
    toast.success('Added to wishlist!', {
      icon: '❤️',
    });
  };

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10 }}
    >
      <div className="relative h-64 overflow-hidden">
        <Image
          src={product.images?.[0] || '/placeholder.jpg'}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay with quick actions */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            onClick={handleAddToCart}
            className="bg-white text-purple-600 p-3 rounded-full hover:bg-purple-600 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaShoppingCart />
          </motion.button>
          
          <motion.button
            onClick={handleAddToWishlist}
            className="bg-white text-pink-600 p-3 rounded-full hover:bg-pink-600 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaHeart />
          </motion.button>
          
          <Link href={`/product/${product.slug}`}>
            <motion.button
              className="bg-white text-blue-600 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaEye />
            </motion.button>
          </Link>
        </motion.div>

        {/* Share button */}
        <motion.button
          onClick={() => setShowShare(!showShare)}
          className="absolute top-2 right-2 bg-white text-gray-600 p-2 rounded-full shadow-lg hover:bg-purple-600 hover:text-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FaShareAlt />
        </motion.button>

        {/* Share options */}
        {showShare && (
          <motion.div
            className="absolute top-12 right-2 bg-white rounded-lg shadow-xl p-2 flex flex-col gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <button onClick={shareOnWhatsApp} className="text-green-500 hover:bg-green-50 p-2 rounded">
              <FaWhatsapp />
            </button>
            <button onClick={shareOnFacebook} className="text-blue-600 hover:bg-blue-50 p-2 rounded">
              <FaFacebookF />
            </button>
            <button onClick={shareOnTwitter} className="text-blue-400 hover:bg-blue-50 p-2 rounded">
              <FaTwitter />
            </button>
            <button onClick={shareOnTelegram} className="text-blue-500 hover:bg-blue-50 p-2 rounded">
              <FaTelegramPlane />
            </button>
          </motion.div>
        )}
      </div>

      <div className="p-4">
        <Link href={`/product/${product.slug}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-500 mt-1 line-clamp-2">
          {product.shortDescription}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-purple-600">KES {product.priceKES}</span>
            {product.comparePriceKES && (
              <span className="ml-2 text-sm text-gray-400 line-through">
                KES {product.comparePriceKES}
              </span>
            )}
          </div>
          
          {product.stock <= product.lowStockAlert && product.stock > 0 && (
            <span className="text-xs text-orange-500 animate-pulse">
              Only {product.stock} left!
            </span>
          )}
          
          {product.stock === 0 && (
            <span className="text-xs text-red-500">Out of stock</span>
          )}
        </div>

        {/* Rating */}
        {product.rating > 0 && (
          <div className="mt-2 flex items-center">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < product.rating ? '★' : '☆'}</span>
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-500">({product.reviewCount} reviews)</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}