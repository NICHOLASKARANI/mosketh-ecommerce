'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaGift, FaTruck, FaPercent } from 'react-icons/fa';

export default function PromotionBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentPromo, setCurrentPromo] = useState(0);

  const promotions = [
    {
      icon: FaTruck,
      text: 'Free Delivery on orders over KES 5,000',
      bgColor: 'bg-gradient-to-r from-purple-600 to-pink-600'
    },
    {
      icon: FaGift,
      text: 'Buy 2 Get 1 Free on selected perfumes',
      bgColor: 'bg-gradient-to-r from-green-600 to-teal-600'
    },
    {
      icon: FaPercent,
      text: '20% OFF for first-time customers',
      bgColor: 'bg-gradient-to-r from-orange-500 to-red-500'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const promo = promotions[currentPromo];
  const Icon = promo.icon;

  return (
    <AnimatePresence>
      <motion.div
        className={`${promo.bgColor} text-white py-2 px-4 relative overflow-hidden`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center relative">
          <motion.div
            key={currentPromo}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex items-center gap-2"
          >
            <Icon className="w-5 h-5" />
            <span className="text-sm sm:text-base font-medium">{promo.text}</span>
          </motion.div>
          
          <button
            onClick={() => setIsVisible(false)}
            className="absolute right-2 text-white hover:text-gray-200 transition"
          >
            <FaTimes />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
