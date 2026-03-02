'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

export default function LivePurchaseNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [purchase, setPurchase] = useState(null);

  useEffect(() => {
    // Simulate random purchases
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const names = ['John', 'Sarah', 'David', 'Mary', 'Peter'];
        const products = ['Vulcan Feu', 'Ameerat Al Arab', 'Oud Wood', 'Rose Gold'];
        setPurchase({
          name: names[Math.floor(Math.random() * names.length)],
          product: products[Math.floor(Math.random() * products.length)],
          time: 'just now'
        });
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 5000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && purchase && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 50, x: -50 }}
          className="fixed bottom-4 left-4 bg-white rounded-lg shadow-xl p-4 max-w-sm z-50 border-l-4 border-green-500"
        >
          <button
            onClick={() => setIsVisible(false)}
            className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
          >
            <FaTimes size={12} />
          </button>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{purchase.name}</span> just purchased{' '}
            <span className="font-semibold text-purple-600">{purchase.product}</span> {purchase.time}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
