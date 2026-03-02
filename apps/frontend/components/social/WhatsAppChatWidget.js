'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes, FaPaperPlane } from 'react-icons/fa';

export default function WhatsAppChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Show popup after 30 seconds
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = () => {
    const phoneNumber = '254742783907';
    const text = encodeURIComponent(message || 'Hi Mosketh, I\'m interested in your perfumes.');
    window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <>
      {/* Auto-popup message */}
      <AnimatePresence>
        {showPopup && !isOpen && (
          <motion.div
            className="fixed bottom-24 right-4 bg-white rounded-lg shadow-xl p-4 max-w-xs z-50"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-1 right-1 text-gray-400 hover:text-gray-600"
            >
              <FaTimes size={12} />
            </button>
            <p className="text-sm text-gray-600">
              👋 Hi! Need help choosing a perfume? Chat with us on WhatsApp!
            </p>
            <button
              onClick={() => {
                setIsOpen(true);
                setShowPopup(false);
              }}
              className="mt-2 w-full bg-green-500 text-white px-3 py-1 rounded-full text-sm hover:bg-green-600"
            >
              Chat Now
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="mb-4 bg-white rounded-lg shadow-xl w-80 overflow-hidden"
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.8 }}
            >
              {/* Header */}
              <div className="bg-green-500 p-4 text-white flex items-center justify-between">
                <div className="flex items-center">
                  <FaWhatsapp className="w-6 h-6 mr-2" />
                  <div>
                    <h3 className="font-semibold">Mosketh Perfumes</h3>
                    <p className="text-xs opacity-90">Online | Usually replies in 5min</p>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)}>
                  <FaTimes />
                </button>
              </div>

              {/* Messages */}
              <div className="p-4 h-64 overflow-y-auto bg-gray-50">
                <div className="bg-white rounded-lg p-3 shadow-sm mb-2 max-w-[80%]">
                  <p className="text-sm text-gray-600">
                    👋 Hello! Welcome to Mosketh Perfumes. How can we help you today?
                  </p>
                  <p className="text-xs text-gray-400 mt-1">12:00 PM</p>
                </div>
                <div className="bg-green-100 rounded-lg p-3 shadow-sm ml-auto max-w-[80%]">
                  <p className="text-sm text-gray-600">
                    I'm interested in your perfumes.
                  </p>
                  <p className="text-xs text-gray-400 mt-1">12:01 PM</p>
                </div>
              </div>

              {/* Input */}
              <div className="p-3 border-t flex items-center gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-green-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors"
                >
                  <FaPaperPlane size={16} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors relative"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          <FaWhatsapp className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
            1
          </span>
        </motion.button>
      </div>
    </>
  );
}